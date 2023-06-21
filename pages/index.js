import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const {data: session} = useSession();
    return (
        <Layout>
            <div className="text-blue-900 flex justify-between">
                <h2>
                    Hello, <b>{session?.user?.email}    </b>
                </h2>
                <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
                    <img src={session?.user?.image} alt="" className="w-8 h-8"/>
                    <span className="py-1 px-2">
                    {session?.user?.name}
                    </span>
                </div>
            </div>
        </Layout>
    )
}

