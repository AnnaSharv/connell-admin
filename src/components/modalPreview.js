import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import parse from 'html-react-parser';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ModalPreview = ({vals, img, cat, images}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="button button-no_active"
        onClick={() => setOpen(true)}
      >
        Preview
      </button>
      <Modal
        title="Blog preview"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {cat === "team" ? (
          <>
            <h1>{vals.member_name}</h1>
            <p>{vals.member_contact}</p>
             {img && img.firebaseLink.length !== 0  && <img src={img.firebaseLink} width="220px" height="auto" alt="blog_img" />} 
            <div>{parse(vals.member_description)}</div>
          </>
        ) :
        (
          <>
            <h1>{vals.blog_title}</h1>
            <p>{vals.blog_date}</p>
            {img && img.firebaseLink.length !== 0  && <img src={img.firebaseLink} width="100%" alt="blog_img" />}


            {images.length > 0 &&
            <Carousel className='preview-carousel' width="100%">
              {
                images.map((singleImg,i) => {
                  return (
                    <img src={singleImg.blog_image} key={i} alt={singleImg.blog_image_name}/>
                  );
                })
              }
            </Carousel>
            }

            <div>{parse(vals.blog_body)}</div>
          </>
        )
        }
      </Modal>
    </>
  );
};

export default ModalPreview