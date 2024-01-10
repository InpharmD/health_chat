import React, { useState, useEffect, useCallback } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Accordion = (props) => {
  const { setShowAccordion, id } = props;

  const [accordionData, setAccordionData] = useState({});
  const showAccordionData= true;
  
  const [isOpenState, setIsOpenState] = useState({});
  
  // console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://guidelines-5f26942dfcdf.herokuapp.com/api/v2/guidelines/guideline_section?id=${id}`,
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        const data = await response.json();
        setAccordionData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  
  }, [id]);
  // console.log(accordionData)

  const handleBack = () => {
   
    setShowAccordion();
  };

  const toggleAccordion = (index) => {
    console.log("accordianopen")
    setIsOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

//   const isOpen = (index) => {
//       console.log("accordianopen")
//       return openAccordions.includes(index);
//   }



  return (
    <div className="bg-[#bf72fb1a]">
      <button
        onClick={handleBack}
        className="text-[#a35bd6] ml-[85%] mt-4 hover:underline"
      >
        <KeyboardBackspaceIcon />
        View all Guidelines
      </button>

      <div className="mt-[5rem] flex flex-col items-center">
        {showAccordionData && Object.keys(accordionData).length > 0 ? (
          <>
            <span className="text-[25px] font-bold w-[60%] text-[#8347ae]">
              {accordionData.title}
            </span>
            <p
              className="text-black m-4 w-[60%] "
              dangerouslySetInnerHTML={{
                __html: accordionData.header_meta_data,
              }}
            />
            {accordionData.section_meta_data.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleAccordion(index)}
                className="w-[60%] hover:bg-[#ece0e9] mb-4 border-2 shadow-xl rounded-lg flex flex-col cursor-pointer"
              >
              <div
              className={`${
                isOpenState[index]
                  ? "rounded-t-lg"
                  : "rounded-lg hover:bg-[#a35bd6]"
              } font-bold px-[2rem] py-4 bg-[#8347ae] text-white flex justify-between`}
            >
              <span>{item.title || "Default Title"}</span>
              <span>{isOpenState[index] ? "-" : "+"}</span>
            </div>
            {isOpenState[index] && (
              <>
                <p
                  className="text-black m-4"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <div className="bg-[#8347ae] rounded-b-lg text-white pl-[97%] relative bottom-0 h-[1rem]" />
              </>
            )}
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Accordion;
