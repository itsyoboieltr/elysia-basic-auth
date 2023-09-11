# elysia-basic-auth

[Basic auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) for [Elysia](https://elysiajs.com/).

## Install

```bash
bun add elysia-basic-auth
```

## Usage

```ts
import { Elysia } from 'elysia';
import { basicAuth } from 'elysia-basic-auth';

new Elysia()
  .use(
    basicAuth({
      users: [{ username: 'admin', password: 'admin' }],
      realm: '',
      errorMessage: 'Unauthorized',
      exclude: ['public/**'],
      noErrorThrown: false,
    })
  )
  .listen(3000);

interface BasicAuthConfig {
  users: BasicAuthUser[];
  realm?: string;
  errorMessage?: string;
  exclude?: string[];
  noErrorThrown?: boolean;
}

interface BasicAuthUser {
  username: string;
  password: string;
}
```

## Configuration

### users

`BasicAuthUser[]`

A list of users valid for authentication, each user must have a username and password.

### realm

`string`

The realm used for basic authentication.

### errorMessage

`string`

Default: `Unauthorized`

The response body for unauthorized requests.

### exclude

`string[]`

An array of glob patterns to exclude from authentication.

### noErrorThrown

`boolean`

A boolean that determines whether or not to throw an error when authentication fails.
