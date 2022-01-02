import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Posts() {
    const [posts, setPosts] = useState([]);
    //这个useEffect不用参数 初始加载一次 用onSnapshot实现实时侦听
    //onSnapshot把第一个参数的查询结果 给第二个参数函数的参数
    //单一文档用doc  onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //多个文档用query onSnapshot(query(collection(db, "posts"),(s) => {s
    //snapshot.docs是数据集合传给post 每次更新都重新传递所有
    useEffect(() => onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {setPosts(snapshot.docs)}
    ),[]);




  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
