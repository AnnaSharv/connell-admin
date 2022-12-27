import React, { useState, useEffect, useRef } from "react";
import { DeleteOutlined, MoreOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Spin, Button } from "antd";
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
import { doc,  setDoc, getDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";


import { storage } from "../pages/firebase";
import { db } from "../pages/firebase";
import { motion } from "framer-motion";
import { uploadImageAsPromise, deleteFromStorage } from "./c";
import { MotionConfig } from "framer-motion"
import ImgPlaceholder from '../assets/imgplaceholder.png'
import ProgressBar from "./Progress";
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
  const [open, setOpen] = useState(false);
  const prev = useRef();
  const [num, setnum] = useState(null);
  const [currentImg, setCurrentImg] = useState({
    img:null,
    id:null
  })
  const [isUploading, setIsUploading] = useState({
    status: false,
    progress: 0
  })
  const [blogsAll, setBlogsAll] = useState([]);
  const [loading, isLoading] = useState(false);
 

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

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ProgressBar data={isUploading}/>
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
            uploadImageAsPromise(imageFile, isLoading, "gallery", setIsUploading, isUploading);
          }
       
        
         }
        }}
      />
   

        <Image
            preview={false}
            src={"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
            hidden={isUploading.status ? false : true}
          />
        <Image.PreviewGroup >
   
          {blogsAll.length > 0 &&
         
            blogsAll.map((blog, i) => {
              return (
                <motion.div layout className="x" key={i} style={{"position": "relative"}} >
                 <div type="primary" className="gallery-action-btn btn btn-danger" onClick={() => {
                  showModal()
                  setCurrentImg({...currentImg, img:blog.blog_image_name, id:blog.id})
                 }}>  <DeleteOutlined /> Delete </div>

                 <Modal
                  style={{"boxShadow": "none"}}
                  title={`Delete ${currentImg.img} ?`}
                  open={open}
                  onOk={() => {
                    hideModal()
                     deleteFromStorage(currentImg.img)
                      async function del() {
                        await deleteDoc(doc(db, "images", currentImg.id));
                      }
                      del()
                  }}
                  
                  onCancel={hideModal}
                  okText="Delete"
                  cancelText="Cancel"
                  >
                    <p>This action will delete file permanently</p>
                 </Modal>

                  <Image
                    preview={{
                      maskClassName: "string",
                      mask: <>
                      <div className="button btn btn-primary gallery-action-btn"><EyeOutlined /> Preview</div>
                      </>,
                      maskClassName: "mask-info"
                    }}
                    src={blog.blog_image}
                    key={i}
                    title={blog.blog_image_name}
                    loading="lazy"
                    placeholder={
                      <Image
                        preview={false}
                        src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                        width={200}
                      />
                    }
                  />
                </motion.div>
              );
            })}
    
        </Image.PreviewGroup>
     
    </div>
    </>
  );
};
export default Gallery;
