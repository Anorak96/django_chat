import React from 'react';
import styles from './ChatPage.module.css'

function Message({ message, classname }) {
    return (
        <div className={classname}>
            <b>{message.sender.full_name}</b>
            <p className={`${styles.messagetext}`}>{message.body}</p>
        </div>
    );
}

export default Message;
