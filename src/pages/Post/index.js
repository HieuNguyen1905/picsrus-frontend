import React, {useState} from 'react'
import './Style.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Post () {
  const state = useLocation().state
  const [value,setValue] = useState(state?.description || "")
  const [title, setTitle] = useState(state?.title || "")
  const [img, setImg] = useState(state?.img || "")
  const [gallery, setGallery] = useState(state?.gallery || "")
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(title === ""){
      return setError("Title can not be empty ❌")
    }else if(value === ""){
      return setError("Description can not be empty ❌")
    }else if(img === ""){
      return setError("Img URL can not be empty ❌")
    }else if(gallery === ""){
      return setError("Please choose the gallery of this photo ❌")
    }
    try{
      const savedToken = JSON.parse(localStorage.getItem("user")).token
      console.log(savedToken)
      state ? await axios.put(`https://picrsus.herokuapp.com/api/post/${state.id}`,{
        title,
        description:value,
        img,
        gallery},{
        headers: {
          Authorization:`Bearer ${savedToken}`
        }
      }) : await axios.post(`https://picrsus.herokuapp.com/api/post/`,{
        title,
        description:value,
        img,
        gallery},{
        headers: {
          Authorization:`Bearer ${savedToken}`
        }
      })
      return navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='write'>
      <div className='write-content'>
        <input className='input-content' value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className='edit-content'>
        <ReactQuill className='edit-c' theme="snow" value={value} onChange={setValue} />
        
        </div>
        <div><input className='input-url' value={img} placeholder='Image URL' onChange={e=>setImg(e.target.value)}/></div>
        {error && <h4 className='mess'>{error}</h4>}
      </div>
      <div className='items'>
        <div className='item-content'>
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Privacy:</b> Public
          </span>
          <span>
            <b>Drop a URL link to your image</b>
          </span>
          <br/>
          <div className='buttons'>
          <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className='item-content2'>
          <h1>Gallery</h1>
          <div className='cat'>
          <input checked={gallery === "technology"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="technology" id='technology'/>
          <label htmlFor="technology">Technology</label></div>
          <div className='cat'>
          <input checked={gallery === "art"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="art" id='art'/>
          <label htmlFor="art" >Art</label></div>
          <div className='cat'>
          <input checked={gallery === "meme"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="meme" id='meme'/>
          <label htmlFor="meme" >Meme</label></div>
          <div className='cat'>
          <input checked={gallery === "gaming"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="gaming" id='gaming'/>
          <label htmlFor="gaming" >Gaming</label></div>
          <div className='cat'>
          <input checked={gallery === "movie"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="movie" id='movie'/>
          <label htmlFor="movie" >Movie</label></div>
          <div className='cat'>
          <input checked={gallery === "food"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="food" id='food'/>
          <label htmlFor="food" >Food</label></div>
          <div className='cat'>
          <input checked={gallery === "travel"} onChange={e=>setGallery(e.target.value)} type="radio" name='gallery' className='input-gallery' value="travel" id='travel'/>
          <label htmlFor="travel" >Travel</label></div>
        </div>
      </div>
    </div>
  )
}