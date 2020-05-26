import React from 'react'
import '../../styles/header.scss'
const HeaderComponent = props => {
  return (
    <header className='header'>
      <nav>
        <ul className='header__nav'>
          <li>
            <div className='logo'>Y</div>
          </li>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/news'>News</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderComponent
