import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Editlogo from "../assets/icons/edit.svg"

import { motion } from "framer-motion"


function Blogheader(props) {
const {pathname} = useLocation()

const [check, setCheck] = useState({
  active: false,
  archived: false
})



useEffect(() => {
 
  if(check.active) {
    props.setmyQuery?.("active")
  }
  if(check.archived) {
    props.setmyQuery?.("archived")
  }
  if(check.active && check.archived || !check.active && !check.archived) {
    props.setmyQuery?.("clear")
  }
}, [check, pathname])




 
  return (
    <>
    {props.cat === "gallery" && (
        <div className="blog_header justify-content-between">
        <h1>{props.title}</h1>
      </div>
    )}
      {props.cat === "transactions" && (
        <div className="blog_header justify-content-between">
         <h1>{props.title}</h1>
       </div>
      )}
      {props.category === "transactions" && (
        <div className="blog_header justify-content-between">
          <h1>Recent transactions</h1>
          <Link to="/addTransaction">
            <button type="button" className="button-publish w-auto">
              Create new
            </button>
          </Link>
        </div>
      )}
      {props.cat === "team" && (
        <div className="blog_header justify-content-between">
          <h1>{props.title}</h1>
        </div>
      )}
      {props.category === "team" && (
        <div className="blog_header justify-content-between">
          <h1>Team members</h1>
          <Link to="/addMember">
            <button type="button" className="button-publish w-auto">
              Create new
            </button>
          </Link>
        </div>
      )}

      {props.hasPermaLink && (
        <div className="blog_header">
          <h1>{props.title}</h1>

          {props.permaLink?.length > 0 == true ? (
            <>
              <span>
                Permalink:
                <a
                  href={props.permaLink}
                  target="_blank"
                  title={props.permaLink}
                >
                  {props.permaLink}
                </a>
                <img src={Editlogo} width="16px" alt="edit_icon" />
              </span>
            </>
          ) : (
            <>
              <span>
                Permalink:
                <span className="no-link">
                  new link generates while typing blog title
                </span>
                <img src={Editlogo} width="16px" alt="edit_icon" />
              </span>
            </>
          )}
        </div>
      )}
      {props.hasCategories && props.page === "blogs" && (
        <div className="blog_header blog_header_bloglist">
          <h1>{props.title}</h1>
          <ul>
            <div>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to="all">
                  <button
                    type="button"
                    className={
                      pathname.includes("all")
                        ? "button-publish link-active"
                        : "button-no-publish"
                    }
                    onClick={() => props.setmyQuery("all")}
                  >
                    All <span>&#40;{props.blogsAll.length || 0}&#41;</span>
                  </button>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to="awards">
                  <button
                    type="button"
                    className={
                      pathname.includes("awards")
                        ? "button-publish link-active"
                        : "button-no-publish"
                    }
                    onClick={() => props.setmyQuery("awards")}
                  >
                    Awards <span>&#40;{props.blogsAll.length || 0}&#41;</span>
                  </button>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to="articles">
                  <button
                    type="button"
                    className={
                      pathname.includes("articles")
                        ? "button-publish link-active"
                        : "button-no-publish"
                    }
                    onClick={() => props.setmyQuery("articles")}
                  >
                    Articles <span>&#40;{props.blogsAll.length || 0}&#41;</span>
                  </button>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to="deals">
                  <button
                    type="button"
                    className={
                      pathname.includes("deals")
                        ? "button-publish link-active"
                        : "button-no-publish"
                    }
                    onClick={() => props.setmyQuery("deals")}
                  >
                    Deals <span>&#40;{props.blogsAll.length || 0}&#41;</span>
                  </button>
                </Link>
              </motion.li>
            </div>
            <div>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Checkbox
                  className="checkbox-active"
                  defaultChecked={check.active}
                  onChange={(e) => {
                    setCheck({
                      ...check,
                      active: !check.active,
                    });
                  }}
                >
                  Active
                </Checkbox>
              </motion.li>
              <motion.li
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Checkbox
                  className="checkbox-archive"
                  defaultChecked={check.archived}
                  onChange={(e) => {
                    setCheck({
                      ...check,
                      archived: !check.archived,
                    });
                  }}
                >
                  Archive
                </Checkbox>
              </motion.li>
            </div>
          </ul>
          <Link to="/bloginside" style={{ overflow: "initial" }}>
            <button type="button" className="button-publish" id="cr">
              Create new
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Blogheader