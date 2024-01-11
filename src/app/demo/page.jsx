// "use client";
// import React, { useState, useEffect, memo } from "react";
// import SearchIcon from "@mui/icons-material/Search";


// const Ui = () => {

//     return (
//         <div className="w-full h-screen flex bg-[#bf72fb1a] justify-center">


//             <div className="w-[60%] mt-[5rem] flex flex-col">
//                 <div className="relative mb-[1rem]">
//                     <input
//                         type="text"
//                         placeholder="Search Guideline"
//                         className="border border-gray-300 py-2 rounded-tl-lg rounded-bl-lg pl-5 w-[92%] box-border hover:shadow-xl shadow-lg"
//                     />
//                     <button
//                         className="absolute top-[50%] right-[8.5%] transform -translate-y-1/2
//                  py-[8px] px-2 border-l-2 hover:border-4 hover:w-[4rem] hover:right-[7%] hover:bg-slate-300 hover:rounded-full ">
//                         <SearchIcon />
//                     </button>
//                 </div>

//                 <div className="w-[92%]">
//                     <p className="text-justify flex flex-col font-">
//                         <span className="font-bold">Covid</span>
//                         ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
//                     </p>
//                 </div>


//                 <div className="flex flex-wrap gap-4 justify-center mt-[1rem] pb-[1rem]">
//                     <div className="w-[25%] h-[13rem] bg-purple-400 rounded-xl flex justify-center items-center shadow-2xl ">

//                         <div className="w-[90%] h-[11rem] bg-white hover:border-4 px-4 py-4 my-2  cursor-pointer rounded-lg shadow-xl rounded-tr-3xl hover:rounded-tr-[2rem] relative border-[1px] border-purple-800 hover:border-purple-400">

//                             <div className="absolute top-0 right-[-1px] h-8 w-8 z-50 bg-purple-800 rounded-tr-3xl shadow-2xl">
//                             </div>

//                             <div className="flex 
//                             flex-col">
//                                 <p className="font-bold">covid</p>
//                                 <p className="mt-2 text-[12px]">
//                                     <span className="font-bold"> Status : </span>
//                                     current
//                                 </p>
//                                 <p className="text-[12px]">
//                                     <span className="font-bold">Date : </span>
//                                     10-2024
//                                 </p>
//                                 <p className="mt-2 text-[12px]">There are many variations of passages of Lorem Ipsum available, but the majority .. </p>
//                             </div>

//                         </div>
//                     </div>

//                    <div className="w-[25%] h-[13rem] bg-purple-400 rounded-xl flex justify-center items-center shadow-2xl ">

//                         <div className="w-[90%] h-[11rem] bg-white hover:border-4 px-4 py-4 my-2  cursor-pointer rounded-lg shadow-xl rounded-tr-3xl hover:rounded-tr-[2rem] relative border-[1px] border-purple-800 hover:border-purple-400">

//                             <div className="absolute top-0 right-[-1px] h-8 w-8 z-50 bg-purple-800 rounded-tr-3xl shadow-2xl">
//                             </div>

//                             <div className="flex 
//                             flex-col">
//                                 <p className="font-bold">covid</p>
//                                 <p className="mt-2 text-[12px]">
//                                     <span className="font-bold"> Status : </span>
//                                     current
//                                 </p>
//                                 <p className="text-[12px]">
//                                     <span className="font-bold">Date : </span>
//                                     10-2024
//                                 </p>
//                                 <p className="mt-2 text-[12px]">There are many variations of passages of Lorem Ipsum available, but the majority .. </p>
//                             </div>

//                         </div>
//                     </div>

//                    <div className="w-[25%] h-[13rem] bg-purple-400 rounded-xl flex justify-center items-center shadow-2xl ">

//                         <div className="w-[90%] h-[11rem] bg-white hover:border-4 px-4 py-4 my-2  cursor-pointer rounded-lg shadow-xl rounded-tr-3xl hover:rounded-tr-[2rem] relative border-[1px] border-purple-800 hover:border-purple-400">

//                             <div className="absolute top-0 right-[-1px] h-8 w-8 z-50 bg-purple-800 rounded-tr-3xl shadow-2xl">
//                             </div>

//                             <div className="flex 
//                             flex-col">
//                                 <p className="font-bold">covid</p>
//                                 <p className="mt-2 text-[12px]">
//                                     <span className="font-bold"> Status : </span>
//                                     current
//                                 </p>
//                                 <p className="text-[12px]">
//                                     <span className="font-bold">Date : </span>
//                                     10-2024
//                                 </p>
//                                 <p className="mt-2 text-[12px]">There are many variations of passages of Lorem Ipsum available, but the majority .. </p>
//                             </div>

//                         </div>
//                     </div>

//                    <div className="w-[25%] h-[13rem] bg-purple-400 rounded-xl flex justify-center items-center shadow-2xl ">

//                         <div className="w-[90%] h-[11rem] bg-white hover:border-4 px-4 py-4 my-2  cursor-pointer rounded-lg shadow-xl rounded-tr-3xl hover:rounded-tr-[2rem] relative border-[1px] border-purple-800 hover:border-purple-400">

//                             <div className="absolute top-0 right-[-1px] h-8 w-8 z-50 bg-purple-800 rounded-tr-3xl shadow-2xl">
//                             </div>

//                             <div className="flex 
//                             flex-col">
//                                 <p className="font-bold">covid</p>
//                                 <p className="mt-2 text-[12px]">
//                                     <span className="font-bold"> Status : </span>
//                                     current
//                                 </p>
//                                 <p className="text-[12px]">
//                                     <span className="font-bold">Date : </span>
//                                     10-2024
//                                 </p>
//                                 <p className="mt-2 text-[12px]">There are many variations of passages of Lorem Ipsum available, but the majority .. </p>
//                             </div>

//                         </div>
//                     </div>

//                    <div className="w-[25%] h-[13rem] bg-purple-400 rounded-xl flex justify-center items-center shadow-2xl ">

//                         <div className="w-[90%] h-[11rem] bg-white hover:border-4 px-4 py-4 my-2  cursor-pointer rounded-lg shadow-xl rounded-tr-3xl hover:rounded-tr-[2rem] relative border-[1px] border-purple-800 hover:border-purple-400">

//                             <div className="absolute top-0 right-[-1px] h-8 w-8 z-50 bg-purple-800 rounded-tr-3xl shadow-2xl">
//                             </div>

//                             <div className="flex 
//                             flex-col">
//                                 <p className="font-bold">covid</p>
//                                 <p className="mt-2 text-[12px]">
//                                     <span className="font-bold"> Status : </span>
//                                     current
//                                 </p>
//                                 <p className="text-[12px]">
//                                     <span className="font-bold">Date : </span>
//                                     10-2024
//                                 </p>
//                                 <p className="mt-2 text-[12px]">There are many variations of passages of Lorem Ipsum available, but the majority .. </p>
//                             </div>

//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Ui;
"use client"
import HTMLFlipBook from "react-pageflip";

function MyBook(props) {
  return (
    <HTMLFlipBook width={300} height={500}>
      <div className="bg-green-300">Page 1</div>
      <div className="bg-blue-300">Page 2</div>
      <div className="bg-red-300">Page 3</div>
      <div className="bg-pink-300">Page 4</div>
    </HTMLFlipBook>
  );
}
export default MyBook