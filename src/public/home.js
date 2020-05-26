import React from 'react'
import ReactDOM from 'react-dom'
import HackerNewsApp from './components/HackerNewsApp'

ReactDOM.hydrate(
  <HackerNewsApp data={window.__INITIAL__DATA__.responseData} />,
  document.getElementById('root')
)
