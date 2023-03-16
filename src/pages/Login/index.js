import React, {useContext,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Style.css"
import { AuthContext } from '../../context/authContext'

export default function Login () {
  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const {login} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(input)
      navigate("/")
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='login'>
      <h1 className='h1'>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className='input' type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input className='input' type="password" placeholder='Password' name='password' onChange={handleChange}/>
        <button className='login-btn'>Login</button>
        {err && <p className='p-text'>{err}</p>}
        <span className='span'>Create a new account? <Link to='/signup'>Sign up</Link></span>
        
      </form>
    </div>
  )
}
