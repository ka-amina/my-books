import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Books.css'

const Books = () => {
 const [books, setBooks] =  useState([])
   useEffect (()=> {
       const fecthallBooks = async () => {
       try{
         const res = await axios.get("http://localhost:1010/books")
         setBooks (res.data)
        }  catch (err) {
        console.log(err)
      }
    }
    fecthallBooks()
   },[])

   const handleDelete= async (id) =>{
    if (window.confirm('Are you sure that you want to delete this book?')) {
    try{
      await axios.delete(`http://localhost:1010/books/Del/${id}`)
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }catch (err) {
    console.log(err)
    }}}
    
    return (
     <div style= {{marginTop: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
         <table className="styled-table">
           <thead>
              <tr>
                <th>No</th>
                <th  style={{ width: '30%' }}>Title</th>
               <th>Author</th>
               <th>Price(MAD)</th>
                <th>Actions</th>
              </tr>
           </thead>
            <tbody>
              {books.map((book, index)=> (
              
               <tr key={book.id}>
                 <td style={{ textAlign: 'center' }}>{index+1}</td>
                 <td style={{ textAlign: 'center' }}>{book.Title}</td>
                 <td style={{ textAlign: 'center' }}>{book.Author}</td>
                 <td style={{ textAlign: 'center' }}>{book.Price}</td>
                 <td>
                   <Link to={`/View/${book.id}`}>
                   <button className='view'> View</button>
                   </Link>
                   <Link to={`/Update/${book.id}`}>
                   <button className='update'> Update</button>
                   </Link>
                   
                   <button className='delete' onClick={()=> handleDelete(book.id)}>Delete</button>
                  </td>
               </tr>
                
              ))}
            </tbody>
         </table>
         <div style={{  marginTop: "20px" }}>
          <Link to="/add"><button className='Add'>
            Add New book 
            </button> </Link>
         </div>
     </div>

      
    )
}


export default Books