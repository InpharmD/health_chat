import React,{useState} from "react";

const RenameModal = (props) => {
  const [title, setTitle] = useState("");
  
  const {isVisibleModal,onCloseModal,chatId,chatDeleted,setchatDeleted} =props

  
  let TokenPresent;
  if (typeof localStorage !== "undefined") {
    const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));

    TokenPresent = isTokenPresent?.data;
  }
  console.log(TokenPresent);


  if (!isVisibleModal) {
    return null;
  }
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onCloseModal(false);
    }
  };

  const handleEdit = () => {
    if(title.length===0){
        return
    }
    async function EditChat(user_id, access_token,chatId,title) {
      try {
        const response = await fetch(
          `https://inpharmd-ai.herokuapp.com/api/v2/chats/edit?access_token=${access_token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/vnd.api+json",
            },
            body: `user_id=${user_id}&chat_id=${chatId}&name=${title}`,
          }
        );
        const data = await response.json();
        onCloseModal(false);
        setchatDeleted(chatDeleted+1)
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    EditChat(TokenPresent.user_id, TokenPresent.access_token,chatId,title);
  };


  return (
    <>
      <div
        // className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 "
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50 "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[450px] flex flex-col bg-white rounded-lg sm:w-[450px] sm:h-[9rem] ">
          <div className="bg-white flex flex-row font-bold text-[16px] rounded-md shadow-xl pt-4 text-left ml-5 pb-[5px]">
            <div> Rename</div>
            <div className="flex-grow"></div>
            <button
              className="text-black mr-4 text-[21px]  px-2 rounded-lg relative bottom-1 hover:bg-gray-300"
              onClick={() => onCloseModal(false)}
            >
              &times;
            </button>
          </div>

          <div className=" ">
            <div className="bg-white rounded mb-1 ml-4 pr-4 py-2  flex-col text-left px-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Rename Chat"
                className="bg-indigo-50 p-3  rounded-md focus:outline-blue-500 text-[12px] w-[100%] h-[2rem] relative top-1 "
              />
            </div>
          </div>

          <div className="flex  justify-end mt-1 gap-3 mr-[24px]">
            <button className="text-white   text-[12px] px-3 py-1 rounded-md bg-gradient-to-r from-purple-200 to-yellow-200" onClick={handleEdit}>
             Rename
            </button>
            <button
              onClick={() => onCloseModal(false)}
              className="text-white   text-[12px] px-3 py-1 rounded-md bg-gradient-to-r from-purple-200 to-yellow-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenameModal;
