import Link from "next/link"
import { auth } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { GiButterfly } from 'react-icons/gi'

export default function Nav(){
    const [user, loading] = useAuthState(auth);
    console.log(user)
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-2xl font-medium flex align-middle gap-0">
                    Flutterby
                    <GiButterfly className="text-2xl py-0"/>

                    
                </button>
            </Link>
            <ul className="flex items-center gap-10">
                {/* if there is no user (user logged in) then show join button */}
                {!user && (
                <Link href="/auth/login">
                    <button className="text-2xl font-medium">Join</button>
                </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post">
                            <button className="font-medium py-2 px-4 rounded-mg textx-sm">Post</button>
                        </Link>

                        <Link href="/dashboard">
                            <img className="w-12 rounded-full cursor-pointer" src={user.photoURL}/>
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}