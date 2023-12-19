import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Book = ({ id, title, imageLinks, description, authors }) => (
  <div key={id} className='div'>
    <h1>{title}</h1>
    <div className='div2'>
      <img src={imageLinks.smallThumbnail} alt="images" />
      <p>{description}</p>
    </div>
    <div className='author'>
      {authors.map((author, index) => (
        <div key={index}>
          <span>{author}</span>
        </div>
      ))}
    </div>
    <hr />
  </div>
);

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reactnd-books-api.udacity.com/books", {
          headers: { 'Authorization': 'whatever-you-want' }
        });
        setBooks(response.data.books);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Status code:', error.response.status);
          console.log('Website not found');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </div>
  );
}

export default App;
