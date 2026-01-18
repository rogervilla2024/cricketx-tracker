"""
Cricket X Data Collector
Collects round data from SmartSoft Gaming Cricket X
Uses Playwright for browser automation and WebSocket interception
"""

import asyncio
import json
import sqlite3
from datetime import datetime
from playwright.async_api import async_playwright
import hashlib
import os

DATABASE_PATH = os.getenv("DATABASE_PATH", "../api/cricketx.db")

# Cricket X game URLs
CRICKETX_URLS = [
    "https://demo.smartsoftgaming.com/cricketx",
    # Add more casino URLs
]

class CricketXCollector:
    def __init__(self):
        self.rounds = []
        self.db_conn = None

    def init_database(self):
        """Initialize SQLite database"""
        self.db_conn = sqlite3.connect(DATABASE_PATH)
        cursor = self.db_conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS cricketx_rounds (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                round_id TEXT UNIQUE NOT NULL,
                multiplier REAL NOT NULL,
                hash TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_cricketx_mult ON cricketx_rounds(multiplier)
        """)
        self.db_conn.commit()

    def save_round(self, round_id: str, multiplier: float, hash_value: str = None):
        """Save a round to the database"""
        try:
            cursor = self.db_conn.cursor()
            cursor.execute(
                "INSERT OR IGNORE INTO cricketx_rounds (round_id, multiplier, hash) VALUES (?, ?, ?)",
                (round_id, multiplier, hash_value)
            )
            self.db_conn.commit()

            # Log with cricket terminology
            score_type = self.get_score_type(multiplier)
            print(f"[Cricket X] Saved round {round_id}: {multiplier}x ({score_type})")
            return True
        except Exception as e:
            print(f"[Cricket X] Error saving round: {e}")
            return False

    def get_score_type(self, multiplier: float) -> str:
        """Convert multiplier to cricket terminology"""
        if multiplier >= 100:
            return "Double Century!"
        elif multiplier >= 50:
            return "Century!"
        elif multiplier >= 10:
            return "Super Over"
        elif multiplier >= 6:
            return "Six!"
        elif multiplier >= 4:
            return "Four!"
        elif multiplier >= 2:
            return "Boundary"
        elif multiplier >= 1.5:
            return "Double"
        else:
            return "Single"

    async def handle_websocket(self, ws):
        """Handle WebSocket messages"""
        print(f"[Cricket X] WebSocket connected: {ws.url}")

        def on_message(message):
            try:
                data = json.loads(message)
                self.process_message(data)
            except json.JSONDecodeError:
                pass
            except Exception as e:
                print(f"[Cricket X] Message error: {e}")

        ws.on("framereceived", lambda payload: on_message(payload))

    def process_message(self, data):
        """Process Cricket X game messages"""
        msg_type = data.get("type") or data.get("t") or data.get("action")

        # Round finished (out!)
        if msg_type in ["crash", "out", "finish", "round_result"]:
            multiplier = (
                data.get("multiplier") or
                data.get("crashPoint") or
                data.get("runs") or
                data.get("x")
            )
            round_id = (
                data.get("roundId") or
                data.get("round_id") or
                data.get("id") or
                self.generate_round_id()
            )
            hash_value = data.get("hash")

            if multiplier:
                self.save_round(str(round_id), float(multiplier), hash_value)

        # History (previous innings)
        elif msg_type in ["history", "scorecard", "previous_rounds"]:
            rounds = data.get("rounds") or data.get("innings") or data.get("history") or []
            for round_data in rounds:
                mult = round_data.get("multiplier") or round_data.get("runs") or round_data.get("x")
                rid = round_data.get("id") or round_data.get("roundId")
                if mult and rid:
                    self.save_round(str(rid), float(mult))

    def generate_round_id(self):
        """Generate unique round ID"""
        timestamp = datetime.now().isoformat()
        return hashlib.md5(timestamp.encode()).hexdigest()[:12]

    async def collect_from_url(self, url: str, duration_minutes: int = 60):
        """Collect data from a specific URL"""
        print(f"[Cricket X] Starting collection from {url}")

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={"width": 1920, "height": 1080},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )

            page = await context.new_page()
            page.on("websocket", self.handle_websocket)

            try:
                await page.goto(url, wait_until="networkidle", timeout=60000)
                print(f"[Cricket X] Page loaded: {url}")
            except Exception as e:
                print(f"[Cricket X] Page load error: {e}")
                await browser.close()
                return

            end_time = datetime.now().timestamp() + (duration_minutes * 60)
            while datetime.now().timestamp() < end_time:
                await asyncio.sleep(10)
                try:
                    await page.evaluate("() => true")
                except:
                    print("[Cricket X] Reconnecting...")
                    await page.goto(url, wait_until="networkidle")

            await browser.close()

    async def run(self, duration_minutes: int = 60):
        """Run the collector"""
        self.init_database()

        tasks = [
            self.collect_from_url(url, duration_minutes)
            for url in CRICKETX_URLS
        ]
        await asyncio.gather(*tasks)

        if self.db_conn:
            self.db_conn.close()


if __name__ == "__main__":
    collector = CricketXCollector()
    asyncio.run(collector.run(duration_minutes=60))
