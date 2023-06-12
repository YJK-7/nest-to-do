// import { PrismaClient } from '@prisma/client';
'use client';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { EditPost, POST } from '../api/posts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PostObject = {
  title: string,
  content?: string,
  dueDate?: string | Date,
  isFinished: boolean,
}

type Props = {
  author: string
  fetchAllPosts: (value: string) => void
  editData?: PostObject & {
    id: number
  }
  setOpenForm: Dispatch<SetStateAction<boolean>>
  closeEditData?: (value: SetStateAction<number>) => void
}

const Form: FC<Props> = ({ author, setOpenForm, fetchAllPosts, editData, closeEditData }) => {
  const [formData, setFormData] = useState<PostObject&{authorEmail: string}>({
    title:'',
    content:'',
    dueDate: '',
    isFinished: false,
    authorEmail: author
  });

  useEffect(() => {
    if(editData) {
      if(editData.dueDate) {
        editData.dueDate = new Date(editData.dueDate);
      }
      setFormData({
        ...editData,
        authorEmail: author
      })
    }
  },[editData, author])
  
  const handleChange = (e) => {
    if(e.target.name === 'isFinished') {
      setFormData({
        ...formData,
        [e.target.name]: !formData.isFinished
      });
      return 
    }
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
        closeEditData(0);
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
        Due Date:
        <DatePicker selected={formData.dueDate} onChange={(date) => setFormData({...formData, dueDate: date})} />
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
