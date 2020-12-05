import '../styles/globals.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'

import ErrorFallback from '../src/components/ErrorFallback'
import Header from '../src/components/Header'
import store from '../src/store'
import themes from '../src/themes'
import { useLocalStorageState } from '../src/utils/hooks/useLocalStorageState'

function App({ Component, pageProps }) {
  const [isLightTheme, setThemeMode] = useLocalStorageState(
    'isLightTheme',
    false
  )
  const theme = isLightTheme ? themes.lightTheme : themes.darkTheme

  const toggleThemeMode = () => {
    setThemeMode(!isLightTheme)
  }

  return (
    <React.Fragment>
      <Head>
        <title> Nutz Creations </title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NextAuthProvider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          options={{
            // Client Max Age controls how often the useSession in the client should
            // contact the server to sync the session state. Value in seconds.
            // e.g.
            // * 0  - Disabled (always use cache value)
            // * 60 - Sync session state with server if it's older than 60 seconds
            clientMaxAge: 0,
            // Keep Alive tells windows / tabs that are signed in to keep sending
            // a keep alive request (which extends the current session expiry) to
            // prevent sessions in open windows from expiring. Value in seconds.
            //
            // Note: If a session has expired when keep alive is triggered, all open
            // windows / tabs will be updated to reflect the user is signed out.
            keepAlive: 0
          }}
          session={pageProps.session}
        >
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Header onToggleThemeMode={toggleThemeMode} />
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </NextAuthProvider>
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default App
