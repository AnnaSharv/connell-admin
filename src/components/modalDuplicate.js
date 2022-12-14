import React, { useState } from 'react'
import {db} from '../pages/firebase'
import { doc, addDoc, deleteDoc, collection, updateDoc, increment } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

function ModalDuplicate({record, dbName, permalink}) {
    const [myid, setmyid] = useState(uuid())
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const adminDomain = "http://localhost:3000"
  return (
    <>
      <button type='button' className='button button-no_outline_primary' onClick={() => setOpen(true)}>
        Duplicate
      </button>
      <Modal
        title="Duplicate?"
        centered
        open={open}
        onOk={() => {
          setOpen(false)
          const dup = async () => {
// record.data replaced with record.

let data;

if (dbName === "team") {
  data = {
    timeStamp: Date.now(),
    draft_id: record.draft_id,
    member_name: record.member_name,
    member_contact: record.member_contact,
    member_description: record.member_description,
    blog_image: record.blog_image,
    blog_image_name: record.blog_image_name,
    blog_image_size: record.blog_image_size,
    member_status: record.member_status,
    member_date: record.member_date,
  }
}

if (dbName === "blogs") {
  data = {
    timeStamp: Date.now(),
    draft_id: record.draft_id,
    blog_title: record.blog_title,
    blog_body: record.blog_body ,
    imgArr: record.imgArr,
    blog_status: record.blog_status,
    blog_type: record.blog_type,
    blog_date: record.blog_date,
    blog_permalink: record.blog_permalink
  }
}
if (dbName === "transactions") {
  data = {
    timeStamp: Date.now(),
    transactions_date:  record.transactions_date,
    draft_id: record.draft_id,
    transactions_title:  record.transactions_title,
    transactions_status:  record.transactions_status,
    transactions_year:  record.transactions_year,
    transactions_image:  record.transactions_image,
    transactions_image_name:  record.transactions_image_name,
    transactions_image_size:  record.transactions_image_size
  }
}
            try {
                const docRef = await addDoc(collection(db, dbName), data);
                const countRef = doc(db, "length", "length");
                await updateDoc(countRef, {
                    [dbName]: increment(1)
                });
                 //docRef()
                 //window.location.href = adminDomain + "/bloglist/all";
                console.log("DOCUMENT WRITTEN")
              } catch (e) {
                console.error("Error adding document: ", e);
              }
          
          }
          dup()
          
         
         // navigate(adminDomain + "/bloglist/all")
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p> Document will be duplicated </p>
      </Modal>
    </>
  );
}

export default ModalDuplicate