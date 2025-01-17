import React from "react"
import { MdTravelExplore } from "react-icons/md"  // Already used in Navbar
import 'font-awesome/css/font-awesome.min.css';

import './Head.css'  // Import the corresponding CSS file

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1><MdTravelExplore className='icon'/>  Mahaweli Tours</h1>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
