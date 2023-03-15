import React from 'react';
import "./App.css"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import Single from "./pages/Single"
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/upload",
        element: <Post />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
