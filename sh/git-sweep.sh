#!/usr/bin/env bash
# Delete local branches whose remote-tracking branch has already been merged
# into the default branch. Pass -n to only print what would be deleted.
set -euo pipefail

dry_run=0
[[ "${1:-}" == "-n" ]] && dry_run=1

default="$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')"
default="${default:-main}"

git fetch --prune --quiet

merged="$(git branch --merged "origin/${default}" --format='%(refname:short)' \
  | grep -vxE "${default}|master|develop" || true)"

if [[ -z "$merged" ]]; then
  echo "nothing to sweep"
  exit 0
fi

while IFS= read -r branch; do
  if (( dry_run )); then
    echo "would delete: ${branch}"
  else
    git branch -d "$branch"
  fi
done <<< "$merged"
