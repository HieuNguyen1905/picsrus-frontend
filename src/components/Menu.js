import './Menu.css'
import React, {useEffect, useState } from 'react'
// import {Link} from 'react-router-dom'
import axios from "axios"

function Menu({gallery}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/post/?gallery=${gallery}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[gallery])

  return (
      <div className='menu-tab'>
        <h1>Other posts that you may like</h1>
        {posts.map(post=>(
          <div className='menu-tab-post' key={post.id}>
              <img alt='' src={post.img} />
              <h2>{post.title}</h2>
              <button className='menu-btn'>Read More</button>
          </div>
        ))}
      </div>
  )
}

export default Menu