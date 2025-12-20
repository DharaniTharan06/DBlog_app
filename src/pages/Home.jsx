import React , {useEffect , useState} from 'react'
import service from '../appwrite/confi'
import { Container , PostCard } from '../components'
import { useSelector } from 'react-redux'
function Home() {
    const [posts , setposts] = useState([])
    useEffect(() => {
        service.getposts().then((posts) => {
            if(posts) setposts(posts.documents)
        })
    } ,[])
    const authstatus = useSelector((state) => state.auth.status)
  if(posts.length === 0){
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            {authstatus ? "There are no posts yet. why not add one?" :"Login to read posts"}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }else{
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'> 
                         <PostCard {...post} /> 
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
  }
}

export default Home
