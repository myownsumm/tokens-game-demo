# tokens-game-demo

## Description

* The project consists of two parts:
  * Frontend: React 18 framework + Vite bundler, main Demo application
  * Backend: Node.JS (Nest.JS framework), used for data mocking control + websocket interaction

  This is not a monorepo by design. `node_modules` are not combined, so you need to install packages for both parts of the project.

## Installation

1. `cd ./backend`, `npm install`
2. `cd ./frontend`, `npm install`

## Run

1. `cd ./backend`, `npm run start:dev`
2. `cd ./frontend`, `npm run dev`

## Authentication

* Open `http://localhost:5173` and it will redirect you to the Login page.
* We have 4 users mocked in [auth.mock.ts](frontend%2Fsrc%2Fmodules%2Fauth%2Fauth.mock.ts):

```text
 john@gmail.com
 elena@gmail.com
 oleksandr@gmail.com
 anna@gmail.com
```

* Please use these emails to log in. There is no password check; the field exists just for Demo purposes. You can use any password to proceed.

* After successful authentication, you will be redirected to the `/dashboard` route with the main functionality.
* Explore the Demo App and enjoy!