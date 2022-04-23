import React from "react"
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/">
      <img src="/kataku-logo.svg" alt="Logo" className="h-14" />
    </Link>
  )
}

export default Logo
