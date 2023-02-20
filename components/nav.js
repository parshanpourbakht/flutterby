import Link from "next/link"

export default function Nav(){
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-2xl font-medium">Flutterby</button>
            </Link>

            <ul className="flex items-center gap-10">
                <Link href="/auth/login">
                    <button className="text-2xl font-medium">Join</button>

                </Link>
            </ul>
        </nav>
    );
}