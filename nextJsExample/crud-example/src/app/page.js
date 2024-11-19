'use client';

import { useEffect, useState } from "react";

export default function Page() {
const  [posts, setPosts] = useState([]);
const [newPost, setNewPost] = useState('');
const [editPostId, setEditPostId] = useState(null);
const [editPostText, setEditPostText] = useState('');

//Api request for Client
useEffect(() => {
  async function fetchPosts(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setPosts(data.slice(0, 100));
  }
  fetchPosts();
}, []);

//New Post add

const handleAddPost = async () => {
  if(!newPost.trim())  return;

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title:newPost }),
  });

  const data = await response.json();
  setPosts([...posts, {id: data.id, title: newPost}]);
  setNewPost('');
}

//Edit Post

const handleEditPost = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: editPostText}),
  });

  const updatedPost = await response.json();
  setPosts(posts.map((post) => (post.id === id ? {...post, title: updatedPost.title}: post)));
  setEditPostId(null);
  setEditPostText('');
};

//Delete post
const handleDeletePost = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  setPosts(posts.filter((post) => post.id !== id));
};


  return (
    <div className="bg-black grid justify-center items-center">
      <h1 className="text-white text-center font-bold text-2xl m-2">CRUD with JSONPleacholder</h1>
      {/*New Post */}
      <div className="grid  bg-gray-900 my-2 md:p-6 rounded-md">
        <h2 className="text-white text-2xl">Now add a post!</h2>
        <div className="my-4 gap-2 grid">
        <input
        type="text"
        className="border px-2 py-1 mr-2 w-full md:p-4 rounded-md outline-none"
        placeholder="Add a new Post"
        value={newPost}
        onChange={(e)=> setNewPost(e.target.value)}
        />
        <button className="text-white bg-green-500 p-2 rounded-lg w-full" onClick={handleAddPost}>
          Add Post
        </button>
        </div>
      </div>
      {/*Posts List */}
      <ul className="bg-gray-900 md:p-12 rounded-md" >
        {
          posts.map((post) => (
            <li className="md:flex items-center justify-between bg-gray-800 md:m-8 p-8 rounded-md " key={post.id} >
              {editPostId === post.id ?(
                <>
                <input
                type="text"
                value={editPostText}
                onChange={(e) => setEditPostText(e.target.value)}
                className="w-3/4 rounded-md p-2 outline-none"
                />
                <button className="text-green-500 rounded-md bg-white p-2 px-6" onClick={() => handleEditPost(post.id)}>
                  Save
                </button>
                
                </>
              ):(
                <>
                <span className="text-white">{post.title}</span>
                <div className="flex gap-4">
                  <button className="text-yellow-500 rounded-md bg-white p-2 px-6" onClick={()=> {setEditPostId(post.id); setEditPostText(post.title);
                  }}
                  >
                    Edit
                  </button>
    
                <button className="text-red-600 rounded-md bg-white p-2 px-6" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
                </div>
                </>
              )
            }
            </li>
          ))
        }
      </ul>
    </div>
  );
}
