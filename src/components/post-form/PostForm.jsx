import React , {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE} from '../index'
import service from '../../appwrite/confi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const { register , handleSubmit , watch , setValue , getValues , control} = useForm({
        defaultValues: {
            title: post ? post.title : "",
            slug: post ? post.slug : "",
            content: post ? post.content : "",
            status: post ? post.status : 'active',

        },
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? service.uploadfile(data.image[0]) : null
            if(file){
                service.deletefile(post.featuredimg)
            }
            const dbpost = service.updatepost(post.$id , {...data , featuredimg: file ? file.$id : undefined})
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const file = await service.uploadfile(data.image[0])
            if(file){
                const fileid = file.$id 
                data.featuredimg = fileid
                const dbpost = await service.createpost({
                    ...data,
                    userID: userData.$id
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }
    const slugtransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
        return ''
    })
    useEffect(() =>{
        const subscription = watch((value , {name})=>{
            if(name === "title"){
                setValue("slug",slugtransform(value.title,{shouldValidate: true}))
            }
        })

        return ()=>{subscription.unsubscribe()}
    },[watch, setValue, slugtransform])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getfilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm
