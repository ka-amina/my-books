import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './add.css'

const Add = () => {
    const [book, setBook] =useState({
        Title: "",
        Description: "",
        Author: "",
        Category: "",
        Publication_date: "",
        Price: null,
    })
 const navigate = useNavigate () //from react-routerdom

 const handleChange = (e) => {
  const { name, value } = e.target;
  setBook((prev) => ({ ...prev, [name]: name === 'Price' ? parseFloat(value) : value }));
};
 const handleClick = async e => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:1010/book", book)
        navigate("/")
    } catch (err) {
        console.log(err);
    }
 }

 console.log(book)
 const handleGoBack = () => {
    navigate('/');
  };
    return (
        <div 
        style={{
          margin: "auto",
          padding: "150",
          maxWidth: "400px",
          alignContent: "center",
          textAlign: "center"
        }}>
        <h1>Add New Book</h1>
        <label>Name</label>
        <input type="text" placeholder='Title' onChange={handleChange} name="Title" />
        <label>Description</label>
        <input type="text" placeholder='Description' onChange={handleChange} name="Description" />
        <label>Author</label>
        <input type="text" placeholder='Author' onChange={handleChange} name="Author" />
        <label>Category</label>
        <input type="text" placeholder='Category' onChange={handleChange} name="Category" />
        <label>Publication Date</label>
        <input 
          type="date" 
          value={book.Publication_date} 
          onChange={handleChange} 
         name="Publication_date" 
         pattern="\d{4}-\d{2}-\d{2}"
         placeholder="yyyy-mm-dd"
        />

        <label>Price</label>
        <input type="number" placeholder='Price' onChange={handleChange} name="Price" />
        <button className="Save-button" style={{ width: "100%" }} onClick={handleClick}>Save</button>
    <div style={{ marginTop: "10px" }}>
      <button className= "Go-back-button" style={{ width: "100%" }} onClick={handleGoBack}>Go Back</button>
    </div>
     </div>
    )
}

export default Add