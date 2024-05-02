import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './View.css'

const View = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Get the navigation function
 

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:1010/book/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookDetails();
  }, [id]); 

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:1010/books/Del/${id}`);

        setTimeout(() => {
          navigate('/');
        }, 500);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!book) {
    return []
  }

  const formatPublicationDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleUpdateClick = () => {
    navigate(`/Update/${id}`); 
  };

  return (
  
    <div className="card-container" style={{marginTop: "100px"}}>
      <div className="card-header">
        <h2>{book.Title}</h2>
      </div>
      <div className="card-content">
        <div><strong>Description:  </strong> &nbsp;  {book.Description}</div>
        <p><strong>Author:</strong> &nbsp;  {book.Author}</p>
        <p><strong>Price:</strong> &nbsp; {book.Price} MAD</p>
        <p><strong>Category:</strong> &nbsp; {book.Category}</p>
        <p><strong>Publication Date:</strong> &nbsp; {formatPublicationDate(book.Publication_date)}</p>
      </div>
      <div className='container'>
        <button className='Update-button' onClick={handleUpdateClick}>Update</button>
        <button className='Delete-button' onClick={handleDelete}>Delete</button>
        <Link to={`/`}>
          <button className='back-button'>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
