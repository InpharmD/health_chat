import React, { useRef, useState, useEffect, memo } from "react";
import SendIcon from "@mui/icons-material/Send";
import { getToken } from "@/app/utils/LocalStorage";
const SherlockInput = memo(
  ({
    setChats,
    sethistoryNavClicked,
    chatId,
    setchatId,
    setLoading,
    setSuccess,
  }) => {
    const inputRef = useRef(null);
    const textRef = useRef();
    const [input, setInput] = useState("");
    const TokenPresent = getToken();
    useEffect(() => {
      if (textRef && textRef.current) {
        textRef.current.style.height = "0px";
        const taHeight = textRef.current.scrollHeight;
        textRef.current.style.height = taHeight + "px";
      }
    }, [input]);

    const handleSearch = async () => {
      setChats((prevChats) => [
        ...prevChats,
        { role: "user", content: input },
        { role: "assistant", content: "Loading..." },
      ]);
      fetchData(input, TokenPresent.user_id, chatId);
      sethistoryNavClicked(false);
    };

    async function fetchData(question, user_id, chatId) {
      let bodyData = `question=${encodeURIComponent(
        question
      )}&user_id=${user_id}`;
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
          let answer = jsonResponse.answer;

          // Check if 'answer' contains 'Source:' or '(Source:'
          const sourceIndex = answer.toLowerCase().indexOf("source:");
          if (sourceIndex !== -1) {
            // Find the end of the 'source:' part
            const endOfSource = answer.indexOf(")", sourceIndex);
            if (endOfSource !== -1) {
              // Remove the 'source:' part from the answer
              answer =
                answer.slice(0, sourceIndex) + answer.slice(endOfSource + 1);
            } else {
              // If there's no closing parenthesis after 'source:', remove the whole 'source:' part
              answer = answer.slice(0, sourceIndex);
            }
          }

          newChats[newChats.length - 1] = {
            role: "assistant",
            content: answer.trim(), // remove leading/trailing spaces
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

    return (
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
    );
  }
);

export default SherlockInput;
