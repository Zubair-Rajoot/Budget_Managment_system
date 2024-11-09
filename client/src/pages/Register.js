
import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Spinner from '../components/Layout/Spinner'

const Register = () => {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        try {
            await axios.post('http://localhost:8080/api/v1/users/register', values);
            message.success("Registration successful");
            navigate('/login');
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    // Prevent for logged-in user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="register-page-container">
            <div className="register-form-card">
                <h1 className="form-title">Register</h1>
                <Form layout="vertical" onFinish={submitHandler}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                        <Input type="email" placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input type="password" placeholder="Enter your password" />
                    </Form.Item>

                    <div className="form-footer">
                        <Link to="/login" className="login-link">Already registered? Login here</Link>
                        <button type="submit" className="btn register-btn">Register</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
