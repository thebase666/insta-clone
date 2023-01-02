import logo from '../images.jpg';

function Story({ img, username }) {
    return (
        <div>
            <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500
            border-2 object-contain cursor-pointer hover:scale-110 transition duration-150
            ease-out"
                src={logo.src} alt="" />
            <p className="text-xs text-center truncate w-14">{username}</p>
        </div>
    )
}

export default Story
