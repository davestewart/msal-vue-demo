import type { Configuration } from '@azure/msal-browser'
import { LogLevel } from '@azure/msal-browser'

export const scopes = [
  import.meta.env.VITE_AUTH_SCOPE
]

export const config: Configuration = {
  // required
  auth: {
    // must match info in dashboard
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authority: import.meta.env.VITE_AUTH_AUTHORITY,
    knownAuthorities: [
      import.meta.env.VITE_AUTH_AUTHORITY,
    ],

    // login redirect; must match path in dashboard
    redirectUri: `${location.origin}/auth/redirect/login`,
  },

  // optional
  system: {
    loggerOptions: {
      logLevel: LogLevel.Verbose,
      loggerCallback,
    }
  }
}

function loggerCallback (level: LogLevel, message: string, containsPii: boolean) {
  if (!containsPii) {
    const parts = message.split(' : ')
    const text = parts.pop()
    switch (level) {
      case LogLevel.Error:
        return console.error(text)

      case LogLevel.Warning:
        return console.warn(text)

      case LogLevel.Info:
        return console.info(text)

      case LogLevel.Verbose:
        return console.debug(text)
    }
  }
}
