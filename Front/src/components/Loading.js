import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div className='loading text-center'>
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}
