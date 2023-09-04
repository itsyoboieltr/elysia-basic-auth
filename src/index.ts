import Elysia from 'elysia';

export class BasicAuthError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export interface BasicAuthUser {
  username: string;
  password: string;
}

export interface BasicAuthConfig {
  users: BasicAuthUser[];
  realm?: string;
  errorMessage?: string;
  exclude?: string[];
  noErrorThrown?: boolean;
}

export const basicAuth = (config: BasicAuthConfig) =>
  new Elysia({ name: 'basic-auth', seed: config })
    .addError({ BASIC_AUTH_ERROR: BasicAuthError })
    .derive((ctx) => {
      const authorization = ctx.headers.authorization;
      if (!authorization) return { isAuthed: false };
      const [username, password] = atob(authorization.split(' ')[1]).split(':');
      const isAuthed = config.users.some(
        (user) => user.username === username && user.password === password
      );
      return { isAuthed };
    })
    .onTransform((ctx) => {
      if (
        !ctx.isAuthed &&
        !config.noErrorThrown &&
        !config.exclude?.includes(ctx.path) &&
        ctx.request.method !== 'OPTIONS'
      )
        throw new BasicAuthError(config.errorMessage ?? 'Unauthorized');
    })
    .onError((ctx) => {
      if (ctx.code === 'BASIC_AUTH_ERROR') {
        return new Response(ctx.error.message, {
          status: 401,
          headers: {
            'WWW-Authenticate': `Basic${
              config.realm ? ` realm="${config.realm}"` : ''
            }`,
          },
        });
      }
    });
