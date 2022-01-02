import faker from "faker";
import Story from "./Story";
import { useEffect, useState } from "react";
import { Profiler } from "react/cjs/react.production.min";
import { signIn, signOut, useSession } from "next-auth/react";

function Stories() {
    const [suggestions, setsuggestions] = useState([]);//react定义变量的形式
    const { data: session } = useSession();

    useEffect(() => {
        const sugge = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));
        setsuggestions(sugge);
        // console.log([...Array(20)]);
        // console.log(suggestions);
    }, []);
    // Array(20)是empty array [...Array(20)]是[ undefined, undefined,...]
    //map((_, i) 忽略第一个内容undefined 第二个内容是id 加入到字典中 都传给suggestions
    return (
        <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-t-sm scrollbar-thin">
            {session && (
                <div>
                    <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500
                    border-2 object-contain cursor-pointer hover:scale-110 transition duration-150
                    ease-out" 
                    src={session.user.image} alt="" />
                    <p className="text-xs text-center truncate w-14">{session.user.name}</p>
                </div>
                // 不用map不用key
            )}
            
            {suggestions.map((profile) => (
                <Story 
                    key={profile.id}
                    img={profile.avatar}
                    username={profile.username}
                />
            ))}
            
        </div>
    )
}

export default Stories
