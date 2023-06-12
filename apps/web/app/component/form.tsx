// import { PrismaClient } from '@prisma/client';
'use client';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { EditPost, POST } from '../api/posts';

// const prisma = new PrismaClient();

type Props = {
  author: string
  fetchAllPosts: (value: string) => void
  setOpenForm: Dispatch<SetStateAction<boolean>>
  editData?: {
    id: number,
    title: string,
    content: string,
    isFinished: boolean,
  }
  closeEditData?: (value: SetStateAction<number>) => void
}

const Form: FC<Props> = ({ author, setOpenForm, fetchAllPosts, editData, closeEditData }) => {
  const [formData, setFormData] = useState({
    title:'',
    content:'',
    isFinished: false,
    authorEmail: author
  });

  useEffect(() => {
    if(editData) {
      setFormData({
        ...editData,
        authorEmail: author
      })
    }
  },[editData, author])

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
      if(editData) {
        await EditPost({
          id: editData.id,
          postData: formData
        })
        closeEditData(0)
      } else {
        await POST(formData);
        setOpenForm(false);
      }
      fetchAllPosts(author);
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

export default Form;
