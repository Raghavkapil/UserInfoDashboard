import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserApp() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data));
  }, []);

  const fetchUserDetails = async (user) => {
    setSelectedUser(user);
    const [postsRes, albumsRes] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`),
      axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
    ]);
    setPosts(postsRes.data);
    setAlbums(albumsRes.data);
  };

  return (
    <div>
      {!selectedUser ? (
        <div>
          <h1>User List</h1>
          <ul>
            {users.map(user => (
              <li 
                key={user.id} 
                onClick={() => fetchUserDetails(user)}>
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>City:</strong> {user.address.city}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedUser(null)}>
            ← Back to User List
          </button>
          <h1>{selectedUser.name}'s Details</h1>
          <div>
            <div><strong>Username:</strong> {selectedUser.username}</div>
            <div><strong>Email:</strong> {selectedUser.email}</div>
            <div><strong>Phone:</strong> {selectedUser.phone}</div>
            <div><strong>Website:</strong> {selectedUser.website}</div>
            <div><strong>Address:</strong> {`${selectedUser.address.street}, ${selectedUser.address.city}`}</div>
            <div><strong>Company:</strong> {selectedUser.company.name}</div>
          </div>

          <div>
            <button
             
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              
              onClick={() => setActiveTab('albums')}
            >
              Albums
            </button>
          </div>

          {activeTab === 'posts' && (
            <ul >
              {posts.map(post => (
                <li key={post.id} >
                  <div >{post.title}</div>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'albums' && (
            <ul >
              {albums.map(album => (
                <li key={album.id}>
                  <div>{album.title}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
