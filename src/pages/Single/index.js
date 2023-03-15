import React, {useEffect, useState,useContext } from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import "./Single.css"
import Menu from '../../components/Menu'
import axios from "axios"
import moment from 'moment'
import { AuthContext } from '../../context/authContext'
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({})
  const [isReturn, setIsReturn] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split('/')[2]
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/post/${postId}`)
        setPost(res.data)
        setIsReturn(true)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[postId])

  const handleDelete = async() =>{
    try{
      const savedToken = JSON.parse(localStorage.getItem("user")).token
      console.log(savedToken)
      await axios.delete(`http://localhost:3001/api/post/${postId}`
      ,{
        headers: {
          Authorization:`Bearer ${savedToken}`
        }
    }
    )
      
      navigate("/?gallery=art")
    }catch(err){
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (<>
    {isReturn ? ( 
      <div className='single'>
      <div className='single-content'>
        <img alt='' src={post?.img} />

        <div className='user1'>
          {post.User.img && <img alt='' src={post.User.img} />}

          <div className='info'>
            <Link to={`/profile/${post.UserId}`}>
            <span className='span-single'>{post.User.username}</span>
            </Link>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.user.dataValues.username === post.User.username && (<div className='edit'>
            <Link to={`/upload?edit=2`} state={post}>
              <img alt='' src={require('../../Picture/edit.png')} />
            </Link>
              <img onClick={handleDelete} alt='' src={require('../../Picture/delete.png')} />
          </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>
        <Menu gallery={post.gallery}/>
    </div>):""}</>
  )
}

export default Single 