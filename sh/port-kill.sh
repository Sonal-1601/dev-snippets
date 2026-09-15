#!/usr/bin/env bash
# Kill whatever is listening on a TCP port. Usage: port-kill.sh 3000
set -euo pipefail

port="${1:?usage: port-kill.sh <port>}"

pids="$(lsof -ti "tcp:${port}" -sTCP:LISTEN 2>/dev/null || true)"

if [[ -z "$pids" ]]; then
  echo "nothing listening on :${port}"
  exit 0
fi

for pid in $pids; do
  name="$(ps -p "$pid" -o comm= 2>/dev/null || echo '?')"
  echo "killing ${pid} (${name}) on :${port}"
  kill "$pid"
done
