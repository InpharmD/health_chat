import React, { useEffect, useState } from "react";

const NavbarHistory = (props) => {
  const {setChats} =props
  const [data, setData] = useState([]);
  const [test,setTest]=useState([])
  console.log(test)
  console.log(data.slice(204, 210));
  const manageLengthofText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch(
          "https://inpharmd.ai/api/v2/user_chats?user_id=a362e194-8e55-4dc3-b403-e9444f117556&chat_type=health&access_token=33eeaa11f2f3d16b8c0531b819b3ca0a",
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
    fetchData(); // Call the fetchData function
  }, []);


const handleClick =(id)=>{
  const fetchData = async () => {
    try {
      const apiData = await fetch(
        `https://inpharmd.ai/api/v2/chat_history?chat_id=${id}&access_token=33eeaa11f2f3d16b8c0531b819b3ca0a`,
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
  fetchData(); 
}



  return (
    <div className = ''>
    {data.map((item) => {
      return (
        <div key={item.id} className="p-2 mb-2 rounded-xl break-words border-b-2
         hover:shadow-lg hover:bg-gradient-to-r from-green-500  to-blue-400 cursor-pointer" onClick={()=>handleClick(item.id)}>
          {manageLengthofText(item.name, 50)}
        </div>
      );
    })}
  </div>
  );
};

export default NavbarHistory;
