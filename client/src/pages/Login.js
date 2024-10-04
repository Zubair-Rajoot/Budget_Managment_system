import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'



const Login = () => {

  const[loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const submitHandler = async(values) => {
      try {
          const {data} = await axios.post('http://localhost:8080/api/v1/users/login', values); // Fully qualified URL for the backend API
          message.success("Login successfully");
          localStorage.setItem('user', JSON.stringify({...data.user, Password: ''}));
          navigate('/');
      } catch (error) {
          message.error('Something went wrong');
      }
  };
  

   //prevent for login user 
   useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate('/')
    }
}, [navigate])





  return (
    <>
    <div className='register-page'>
    {loading && <Spinner/>}
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login </h1>
                   

                    <Form.Item label='email' name='email'>
                        <Input type='email' />
                    </Form.Item>

                    <Form.Item label='password' name='password'>
                        <Input type='password' />
                    </Form.Item>

                   

            
                     <div classname="d-flex justify-content-between">
                        <Link to="/register">Not a user ? Click here to register</Link>
                        <button className="btn btn-primary">Login</button>
                    </div>

        </Form >
        </div>
      
    </>
  )
}

export default Login
