import React from "react";
import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "../src/components/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../src/components/ErrorFallback";
import Head from "next/head";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../src/theme";
import {Provider} from "react-redux";
import store from "../src/store";

function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title> Instigence App </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
