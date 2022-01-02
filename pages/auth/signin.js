import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
        <Header />
        <div className="flex flex-col items-center " >
            <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
            <p className="italic font-xs" >NOT REALL APP JUST CLONE</p>
            <div className="mt-20">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                    <button 
                    className="p-3 text-white bg-blue-500 rounded-full"
                    onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
                        Sign in with {provider.name}
                    </button>
                    </div>
                ))}
            </div>
        </div>
      
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}