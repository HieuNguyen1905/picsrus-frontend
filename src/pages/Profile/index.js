import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Style.css'
import axios from "axios"
import { AuthContext } from '../../context/authContext'

export default function Profile() {
    const [posts, setPosts] = useState([])
    const [displayName, setDisplayName] = useState("")
    const location = useLocation();
    const userId = location.pathname.split('/')[2]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/user/${userId}`)
                setPosts(res.data.Posts)
                setDisplayName(res.data.username)
                console.log(posts)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [userId])


    const { currentUser } = useContext(AuthContext)

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='home'>
            <h1>{displayName}</h1>
            <h3>Pictures: {posts.length}</h3>
            <div className='posts'>
                {posts.map((post) => (
                    <div className='post' key={post.id}>
                        <div className='img'>
                            <img alt='' src={post.img} />
                        </div>
                        <div className='content'>
                            {currentUser ? <Link className='link' to={`/post/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link> : <h2 className='link'>{post.title}</h2>}
                            <p>{getText(post.description)}</p>
                            {!currentUser ? <Link to={"/login"}><button className='menu-btn'>Log in to read more</button></Link> : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}