import React from "react";
import '../styles/globals.css'
import Header from "../src/components/Header";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "../src/components/ErrorFallback";

function App({ Component, pageProps }) {
  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <Component {...pageProps} />
      </ErrorBoundary>
    )
}

export default App
