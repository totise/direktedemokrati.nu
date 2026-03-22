#!/usr/bin/env bash
set -e

# Kill existing next dev workers (not npm itself)
pkill -f "node.*\.bin/next" 2>/dev/null || true

# Kill anything still on the common dev ports
for port in 3000 3001 3002 3003; do
  lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null | xargs -r kill -9 2>/dev/null || true
done

sleep 1

# Wipe build cache
rm -rf .next

# Start dev server detached, writing to log
nohup npm run dev >/tmp/direktedemokrati-dev.log 2>&1 &
disown

echo "Dev server starting — tail /tmp/direktedemokrati-dev.log for output"
