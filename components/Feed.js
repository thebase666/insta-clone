import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";

function Feed() {
    return (
        <main className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
            <section className="col-span-2">
                {/* 占两列 只有一列的话 顶出屏幕占两列 */}
                <Stories />
                <Posts />
            </section>

            <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed top-20">
                    {/* 这个位置fixed不动 如果sticky还是跟着动 因为父元素不一样 */}
                    <MiniProfile />
                    <Suggestions />
                </div>

            </section>


        </main>
    )
}

export default Feed
