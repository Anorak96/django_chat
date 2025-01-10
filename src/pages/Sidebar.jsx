import React from 'react'
import styles from './ChatPage.module.css'

const Sidebar = ({room}) => {
    return (
        <div className={`${styles.room}`}>{room}</div>
    )
}

export default Sidebar