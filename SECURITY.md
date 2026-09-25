# Security

## Threat: A12-1309CM supply-chain campaign

This repository was previously infected by the **A12-1309CM** supply-chain
malware campaign. The infection was cleaned via `git force-push` back to a
known-good commit, and the defenses in this file were added to prevent
re-infection and detect any future intrusion attempt.

**Vector.** A GitHub bot running on Windows uses a stolen personal access
token to force-push to the repository. The bot rewrites legitimate commits,
preserving each commit's author date and message, but the *committer* date
leaks the attacker's timezone (`-07:00`, Pacific Time). Fresh commits with
`-0700` in the committer timezone that were not authored from Pacific Time
are the strongest signal of tampering.

**Payload.** The bot injects an obfuscated loader (~33 KB) at the end of
`postcss.config.mjs`. The file begins with the legitimate module, followed
by thousands of whitespace characters used as visual padding, followed by
minified obfuscated JavaScript. The loader executes automatically the next
time anyone runs `npm run dev` or `npm run build`, because Next.js loads
`postcss.config.*` as part of its build pipeline. From there it beacons out
to command-and-control infrastructure and can pivot to other repos the token
has write access to.

## Indicators of compromise (IoCs)

### File-level

- `postcss.config.mjs` (or any `postcss.config.*`) larger than ~500 bytes.
  The clean file is under 100 bytes.
- New entries added to `.gitignore`:
  - `branch_structure.json`
  - `temp_auto_push.bat`
  - `temp_interactive_push.bat`

### Code patterns (regex)

- `_0x[a-f0-9]{4,}`
- `a0_0x[a-f0-9]{4,}`
- `createRequire.*createRequire`
- `eval\(atob\(`

### Network / campaign strings

- Campaign header identifier: `A12-1309CM` (sent as `Sec-V: A12-1309CM`)
- C2 host: `166.88.134.75`
- C2 endpoints:
  - `https://1rpc.io/eth`
  - `https://eth.drpc.org`
  - `https://eth-mainnet.public.blastapi.io`

### Git-history signals

- Commits whose committer date carries timezone `-0700` written from a
  location that is not on Pacific Time.
- Force-pushes to `main` from a device you do not recognize.

## Defenses installed in this repo

- **`.npmrc`** sets `ignore-scripts=true`, so `npm install` / `npm ci` no
  longer executes install-time scripts from dependencies. Run legitimate
  scripts manually when needed — see README.
- **`.githooks/pre-commit`** rejects any commit that stages a file matching
  the IoCs above. Enable it once per clone with
  `bash scripts/setup-hooks.sh`.
- **`.github/workflows/security-scan.yml`** re-runs the same scan on every
  push to `main`, every pull request, and daily at 03:00 ART
  (06:00 UTC).

## Manual verification

Run these from the repo root at any time to confirm the tree is clean:

```bash
# postcss config size (clean files are < 500 bytes).
wc -c postcss.config.*

# IoC grep across the working tree (excludes .git and node_modules).
grep -rnE 'A12-1309CM|_0x[a-f0-9]{4}|a0_0x[a-f0-9]{4}|createRequire.*createRequire|eval\(atob\(|166\.88\.134\.75|1rpc\.io/eth|eth\.drpc\.org|eth-mainnet\.public\.blastapi\.io' . \
  --exclude-dir=.git --exclude-dir=node_modules

# Recent commits whose committer timezone is Pacific (-0700).
git log --format='%H %ci %cn <%ce>' | grep -- '-0700' || echo "no -0700 committers"
```

The IoC grep is expected to also match this `SECURITY.md`, the hook under
`.githooks/`, and `.github/workflows/security-scan.yml`. Any match outside
those files is a red flag.

## What to do if CI or the pre-commit hook fires

1. **Do not push.** Do not run `npm install`, `npm run dev`, or
   `npm run build` from the affected checkout — the loader executes at
   build time.
2. **Inspect the offending file.** Use the grep above, or check size with
   `wc -c postcss.config.*`. If the file is inflated or contains obfuscated
   JavaScript, the checkout is compromised.
3. **Audit recent history for tampered commits:**

   ```bash
   git log --format='%H %ci %cn <%ce> — %s' | grep -- '-0700'
   ```

   Any legitimate-looking commit with a Pacific-Time committer that you
   did not author from Pacific Time is suspect.
4. **Restore `main` to the last known-good commit** and force-push
   (only after you have verified locally that the good commit is clean):

   ```bash
   git fetch origin
   git checkout main
   git reset --hard <last-good-sha>
   git push --force-with-lease origin main
   ```

5. **Rotate credentials.** Revoke and reissue every GitHub PAT, deploy key,
   and CI secret that had write access to this repo. Assume the token that
   was used to force-push is fully compromised.
6. **Notify collaborators** so nobody pulls or builds the poisoned tree.

## Reporting

If you find A12-1309CM indicators in this repo or a related one, open an
issue tagged `security` — or contact the maintainer directly if the issue
tracker itself may be exposed.
