"use client";
import React, { useState, useEffect,useCallback } from "react";
import Main from "@/components/Guidelines/Main";
import Accordion from "@/components/Guidelines/Accordion";
import { useRouter } from "next/navigation";
import { getToken } from "./utils/LocalStorage";
const Home = () => {
  const [showAccordion, setShowAccordion] = useState(false);
  const [cardName,setcardName]=useState("")
  const [id, setId] = useState(undefined);
  const router = useRouter();

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

  useEffect(() => {
    // Redirect to login page if necessary data is not present
    if (typeof localStorage === "undefined" || TokenPresent === undefined) {
      router.push("/login");
    }
  
  }, [TokenPresent, router]);
  // console.log(id)
  return (
    <div>
      {showAccordion ? (
        <Accordion
          setShowAccordion={() => {
            setShowAccordion(false);
          }}
          id={id}
          cardName={cardName}
        />
      ) : (
        <Main
          setShowAccordion={() => {
            setShowAccordion(true);
          }}
          setId={setId}
          setcardName={setcardName}
        />
      )}
    </div>
  );
};

export default Home;
