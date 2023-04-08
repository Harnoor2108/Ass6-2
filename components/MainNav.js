import React, { useState} from 'react'
//import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'

import { Form, Button } from 'react-bootstrap';
import Link from "next/link"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../pages/store";
import { addToHistory } from '@/lib/userData';
import { useRouter } from 'next/router';
import { readToken } from '@/lib/authenticate';
import { removeToken } from '@/lib/authenticate';


function MainNav() {

    const [search, setsearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let token = readToken();

    
    async function handleSubmit(event) {
        event.preventDefault();
        var url = `/artwork?title=true&q=${search}` ;
        router.push(url)
        setsearch('');
        setIsExpanded(false)
        setSearchHistory(await addToHistory(`title=true&q=${search}`))
    };

  

function logout() {
  setIsExpanded(false)
  removeToken();
  router.push('/login');
}


  return (
    <>
    <Navbar className = "fixed-top navbar-dark bg-primary" expand="lg"  expanded={isExpanded}>
      <Container>
        <Navbar.Brand >Harnoor Kaur</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={()=>setIsExpanded(!isExpanded)}/>
        
        <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
        <Link href="/" passHref legacyBehavior>
                                <Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
        <Link href="/search" passHref legacyBehavior>
                        <Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/search"}>Advance Search</Nav.Link>
        </Link>
            </Nav>
            {token && (
            <form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              value = {search}
              className="me-2"
              aria-label="Search"
              onChange={(event) =>
                setsearch(event.target.value)
              }
            />
            <button className="success" type="submit"> Search</button>
          </form>)}&nbsp;
          {token ? (
          <Nav>
          <NavDropdown title={token.userName} id="basic-nav-dropdown" active={ router.pathname === "/favourites" || router.pathname === "/history" }>
            <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={(e) => {setIsExpanded(false);}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
            <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={(e) => {setIsExpanded(false);}} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
                      ) : (
                        <Nav className="ms-auto">
                          <Link href="/register" passHref legacyBehavior><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                          <Link href="/login" passHref legacyBehavior><Nav.Link onClick={(e) => { setIsExpanded(false);}}active={router.pathname === "/login"}>Login</Nav.Link></Link>
                        </Nav>
                      )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* <Navbar className = "fixed-top navbar-dark bg-primary" expand="lg">
      <Container >
        <Navbar.Brand >Harnoor Kaur</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
            <Link href="/" legacyBehaviour passHref >
            <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/search" legacyBehaviour  passHref >
            <Nav.Link >Advanced Search</Nav.Link>
            </Link>
            </Nav>
          
          <form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              value = {search}
              className="me-2"
              aria-label="Search"
              onChange={(event) =>
                setsearch(event.target.value)
              }
            />
            <button variant="success" type="submit"> Search</button>
          </form>
          </Navbar.Collapse>
                </Container>
            </Navbar>
    
    <br/>
    <br/> */}
    <br/>
    <br/>
    </>
  );
}

export default MainNav;