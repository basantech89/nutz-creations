import '../styles/globals.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'

import ErrorFallback from '../src/components/ErrorFallback'
import Header from '../src/components/Header'
import store from '../src/store'
import theme from '../src/theme'

function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title> Instigence App </title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Header />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default App
