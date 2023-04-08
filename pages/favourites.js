import { useAtom } from "jotai";
import { favouritesAtom} from "@/store";
import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import { Col, Row, Pagination } from 'react-bootstrap';
import useSWR from 'swr'
import Error from 'next/error';
import { Card } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';
import { motion } from 'framer-motion'
import validObjectIDList from '@/public/data/validObjectIDList.json'

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    return (
        <div > 
        {favouritesList ? (
            <>
            <Row className="gy-4 me-5 " bg="green" >
              {favouritesList.length > 0 ? (
                favouritesList.map((favouritesList) => (
                  <Col lg={3} className="me-5" key={favouritesList}>
                    <ArtworkCard objectID={favouritesList} />
                  </Col>
                ))
              ) : (
                <Col>
                  <Card>
                    <Card.Body>
                      <h4>Nothing Here</h4>
                      Try searching for something else.
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
            
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
    


}
