import React from 'react'
import { Button } from 'react-bootstrap'
const Chats = ({chat}) => {
    return (
        <div>
            <Button>{chat.name}</Button>
        </div>
    )
}

export default Chats