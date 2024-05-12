#!/bin/bash
readonly env="${1:-dev}"
flag=""
[[ "$env" = "dev" ]] && flag="--local"
options=(
	"tag0001 IT $flag"
	"tag0002 雑談 $flag"
)

for opt in "${options[@]}"; do
	cmd="bunx wrangler kv:key put $opt --namespace-id=blog-tag-store"
	echo "$cmd"
	eval "$cmd"
done
