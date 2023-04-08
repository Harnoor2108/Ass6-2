/*********************************************************************************
* BTI425 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Harnoor Kaur Student ID: 156624215 Date: 12-March-2023
*
********************************************************************************/

//import '@/styles/globals.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { SWRConfig } from 'swr' 
import Layout from '@/components/Layout'
import "@/styles/bootstrap.min.css"
import RouteGuard from '@/components/RouteGuard'


export default function App({ Component, pageProps }) {
  return (
   <RouteGuard>
  <Layout>
    <SWRConfig value={{
 fetcher:
 async url => {
 const res = await fetch(url)
 // If the status code is not in the range 200-299,
 // we still try to parse and throw it.
 if (!res.ok) {
 const error = new Error('An error occurred while fetching the data.')
 // Attach extra info to the error object.
 error.info = await res.json()
 error.status = res.status
 throw error
 }
 return res.json()
 }
    }
  }
  ><br/>
     <Component {...pageProps} />
  </SWRConfig>
  </Layout>
</RouteGuard>
  )}
  
 

