 
export async function POST(formData) {
  const res = await fetch(`api/posts/create`, {
    method:"POST",
    body: JSON.stringify(formData),
    headers:{
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json()
 
  return data
}
export async function GetAllPosts(email) {
  const res = await fetch(`api/posts/all/${email}`, {
    method:"GET",
    headers:{
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json()
 
  return data
}

export async function PutStatus(postId) {
  const res = await fetch(`api/posts/change-status/${postId}`, {
    method:"PUT",
    headers:{
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json()
 
  return data
}

export async function DeletePost(postId) {
  const res = await fetch(`api/posts/${postId}`, {
    method:"DELETE",
    headers:{
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json()
 
  return data
}

export async function EditPost(editData) {
  const { id, postData } = editData
  const res = await fetch(`api/posts/${id}`, {
    method:"PUT",
    body: JSON.stringify(postData),
    headers:{
      'Content-Type': 'application/json',
    }
  })
  const data = await res.json()
 
  return data
}
