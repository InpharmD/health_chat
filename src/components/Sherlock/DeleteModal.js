import React, { memo,useCallback } from "react";
import { getToken } from "@/app/utils/LocalStorage";
const DeleteModal = memo((props) => {
  const { isVisibleModal, onCloseModal, chatId, chatDeleted, setchatDeleted } =
    props;

    // const getToken = useCallback(() => {
    //   let TokenPresent;
    //   if (typeof localStorage !== "undefined") {
    //     const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));
    //     TokenPresent = isTokenPresent?.data;
    //   }
    //   return TokenPresent;
    // }, []); // No dependencies as localStorage and LoginCreds are not expected to change
    const TokenPresent = getToken();
    // console.log(TokenPresent)


  const handleDelete = () => {
    async function deleteChat(user_id, access_token, chatId) {
      try {
        const response = await fetch(
          `https://inpharmd-ai.herokuapp.com/api/v2/chats/delete?access_token=${access_token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/vnd.api+json",
            },
            body: `user_id=${user_id}&chat_id=${chatId}`,
          }
        );
        const data = await response.json();
        onCloseModal(false);
        setchatDeleted(chatDeleted + 1);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    deleteChat(TokenPresent.user_id, TokenPresent.access_token, chatId);
  };

  if (!isVisibleModal) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onCloseModal(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="  flex flex-col bg-white rounded-lg sm:w-[25%] ">
          <button
            className="bottom-5 mt-6 mr-4 px-2 place-self-end text-black text-[21px] rounded-lg hover:bg-gray-300 relative z-50 wrapper"
            onClick={() => onCloseModal(false)}
          >
            &times;
          </button>
          <div className=" font-bold  text-[16px] border-b pl-[1.3rem]  text-center relative bottom-9 ">
            <p className="relative right-[1rem] bottom-3">Delete</p>
          </div>

          <div className="font-bold relative left-5 bottom-6 text-[14px]">
            Are you sure you want to Delete?
          </div>

          <div className="flex  justify-end mb-3 gap-3 mr-[24px] relative bottom-2">
            <button
              className="text-white bg-gradient-to-r from-purple-200 to-yellow-200  text-[12px] px-3 py-1 rounded-md hover:bg-slate-700"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="text-white  bg-gradient-to-r from-purple-200 to-yellow-200 text-[12px] px-3 py-1 rounded-md hover:bg-slate-700"
              onClick={() => onCloseModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
DeleteModal.displayName = 'DeleteModal';
export default DeleteModal;
