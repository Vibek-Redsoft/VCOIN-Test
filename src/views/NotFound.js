import React from 'react'
import { Link } from 'react-router-dom';

import "./NotFound.scss"


export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <h2>There is no such page</h2>
      <Link to="/">Back To Home</Link>
    </section>
  )
}
