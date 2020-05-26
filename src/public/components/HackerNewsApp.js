import React from 'react'
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import ListComponent from './list'
import '../../styles/style.scss'
const HackerNewsApp = props => {
  const {
    data: { hits, page }
  } = props
  return (
    <>
      <HeaderComponent />
      <ListComponent data={hits} />
      <FooterComponent page={page} />
    </>
  )
}

export default HackerNewsApp
