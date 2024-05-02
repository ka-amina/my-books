import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    Title: "",
    Description: "",
    Author: "",
    Category: "",
    Publication_date: "",
    Price: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1010/book/${id}`);
        // Format the Publication_date before setting it in the state
        const formattedBook = {
          ...response.data,
          Publication_date: formatDate(response.data.Publication_date)
        };
        setBook(formattedBook);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: name === 'Price' ? parseFloat(value) : value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:1010/books/Update/${id}`, book);
      navigate(`/View/${id}`);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div style={{
      margin: "auto",
      padding: "150",
      maxWidth: "400px",
      alignContent: "center",
      textAlign: "center",
      marginTop: "auto"
    }}>
      <h1>Update the Book</h1>
      <div style={{ fontWeight: 'bold' }}>Title: </div> 
      <input type="text" placeholder='Title' value={book.Title || ""} onChange={handleChange} name="Title" />
      <div style={{ fontWeight: 'bold' }}>Description: </div> 
      <input type="text" placeholder='Description' value={book.Description || ""} onChange={handleChange} name="Description" />
      <div style={{ fontWeight: 'bold' }}>Author: </div> 
      <input type="text" placeholder='Author' value={book.Author || ""} onChange={handleChange} name="Author" />
      <div style={{ fontWeight: 'bold' }}>Category: </div>
      <input type="text" placeholder='Category' value={book.Category || ""} onChange={handleChange} name="Category" />
      <div style={{ fontWeight: 'bold' }}>Publication_date: </div>
      <input type="date" value={book.Publication_date || ""} onChange={handleChange} name="Publication_date"
      pattern="\d{4}-\d{2}-\d{2}"
      placeholder="yyyy-mm-dd" />
      <div style={{ fontWeight: 'bold' }}>Price: </div>
      <input type="number" placeholder='Price' value={book.Price || ""} onChange={handleChange} name="Price" />
      <button className="Save-button" style={{ width: "100%" }} onClick={handleClick}>Save</button>
   <div style={{ marginTop: "10px" }}>
      <button className= "Go-back-button" style={{ width: "100%" }} onClick={handleGoBack}>Go Back</button>
    </div>
      
    </div>
  );
};

export default Update;
