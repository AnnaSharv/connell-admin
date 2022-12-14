import React, { useState, useEffect, useRef } from "react";
import { DeleteOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Spin } from "antd";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../pages/firebase";
import { db } from "../pages/firebase";
import { motion } from "framer-motion";
import { uploadImageAsPromise } from "./c";
import { MotionConfig } from "framer-motion";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Gallery = ({ setblogsLength, blogslength}) => {
  const types = ['image/png', 'image/jpeg']
  const galleryImg = useRef();
  const prev = useRef();
  const [num, setnum] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [blogsAll, setBlogsAll] = useState([]);
  const [loading, isLoading] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  useEffect(() => {
    const blogsRef = collection(db, "images");
    let queryAll = query(blogsRef, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(queryAll, (snapShot) => {
      let list = [];

      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setBlogsAll(list);
    });
   
 
    return () => unsub();
  }, []);



  return (
    <div className="gallery-wrapper">
      <div className="upload-button" onClick={() => galleryImg.current.click()}>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
      <input
        type="file"
        ref={galleryImg}
        hidden
        multiple
        onChange={(e) => {
          setnum(e.target.files.length);
         if(e.target.files) {
          for (var i = 0; i < e.target.files.length; i++) {
            var imageFile = e.target.files[i];
            uploadImageAsPromise(imageFile, isLoading, "gallery");
          }
         }
        }}
      />
     
        <Image.PreviewGroup ref={prev}>
   

          {blogsAll.length > 0 &&
            blogsAll.map((blog, i) => {
              return (
                <motion.div layout className="x" key={i} style={{"position": "relative"}}>
                  {/* <div className="delete-icon-gallery">
                  <DeleteOutlined />
                   <span>Delete</span> 
                  </div> */}
                  
                  <Image
                    src={blog.blog_image}
                    key={i}
                    title={blog.blog_image_name}
                    loading="lazy"
                    placeholder={
                      <Image
                        preview={false}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        width={200}
                      />
                    }
                  />
                </motion.div>
              );
            })}
    
        </Image.PreviewGroup>
     
    </div>
  );
};
export default Gallery;
