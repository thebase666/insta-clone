import Image from "next/image";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

    return (
        <div className="sticky top-0 z-50 bg-white border-b shadow-md">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                {/* 限宽 大屏居中max-w-6xl mx-5 lg:mx-auto */}
                <div onClick={() => router.push('/')} className="relative hidden w-24 lg:inline-grid">
                {/* lg:inline-grid注意 */}
                    <Image 
                        src="https://links.papareact.com/ocw" 
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div onClick={() => router.push('/')} className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
                {/* flex-shrink-0不压缩  w h可以小数分数个位数和四的倍数 */}
                    <Image 
                        src="https://links.papareact.com/jjm" 
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div className="max-w-xs">
                    <div className="relative p-3 mt-1 ">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            {/* absolute相对relative的父元素 如果父元素没有relative 就找父元素的父元素
                            relative把子元素包括进来 
                            inset-y-0占满整个y轴 再用flex items-center让子元素居中 */}
                            <SearchIcon className="w-5 h-5 text-gray-500" />
                        </div>
                            {/* block块级元素带有换行符 inline内联元素没有换行符。 */}
                        <input
                            className="w-full pl-10 border-gray-300 rounded-md bg-gray-50 sm:text-sm focus:ring-black focus:border-black "
                            type="text"
                            placeholder="Search"
                            // focus:ring-black focus:border-black 里框外框都改色
                        />
                    </div>
                </div>
                {/* flex justify-end 水平怼到右侧 */}
                {/* md:hidden 手机显示 电脑屏消失 md 768px */}
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon onClick={() => router.push('/')} className="navBtn"/>
                    <MenuIcon className="h-6 cursor-pointer md:hidden"/>

                    {session ? (
                        <>
                        {/* 需要这个<> </>否则报错 */}
                            <div className="relative navBtn">
                                <PaperAirplaneIcon className="rotate-45 navBtn"/>
                                {/* flex items-center让子元素或内容居中 justify-center横向居中  */}
                                <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-2 -top-1">
                                    3</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn"/>
                            <UserGroupIcon className="navBtn"/>
                            <HeartIcon className="navBtn"/>
                            <img 
                            onClick={signOut}
                            src={session.user.image} alt="profile" className="w-10 h-10 rounded-full cursor-pointer" />
                        </>
                    ): (
                        <button onClick={signIn}>SignIn</button>
                    )}
                    
                </div>


                
            </div>
        </div>
    )
}

export default Header
