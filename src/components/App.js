import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddAlbum from './AddAlbum';
import AlbumsList from './AlbumsList';
import UpdateAlbum from './UpdateAlbum';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [updateAlbum, setUpdateAlbum] = useState({});

  // Fetch albums when the component mounts
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  // Function to delete an album
  const deleteAlbumFromList = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE' });
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
      alert('Your Album Deleted successfully');
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  // Function to update an album in the list
  const updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbum) => {
    try {
      let updatedAlbum;
      if (id < 100) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            userId: updateUserid,
            id,
            title: updateTitle,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        updatedAlbum = await response.json();
      } else {
        updatedAlbum = {
          userId: updateUserid,
          id,
          title: updateTitle,
        };
      }

      setAlbums((prevAlbums) =>
        prevAlbums.map((album) => (album === oldAlbum ? updatedAlbum : album))
      );
      alert('Update Successfully done');
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  // Function to add a new album to the list
  const addAlbumToList = async (userId, title) => {
    try {
      const length = albums.length;
      const lastId = albums[length - 1]?.id || 0;

      const newAlbum = {
        userId,
        id: lastId + 1,
        title,
      };

      await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify(newAlbum),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
      alert('New Album added successfully in the bottom');
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AlbumsList
              albums={albums}
              setUpdateAlbum={setUpdateAlbum}
              deleteAlbumFromList={deleteAlbumFromList}
            />
          }
        />
        <Route path="/add-album" element={<AddAlbum addAlbumToList={addAlbumToList} />} />
        <Route
          path="/update-album"
          element={<UpdateAlbum album={updateAlbum} updateAlbumInList={updateAlbumInList} />}
        />
      </Routes>
    </>
  );
};

export default App;
