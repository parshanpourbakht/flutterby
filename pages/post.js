import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Post(){
    //form state
    const [post, setPost] = useState({ description: ""});

    return(
        <div my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto>
            <form>
                <h1 className='text-2xl font-bold'>Create a new post</h1>
                
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea onChange={(e) => setPost(e.target.value)} value={post.description} className=' h-48 w-full p-2 text-sm '></textarea>
                    <p className=''>0/300</p>
                </div>
                <button className='w-full  font-medium p-2 my-2 rounded-lg text-sm'>Submit</button>
            </form>
        </div>
    );
}