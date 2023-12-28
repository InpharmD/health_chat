// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import ChatInterface from "@/components/ChatInterface";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const HomePage = () => {
//   const inputRef = useRef(null);
//   const [chats, setChats] = useState([]);
//   const [chatId, setchatId] = useState("");
//   console.log(chats);
//   console.log(chatId)
//   const textRef = useRef();

//   const [input, setInput] = useState("");
//   const [dataToShow, setdataToShow] = useState([]);
//   console.log(dataToShow);
//   // console.log(input);

//   useEffect(() => {
//     if (textRef && textRef.current) {
//       textRef.current.style.height = "0px";
//       const taHeight = textRef.current.scrollHeight;
//       textRef.current.style.height = taHeight + "px";
//     }
//   }, [input]);

//   const handleSearch = async () => {

//     fetchData(input, "a362e194-8e55-4dc3-b403-e9444f117556", chatId);
//     async function fetchData(question, userId, chatId) {
//       let bodyData = `question=${encodeURIComponent(
//         question
//       )}&user_id=${userId}`;
//       if (chatId) {
//         bodyData += `&chat_id=${chatId}`;
//       }

//       try {
//         const response = await fetch(
//           "https://inpharmd-ai.herokuapp.com/api/v2/health_chat?access_token=33eeaa11f2f3d16b8c0531b819b3ca0a",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//               Accept: "application/vnd.api+json",
//             },
//             body: bodyData,
//           }
//         );

//         const jsonResponse = await response.json();
//         setChats(jsonResponse.messages);
//         // setChats((prevChats) => [
//         //   ...prevChats,
//         //   { text: input, sender: "user" },
//         //   { text: jsonResponse.prompts[0]["ai_summary"], sender: "assistant" },
//         // ]);
//         // The chat_id is returned in the response. You can return it from this function.
//         setchatId(jsonResponse.chat_id);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }

//     // Usage:
//     // const chatId = await fetchData('give me details of patients who are admitted with headache', 'a362e194-8e55-4dc3-b403-e9444f117556');
//   };

//   return (
//     <>
//       <h1 className="text-center mt-10 font-semibold text-4xl text-blue-500">
//         Heath Care Data
//       </h1>
//       <ChatInterface chats={chats} className="mb-9" />
//       <div className="flex">
//         <div className="sm:w-[60%] relative sm:left-[30%] sm:bottom-[1px] 2xl:w-[50%] xl:left-[35%] 2xl:left-[35%] mt-10">
//           <div className="mt-4 relative top-14">
//             <textarea
//               type="text"
//               value={input}
//               ref={(node) => (textRef.current = inputRef.current = node)}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask anything..."
//               required
//               className="focus:outline-blue-600 px-3 py-4 mb-3 mt-2 outline-gray-400 rounded-md shadow-xl relative
//                h-auto max-h-[50vh] right-16 resize-none input-box sm:w-[56.1vw] 2xl:w-[47vw] 1k:w-[47.3vw] 4K:w-[47.7vw] 1k:right-[5rem] 2k:right-[7rem] 4K:right-[23rem]"
//             />
//           </div>
//           <div>
//             <button
//               onClick={handleSearch}
//               disabled={input.trim().length === 0}
//               className={`relative left-[81%] 2xl:left-[87%] 1k:left-[83%] 2k:left-[83%] 4K:left-[79.5%] 5k:left-[81%]
//                bottom-[17px] bg-blue-600 mb-2 mt-3 p-[2px] rounded-full text-white `}
//             >
//               <ArrowForwardIcon className="h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;
"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavbarHistory from "@/components/NavbarHistory";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Tooltip } from "@mui/material";
const HomePage = () => {
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

  const handleSearch = async () => {
    setChats((prevChats) => [
      ...prevChats,
      { role: "user", content: input },
      { role: "assistant", content: "Loading..." },
    ]);
    fetchData(input, "a362e194-8e55-4dc3-b403-e9444f117556", chatId);
  };

  // async function fetchData(question, userId, chatId) {
  //   let bodyData = `question=${encodeURIComponent(
  //     question
  //   )}&user_id=${userId}`;
  //   if (chatId) {
  //     bodyData += `&chat_id=${chatId}`;
  //   }

  //   try {
  //     const response = await fetch(
  //       "https://inpharmd-ai.herokuapp.com/api/v2/health_chat?access_token=33eeaa11f2f3d16b8c0531b819b3ca0a",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Accept: "application/vnd.api+json",
  //         },
  //         body: bodyData,
  //       }
  //     );

  //     const jsonResponse = await response.json();
  //     setchatId(jsonResponse.chat_id);

  //     // Filter out the greeting message
  //     const filteredMessages = jsonResponse.messages.filter(message => message.content !== "Hi there! I'm Sherlock, an AI assistant.");

  //     // Add a delay before each assistant's message is added to the state
  //     filteredMessages.forEach((message) => {
  //       if (message.role === 'assistant' && !chats.find((chat) => chat.content === message.content && chat.role === message.role)) {
  //         setTimeout(() => {
  //           setChats((prevChats) => [...prevChats, message]);
  //         }, 100);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  async function fetchData(question, userId, chatId) {
    let bodyData = `question=${encodeURIComponent(question)}&user_id=${userId}`;
    if (chatId) {
      bodyData += `&chat_id=${chatId}`;
    }

    setLoading(true); // Set loading to true at the start of the API call

    try {
      const response = await fetch(
        "https://inpharmd.ai/api/v2/health_chat?access_token=33eeaa11f2f3d16b8c0531b819b3ca0a",
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

      // Filter out the greeting message
      // const filteredMessages = jsonResponse.messages.filter(
      //   (message) =>
      //     message.content !== "Hi there! I'm Sherlock, an AI assistant."
      // );

      // Add a delay before each assistant's message is added to the state
      // filteredMessages.forEach((message) => {
      //   // if (message.role === 'assistant' && !chats.find((chat) => chat.content === message.content && chat.role === message.role)) {
      //   //   setTimeout(() => {
      //   //     setChats((prevChats) => [...prevChats, message]);
      //   //   }, 100);
      //   // }
      // });
      setChats((prevChats) => {
        const newChats = [...prevChats];
        newChats[newChats.length - 1] = {
          role: "assistant",
          content: jsonResponse.answer,
        };
        return newChats;
      });
      // setChats((prevChats) => [...prevChats, { role: "assistant", content:jsonResponse.answer }]);
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
  return (
    <div className="w-full h-full flex">
      <div className="px-2 pt-[1rem] w-[15%] overflow-y-scroll h-[100vh]">
        <div className="border-b-2 mb-5 pb-2 flex justify-between">
          <spam className="px-1 font-bold">History</spam>
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
