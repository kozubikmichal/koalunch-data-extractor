# Koalunch Data Extractor

## Development Workflow

### Hot reload

Run `npm run serve` to start your development workflow with hot reload.

### Build, test, deploy

These steps need to be performed whenever you make changes:

0. Write awesome code in the `src` directory.
1. Build (clean, lint, and transpile): `npm run build`
2. Create unit tests in the `test` directory.  If your code is not awesome, you may have to fix some things here.
3. Verify code coverage: `npm run cover:check`
4. Commit your changes using `git add` and `git cz`
5. Push to GitHub using `git push` and wait for the CI builds to complete.  Again, success depends upon the awesomeness of your code.
