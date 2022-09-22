import { CssBaseline } from "@mui/material"
import type { NextPage } from "next"
import Link from "next/link"
import React from "react"

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <h1>Hello world</h1>
      <Link href='/tasks'>tasks</Link>
    </React.Fragment>
  )
}

export default Home
