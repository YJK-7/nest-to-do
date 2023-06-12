'use client';
import { useEffect, useState } from 'react';
import { GET } from './api/user';
import { DeletePost, GetAllPosts, PutStatus } from './api/posts';
import Form from './component/form';


export default function IndexPage() {
  const [user, setUser] = useState({
    name:'',
    email:''
  });
  const [openForm, setOpenForm] = useState(false);
  const [toDoList, setToDoList] = useState([{
    id:0,
    title:'',
    content:'',
    isFinished: false,
  }]);
  const [editId, setEditId] = useState<number>(0);

  const fetchAllPosts = async (email: string) => {
    const toDoList = await GetAllPosts(email);
    setToDoList(toDoList);
  }
  
  useEffect(() => {
    const fetch = async () => {
      const userData = await GET();
      setUser(userData);
    }
    fetch()
    .catch(console.error);

  },[])

  useEffect(() => {
    if (user.email.length !== 0) {
      fetchAllPosts(user.email)
      .catch(console.error);
    }

  },[user.email])

  const handelStatusChange = async (postId) => {
    await PutStatus(postId);
    fetchAllPosts(user.email);
  }

  const handelDelete = async (postId) => {
    await DeletePost(postId);
    fetchAllPosts(user.email);
  }

  return (
    <div>
      <h1>To Do List
        {user.email.length !== 0 && (
          <span style={{fontSize:'medium', fontWeight:'normal'}}>
            &nbsp; By: {user.name}
          </span>
        )}
      </h1>
        {toDoList.length !== 0 && (
          toDoList.map((toDo) => {
            return (
              <div key={toDo.id} style={{ border:'solid 2px black', width: '40%', padding: 10, marginBottom: 10}}>
                <p key='title'> Title: {toDo.title} </p>
                {toDo.content && (
                  <p key='content'> Content: {toDo.content} </p>
                )}
                <div style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }}>
                  <p>Done? {toDo.isFinished ? 'Yes' : 'No'} </p>
                  <button onClick={() => handelStatusChange(toDo.id)} key={`isFinished-${toDo.id}`}>Change Status</button>
                </div>
                <button onClick={() => handelDelete(toDo.id)} key={`delete-${toDo.id}`}>Delete</button>
                {editId === toDo.id ?
                  <>
                    <button onClick={() => setEditId(0)} key={`close-${toDo.id}`}>Close</button>
                    <div style={{ display: 'flex', justifyContent:'center', border:'solid 2px black', width: '40%', padding: 10, margin: 'auto', marginTop: 10}}>
                      <Form author={user.email} setOpenForm={setOpenForm} fetchAllPosts={fetchAllPosts} editData={toDo} closeEditData={setEditId}/>
                    </div>
                  </> 
                  : <button onClick={() => setEditId(toDo.id)} key={`edit-${toDo.id}`}>Edit</button>
                }
              </div>
            )
          })
        )}
      <button onClick={() => setOpenForm(true)}> Add To Do </button>
      {openForm && (
        <div style={{ display: 'flex', justifyContent:'center', border:'solid 2px black', width: '40%', padding: 10, margin: 'auto'}}>
          <Form author={user.email} setOpenForm={setOpenForm} fetchAllPosts={fetchAllPosts}/>
        </div>
      )}
      
    </div>
  );
}
