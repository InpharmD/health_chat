"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInterface from "@/components/ChatInterface";

import NavbarHistory from "@/components/NavbarHistory";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  console.log(chats);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(chats);
  const [chatId, setchatId] = useState("");
  const textRef = useRef();
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [input]);

  let TokenPresent;
  if (typeof localStorage !== "undefined") {
    const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));

    TokenPresent = isTokenPresent?.data;
  }
  console.log(TokenPresent);

  useEffect(() => {
    // Redirect to login page if necessary data is not present
    if (typeof localStorage === "undefined" || TokenPresent === undefined) {
      router.push("/login");
    }
  }, [TokenPresent, router]);

  const handleSearch = async () => {
    setChats((prevChats) => [
      ...prevChats,
      { role: "user", content: input },
      { role: "assistant", content: "Loading..." },
    ]);
    fetchData(input, TokenPresent.user_id, chatId);
  };

  async function fetchData(question, userId, chatId) {
    let bodyData = `question=${encodeURIComponent(question)}&user_id=${userId}`;
    if (chatId) {
      bodyData += `&chat_id=${chatId}`;
    }

    setLoading(true); // Set loading to true at the start of the API call

    try {
      const response = await fetch(
        `https://inpharmd.ai/api/v2/health_chat?access_token=${TokenPresent.access_token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/vnd.api+json",
          },
          body: bodyData,
        }
      );

      const jsonResponse = await response.json();
      setchatId(jsonResponse.chat_id);

      setChats((prevChats) => {
        const newChats = [...prevChats];
        newChats[newChats.length - 1] = {
          role: "assistant",
          content: jsonResponse.answer,
        };
        return newChats;
      });

      setLoading(false); // Set loading to false after the API call is done
      setSuccess(true); // Set success to true after the API call is successful
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false if the API call fails
      setSuccess(false); // Set success to false if the API call fails
    }
  }

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleReset = () => {
    setChats("");
    setInput("");
    setchatId("");
  };
   
  const handleLogout=()=>{
    localStorage.clear();
    router.push("/login");
  }
  return (
    <div className="w-full h-full flex ">
      <div
        className={
          showMenu
            ? "px-2 pt-[1rem] w-[15%] overflow-y-scroll h-[100vh] "
            : "px-2 pt-[1rem] w-[15%] overflow-y-scroll h-[100vh] bg-gradient-to-r from-green-500 to-blue-400"
        }
      >
        <div className="border-b-2 mb-5 pb-2 flex justify-between">
          <span className="px-1 font-bold">History</span>
          <div onClick={handleMenu}>
            {showMenu ? (
              <span className="cursor-pointer font-bold text-xl">&times;</span>
            ) : (
              <MenuIcon className="cursor-pointer" />
            )}
          </div>
        </div>
        {showMenu ? <NavbarHistory setChats={setChats} /> : ""}
      </div>

      <div className="w-[85%]  pt-[3rem] flex flex-col overflow-y-scroll h-[100vh]">
        <div className="flex justify-end" onClick={handleLogout}>
          {" "}
          <button className="bg-gradient-to-r from-green-500 to-blue-400 p-3 text-white  rounded-xl mr-3">
            logout
          </button>
        </div>
        <h1 className="text-center font-semibold text-4xl mb-14 bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent">
          Sherlock
        </h1>

        <ChatInterface chats={chats} loading={loading} className="" />

        <div className="fixed bottom-4 flex justify-end z-50 mx-[5%]">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-green-500 to-[#38B2AC] bg-opacity-50 rounded-lg 
        text-white w-[44px] mr-2 h-[38px] relative top-[1px]"
          >
            <AutorenewIcon className="p-[1px]" />
          </button>

          <textarea
            type="text"
            value={input}
            ref={(node) => (textRef.current = inputRef.current = node)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            required
            className="focus:outline-blue-600 outline-gray-400 rounded-md 
              shadow-xl min-h-2 max-h-[50vh] resize-none input-box w-[56vw]
               bg-gray-200 py-2 px-4"
          />
          <button
            onClick={handleSearch}
            disabled={input.trim().length === 0}
            className="bg-gradient-to-r from-green-500 to-[#38B2AC] bg-opacity-50 rounded-lg 
            text-white w-[44px] ml-2 h-[38px] relative top-[1px]"
          >
            <SendIcon className="p-[1px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
