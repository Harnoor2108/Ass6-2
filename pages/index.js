import Head from 'next/head'
import { useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { motion } from 'framer-motion'
import { Image, Row, Col } from 'react-bootstrap'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div >
    <motion.div animate={{scale : 2, opacity:0.5 }}
    initial={{scale : 1, x:0}}
    transition = {{type : "tween", duration: 2}}
   whileHover={{scale : 2 }}
  >
    
    <Row >
      
        <Col >
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"  fluid rounded />
        </Col>
      </Row>
     </motion.div>
        <motion.div animate={ {y:-500, opacity:100}}
        initial={{opacity:0}}>
      <Row >
        <Col md={6}>
          <h4><strong>The Metropolitan Museum of Art, colloquially the Met, is located in New York City and is the largest art 
            museum in the United States. Its permanent collection contains over two million works, divided among seventeen 
            curatorial departments. The main building, on the eastern edge of Central Park along Museum Mile, is by area 
            one of the worlds largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park 
            in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts 
            from medieval Europe.</strong></h4>
        </Col>
        <Col md={6}>
          <h4><strong>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the 
            American people. The museums permanent collection consists of works of art from classical antiquity and 
            ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive 
            collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, 
            Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments,
             costumes, and accessories, as well as antique weapons and armor from around the world. Several notable 
             interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</strong></h4>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
        <form action="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art">
         
     
          <motion.button 
          initial={{x:500, scale:1}}
          whileHover={{scale:2}}
          type="submit" target="_blank" rel="noreferrer">Want to know More!!</motion.button>
         </form>
        </Col>
      </Row>
   
   
     </motion.div>
    </div>
      
  )
}
