import Message from "@/components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";


export default function Details(){
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]);

    //submit message
    const submitMessage = async() => {
        if(!auth.currentUser){
            return router.push('/auth/login');
        }

        if(!message){
            toast.error("Dont leave an empty message", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, "posts", routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message, 
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            })
        });

        setMessage("");
    };

    const getComments = async () => {
        const docRef = doc(db, 'posts', routeData.id);
        const docSnap = await getDoc(docRef);
        setAllMessages(docSnap.data().comments);

    }

    useEffect(() => {
        if(router.isReady) return;
        getComments();
    }, []);

    return(
        <div>
            <Message {...routeData}>
                <div className="my-4">
                    <div className="flex">
                        <input className="w-full p-2 text-sm" onChange={(e) => setMessage(e.target.value)} type="text" value={message} placeholder="Send a message"/>
                        <button onClick={submitMessage} className="py-2 px-4 text-sm">Submit</button>
                    </div>
                </div>
            </Message>

            <div className="py-6">
                <h2 className="font-bold">Comments</h2>
                {allMessage?.map((message) => (
                    <h1>dfajkslj</h1>
                    <div>
                        <div>
                            <img src={message.avatar} alt=""/>
                            <h2>{message.userName}</h2>
                        </div>
                        <h2>{message.message}</h2>
                    </div>
                ))}
            </div>

        </div>

        

    );
}