# MockApolloProviderBugRepro
Minimal reproduction of strange apollo provider bug with MockedProvider and array return types in newData

Steps to run after cloning this repo:

In two terminals:

## 1. WEB

``` bash
cd workspaces/web && yarn && yarn start
```
To run tests with jest in workspaces, run 
```
yarn test
```

## 2. SERVER

``` bash
cd workspaces/server && yarn build && yarn start #or yarn start:dev or nodemon
```

Web client runs on 3000 by default (is wrapped with CRA so will prompt if 3000 is occupied
Server runs on 5000 by default, visit localhost:5000/graphql for playground

Sample server query:

``` graphql
query {
  getObjectWithArray {
    objectId
    objectList {
      subOjectId
      subObjectName
      subObjectDescription
    }
  }
}
```
