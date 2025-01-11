import React, {useContext, useEffect, useState} from 'react'
import api from '../api'
import styles from './ChatPage.module.css'
import Message from './Message'
import Sidebar from './Sidebar'
import AuthContext from './AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useParams } from 'react-router-dom'

const ChatPage = () => {

	const {room_uuid} = useParams()

	const {Authenticated} = useContext(AuthContext)
	const [messages, setMessages] = useState([])
	const [participants, setParticipants] = useState([])
	const [user, setUser] = useState()

    useEffect(function(){
		api.get(`/api/chat/room/${room_uuid}/messages`)
		.then(res => {
			setMessages(res.data)
		})
		.catch(err => {
			console.log(err.message);
		})

		// Get participants
		api.get(`api/chat/room/${room_uuid}/participants`)
		.then(res => {
			setParticipants(res.data)
		})
		.catch(err => {
			console.log(err.message);
		})
		
		// Get looged in user
		api.get(`api/auth/account`)
		.then(res => {
			setUser(res.data.employee.full_name)
		})
		.catch(err => {
			console.log(err.message);
		})
		
		const socketURL = `ws://127.0.0.1:8000/ws/chat/${room_uuid}/`;
		const socket = new WebSocket(socketURL)

		socket.onmessage = function(e) {
			console.log('onMessage');
		}

		socket.onopen = function(e) {
			console.log('socket opened');
		}

		socket.onclose = function(e) {
			console.log('socket closed');
		}

	})
    
    return (
        <div className={`${styles.chat}`}>
			<div  className={`${styles.sidebar}`}>
                {participants.map((participant) => {
					return(<Sidebar participant={participant.full_name} key={participant.account}/>)
				})}
            </div>
			
			<div className={`${styles.chatarea}`}>
				<div className={`${styles.chatheader}`}>Chat {Authenticated ? <h5>Logout</h5> : <h6>Login</h6>}</div>
				<div className={`${styles.messages}`}>
					{messages.map((message) => {
						return(<Message message={message} key={message.id} classname={user === message.sender.full_name ? styles.sent : styles.receive}/>)
					})}
				</div>
				<div className={`${styles.messageinput}`}>
					<input type="text" placeholder="Type a message..." id="message" />
					<button>Send</button>
				</div>
			</div>
		</div>
    )
}

export default ChatPage