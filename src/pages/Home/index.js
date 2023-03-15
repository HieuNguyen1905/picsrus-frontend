import React, {useEffect, useState,useContext } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import './Style.css'
import axios from "axios"
import { AuthContext } from '../../context/authContext'

export default function Home () {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();
  const gallery = useLocation().search
  useEffect(() => {
    const fetchData = async()=>{
      try{
        if(!gallery){
          return navigate("/?gallery=technology")
        }
        const res = await axios.get(`http://localhost:3001/api/post${gallery}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [gallery])

  
  const {currentUser} = useContext(AuthContext)

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post)=>(
          <div className='post' key={post.id}>
            <div className='img'>
              <img alt='' src={post.img} />
            </div>
            <div className='content'>
            {currentUser?<Link className='link' to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>:<h2 className='link'>{post.title}</h2>}
            <p>{getText(post.description)}</p>
            {!currentUser? <Link to={"/login"}><button className='menu-btn'>Log in to read more</button></Link> : <Link to={`/post/${post.id}`}><button className='menu-btn'>Read more</button></Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

