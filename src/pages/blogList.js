import React, { useEffect, useState } from "react";
import Header from "../components/Blogheader.js";
import MyTable from "../components/Table.js";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

import { db } from "../pages/firebase";
import TableDraggable from "../components/TableDraggable.js";




//{blogsAll, setmyQuery, myQuery}
function BlogList(props) {
  const { pathname } = useLocation();
  const [blogsAll, setBlogsAll] = useState([]);
  const [blogsTransactions, setBlogsTransactions] = useState([]);
  const [myQuery, setmyQuery] = useState(pathname);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let blogsAll_temp = [];
    console.log("startttt")
    setLoading(true)
    let locationRaw = pathname.split("/");
    locationRaw = locationRaw[locationRaw.length - 1];

    let i = 1;


    let category;
    if(props.cat === "blogs") {
      category = "blogs"
    }
    if(props.cat === "team") {
      category = "team"
    }
    // !!!
    if(props.cat === "transactions") {
      category = "transactions"
    }
    if(props.cat === "gallery") {
      category = "gallery"
    }


    const blogsRef = collection(db, category);
    let queryAll = query(blogsRef, orderBy("timeStamp", "desc"));

    if (myQuery.includes("all") || myQuery.includes("transactions")) {
      queryAll = query(blogsRef, orderBy("timeStamp", "desc"));
    }
    if (myQuery.includes("awards")) {
      queryAll = query(
        blogsRef,
        orderBy("timeStamp", "desc"),
        where("blog_type", "array-contains", "awards")
      );
    }
    if (myQuery.includes("deals")) {
      queryAll = query(
        blogsRef,
        orderBy("timeStamp", "desc"),
        where("blog_type", "array-contains", "deals")
      );
    }
    if (myQuery.includes("articles")) {
      queryAll = query(
        blogsRef,
        orderBy("timeStamp", "desc"),
        where("blog_type", "array-contains", "articles")
      );
    }



    // const getBlogs = async () => {
    //   const querySnapshot = await getDocs(queryAll);
    //   querySnapshot.forEach((doc) => {
    //     blogsAll_temp.push({
    //       index: i++,
    //       id: doc.id,
    //       data: doc.data(),
    //       tags: [doc.data().blog_status],
    //     });
    //   });

    //   setBlogsAll(blogsAll_temp);
      
    // };

    // getBlogs();
   


      const unsub = onSnapshot(queryAll, (snapShot) => {
        let list = [];
        
        snapShot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})  
        })
        setBlogsAll(list)
        setLoading(false)
        console.log("finishhhh")

      });
    
      return () =>  unsub() 
 
  }, [pathname]);




  //TRANSACTIONS AR CHANS ROCA MYQUERY IS ACTIVE

  useEffect(() => {


    let locationRaw = pathname.split("/");
    locationRaw = locationRaw[locationRaw.length - 1];

    let i = 1;

    const blogsRef = collection(db, "blogs");
    let queryAll = query(blogsRef, orderBy("timeStamp", "desc"));

      // FILTERS
if (pathname.includes("bloglist")) {
  if (myQuery.includes("archived")&& locationRaw !== "all") {
        queryAll = query(
          blogsRef,
          orderBy("timeStamp", "desc"),
          where("blog_status", "==", "archived"),
          where("blog_type", "array-contains", locationRaw)
        );
      }
      if (myQuery.includes("archived")&& locationRaw === "all") {
        queryAll = query(
          blogsRef,
          orderBy("timeStamp", "desc"),
          where("blog_status", "==", "archived")
        );
      }

      if (myQuery.includes("active") && locationRaw !== "all") {
        queryAll = query(
          blogsRef,
          orderBy("timeStamp", "desc"),
          where("blog_status", "==", "active"),
          where("blog_type", "array-contains", locationRaw)
        );
      }
      if (myQuery.includes("active") && locationRaw === "all") {
        queryAll = query(
          blogsRef,
          orderBy("timeStamp", "desc"),
          where("blog_status", "==", "active"),
        );
      }

      if (myQuery.includes("clear") && locationRaw !== "all") {
        queryAll = query(blogsRef,orderBy("timeStamp", "desc"),where("blog_type", "array-contains", locationRaw));
      }

      if (myQuery.includes("clear") && locationRaw === "all") {
        queryAll = query(blogsRef,orderBy("timeStamp", "desc")
      )}


    const unsub = onSnapshot(queryAll, (snapShot) => {
      let list = [];

      snapShot.docs.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()})  
      })
      setBlogsAll(list)
    });


    return () =>  unsub() 
}
      
  }, [myQuery])






  return (
    <>
      <div>
        <Header
          title="Blogs"
          hasCategories={props.hasCategories}
          category={props.cat}
          page="blogs"
          blogsAll={blogsAll}
          setmyQuery={setmyQuery}
          myQuery={myQuery}
          setFilterKeyword={setFilterKeyword}
        />

        {props.cat === "team" && 
        <TableDraggable blogsAll={blogsAll} setBlogsAll={setBlogsAll} loading={loading}/>
        }
     
        
        {props.cat === "blogs" &&
        <MyTable blogsAll={blogsAll} setBlogsAll={setBlogsAll} cat={props.cat} loading={loading}/>
        }
       
       {
        props.cat === "transactions" &&
          <MyTable blogsAll={blogsAll} setBlogsAll={blogsTransactions} cat={props.cat} filter={"transactions"} loading={loading}/>
       }
       
      </div>
    </>
  );
}

export default BlogList;
