"use client";

import { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRouter } from "next/navigation";



const LoginPage = () => {
  const router = useRouter();
  const [einput, seteInput] = useState("");
  const [password, setPassword] = useState("");
  const [item, setItem] = useState(false);
  const [error, setError] = useState(null);
  const [LoginData, setLoginData] = useState("");
  console.log(LoginData);
  const handleSubmit = () => {
    const login = async ({ email, password }) => {
      const body = new URLSearchParams({
        email: email,
        password: password,
      });

      try {
        const response = await fetch("https://inpharmd.ai/api/v2/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/vnd.api+json",
          },
          body: body,
        });
        const data = await response.json();
        setLoginData({ data, apistatus: response.status });
      } catch (err) {
        setError(err.message);
      }
    };

    login({ email: einput, password: password });
    seteInput("");
    setPassword("");
    setItem(true);
  };


  {
    item ? localStorage.setItem("LoginCreds", JSON.stringify(LoginData)) : "";
  }

  let TokenPresent;
  if (typeof localStorage !== "undefined") {
    const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));

    TokenPresent = isTokenPresent?.data?.access_token;
  }
  console.log(TokenPresent);


  useEffect(() => {
    if (TokenPresent != undefined && LoginData.apistatus === 201) {
      router.push("/");
    } else if (LoginData.apistatus === 401 && TokenPresent === undefined) {
      setError("Invalid email or password.");
    } else if (TokenPresent != undefined) {
      router.push("/");
    } else {
      setError(null);
    }
  }, [TokenPresent, router, LoginData.apistatus]);

  // handle close for invalid email or password
  const handleCloseError = () => {
    setError(null);
  };

  // const bodyStyle = {
  //   overflowY: "hidden",
  // };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-yellow-50">
      <div className=" w-full h-screen ">

        {/*for invalid password or email*/}
        {error && (
          <div className="bg-orange-100  z-50 text-orange-600 text-[10px] px-4 py-3 rounded relative mb-4">
            {error}
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={handleCloseError}
            >
              &times;
            </button>
          </div>
        )}

        <div className="absolute top-[2%] ml-[23rem] 2xl:ml-[27rem] 1k:ml-[34rem] 2k:ml-[38rem] 4K:ml-[69rem] left-1/4 transform -translate-x-1/2">
          <h1
            className="bg-gradient-to-r from-purple-300 to-yellow-300 bg-clip-text text-transparent
               relative font-bold text-[30px] top-16 text-center "
          >
            SHERLOCK
          </h1>
        </div>

        <div
          className="w-[25%] h-[400px] 2xl:h-[450px] shadow-xl absolute top-[20%] left-[20%] 2xl:left-[25%]  1k:left-[30%] 2k:left-[34%] 4K:left-[38%] p-[2%] transform -translate-x-1/2 
            flex-col bg-gradient-to-r from-purple-300 to-yellow-300 ml-[25rem] mb-[5rem]  rounded-tl-[7rem]"
        >

        <div className="h-[10%] flex justify-center login text-left font-bold   text-white mt-4 "> 
        <PersonOutlineIcon className="" fontSize="large"/></div>


          <div className="h-[10%] flex justify-center login text-left font-bold text-[18px] mb-7 lg:mb-4 text-white mt-4 ">
            Login
          </div>

          <div className=" ">

            <input
              type="text"
              placeholder="User Name"
              value={einput}
              onChange={(e) => seteInput(e.target.value)}
              className="cursor-pointer w-[100%] h-[70%] focus:outline-indigo-500 
                text-[12px] py-2 mb-3 mr-2 px-3  2xl:py-3  sm:pr-6 border border-gray-300 rounded-full realtive
                 bg-indigo-50 focus:bg-white"
              required
            />
          </div>

          <div className=" relative top-[2%]">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cursor-pointer h-[70%] w-[100%] border border-gray-300 
               text-[12px] px-3 focus:outline-indigo-500 py-2  2xl:py-3  rounded-full sm:pr-6 bg-indigo-50 focus:bg-white"
              required
            />
          </div>


          <div
            className="cursor-pointer text-center flex justify-center align-middle bg-white 
            relative right-2 py-2  2xl:py-3    font-bold  text-xl rounded-full h-12
             ml-2 top-[12%] text-[10px] "
            onClick={handleSubmit}
          >
            <button className="  bg-gradient-to-r from-purple-300 to-yellow-300 bg-clip-text text-transparent relative  " onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="font-medium text-white text-xl relative top-[24%] ml-2 1k:ml-[7rem]">Welcome to Sherlock</div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
