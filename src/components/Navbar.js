import React, { useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext)
  const gallery = (useLocation().search).split("=")[1]
  return (
    <div className='navbar'>
        <div className='nav-container'>
            <div className='logo'>
              <Link to={"/?gallery=technology"}>
              <img alt='' className ="img-logo" src={require('../Picture/logo.png')}/>
              </Link>
            </div>
            <div className='links'>
              <Link className={gallery === "technology"? 'link-active': 'link'}to="/?gallery=technology">Technology</Link>
              <Link className={gallery === "art"? 'link-active': 'link'}to="/?gallery=art">Art</Link>
              <Link className={gallery === "meme"? 'link-active': 'link'}to="/?gallery=meme">Meme</Link>
              <Link className={gallery === "gaming"? 'link-active': 'link'}to="/?gallery=gaming">Gaming</Link>
              <Link className={gallery === "movie"? 'link-active': 'link'}to="/?gallery=movie">Movie</Link>
              <Link className={gallery === "food"? 'link-active': 'link'}to="/?gallery=food">Food</Link>
              <Link className={gallery === "travel"? 'link-active': 'link'}to="/?gallery=travel">Travel</Link>
              {currentUser?<Link to={`/profile/${currentUser.user.dataValues.id}`} className='span-nav'>{currentUser?.user.dataValues.username}</Link>:null}
              {currentUser?<Link to="/?gallery=technology" onClick={logout} className='span-nav'>Logout</Link> : <Link className='span-nav' to="/login">Login</Link>}
              <span className='post-btn'>
              {currentUser?<Link to="/upload" className='link'>Post</Link>:<Link to="/login" className='link'>Post</Link>}
              </span>
            </div>
        </div>

    </div>
  )
}

export default Navbar
