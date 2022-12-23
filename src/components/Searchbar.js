import React, {useEffect, useState} from 'react'
import Searchicon from "../assets/icons/search.svg"
import {AllData} from '../context.js'
import parse from 'html-react-parser';
import {Select, Avatar, Divider, List, Skeleton} from 'antd'

import InfiniteScroll from 'react-infinite-scroll-component';
function Searchbar() {
  const rawData = AllData()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [fdata, setfData] = useState([])
  const [searchword, setSearchword] = useState(null)



  useEffect(() => {
    console.log(rawData, "contextt")
    setData(rawData.data)
  }, [rawData])


  
  return (
    <div className='searchBar'>
      <div style={{"position":"relative"}}>
        <img src={Searchicon} width={16} alt="search_icon" />
        <input placeholder='Search in Admin panel' type="text" onChange={(e) => {
          setSearchword(e.target.value)
          for (const val of data) {
            
          }
        }}/>
      </div>
        

      {/*   <ul>
          {
            data?.map((item,i) => {
              return <li key={i}>
                <div>{item.blog_title}</div>
                <div>{parse(item.blog_body)}</div>
              </li>
            })
          }
        </ul> */}
          {/* <Select
          bordered={false}
              showSearch
              style={{
                width: "100%",
              }}
              placeholder="Search in Admin panel"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label_t ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
              
                (optionA?.label_t ?? '').toLowerCase().localeCompare((optionB?.label_t ?? '').toLowerCase())
              }
            
              options={data.map((item,i) => ({
                label: <div> 
                          <h6>{item.blog_title}</h6>
                          <div>{parse(item.blog_body)}</div>   
                      </div>,
                label_t: item.blog_title,
                label_b: item.blog_body,
                value: i,
              }))}
          /> */}



<div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: 'auto',
        marginTop: "5px",
        boxShadow: "0 0 20px 0px #d9d9d9",
        display: searchword ? "block" : "none"
      }}
      
    >
      <InfiniteScroll
        dataLength={data.length}
       // next={loadMoreData}
        // hasMore={data.length > 5}
        loader={
          <Skeleton
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>No more posts match your search</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
        itemLayout="horizontal"
          dataSource={data}
          renderItem={(item,i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={<a href="https://ant.design" className='text-elipse'>{item.blog_title || item.member_name}</a>}
                description={<div className='text-elipse'>{item.blog_body || item.member_description}</div>}
              />
              {/* <div>Content</div> */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </div>
   
  )
}

export default Searchbar