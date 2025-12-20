import React, { useEffect, useState } from 'react'
import service from '../appwrite/confi'
import { Container , PostCard } from '../components'

function Allpost() {
    const [posts , setposts] = useState([]);
    useEffect(()=>{},[])
    service.getposts([]).then((posts) => {
        if(posts) setposts(posts.documents)
    })
  return (
    <div className=' w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.length > 0 ? 
              (posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post = {post}/>
                </div>
              ))) : (
              <div className="w-full text-center">
                  <h1 className="text-2xl font-bold">Go add some posts!</h1>
              </div>
            )}
        </div>
      </Container>
    </div>
  )
}

export default Allpost
