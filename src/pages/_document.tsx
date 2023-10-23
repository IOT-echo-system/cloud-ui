import {Html, Head, Main, NextScript} from 'next/document'
import React from 'react'

const Document: React.FC = () => {
  return <Html lang='en'>
    <Head />
    <body style={{margin: 0, padding: 0}}>
      <Main />
      <NextScript />
    </body>
  </Html>
}
export default Document
