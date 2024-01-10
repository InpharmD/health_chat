"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ChatInterface from "@/components/Sherlock/ChatInterface";

import NavbarHistory from "@/components/Sherlock/NavbarHistory";
// import SendIcon from "@mui/icons-material/Send";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRouter } from "next/navigation";
import MenuModal from "@/components/Sherlock/MenuModal";
import DeleteModal from "@/components/Sherlock/DeleteModal";
import RenameModal from "@/components/Sherlock/RenameModal";
import GuideLinesButton from "@/components/Sherlock/GuideLinesButton";
import SherlockImage from "@/components/Sherlock/SherlockImage";
import SherlockInput from "@/components/Sherlock/SherlockInput";
import { getToken } from "../utils/LocalStorage";
const sherlock = () => {
  // Define and memoize getToken function
  // const getToken = useCallback(() => {
  //   let TokenPresent;
  //   if (typeof localStorage !== "undefined") {
  //     const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));
  //     TokenPresent = isTokenPresent?.data;
  //   }
  //   return TokenPresent;
  // }, []); // No dependencies as localStorage and LoginCreds are not expected to change

  // console.log(TokenPresent);
  const router = useRouter();
  // const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [historyNavClicked, sethistoryNavClicked] = useState(false);
  const [userDetails, setUserDetails] = useState("test@gmail.com");
  // const [userId,setuserId]=useState("")
  // const [userToken,setuserToken]=useState("")
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
  // const textRef = useRef();
  // const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(true);

  // useEffect(() => {
  //   if (textRef && textRef.current) {
  //     textRef.current.style.height = "0px";
  //     const taHeight = textRef.current.scrollHeight;
  //     textRef.current.style.height = taHeight + "px";
  //   }
  // }, [input]);

  // useEffect(() => {
  //   // Redirect to login page if necessary data is not present
  //   if (typeof localStorage === "undefined" || TokenPresent === undefined) {
  //     router.push("/login");
  //   }
  //   if (typeof localStorage !== "undefined" || TokenPresent !== undefined) {
  //     setUserDetails(TokenPresent?.email);
  //     setuserId(TokenPresent.user_id);
  //     setuserToken(TokenPresent.access_token)

  //   }
  // }, [TokenPresent, router]);

  useEffect(() => {
    const TokenPresent = getToken();

    // Redirect to login page if necessary data is not present
    if (typeof localStorage === "undefined" || TokenPresent === undefined) {
      router.push("/login");
    }
    if (typeof localStorage !== "undefined" || TokenPresent !== undefined) {
      setUserDetails(TokenPresent?.email);
      // setuserId(TokenPresent.user_id);
      // setuserToken(TokenPresent.access_token)
    }
  }, [getToken, router]); // Added getToken to dependencies

  // const handleSearch = async () => {
  //   setChats((prevChats) => [
  //     ...prevChats,
  //     { role: "user", content: input },
  //     { role: "assistant", content: "Loading..." },
  //   ]);
  //   fetchData(input, TokenPresent.user_id, chatId);
  //   sethistoryNavClicked(false);
  // };

  const handleReset = () => {
    setChats("");
    // setInput("");
    setchatId("");
    setChatClicked("");
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    <div className="w-full h-full flex ">
      <div
        className={
          showMenu
            ? "px-2 pt-[1rem] w-[20%] h-screen border-r-2 border-yellow-200  "
            : ""
        }
      >
        <div className="border-b-2 mb-5 xl:pb-8 2xl:pb-2 h-[4vh] sticky top-1 flex justify-evenly">
          <span
            className="px-1 font-bold w-[80%] cursor-pointer  "
            onClick={handleReset}
          >
            {" "}
            <AutorenewIcon /> New chat{" "}
          </span>
        </div>

        <div
          className="text-sm flex-grow max-h-[80vh] flex flex-col  overflow-y-auto ml-2 relative 
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

        {userClicked ? (
          <div className="fixed p-2 bottom-[8vh] 2xl:bottom-[6vh] w-[17%] bg-gradient-to-r from-purple-200 to-yellow-200 rounded-xl">
            <ul>
              <li className="font-bold cursor-pointer p-2 text-white border-b-2">
                Settings
              </li>
              <li
                onClick={handleLogout}
                className="font-bold cursor-pointer p-2 text-white rounded-xl "
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div
          className="border-b-2 fixed bottom-2 pb-2 flex justify-between flex-col h-[6vh] 2xl:h-[4vh]"
          onClick={() => setuserClicked(!userClicked)}
        >
          <span className="px-1 font-bold w-[100%] cursor-pointer ">
            {userDetails}
          </span>
        </div>
      </div>

      <div className="w-[85%]  pt-[1rem] flex flex-col overflow-y-scroll h-[100vh]">
        <GuideLinesButton />

        <h1 className="text-center font-semibold text-4xl mb-14 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
          Sherlock
        </h1>
        {chats.length === 0 && <SherlockImage />}

        <ChatInterface
          chats={chats}
          loading={loading}
          historyNavClicked={historyNavClicked}
        />

        <SherlockInput
          setChats={setChats}
          sethistoryNavClicked={sethistoryNavClicked}
          chatId={chatId}
          setchatId={setchatId}
          setLoading={setLoading}
          setSuccess={setSuccess}
          chats={chats}
        />
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

export default sherlock;
