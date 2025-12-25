'use client'

import { useState } from 'react'

export default function FormBuilderPageSimple() {
  const [test, setTest] = useState('test')
  
  return (
    <div>
      <h1>Simple Form Builder Test</h1>
      <p>If you see this, the basic component works</p>
      <button onClick={() => setTest('clicked')}>
        Test Button: {test}
      </button>
    </div>
  )
}