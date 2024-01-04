"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import Image from "next/image";
import NavbarHistory from "@/components/NavbarHistory";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRouter } from "next/navigation";
import MenuModal from "@/components/MenuModal";
import DeleteModal from "@/components/DeleteModal";
import RenameModal from "@/components/RenameModal";
const HomePage = () => {
  let TokenPresent;
  if (typeof localStorage !== "undefined") {
    const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));

    TokenPresent = isTokenPresent?.data;
  }
  console.log(TokenPresent);
  const router = useRouter();
  const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [historyNavClicked, sethistoryNavClicked] = useState(false);
  const [userDetails, setUserDetails] = useState("test@gmail.com");
  const [showMenuModal, setshowMenuModal] = useState(false);
  const [chatDeleted, setchatDeleted] = useState(1);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showRenameModal, setshowRenameModal] = useState(false);
  console.log(showDeleteModal);
  const [chatClicked, setChatClicked] = useState("");
  const [userClicked, setuserClicked] = useState(false);
  console.log(chats);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(chats);
  const [chatId, setchatId] = useState("");
  console.log(chatId);
  const textRef = useRef();
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [input]);

  useEffect(() => {
    // Redirect to login page if necessary data is not present
    if (typeof localStorage === "undefined" || TokenPresent === undefined) {
      router.push("/login");
    } if (typeof localStorage !== "undefined" || TokenPresent !== undefined) {
      setUserDetails(TokenPresent?.email)
    }
  }, [TokenPresent, router]);

  const handleSearch = async () => {
    setChats((prevChats) => [
      ...prevChats,
      { role: "user", content: input },
      { role: "assistant", content: "Loading..." },
    ]);
    fetchData(input, TokenPresent.user_id, chatId);
    sethistoryNavClicked(false);
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

  // const handleMenu = () => {
  //   setShowMenu(!showMenu);
  // };
  const handleReset = () => {
    setChats("");
    setInput("");
    setchatId("");
    setChatClicked("");
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    <div className="w-full h-full flex ">
      <div className={showMenu ? "px-2 pt-[1rem] w-[20%] max-h-[90vh] " : ""}>
        <div className="border-b-2 mb-5 pb-2 flex justify-between h-[4vh]" >
          <span
            className="px-1 font-bold w-[80%] cursor-pointer text-center  "
            onClick={handleReset}
          >
            {" "}
            <AutorenewIcon /> New chat{" "}
          </span>
        </div>

        <div
          className="text-sm flex-grow max-h-[80vh] flex flex-col  overflow-y-auto ml-4 relative 
                "
         >
          {showMenu ? (
            <NavbarHistory
              setChats={setChats}
              sethistoryNavClicked={sethistoryNavClicked}
              setchatId={setchatId}
              setChatClicked={setChatClicked}
              chatClicked={chatClicked}
              setshowMenuModal={setshowMenuModal}
              chatDeleted={chatDeleted}
            />
          ) : (
            ""
          )}
        </div>

        <div
          className="border-b-2  pb-2 flex justify-between flex-col h-[6vh] 2xl:h-[8vh]"
          onClick={() => setuserClicked(!userClicked)}
        >
          {userClicked ? (
          
              <button
                onClick={handleLogout}
                className="font-bold cursor-pointer bg-gradient-to-r from-purple-200 to-yellow-200 p-2 text-white 
         rounded-xl "
              >
                Logout
              </button>
          
          ) : (
            ""
          )}
          <span className="px-1 font-bold w-[100%] cursor-pointer ">
            {userDetails}
          </span>
        </div>
      </div>

      <div className="w-[85%]  pt-[3rem] flex flex-col overflow-y-scroll h-[100vh]">
        <h1 className="text-center font-semibold text-4xl mb-14 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
          Sherlock
        </h1>
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center 2xl:h-[50%]">
            <Image
              src={"/assets/inpharmd sherlock.png"}
              alt="Loader"
              width={50}
              height={50}
              className="relative mt-5 h-8 mb-5"
            />
            <p className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent text-xl">
              How can I help you today?
            </p>
          </div>
        )}

        <ChatInterface
          chats={chats}
          loading={loading}
          historyNavClicked={historyNavClicked}
          className=""
        />

        <div className="fixed bottom-4 flex justify-end z-50 mx-[5%]">
          <textarea
            type="text"
            value={input}
            ref={(node) => (textRef.current = inputRef.current = node)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Sherlock..."
            required
            className="focus:outline-blue-600 outline-gray-400 rounded-md 
              shadow-xl min-h-2 max-h-[50vh] resize-none input-box w-[56vw]
               bg-gray-200 py-2 px-4"
          />
          <button
            onClick={handleSearch}
            disabled={input.trim().length === 0}
            className="bg-gradient-to-r from-purple-300 to-yellow-300 bg-opacity-50 rounded-lg 
            text-white w-[44px] ml-2 h-[38px] relative top-[1px]"
          >
            <SendIcon className="p-[1px]" />
          </button>
        </div>
      </div>
      <MenuModal
        isVisibleModal={showMenuModal}
        onCloseModal={setshowMenuModal}
        setshowDeleteModal={setshowDeleteModal}
        setshowRenameModal={setshowRenameModal}
        showMenuModal={showMenuModal}
      />
      <DeleteModal
        isVisibleModal={showDeleteModal}
        onCloseModal={setshowDeleteModal}
        chatId={chatId}
        chatDeleted={chatDeleted}
        setchatDeleted={setchatDeleted}
      />
      <RenameModal
        isVisibleModal={showRenameModal}
        onCloseModal={setshowRenameModal}
        chatId={chatId}
        chatDeleted={chatDeleted}
        setchatDeleted={setchatDeleted}
      />
    </div>
  );
};

export default HomePage;
