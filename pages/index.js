import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { data: session } = useSession()
  if(session) {
    return (
        //bg-blue-900 min-h-screen
        <div className="bg-blue-900 min-h-screen">
            <Nav/>
          <div className="text-center w-full">
            Signed in as {session.user.email} <br/>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
    )

  }
  return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div>
          Not signed in <br/>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
  )

}

