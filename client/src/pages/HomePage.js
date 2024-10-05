import React, {useState} from 'react'
import {Form, Input, message, Modal, Select} from 'antd'
import Layout from '../components/Layout/Layout'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'

const HomePage = () => {
  const[showModal, setShowModal] = useState(false)
  const[loading, setLoading] = useState(false)

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
      message.error("failed to add transection")
      
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
      <div className='filters'>
        <div>range filters</div>
        <div>
          <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
        </div>
      </div>

      <div className='content'>
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
//maaz here add one
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
