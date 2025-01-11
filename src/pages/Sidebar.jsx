import React from 'react'
import styles from './ChatPage.module.css'

const Sidebar = ({participant}) => {
    return (
        <div className={`${styles.room}`}>{participant}</div>
    )
}

export default Sidebar