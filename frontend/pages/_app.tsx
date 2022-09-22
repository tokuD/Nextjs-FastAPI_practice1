import "../styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"
import { CssBaseline } from "@mui/material"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
