# elysia-basic-auth

[Basic auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) for [Elysia](https://elysiajs.com/).

## Install

```bash
bun add elysia-basic-auth
```

## Usage

```ts
import { Elysia } from 'elysia';
import basicAuth from 'elysia-basic-auth';

new Elysia()
  .use(
    basicAuth({
      users: [{ username: 'admin', password: 'admin' }],
      realm: '',
      errorMessage: 'Unauthorized',
      exclude: [],
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

```

## License

MIT
```
