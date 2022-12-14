import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid'
import { collection, getDocs } from "firebase/firestore";
import { Formik, Field, Form, ErrorMessage, useField, useFormikContext } from 'formik';

import { db } from '../pages/firebase';
import { Select } from 'antd';



function SelectwithSearch(props) {

  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props);



  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setFieldValue(props.name, value)
    props.setblogactivetitle?.(value)
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  
  return (
    <Select
    showSearch
    {...props}
    {...field}
    className="filter_w_search"
    placeholder="Select news"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={props.blogsnames}
  />
  )
}

export default SelectwithSearch