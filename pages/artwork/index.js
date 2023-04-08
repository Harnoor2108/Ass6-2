import Link from "next/link";
import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import { Col, Row, Pagination } from 'react-bootstrap';
import useSWR from 'swr'
import Error from 'next/error';
import { Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import { motion } from 'framer-motion'
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12

export default function Art() {
    const [artworkList, setartworkList] = useState(null)
    const [page, setpage] = useState(1)

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    var {data,error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

     useEffect(() => {
        if(data){
          let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            var results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
              const chunk = filteredResults.slice(i, i + PER_PAGE);
              results.push(chunk);
             }
             
               setartworkList(results);
               setpage(1)
        }
    }, [data]);

    const previousPage = (() => {
        if(page > 1){
        setpage(page - 1)
        }
    });

    const nextPage=(() => {
        if (page < artworkList.length) {
            setpage(page + 1);
          }
    });

    if(error)
    {
        return <Error statusCode={404} />;
    }


    if (!artworkList) return null;
    return (
        <div > 
        {artworkList ? (
            <>
            <Row className="gy-4 me-5 " bg="green" >
              {artworkList.length > 0 ? (
                artworkList[page - 1].map((currentObjectID) => (
                  <Col lg={3} className="me-5" key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
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
            {artworkList.length > 0 && (
              <Row className="mt-4">
                <Col>
                  <Pagination className="me-10">
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                  </Pagination>
                </Col>
              </Row>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };