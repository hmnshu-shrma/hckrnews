import React from 'react'
import '../../styles/footer.scss'
const FooterComponent = props => {
  const { page } = props
  return (
    <footer className='footer'>
      <a href={`?page=${page + 1}`}>More</a>
    </footer>
  )
}

export default FooterComponent
