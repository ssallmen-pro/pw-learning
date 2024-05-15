# Learning Playwright

This project was initiated for my personal intent to learn implementing Page Object Models using JavaScript and Playwright. I also wanted to learn using Playwright's other features like fixtures and parameterized projects. The project uses Fonecta's [02Rekkari](https://02rekkari.fi/en/) service as the test target web site.

## Pre-requiremets and Installation

To try out this project you need to have [Node.js](https://nodejs.org/en) installation on your computer. After cloning the repo, the project itself can be installed using command `npm install`. That should install all the rest and you are ready to run the tests.

## Running tests

You can run these tests using playwright Node executable. If you run `npx playwright`, you will get more information on commands you can give to the playwright. For example, command `npx playwright test` will run all the tests in the project. More information about using the playwright executable to run and debug the tests can be found from [Playwright documentation](https://playwright.dev/docs/running-tests).

### Playwright projects

File [playwright.config.js](playwright.config.js) includes the project configurations. You can test running only specific tests, for example only end-to-end tests in English using chromium, by giving the project as the argument for the runner, i.e. `npx playwright test --project chromium-e2e-en`. You can also use the Playwright GUI (`npx playwright test --ui`) and select the wanted project from there.

## GitHub Actions

The project included also a [GitHub Actions workflow](.github/workflows/playwright.yml), which is run by default for every push to the main branch, and for every pull request aiming to merge to main branch. A run for the same workflow can also be initiated manually from the [GitHub Actions page](https://github.com/ssallmen-pro/pw-learning/actions/workflows/playwright.yml) of the repo.
