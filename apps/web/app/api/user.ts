 
export async function GET() {
  const res = await fetch(`api/users/3`)
  const data = await res.json()
 
  return data
}
