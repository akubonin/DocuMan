'use client';

import '../styles/globals.css';
import NavBar from '@/components/navbar-component/navbar-component';
import Table from '@/components/table-component/table-component';
import Search from '@/components/search-component/search-component';
import Info from '@/components/info-component/info-component';
import Header from '@/components/header-component/header-component';
import React, { useState, useEffect } from 'react'
import { DocumentItem } from '../types/custom-types.d';


export default function Dashboard() : React.ReactNode {

  const [documents, setDocuments] = useState<DocumentItem[]>([]);


  useEffect(() => {

    fetch('http://localhost:8080/alldocuments')
    .then((response)=> response.json())
    .then((data) => {
      setDocuments(data);
      console.log("Here are:", documents)
    })
    .catch ((err) => {
      console.log(err.message);
    });
  }, [])




  return (
  <div className = 'container-dashboard-all'>
    <Header />
    <div className='container'>
        <NavBar />
      <div className='container-box'>
        <Search />
        <Table documents = {documents} />
      </div>
    </div>
  </div>
  )
}



