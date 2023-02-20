import { auth, db } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Post(){
    //form state
    const [post, setPost] = useState({ description: ""});
    const [user, loading] = useAuthState(auth);

    //submit post 
    const submitPost = async (e) => {
        e.preventDefault(); //when forms submit, page regreshes but we dont want that

        //make a new post
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {
            ...post, 
            timeStamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });

    };

    return(
        <div my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-bold'>Create a new post</h1>
                
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea onChange={(e) => setPost({...post, description: e.target.value})} value={post.description} className=' h-48 w-full p-2 text-sm '></textarea>
                    <p className={`font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ""}`}>{post.description.length}/300</p>
                </div>
                <button 
                type="submit" 
                className='w-full  font-medium p-2 my-2 rounded-lg text-sm'>
                    Submit
                </button>


            </form>
        </div>
    );
}