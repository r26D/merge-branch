## v1.10.0
- Renamed default branch from master to main
- Added CI workflow for tests and Docker build on push/PR
- Added release workflow to automate Docker image publishing and version bumps on tag push
- Moved manual release scripts (tag.sh, docker_build.sh) to manual_scripts/
- Fixed action.yml input type field to use proper description
- Updated README examples to use actions/checkout@v4 and current version references
- Removed merge conflict artifact from CHANGELOG

## v1.9.3
 - Added auto updating docs/action docker reference
 - Fixing issue with parameters passed into the system.
## v1.9.2 
 - Fixed bundler version issues
 - filter out development gems from docker.

## v1.9.1 
- Fixed publishing bug
## v1.9.0
 - Update Ruby version to 3.4.7, modify Dockerfile and build scripts for new image registry, and enhance Gemfile with RSpec for testing.

## v1.8.1
- Brought over changes from upstream

## v1.4.0

- Support Github Enterprise [#15](https://github.com/devmasx/merge-branch/pull/15)
- Bump addressable from 2.7.0 to 2.8.0 [#14](https://github.com/devmasx/merge-branch/pull/14)

## v1.3.1

- Fix, check inputs with empty string values.

## v1.3.0

- Add input github_token, read github token from inputs.

## v1.2.0

- Add input from_branch, perform a git merge for any branch combination.

## v1.1.1

- Validate inputs

## v1.1.0

First relase

- Merge branch with types labeled, now
