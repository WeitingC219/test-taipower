# Automated Semantic Versioning & Release Workflow

We have set up **Automated Semantic Versioning** using `standard-version`. This tool automates the tedious parts of releasing software.

## How it works

1.  **Analyze Commits**: It looks at your git history since the last release.
2.  **Calculate Version**: Based on the commit types, it decides the next version:
    - `fix: ...` -> **Patch** release (1.0.0 -> 1.0.1)
    - `feat: ...` -> **Minor** release (1.0.0 -> 1.1.0)
    - `feat!: ...` or `BREAKING CHANGE:` -> **Major** release (1.0.0 -> 2.0.0)
3.  **Update Files**: It bumps the version in `package.json` and `package-lock.json`.
4.  **Generate Changelog**: It creates/updates `CHANGELOG.md` with all the new features and fixes.
5.  **Commit & Tag**: It creates a new commit (e.g., "chore(release): 1.1.0") and a git tag (e.g., "v1.1.0").

## "Big Company" Release Workflow

In large companies, the release process is strictly controlled. Here is the standard workflow:

### 1. Development (Feature Branches)

- Developers work on feature branches (`feat/login`, `fix/bug-123`).
- They commit using Conventional Commits (`feat: add login`).
- They open a Pull Request (PR) to the `develop` or `main` branch.
- **CI/CD** runs tests and linting.
- Once approved, the PR is merged.

### 2. The Release (Main Branch)

When you are ready to release (e.g., merge to `main`):

1.  **Run the Release Command**:

    ```bash
    npm run release
    ```

    _Note: In a fully automated CI/CD pipeline (like GitHub Actions), this command runs automatically when code is pushed to `main`._

    **We have set up this automation for you!**
    See `.github/workflows/release.yml`.

    **The New "Release PR" Flow:**
    1.  **Feature Merged**: When you merge a feature to `main`, the Action runs.
    2.  **PR Created**: It does NOT push directly. Instead, it creates a **Pull Request** (e.g., `chore(release): 1.1.0`).
    3.  **Review**: You can review the changelog and version bump in this PR.
    4.  **Merge**: When you merge this Release PR, the Action runs again to **Tag** the release (`v1.1.0`).

2.  **Push the Release**:

    _(Skipped, handled by CI)_
    The CI/CD system pushes the new commit AND the new tag to the remote repository.

3.  **Deployment**:
    The CI/CD system sees the new tag (e.g., `v1.1.0`) and triggers the deployment pipeline (e.g., deploy to production, publish to npm).

## Does it create an extra commit?

**Yes.**
When you run `npm run release`, it creates a **release commit** (e.g., `chore(release): 1.0.1`).

- This commit contains the updated `package.json` and `CHANGELOG.md`.
- This commit is tagged (e.g., `v1.0.1`).

This is the industry standard practice because it ensures your codebase explicitly records _when_ a version changed and _what_ changed in the Changelog.
