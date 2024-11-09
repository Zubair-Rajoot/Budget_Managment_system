
import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layout/Spinner';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/users/login', values);
            message.success("Login successful");
            localStorage.setItem('user', JSON.stringify({ ...data.user, Password: '' }));
            navigate('/');
        } catch (error) {
            message.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Prevent logged-in user from accessing login page
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="login-page-container">
            <div className="login-form-card">
                {loading && <Spinner />}
                <h1 className="form-title">Login</h1>
                <Form layout="vertical" onFinish={submitHandler}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email' }]}
                    >
                        <Input type="email" placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input type="password" placeholder="Enter your password" />
                    </Form.Item>

                    <div className="form-footer">
                        <Link to="/register" className="register-link">
                            Not a user? Register here
                        </Link>
                        <button type="submit" className="btn login-btn">Login</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
