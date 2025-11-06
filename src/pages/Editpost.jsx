import React , {useState , useEffect} from 'react'
import { Container , PostForm } from '../components'
import service from '../appwrite/confi'
import { useNavigate, useParams } from 'react-router-dom'

function Editpost() {
    const [post ,setpost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getpost(slug).then((post) => {
                if(post) setpost(post)
            })
        }else{
            navigate('/')
        }
    } ,[navigate , slug])
  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default Editpost
