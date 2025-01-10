import React, { useContext, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'

const login = () => {

    const navigate = useNavigate()
	const {setAuthenticated} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const userInfo = {email, password}

    function handlesubmit(e){
        e.preventDefault()
        api.post('/api/auth/login', userInfo)
        .then(res => {
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
			setAuthenticated(true)
            navigate('/')
        })
        .catch(err => {
            console.log(err.message);
        })
    }

	return (
		<Container className='login'>
			<Form onSubmit={handlesubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
					<Form.Text className="text-muted">
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	)
}

export default login