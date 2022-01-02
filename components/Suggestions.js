import faker from "faker";
import { useEffect, useState } from "react";

function Suggestions() {
    const [suggestions, setsuggestions] = useState([]);//react定义变量的形式

    useEffect(() => {
        const sugge = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));
        setsuggestions(sugge);
    // console.log([...Array(20)]);
    // console.log(suggestions);
    }, []);
    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between mb-5 text-sm">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="font-semibold text-gray-600">See All</button>
            </div>

            {suggestions.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between mt-3"> 
                    <img className="w-10 h-10 rounded-full border p-[2px]" src="https://i3.nichenggu.com/img/0027/g1nbdqt1fbp.jpg" alt="" />
                    <div className="flex-1 ml-4 ">
                        <h2 className="text-xs font-semibold">{profile.username}</h2>
                        <h3 className="text-xs text-gray-400">Works at {profile.company.name}</h3>
                    </div>
                    <button className="text-xs font-bold text-blue-400">Follow</button>
                </div> 
            ))}



        </div>
        )
    }

export default Suggestions
