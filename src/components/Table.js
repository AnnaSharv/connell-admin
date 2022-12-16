import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, Tag, Switch,Dropdown, Space, Typography, Skeleton, Menu, message, Button } from 'antd';
import { uuidv4 as uuid } from 'uuid';
import qs from 'qs';
import { db } from '../pages/firebase';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import Copy from '../assets/icons/copy.svg'
import Dots from '../assets/icons/dots.svg'
import ModalDelete from './modalDelete';
import ModalDuplicate from './modalDuplicate';






const MyTable = ({blogsAll, setBlogsAll, cat, filter}) => {
  
  const {pathname} = useLocation()
  const [crec, setcrec] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
const [bt, sbt] = useState(blogsAll)
  const success = (data) => {
    async function copyTextToClipboard() {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(data);
      } else {
        return document.execCommand('copy', true, data);
      }
    }
    copyTextToClipboard()

  
    messageApi.open({
      type: 'success',
      content: 'Copied',
    });
  };

let convertTimeStamp = (timeStamp) => {

  var diff = Date.now() - timeStamp;
  var seconds = Math.floor(diff / 1000),
      minutes = Math.floor(seconds / 60),
      hours   = Math.floor(minutes / 60),
      days    = Math.floor(hours / 24),
      months  = Math.floor(days / 30),
      years   = Math.floor(days / 365);
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
      days %= 30;
      months %= 12;
 

    
  return (
    <>
      {months > 1 &&  <span>{months} month ago</span>}
      {days >= 1 &&  <span>{days} d ago</span>}
      {months === 0 && days === 0 && hours !== 0 && <span>{hours} h ago</span>}
      {months === 0 && days === 0 && hours === 0 && minutes > 0 &&<span>{minutes} mins {seconds} sec ago</span>}
      {months === 0 && days === 0 && hours === 0 && minutes === 0 && <span> {seconds} s ago</span>}
    </>
  );

 
}

  const handleStatusChange = async (record) => {
    const doc_Status_ref = doc(db, cat, record.id);


if (cat === "blogs") {
    
    if(record.blog_status === "active") {
      await updateDoc(doc_Status_ref, {
        blog_status: "archived"
      });
    }
    if(record.blog_status === "archived") {
      await updateDoc(doc_Status_ref, {
        blog_status: "active"
      });
    }

}
if (cat === "transactions") {

if(record.transactions_status === "active") {
  await updateDoc(doc_Status_ref, {
    transactions_status: "archived"
  });
}
if(record.transactions_status === "archived") {
  await updateDoc(doc_Status_ref, {
    transactions_status: "active"
  });
}
} 

//  NO REAL TIME
    // if(record.data.blog_status === "archived") {
    //   await updateDoc(doc_Status_ref, {
    //     blog_status: "active"
    //   });
    //   //window.location.reload()
    // }
   
  }
 
 let c = 1
 let columns;

  if (cat === "blogs") {
    columns = [
      {
        title: 'ID',
        // dataIndex: 'id',
        width: "7%",
        render: (data) => {
        
          return <span>{c++}</span>
        },
      },
      {
        title: 'Name',
        // sorter: true,
        render: (data) => <Link to={`/bloginside/edit/blog_id=${data.id}`} className={data?.blog_title?.length > 35 ? "text-elipse" : null}> {data.blog_title} </Link> ,
        width: "25%",
        ellipsis: {
            showTitle: false,
          }
      },
      {
        title: 'Link',
        dataIndex:  "blog_permalink",
        width: "7%",
        // sorter:true,
        render: (data) => <div onClick={() => success(data)} style={{"cursor":"pointer"}}> {contextHolder} <img src={Copy} /></div> 
      },
      {
        title: 'Type',
        dataIndex: "blog_type",
        render: (data) => <div className='table-blog_type'>  {data} </div> 
      },
      {
        title: 'Status',
        dataIndex: "blog_status",
        // sorter:true,
        render: (_) => (
            <>
              {/* {tags.map((tag) => {
                return (
                  <Tag key={tag} className={tag == "active" ? "list_status lsactive" : "archived" ? "list_status lsarchived" : "list_status ls404"}>
                    {tag}
                  </Tag>
                );
              })} */}
              <Tag className={_ == "active" ? "list_status lsactive" : "archived" ? "list_status lsarchived" : "list_status ls404"}>{_}</Tag>
            </>
          ),
      },
      {
        title: 'Create date',
        dataIndex: "blog_date",
      },
      {
        title: 'Update date',
         dataIndex: "timeStamp",
     
        render: (data) => <div> {convertTimeStamp(data)} </div>,
      },
      {
        title: 'Settings',
        dataIndex:  "blog_status",
        render: (_, record) => <div>
        <Switch defaultChecked={record.blog_status == "active" ? true : false} size="small" style={{"marginRight" : "30px"}}
        onChange={() =>  handleStatusChange(record)}
        />
        <Dropdown
        
         dropdownRender={() => (
           <div className="dropdown-content my-dropdown">
          
            <Menu>
              <Menu.Item key="ad" className='my-dropdown-list-item' onClick={() => handleStatusChange(record)}>Activate/Deactivate</Menu.Item>
              <Menu.Item key="dupl" className='my-dropdown-list-item'>
                 <ModalDuplicate record={record} dbName={"blogs"} db={blogsAll} />
              </Menu.Item>
              <Menu.Item key="del" className='my-dropdown-list-item'>
                <ModalDelete docId={record.id} dbName={"blogs"} db={blogsAll} />
              </Menu.Item>
            </Menu>
         
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
           <img src={Dots} />
          </Space>
        </a>
      </Dropdown>
        </div> 
      },
   
    ];
  }
  if (cat === "transactions") {
    columns = [
      {
        title: 'ID',
        // dataIndex: 'id',
        // width: "7%",
        render: (data) => {
        
          return <span>{c++}</span>
        },
      },
      {
        title: 'Image',
        // sorter:true,
        render: (data) => <div style={{"cursor":"pointer"}}> {contextHolder} <img src={data.transactions_image} width="50px"/></div>, 
        responsive: ['sm']
      },
      {
        title: 'Year',
        // sorter: true,
        render: (data) => <span>{data.transactions_year}</span> ,
  
        ellipsis: {
            showTitle: false,
          }
      },
      {
        title: 'Description',
        // width: "30%",
        render: (data) => <Link  to={`/addTransaction/edit/transaction_id=${data.id}`}  className={data?.transactions_title?.length >= 35 ? "text-elipse" : null}>  {data.transactions_title} </Link> 
      },
      {
        title: 'Create date',
        render: (data) => <div>  {data.transactions_date} </div> 
      },
      {
        title: 'Update date',
         dataIndex: "timeStamp",
     
        render: (data) => <div> {convertTimeStamp(data)} </div>,
      },
      {
        title: 'Settings',
        dataIndex:  "transactions_status",
        render: (_, record) => <div>
        <Switch defaultChecked={record.transactions_status == "active" ? true : false} size="small" style={{"marginRight" : "30px"}}
        onChange={() =>  handleStatusChange(record)}
        />
        <Dropdown
        
         dropdownRender={() => (
           <div className="dropdown-content my-dropdown">
          
            <Menu>
              <Menu.Item key="ad"  onClick={() => handleStatusChange(record)}>Activate/Deactivate</Menu.Item>
              <Menu.Item key="dupl">
                 <ModalDuplicate record={record} dbName={"transactions"} db={blogsAll} />
              </Menu.Item>
              <Menu.Item key="del">
                <ModalDelete docId={record.id} dbName={"transactions"} db={blogsAll} />
              </Menu.Item>
            </Menu>
         
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
           <img src={Dots} />
          </Space>
        </a>
      </Dropdown>
        </div> 
      },
   
    ];
  }
 
    



  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };




  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id + Math.random()}
        dataSource={ blogsAll || null}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      /> 
    </>
    
  );
};
export default MyTable;