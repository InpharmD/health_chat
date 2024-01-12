"use client";
import React, { useState, useEffect, memo } from "react";
import SearchIcon from "@mui/icons-material/Search";

import useDebounce from "@/hooks/useDebounce";

import GuideLinesInput from "./GuideLinesInput";
import GuideLineCards from "./GuideLineCards";
import SherlockButton from "./SherlockButton";
import { useRouter } from "next/navigation";
import { getToken } from '../../app/utils/LocalStorage'
const Main = memo((props) => {
  const { setShowAccordion, setId,setcardName } = props;
  const [showStatus, setShowStatus] = useState(true);
  const [showOrganSystem, setShowOrganSystem] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [showOrganism, setShowOrganism] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [asideData, setAsideData] = useState({});
  const [checkStatus, setCheckStatus] = useState("");
  const [checkOrganSystem, setCheckOrganSystem] = useState([]);
  const [checkOrganism, setCheckOrganism] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 1000);
  const [userDetails, setUserDetails] = useState("test@gmail.com");
  const [userClicked, setuserClicked] = useState(false);
  const router = useRouter();



  useEffect(() => {
    const TokenPresent = getToken();

    if (typeof localStorage === "undefined" || TokenPresent === undefined) {
      router.push("/login");
    }
    if (typeof localStorage !== "undefined" || TokenPresent !== undefined) {
      setUserDetails(TokenPresent?.email);
    }
  }, [getToken, router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };


  console.log("main");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://guidelines-5f26942dfcdf.herokuapp.com/api/v2/guidelines/filter_options",
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        const data = await response.json();
        setAsideData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log("maineff");
  }, []);
  // console.log(asideData)

  const handleStatus = () => {
    console.log("mainstatus");
    setShowStatus(!showStatus);
  };

  const handleOrganSystem = () => {
    console.log("mainorgan");
    setShowOrganSystem(!showOrganSystem);
  };

  const handleLoadMore = () => {
    console.log("mainloadmore");
    setLoadMore(!loadMore);
  };

  const handleOrganism = () => {
    console.log("mainoraganism");
    setShowOrganism(!showOrganism);
  };

  const handleCard = (id) => {
    console.log("mainstatus handlecard");
    setShowAccordion();
    setId(id);
  };

  useEffect(() => {
    handleChecked();
  }, [checkStatus, checkOrganSystem, checkOrganism, debouncedValue]);

  const handleChecked = async () => {
    try {
      let params = new URLSearchParams();

      if (checkStatus.length > 0) {
        params.append("status", checkStatus);
      }
      if (checkOrganSystem.length > 0) {
        params.append("organ_system", checkOrganSystem.join(", "));
      }
      if (checkOrganism.length > 0) {
        params.append("organism", checkOrganism.join(", "));
      }
      if (debouncedValue.trim().length > 0) {
        params.append("search", debouncedValue);
      }

      let endpoint = `https://guidelines-5f26942dfcdf.herokuapp.com/api/v2/guidelines/filter?${params.toString()}`;

      const response = await fetch(endpoint, {
        headers: {
          Accept: "application/vnd.api+json",
        },
      });

      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusCheckboxChange = (status) => {
    setCheckStatus((prevChecked) => {
      if (prevChecked === status) {
        return "";
      } else {
        return status;
      }
    });
    console.log("mainstat");
  };

  return (
    <div className="w-full flex bg-[#bf72fb1a] ">
      <aside className="pl-[8rem] mt-[5rem] w-[30%] ">
        <SherlockButton />

        <div className={`border-2 rounded-xl w-[15rem]  mb-4 `}>
          <div
            onClick={handleStatus}
            className={` flex justify-between font-bold py-2 px-4 text-white text-[16px]
                         bg-[#8347ae] 
                            ${showStatus ? "rounded-t-xl" : "rounded-xl"}`}
          >
            <span>Status</span>
            <span>{showStatus ? "-" : "+"}</span>
          </div>
          {showStatus && asideData?.status ? (
            <div>
              <ul className="text-[12px] cursor-pointer">
                {asideData.status.map((status) => (
                  <li
                    key={status}
                    className={`py-2 px-4 border-b-2 flex ${
                      checkOrganSystem.length > 1 && checkStatus != status
                        ? "disabled:opacity-50 cursor-not-allowed bg-[rgb(203,203,204)]"
                        : "hover:bg-slate-100 cursor-pointer"
                    } `}
                  >
                    <input
                      disabled={checkOrganSystem.length > 1}
                      className={`mr-4 ${
                        checkOrganSystem.length > 1 && checkStatus != status
                          ? "disabled:opacity-50 cursor-not-allowed "
                          : "cursor-pointer"
                      }`}
                      type="checkbox"
                      checked={checkStatus === status}
                      onChange={() => handleStatusCheckboxChange(status)}
                    />
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="border-2 rounded-xl w-[15rem] cursor-default mb-4">
          <div
            onClick={handleOrganSystem}
            className={` flex justify-between font-bold py-2 px-4 text-white text-[16px] 
                        bg-[#8347ae]  ${
                          showOrganSystem ? "rounded-t-xl" : "rounded-xl"
                        }`}
          >
            <span>Organ System</span>
            <span>{showOrganSystem ? "-" : "+"}</span>
          </div>
          {showOrganSystem && asideData?.organ_system ? (
            <div>
              <ul className="text-[12px] cursor-pointer">
                {asideData.organ_system.slice(0, 5).map((organSystem) => (
                  <li
                    key={organSystem}
                    className={`py-2 px-4 border-b-2 flex ${
                      checkOrganSystem.length > 1 &&
                      !checkOrganSystem.includes(organSystem)
                        ? "disabled:opacity-50 cursor-not-allowed bg-[rgb(203,203,204)]"
                        : "hover:bg-slate-100 cursor-pointer"
                    } `}
                  >
                    <input
                      type="checkbox"
                      className={`mr-4 ${
                        checkOrganSystem.length > 1 &&
                        !checkOrganSystem.includes(organSystem)
                          ? "    disabled:opacity-50 cursor-not-allowed "
                          : "cursor-pointer"
                      }`}
                      onClick={(event) => {
                        if (checkOrganSystem.includes(organSystem)) {
                          setCheckOrganSystem((prevChecked) =>
                            prevChecked.filter(
                              (checked) => checked !== organSystem
                            )
                          );
                        } else if (checkOrganSystem.length < 2) {
                          setCheckOrganSystem((prevChecked) => [
                            ...prevChecked,
                            organSystem,
                          ]);
                        } else {
                          event.preventDefault();
                        }
                      }}
                    />

                    {organSystem}
                  </li>
                ))}
                {loadMore ? (
                  <>
                    {asideData.organ_system.slice(5).map((organSystem) => (
                      <li
                        key={organSystem}
                        className={`py-2 px-4 border-b-2 flex ${
                          checkOrganSystem.length > 1 &&
                          !checkOrganSystem.includes(organSystem)
                            ? "disabled:opacity-50 cursor-not-allowed bg-[rgb(203,203,204)]"
                            : "hover:bg-slate-100 cursor-pointer"
                        } `}
                      >
                        <input
                          type="checkbox"
                          className={`mr-4 
                                                        ${
                                                          checkOrganSystem.length >
                                                            1 &&
                                                          !checkOrganSystem.includes(
                                                            organSystem
                                                          )
                                                            ? "disabled:opacity-50 cursor-not-allowed"
                                                            : "cursor-pointer"
                                                        }`}
                          onClick={(event) => {
                            if (checkOrganSystem.includes(organSystem)) {
                              setCheckOrganSystem((prevChecked) =>
                                prevChecked.filter(
                                  (checked) => checked !== organSystem
                                )
                              );
                            } else if (checkOrganSystem.length < 2) {
                              setCheckOrganSystem((prevChecked) => [
                                ...prevChecked,
                                organSystem,
                              ]);
                            } else {
                              event.preventDefault();
                            }
                          }}
                        />
                        {organSystem}
                      </li>
                    ))}
                  </>
                ) : (
                  ""
                )}
                <button
                onClick={handleLoadMore}
                disabled={checkOrganSystem.length > 1}
                className={`mr-[6px] px-[8px] py-[2px] text-[8px] rounded-md text-white ml-[70%] my-2
                              ${checkOrganSystem.length > 1
                    ? "disabled:opacity-50 cursor-not-allowed bg-slate-500"
                    : "bg-[#ff8520]"
                  }`}
              >

                  {loadMore ? "Load Less" : "Load More"}
                </button>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="border-2 rounded-xl w-[15rem]  mb-4">
          <div
            onClick={handleOrganism}
            className={` flex justify-between font-bold py-2 px-4 text-white text-[16px] 
                        bg-[#8347ae]  ${
                          showOrganism ? "rounded-t-xl" : "rounded-xl"
                        }`}
          >
            <span>Organism</span>
            <span>{showOrganism ? "-" : "+"}</span>
          </div>
          {showOrganism && asideData?.organism ? (
            <div>
              <ul className="text-[12px] cursor-pointer">
                {asideData.organism.map((organism) => (
                  <li
                    key={organism}
                    className={`py-2 px-4 border-b-2 flex ${
                      checkOrganSystem.length > 1 && checkOrganism != organism
                        ? "disabled:opacity-50 cursor-not-allowed bg-[rgb(203,203,204)]"
                        : "hover:bg-slate-100 cursor-pointer"
                    } `}
                  >
                    <input
                      type="checkbox"
                      disabled={checkOrganSystem.length > 1}
                      className={`mr-4 ${
                        checkOrganSystem.length > 1 && checkOrganism != organism
                          ? "disabled:opacity-50 cursor-not-allowed "
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        setCheckOrganism((prevChecked) => {
                          // Check if the checkbox is checked
                          if (event.target.checked) {
                            // If yes, add the value to the array
                            return [...prevChecked, organism];
                          } else {
                            // If no, remove the value from the array
                            return prevChecked.filter(
                              (checked) => checked !== organism
                            );
                          }
                        })
                      }
                    />
                    {organism}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        
 <div onClick={() => setuserClicked(!userClicked)} className="border-2 bg-[#8347ae] hover:bg-[#48295e] rounded-xl w-[15rem]  mb-4">
 <span className="px-1 text-white text-[12px] flex justify-evenly py-2 w-[100%] cursor-pointer ">
   {userDetails}
 </span>

{userClicked ? (
 <div className="flex mt-1 text-[12px] justify-evenly p-2 bg-gradient-to-r from-[#cb9eeb] to-[#b765f1] rounded-br-xl rounded-bl-xl">
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
</div>
      </aside>

      <div className="w-[70%] mt-[5rem] flex flex-col">
        {/*<div className='relative mb-2'>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder='Search Guideline'
                        className={`border border-gray-300 py-2 rounded-lg pl-10 w-[92%] box-border
                         ${search ? 'pt-6' : ''}`}
                    />
                    <span className={`absolute text-gray-400 left-8 top-2 transition-all duration-300 ${search ? 'text-xs top-0' : 'text-base'} bg-white px-2`}>
                        Search Guideline
                    </span>
                    <button className='absolute top-[50%] left-[0%] transform -translate-y-1/2
                    text-gray-400 py-1 px-2'>
                        <SearchIcon />
                    </button>
                            </div>*/}

        <div className="relative mb-2">
          <GuideLinesInput search={search} setSearch={setSearch} />

          <button
            className="absolute top-[50%] left-[0%] transform -translate-y-1/2
                text-gray-400 py-1 px-2"
          >
            <SearchIcon />
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <GuideLineCards
            cardData={cardData}
            setShowAccordion={setShowAccordion}
            setId={setId}
            setcardName={setcardName}
          />
        </div>
      </div>
    </div>
  );
});
Main.displayName = 'Main';
export default Main;
