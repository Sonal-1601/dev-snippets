# dev-snippets

Small, dependency-free shell and JavaScript utilities I keep reaching for.

Each snippet is a single file with no external dependencies. Shell scripts
are checked with `shellcheck`, JS files run under Node's built-in test runner.

## Layout

```
sh/   POSIX-ish bash helpers
js/   plain ES modules (Node ≥ 20)
```

## Running the checks locally

```sh
shellcheck sh/*.sh
node --test js/
```
