import React, { useEffect, useState } from "react";

const NavbarHistory = (props) => {
  const { setChats } = props;
  const [data, setData] = useState([]);

  console.log(data.slice(204, 210));
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
    const fetchData = async (user_id,access_token) => {
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
    fetchData(TokenPresent.user_id,TokenPresent.access_token); // Call the fetchData function
  }, []);

  const handleClick = (id) => {
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
    fetchData(TokenPresent.access_token);
  };

  return (
    <div className="">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="p-2 mb-2 rounded-xl break-words border-b-2
         hover:shadow-lg hover:bg-gradient-to-r from-green-500  to-blue-400 cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            {manageLengthofText(item.name, 50)}
          </div>
        );
      })}
    </div>
  );
};

export default NavbarHistory;
