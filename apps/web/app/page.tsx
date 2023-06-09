'use client';
import { useEffect, useState } from 'react';
import { GET } from './api/user';
import { GetAllPosts, PutStatus } from './api/posts';
import Form from './component/form';


export default function IndexPage() {
  const [user, setUser] = useState({
    name:'',
    email:''
  });
  const [openForm, setOpenForm] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const userData = await GET();
      setUser(userData);
    }
    fetch()
    .catch(console.error);

  },[])

  useEffect(() => {
    const fetch = async (email) => {
      const toDoList = await GetAllPosts(email);
      console.log(toDoList)
      setToDoList(toDoList);
    }
    if (user.email.length !== 0) {
      fetch(user.email)
      .catch(console.error);
    }

  },[user.email])

  const handelStatusChange = async (postId) => {
    const changeCheck = await PutStatus(postId);
    const toDoList = await GetAllPosts(user.email);
    setToDoList(toDoList);
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
                <p>Done? {toDo.isFinished ? 'Yes' : 'No'} </p>
                <button onClick={() => handelStatusChange(toDo.id)} key={`isFinished-${toDo.id}`}>Change Status</button>
              </div>
            )
          })
        )}
      <button onClick={() => setOpenForm(true)}> Add To Do </button>
      {openForm && (
        <div style={{ display: 'flex', justifyContent:'center', border:'solid 2px black', width: '40%', padding: 10, margin: 'auto'}}>
          <Form author={user.email} setOpenForm={setOpenForm} />
        </div>
      )}
      
    </div>
  );
}
