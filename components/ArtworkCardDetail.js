import React from 'react'
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import useSWR from "swr"
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/pages/store';
import { useState } from 'react';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';



export default function ArtworkCardDetail({objectID}) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded,setshowAdded] = useState(false);
    useEffect(()=>{
        setshowAdded(favouritesList?.includes(objectID))
       }, [favouritesList])
    for(var i in favouritesList)
    {
        if(i == objectID)
        {
            setshowAdded(true);
        }
    }
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    if (error) {
        return <Error statusCode={404} />
    }
    if (!data) {
        return null;
    }
    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data // extracting every data and storing them in their respective variable.


    async function favouritesClicked  () {
        if(showAdded){
            //setFavouritesList(current => current.filter(fav => fav != objectID));
            setFavouritesList(await removeFromFavourites(objectID))
            setshowAdded(false);
        }
        else
        {
            //setFavouritesList(current => [...current, objectID]);
            setFavouritesList(await addToFavourites(objectID))
            setshowAdded(true);
        }
    }

    return(
        <Card>

            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            {!primaryImage && (
                <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
                />
            )}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}
                    <br />
                    <strong>Classification:</strong> {classification || 'N/A'}
                    <br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                    <br />
                    <br />
                    <strong>Artist:</strong>{' '}
                    {artistDisplayName ? (
                        <>
                            {artistDisplayName}{' '}
                            {artistWikidata_URL && (
                               <a href={artistWikidata_URL} target="_blank" rel="noreferrer">Link To Know More</a>
                            )}
                        </>) : ('N/A')}
                    <br />
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}
                    <br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}
                </Card.Text>
            </Card.Body>
            <Link href={`/artwork/${objectID}`} passHref>
                <Button variant="link">{objectID}</Button>
            </Link>
            {showAdded?(<Button variant="primary" onClick={(e)=>favouritesClicked()}>+ Favourite (added)
            </Button>):(<Button variant="primary" onClick={(e)=>favouritesClicked()}>+ Favourite
            </Button>)}
        </Card>
    )
}