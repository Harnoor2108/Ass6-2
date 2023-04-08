import {Container} from 'react-bootstrap';
import MainNav from './MainNav';
import React from 'react';

export default function Layout(props) {
    return (
        <>
        <MainNav />
<br />
<Container>
{props.children}
</Container>
<br />
</>
    )
}