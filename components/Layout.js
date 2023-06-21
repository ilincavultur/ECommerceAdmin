import {signIn, signOut, useSession} from "next-auth/react";
import Nav from "@/components/Nav";

export default function Layout({children}) {

    const { data: session } = useSession()
    if(session) {
        return (
            <div className="bg-blue-900 min-h-screen flex">
                <Nav/>
                <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
                    {children}
                </div>
            </div>
        )

    }
    return (
        <div className="bg-blue-900 w-screen h-screen flex items-center">
            <div> //text-center w-full
                Not signed in <br/>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        </div>
    )

}

