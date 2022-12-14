import React, {useEffect, useState} from 'react'

import Blogheader from '../components/Blogheader'
import Blogform from '../components/Blogform'
import BlogformTeam from '../components/BlogformTeam'
import BlogformTransactions from '../components/BlogformTransactions'

function Bloginside({cat}) {
  const [permaLink, setPermaLink] = useState("")

  return (
    <div>
        {cat == "blogs" && 
        <>
          <Blogheader title="Add Blogs" permaLink={permaLink} hasPermaLink={true} cat={cat}/>
          <Blogform setPermaLink={setPermaLink} permaLink={permaLink} cat={cat}/>
        </>
        }

        {cat == "team" &&   
        <>
         <Blogheader title="Add Team memeber" cat={cat}/>
         <BlogformTeam cat={cat}/>
        </>
        }

        {cat == "transactions" &&   
        <>
         <Blogheader title="Add transactions" cat={cat}/>
         <BlogformTransactions cat={cat}/>
        </>
        }
      
    </div>
  )
}

export default Bloginside