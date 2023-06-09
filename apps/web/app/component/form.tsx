// import { PrismaClient } from '@prisma/client';
'use client';
import { useEffect, useState } from 'react';
import { POST } from '../api/posts';

// const prisma = new PrismaClient();

export default function Form({ author, setOpenForm }) {
  const [formData, setFormData] = useState({
    title:'',
    content:'',
    isFinished: false,
    authorEmail: author
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if(formData.title) {
      const post = await POST(formData);
      setOpenForm(false);
      console.log(post)
    }
  }

  return (
    <form onSubmit={handelSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 150, alignItems: 'center'}}>
      <label>
        Title:
        <input type='text' value={formData.title} onChange={handleChange} name='title'/>
      </label>
      <label>
        Content:
        <input type='text' value={formData.content} onChange={handleChange} name='content'/>
      </label>
      <label>
        Done?
        <input type='checkbox' checked={formData.isFinished} onChange={handleChange} name='isFinished'/>
      </label>
      <input type='submit'/>

    </form>
  );
}
