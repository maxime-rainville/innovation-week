## React admin dummy project

This is a dummy project to do some work on the `maxime-rainville/silverstripe-react`. It it will install the the [`feature/react-admin`](https://github.com/maxime-rainville/silverstripe-react/tree/feature/react-admin) branch of `silverstripe-react`. Direct all `silverstripe-react` PRs to that branch.

### Getting started
- Clone the repo locally
- Install dependencies from source (`composer update --prefer-source`)
- `cd app/cms-client/`
  - We use an old version of node. You wight have to use nvm to downgrade to node 10.
  - `yarn install` to get all the dependencies
  - `yarn dev` to build the library in dev mode
  - `yarn build` to build the library in prod mode

### Making changes to silverstripe-react
This code snippet will install the dependencies you need to work.

```
cd vendor/silverstripe/admin
yarn install
cd ../../maxime-rainville/silverstripe-react
yarn install
```

From, there just create a new branch of `maxime-rainville/silverstripe-react` and push it to GitHub.
