import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth); //gives us the user

    const getData = async () => {
        //See if the user is logged
        if(loading) return;
        if(!user) return route.push('/auth/login')
    };
    
    //get user data
    useEffect(() => {
        getData();
    }, [user, loading]);

 

    return(
        <div>
            <h1>Your Posts</h1>
            <div>
                posts
            </div>

            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>

    );

}