import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from "@firebase/storage";


export default function MyModal() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.name,
            caption: captionRef.current.value,
            //取值 调用点击 或其他 都要带current     onClick={() => filePickerRef.current.click()}
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })
        // console.log("nnnnnn", docRef.id); //docRef.id是firebase自动添加的id 在数据库第二列
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        //storage用ref创建引用  database用doc(db, "posts", docRef.id)创建引用
        await uploadString(imageRef, selectedFile, "data_url").then(
          async (snapshot) => {//函数中有await 前面必须加async
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          }
        );
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
      
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }//这是按照readAsDataURL读取图片 可用src调用 
        //firebase上传时要用uploadString(imageRef, selectedFile, "data_url")
        //如果有文件 执行readAsDataURL 读取操做完成时自动触发onload 
        //reader.readAsDataURL完成后自动触发.onload 执行箭头函数
        //<input onChange={handleChange} />也是输入触发onChange 执行函数
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };


  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                
                {selectedFile ? (
                    <img src={selectedFile} 
                    className='object-contain w-full cursor-pointer'
                    onClick={() => setSelectedFile(null)}
                    alt="" />

                ) : (
                    <div 
                    onClick={() => filePickerRef.current.click()}
                    className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer'>
                        <CameraIcon className='w-6 h-6 text-red-600' />
                    </div>
                )}

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload a phote
                </Dialog.Title>
                <div className="">
                  <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
                  {/* input设置hidden 通过点击相机图标触发 */}
                </div>
                <div className="mt-2">
                  <input type="text" placeholder='Enter a caption' ref={captionRef} />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
