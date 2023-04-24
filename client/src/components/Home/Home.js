import React from 'react'
import styles from './Home.module.css'

const Home = () => {
   
    return (
        <div className={styles.pageContainer}>
            
            <section className={styles.hero}>
                <h1>Hilton Restaurants Ordering System v0.1</h1>
                <div className={styles.imgContainer}>
                    <img src="https://ts1.cn.mm.bing.net/th/id/R-C.5696d4620b1ea0b6e2fbfc43ed1b4d43?rik=A8%2f7tLC22zOq7A&riu=http%3a%2f%2fskoop.com%2fwp-content%2fuploads%2f2014%2f12%2fcs-_online-ordering.jpg&ehk=hGJT8Y6BsrB%2fxn7NF54jz2nsqs3m51f8ZB6fh37zS1Y%3d&risl=&pid=ImgRaw&r=0" alt="ordering-app"/>
                </div>
            </section>
        </div>
    )
}

export default Home
