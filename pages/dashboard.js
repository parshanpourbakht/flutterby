import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import Message from '@/components/message';
import {BsTrash2Fill} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import { async } from '@firebase/util';



export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth); //gives us the user
    const [posts, setPosts] = useState([]);


    const getData = async () => {
        //See if the user is logged
        if(loading) return;
        if(!user) return route.push('/auth/login');

        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        }));
        return unsubscribe;
    };

    //delete post 
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
    }
    
    //get user data
    useEffect(() => {
        getData();
    }, [user, loading]);

 

    return(
        <div>
            <h1>Your Posts</h1>
            <div>
                {posts.map((post) => {
                    return(
                        <Message {...post} key={post.id}>
                            <div className='flex gap-4'>
                                <button onClick={() => deletePost(post.id)} className='flex items-center justify-center gap-2 py-2 text-sm'><BsTrash2Fill />Delete</button>
                                <button className='flex items-center justify-center gap-2 py-2 text-sm'><AiFillEdit />Edit</button>
                            </div>
                        </Message>
                    );
                    
                })}
            </div>

            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>

    );

}