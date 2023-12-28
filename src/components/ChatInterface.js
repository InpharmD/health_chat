"use client"
import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import Image from "next/image";
const ChatInterface = ({ chats,loading }) => {
 


  return(
    <div className="flex flex-col space-y-4 ">
  
      {chats.map((message, index) => (
        <div
          key={index}
          className={`flex  items-end ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {
            message.role === 'user' ?
            <div className="w-[2rem] h-[2rem] p-2 bg-gradient-to-r from-green-500 mb-[5rem] to-blue-400 relative
            left-[54.8%] 3k:left-[54.5%] 2xl:left-[54%] 1k:left-[53.3%] 2k:left-[52.5%] 4K:left-[51.3%] rounded-xl">
              <PersonOutlineIcon className='w-[1rem] h-[1rem] relative bottom-2  text-white' />
            </div>
            : <div className="w-[2rem] h-[2rem] p-[6px] ml-1 bg-white rounded-xl mb-[5rem] border-2">
              <PersonOutlineIcon className='w-[1rem] h-[1rem] relative bottom-2 text-blue-400' />
            </div>
          }
  
          <div className={`relative w-[50%]  p-3 m-2 mr-[2.5rem] mb-[5rem] shadow-2xl rounded-lg
           ${message.role === 'user' ? 'bg-gradient-to-r from-green-500 to-blue-400 text-white' : 'colorful-text bg-white'}`}>
            <div className="font-bold text-sm mb-1">{message.role.toUpperCase()}</div>
            {message.role === 'assistant' && message.content === 'Loading...' ? (
              <Image
              src={"/loaders.svg"}
              alt="Loader"
              width={500} height={300}
              className="relative mt-5 h-8  mb-5"
            />// Use the Loading component here
            ) : (
              <p>{message.content}</p>
            )}
            
            <div className="text-right text-xs text-gray-200">{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      ))}
    </div>
    )
          };

export default ChatInterface;



