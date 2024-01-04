
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuModal from "./MenuModal";
const NavbarHistory = (props) => {
  const { setChats, sethistoryNavClicked, setchatId,setChatClicked,chatClicked,setshowMenuModal, chatDeleted} = props;
  const [data, setData] = useState([]);
  const router = useRouter();

  // console.log(data.slice(204, 210));
  const manageLengthofText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  let TokenPresent;
  if (typeof localStorage !== "undefined") {
    const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));

    TokenPresent = isTokenPresent?.data;
  }
  console.log(TokenPresent);



  useEffect(() => {
    const fetchData = async (user_id, access_token) => {
      try {
        const apiData = await fetch(
          `https://inpharmd.ai/api/v2/user_chats?user_id=${user_id}&chat_type=health&access_token=${access_token}`,
          {
            method: "GET",
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        const response = await apiData.json();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(TokenPresent?.user_id, TokenPresent?.access_token); // Call the fetchData function
  }, [chatDeleted]);

  const handleClick = (id) => {
    setchatId(id);
    setChatClicked(id)
    const fetchData = async (access_token) => {
      try {
        const apiData = await fetch(
          `https://inpharmd.ai/api/v2/chat_history?chat_id=${id}&access_token=${access_token}`,
          {
            method: "GET",
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        const response = await apiData.json();
        setChats(response.messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(TokenPresent?.access_token);
    sethistoryNavClicked(true);
  };

  const handleEdit = (id) => {
    async function EditChat(user_id, access_token) {
      try {
        const response = await fetch(
          `https://inpharmd-ai.herokuapp.com/api/v2/chats/edit?access_token=${access_token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/vnd.api+json",
            },
            body: `user_id=${user_id}&chat_id=${id}&name=patient%20details`,
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    EditChat(TokenPresent?.user_id, TokenPresent?.access_token);
  };

  const handleDelete = (id) => {
    async function deleteChat(user_id, access_token) {
      try {
        const response = await fetch(
          `https://inpharmd-ai.herokuapp.com/api/v2/chats/delete?access_token=${access_token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/vnd.api+json",
            },
            body: `user_id=${user_id}&chat_id=${id}`,
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    deleteChat(TokenPresent?.user_id, TokenPresent?.access_token);
  };

  return (
    <div className="">
      {data.map((item) => {
        return (
          // <div className="flex justify-between hover:bg-gradient-to-r from-purple-200 to-yellow-200 hover:shadow-lg" key={item.id}>
          //   <div
          //     key={item.id}
          //     className="p-1  rounded-xl break-words border-b-2
          //  cursor-pointer w-[300px] h-[50px]"
          //     onClick={() => handleClick(item.id)}
          //   >
          //     {manageLengthofText(item.name, 30)}
          //   </div>

          //   {chatClicked === item.id &&  <span className="cursor-pointer mt-3 font-bold text-xl text-center" onClick={()=>setshowMenuModal(true)}>
          //   ...
          //  </span> } 
             
          
          // </div>
          
          <div className="flex justify-between hover:bg-gradient-to-r from-purple-200 to-yellow-200 hover:shadow-lg" key={item.id}>
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-xl break-words border-b-2 cursor-pointer w-[300px] h-[50px]"
            onClick={() => handleClick(item.id)}
          >
            <span>{manageLengthofText(item.name, 30)}</span>
            {chatClicked === item.id &&  
              <span className="cursor-pointer font-bold text-xl mb-3" onClick={()=>setshowMenuModal(true)}>
                ...
              </span>
            }
          </div>
        </div>
        

          
        );
      })}
    </div>
  );
};

export default NavbarHistory;
