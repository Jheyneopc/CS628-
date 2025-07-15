// MovieList.js
import React, { useState } from 'react';

const movies = [
  { title: 'Inception', genre: 'Science Fiction', releaseYear: 2010 },
  { title: 'The Shawshank Redemption', genre: 'Drama', releaseYear: 1994 },
  { title: 'The Dark Knight', genre: 'Action', releaseYear: 2008 },
  { title: 'Interstellar', genre: 'Science Fiction', releaseYear: 2014 },
  { title: 'Forrest Gump', genre: 'Drama', releaseYear: 1994 },
];

function MovieList() {
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  const genres = ['All Genres', ...new Set(movies.map((movie) => movie.genre))];

  const filteredMovies =
    selectedGenre === 'All Genres'
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  const handleClick = (title) => {
    alert(`You clicked on "${title}"`);
  };

  return (
    <div>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      >
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredMovies.map((movie, index) => (
          <li
            key={index}
            onClick={() => handleClick(movie.title)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <p>Released: {movie.releaseYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
