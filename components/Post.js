import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    PaperAirplaneIcon,
    EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { doc, addDoc, collection, serverTimestamp, 
    onSnapshot, orderBy, query, setDoc, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);//返回likes中的username
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => onSnapshot(
        query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
        (snapshot) => { setComments(snapshot.docs) }
    ), []);

    useEffect(() => onSnapshot(
        query(collection(db, "posts", id, "likes")),
        (snapshot) => { setLikes(snapshot.docs) }
    ), []);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => (like.id) === session?.user?.name) !== -1)
    }, [likes]);
    
    // 测试条件返回true, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
    // 如果没有符合条件的元素返回 -1


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.name));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.name), {
                username: session.user.name,
            });
        }
    };

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.name,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });//collection(db, "posts", id, "comments")中id是自动生成的id列
    };
    // setDoc(doc(db必须为要创建的文档指定ID  addDoc(collection自动生成ID

    return (
        <div className="bg-white border rounded-sm my-7">
            <div className="flex items-center p-5">
                <img src={userImg}
                    className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
                    alt="" />
                <p className="flex-1 font-bold">{username}</p>
                {/* flex-1 这个回头调一下 */}
                <DotsHorizontalIcon className="h-5" />
            </div>
            <img src={img} className="object-cover w-full" alt="" />
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4" >
                        {hasLiked ? (
                            <HeartIconFilled onClick={likePost} className="text-red-600 btn" />
                        ) : (
                            <HeartIcon onClick={likePost} className="btn" />
                        )}
                        <ChatIcon className="btn" />
                        <PaperAirplaneIcon className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}
            <p className="p-5 trancate">
                {likes.length > 0 && (
                    <p className="mb-1 font-bold">{likes.length} likes</p>
                )}
                <span className="mr-2 font-bold">{username}</span> {caption}</p>

            {comments.length > 0 && (
                <div className="ml-10 overflow-y-scroll h-30 scrollbar-track-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div className="flex items-center mb-3 space-x-2">
                            <img className="rounded-full h-7" src={comment.data().userImage} alt="" />
                            <p className="flex-1 text-sm">
                                <span className="mr-2 font-bold">{comment.data().username}</span>{comment.data().comment}</p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        
                        </div>
                    ))}
                </div>
            )}

            {session && (
                <form className="flex items-center p-4" action="">
                    {/* 这个为什么用form 直接input可以不 */}
                    <EmojiHappyIcon className="h-7" />
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="flex-1 border-none focus:ring-0"
                        type="text" placeholder="Add a comment..." />
                    {/* focus:ring-0点中也没有框 flex-1相当于flex-grow  */}
                    <button type="submit" disabled={!comment.trim()}
                        onClick={sendComment}
                        className="font-semibold text-blue-400">Post</button>
                </form>
            )}

        </div>


    )
}

export default Post
