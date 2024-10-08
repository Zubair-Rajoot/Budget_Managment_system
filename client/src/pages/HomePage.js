import React, {useEffect, useState} from 'react'
import {Form, Input, message, Modal, Select, Table, DatePicker} from 'antd'
import Layout from '../components/Layout/Layout'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
import moment from "moment"
const { RangePicker } = DatePicker;


const HomePage = () => {
  const[showModal, setShowModal] = useState(false)
  const[loading, setLoading] = useState(false)
  const[allTransection, setAllTransection] = useState([])
  const[frequency,setFrequency] = useState('7')
  const[selectedDate, setSelecteddate] = useState([])
  const[type,setType] = useState('all')

  //TABLE DATA 
  const columns = [
    {
      title: 'Date',
      dataIndex : 'date',
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex : 'amount'
    },
    {
      title: 'Type',
      dataIndex : 'type'
    },
    {
      title: 'Category',
      dataIndex : 'category'
    },
    {
      title: 'Refrence',
      dataIndex : 'refrence'
    },
    {
      title: 'Description',
      dataIndex : 'description'
    },
    {
      title: 'Actions',
    },
  ]


  //GET ALL TRANSECTIONS 
  


  //useEffect hook 
  useEffect(()=>{
    const getAllTransection = async()=>{
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transections/get-transection', {userid: user._id,frequency,selectedDate,type})
        setLoading(false)
        setAllTransection(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('fetch issue with transection')
      }
    }
    getAllTransection()
  }, [frequency,selectedDate,type]);

  const handleSubmit = async(values) =>{
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      //await axios.post('/transections/add-transection', {...values, userid:user._id})
      await axios.post('/transections/add-transection', {...values, userid:user._id})
      setLoading(false);
      message.success("Transection Added Successfully")
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("failed to add transection")//is transaction
      
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
      <div className='filters'>
      <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)} style={{ width: 200 }}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelecteddate(values)}/>}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)} style={{ width: 200 }}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelecteddate(values)}/>}
        </div>
        <div>
          <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
        </div>
      </div>

      <div className='content'>
      <Table columns={columns} dataSource={allTransection}/>
        <Modal title="Add Transection" 
        open={showModal}
        onCancel={()=>setShowModal(false)}
        footer={false}
        >  
        <Form layout='vertical' onFinish={handleSubmit}>

          <Form.Item label="Amount" name="amount">
            <Input type='text'/>
          </Form.Item>


          <Form.Item label="type" name="type">
           <Select>
           <Select.Option value="income">Income</Select.Option>
           <Select.Option value="expense">Expense</Select.Option>
           </Select>
          </Form.Item>


          <Form.Item label="category" name="category">
           <Select>
           <Select.Option value="salary">Salary</Select.Option>
           <Select.Option value="tip">Tip</Select.Option>
           <Select.Option value="project">Project</Select.Option>
           <Select.Option value="food">Food</Select.Option>
           <Select.Option value="movie">Movie</Select.Option>
           <Select.Option value="bills">Bills</Select.Option>
           <Select.Option value="medical">Medical</Select.Option>
           <Select.Option value="fee">fee</Select.Option>
           <Select.Option value="tax">Tax</Select.Option>
          
           </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type='date'/>
          </Form.Item>

          <Form.Item label="Refrence" name="refrence">
            <Input type='text'/>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type='text'/>
          </Form.Item>

          <div className='d-flex  justify-content-end'>

            <button className='btn btn-primary' type='submit'>SAVE</button>
          </div>

        </Form>
        
        </Modal>
      </div>
    </Layout>
  )
}

export default HomePage
