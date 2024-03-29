"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TypeIt from "typeit-react"; // IMPORT THE TYPEIT COMPONENT
import Image from "next/image";

const ChatInterface =memo(({ chats, historyNavClicked }) => {
  // console.log(chats.length);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col space-y-4 ">
      {chats &&
        chats.map((message, index) => (
          <div
            key={index}
            className={`flex  items-end ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "user" ? (
              <div
                className="w-[2rem] h-[2rem] p-2 bg-gradient-to-r from-purple-300 to-yellow-300 mb-[5rem] relative
             rounded-xl"
              >
                <PersonOutlineIcon className="w-[1rem] h-[1rem] relative bottom-2  text-white" />
              </div>
            ) : (
              <div className="w-[2rem] h-[2rem] p-[6px] ml-1 bg-white rounded-xl mb-[5rem] border-2">
                <PersonOutlineIcon className="w-[1rem] h-[1rem] relative bottom-2 text-purple-400" />
              </div>
            )}

            <div
              className={`relative w-[50%]  p-3 m-2 mr-[2.5rem] mb-[5rem] shadow-2xl rounded-lg
           ${
             message.role === "user"
               ? "bg-gradient-to-r from-purple-300 to-yellow-300 text-white"
               : "bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent bg-white"
           }`}
            >
              <div className="font-bold text-sm mb-1">
                {message.role.toUpperCase()}
              </div>
              {message.role === "assistant" &&
              message.content === "Loading..." ? (
                <Image
                  src={"/assets/loaders.svg"}
                  alt="Loader"
                  width={500}
                  height={300}
                  className="relative mt-5 h-8  mb-5"
                /> // Use the Loading component here
              ) : // REMOVE THE CURLY BRACES HERE
              index === chats.length - 1 && !historyNavClicked ? (
                <TypeIt options={{ speed: 1 }}>{message.content}</TypeIt>
              ) : (
                <p>{message.content}</p>
              ) // USE THE TYPEIT COMPONENT WITH SOME OPTIONS
              }

              <div className="text-right text-xs text-gray-200">
                {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>
        ))}
    </div>
  );
});
ChatInterface.displayName = 'ChatInterface';
export default ChatInterface;