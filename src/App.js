

import React from 'react'
import { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./pages/firebase";
//pages

import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

import SignIn from "./pages/signIn";
import Dashboard from "./pages/dashboard";
import NewsList from "./pages/newslist";
import Edit from "./pages/edit";


// recent
import BlogList from './pages/blogList.js'
import BlogInside from './pages/bloginside'
import Sidebar from "./components/Sidebar";


import Pages from '../src/pages/pages.js'
import Gallery from '../src/pages/gallery.js'

function App() {
  let userStatus = true;
  // const [blogslength, setblogsLength] = useState({
  //   blogs: "7",
  //   gallery: "7",
  //   members: "7",
  //   pages: "7",
  //   transactions: "7"
  // })
  const [blogslength, setblogsLength] = useState(null)

  const ProtectedRoute = ({ children }) => {
    return userStatus ? children : <Navigate to="/" />;
  };




  return (
    <div className="App">
      <Sidebar blogslength={blogslength}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/bloglist/*"  element={ 
          <ProtectedRoute> 
            <BlogList cat={"blogs"} hasCategories={true} setblogsLength={setblogsLength} blogslength={blogslength}/> 
          </ProtectedRoute>}/>

          <Route path="/blogInside/*"  element={ <ProtectedRoute> <BlogInside cat={"blogs"}/> </ProtectedRoute> } />

          <Route path="/members"  element={ 
          <ProtectedRoute> 
            <BlogList  cat={"team"} title={"Team members"} hasCategories={false} setblogsLength={setblogsLength} blogslength={blogslength}/> 
          </ProtectedRoute>}/>
          <Route path="/members/*"  element={ <ProtectedRoute> <BlogInside cat={"team"} /> </ProtectedRoute> } /> 
          <Route path="/addMember"  element={ <ProtectedRoute> <BlogInside cat={"team"} /> </ProtectedRoute> } />

          <Route path="/transactions/*"  element={ <ProtectedRoute> 
            <BlogList  cat={"transactions"} title={"Recent transactions"} hasCategories={false} setblogsLength={setblogsLength} blogslength={blogslength}/> 
          </ProtectedRoute> } />
          <Route path="/addTransaction/*"  element={ <ProtectedRoute> <BlogInside cat={"transactions"} />  </ProtectedRoute> } />
         

          <Route path="/pages" element={ <ProtectedRoute> <Pages /> </ProtectedRoute> } />
          <Route path="/gallery" element={ <ProtectedRoute>  <Gallery  setblogsLength={setblogsLength} blogslength={blogslength}/> </ProtectedRoute> } />
          




          {/* legacy IGNORE !!! */}
          {/* <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>
          <Route path="/newslist" element={ <ProtectedRoute> <NewsList news={news} /> </ProtectedRoute>} />
          <Route path="/edit" element={ <ProtectedRoute>  <Edit /> </ProtectedRoute>} /> */}
        </Routes>
      </ Sidebar>
    </div>
  );
}

export default App;
