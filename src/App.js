

import React, {CSSProperties} from 'react'
import { useEffect, useState, useRef, useContext } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "./pages/firebase";
//pages

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

//Context
import { UserContext } from './pages/UserContext';
import { AuthContextProvider, UserAuth, DataContextProvider } from './context';

import Pages from '../src/pages/pages.js'
import Login from '../src/pages/login.js'
import Gallery from '../src/pages/gallery.js'

function App() {
  const navigate = useNavigate()
 const [userStatus, setUserStatus] = useState(false)
 const [loading, setLoading] = useState(false)
  // const [blogslength, setblogsLength] = useState({
  //   blogs: "7",
  //   gallery: "7",
  //   members: "7",
  //   pages: "7",
  //   transactions: "7"
  // })
  const [blogslength, setblogsLength] = useState(null)

  const ProtectedRoute = ({ children }) => {
    return userStatus ? children : <Navigate to="/login" />;
  };



useEffect(() => {
  setLoading(true)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true)
      navigate()
    } else {
      setUserStatus(false)
    }
    setLoading(false)
  });
}, [])


  return (
    <UserContext.Provider value={{userStatus, setUserStatus}}>
      <AuthContextProvider>
        <DataContextProvider>
          {loading ?  <GridLoader
          color="#1D4696" 
          cssOverride={{
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
          :
          <div className="App">
            {userStatus ? 
            <Sidebar blogslength={blogslength}>
            <Routes>
              {/* <Route path="/" element={<Navigate to={"window.location.href"} />}/> */}
              <Route path="/bloglist/*"  element={<ProtectedRoute> <BlogList cat={"blogs"} hasCategories={true} setblogsLength={setblogsLength} blogslength={blogslength}/> </ProtectedRoute>}/>
              <Route path="/blogInside/*"  element={ <ProtectedRoute> <BlogInside cat={"blogs"}/> </ProtectedRoute> } />
              <Route path="/members"  element={  <ProtectedRoute> <BlogList  cat={"team"} title={"Team members"} hasCategories={false} setblogsLength={setblogsLength} blogslength={blogslength}/> </ProtectedRoute>}/>
              <Route path="/members/*"  element={ <ProtectedRoute> <BlogInside cat={"team"} /> </ProtectedRoute> } /> 
              <Route path="/addMember"  element={ <ProtectedRoute> <BlogInside cat={"team"} /> </ProtectedRoute> } />
              <Route path="/transactions/*"  element={ <ProtectedRoute> <BlogList  cat={"transactions"} title={"Recent transactions"} hasCategories={false} setblogsLength={setblogsLength} blogslength={blogslength}/>  </ProtectedRoute> } />
              <Route path="/addTransaction/*"  element={ <ProtectedRoute> <BlogInside cat={"transactions"} />  </ProtectedRoute> } />
              <Route path="/pages" element={ <ProtectedRoute> <Pages /> </ProtectedRoute> } />
              <Route path="/gallery" element={ <ProtectedRoute>  <Gallery  setblogsLength={setblogsLength} blogslength={blogslength}/> </ProtectedRoute> } />
              




              {/* legacy IGNORE !!! */}
              {/* <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>
              <Route path="/newslist" element={ <ProtectedRoute> <NewsList news={news} /> </ProtectedRoute>} />
              <Route path="/edit" element={ <ProtectedRoute>  <Edit /> </ProtectedRoute>} /> */}
            </Routes>
          </ Sidebar>
        : 
        <Routes>
            <Route path='login' element={<Login />}/>
            <Route path="*" element={<Navigate to="/login"  />} />
        </Routes> 
      
        }
          </div>}
        </DataContextProvider>
      </AuthContextProvider>
    </UserContext.Provider>
   
  );
}

export default App;
