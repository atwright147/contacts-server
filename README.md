# Contacts Manager Server

Portfolio piece for https://github.com/atwright147. This is the server side of a fairly simple contact manager application.

The aim of this repo is to demonstrate some of my development abilities in Express and the aim of the project as a whole is to
demonstrate my abilities in:

* Angular
* React
* Svelte
* Express

## Setup

This project uses `@VSCode/SQLite` which can be a pain to install, especially on Windows. Please follow their instruction to prepare your
system for the installation (prepare node-gyp): https://www.npmjs.com/package/vscode-sqlite3#installing

### Installation

```sh
npm ci
```

### Database migrations

```sh
npm run db:up
```

## Running

```sh
npm run dev
```

The server will be available on http://localhost:3000/ and all API endpoints are under `/api/v1/*`

## Tools

### Database

I currently recommend using [SQLectron](https://sqlectron.github.io/) as a GUI to work with SQL databases
