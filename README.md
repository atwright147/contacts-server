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

Copy `.env.example` to `.env` and update to taste

```sh
# migrate db, seed db and download avatar images
npm run setup
```

## Running

```sh
npm run dev
```

The server will be available on http://localhost:3001/ and all API endpoints are under `/api/v1/*` (port is based on the `.env` file)

## Tools

### Database

I currently recommend using [SQLectron](https://sqlectron.github.io/) as a GUI to work with SQL databases

## Docker

A basic multi-stage Docker Compose file is set up to make it easier to run the application. This will watch for file changes andautomatically update them

1. Run through the **Installation** steps (above)
1. Copy the `.env.example` file to `.env.docker` and change the **DB** section to:
    ```yaml
    # DB
    DB_PATH=/app/db
    DB_FILE=dev.sqlite3
    ```
1. Run `docker-compose up -d`
