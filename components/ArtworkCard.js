import {useState, useEffect} from 'react';
import useSWR from 'swr';
import React from 'react';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArtworkCard(props) {

   
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher);
    
    
    if(error) {
        return <Error statusCode={404} />
    }

    if(!data) {
      console.log("Error in fetching Data");
      return null;
    }

    console.log(data);
     return(
        <motion.div whileHover={{scale:1.2}}>
<Card style={{ width: '18rem'}}>
            
            <Card.Img variant="top" src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
            <Card.Body>
                <Card.Title>{data.title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {data.classification || 'N/A'}<br />
                    <strong>Medium:</strong> {data.medium || 'N/A'}
                </Card.Text>
            </Card.Body><Link href={`/artwork/${data.objectID}`} passHref>
                <Button variant="link">Click to see the details</Button>
            </Link>
        </Card>
        </motion.div>
     ) ;

}