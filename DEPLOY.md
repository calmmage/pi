# Deployment and release

Branch: `main`. Push scoped changes to `origin/main` and verify the remote ref. A main-branch push updates Git source; it does not by itself publish the npm packages.

Where: npm, through GitHub Actions trusted publishing. A `vX.Y.Z` tag triggers `.github/workflows/build-binaries.yml`; its publish job and release announcement verify the workspace packages and update the `pi.dev/api/latest-version` release marker.

Before a package release, follow the full Releasing section of `AGENTS.md`: ask whether the user ran `/cl` on the latest main commit, complete the Node and Bun local release smoke tests, and run the appropriate lockstep patch or minor release script. That script updates versions and changelogs, checks, commits, tags and pushes. Do not rerun it after its tag is pushed.

Check: confirm all tag-triggered publication and announcement jobs pass, every public workspace package and its tarball resolve at the exact release version, and `pi.dev/api/latest-version` reports that version. If publication or announcement fails, inspect and repair or rerun the failed workflow as described in `AGENTS.md`; do not claim deployment from a successful source push alone.
