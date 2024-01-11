// import React, { useState, useEffect, useCallback } from "react";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

// const Accordion = (props) => {
//   const { setShowAccordion, id } = props;

//   const [accordionData, setAccordionData] = useState({});
//   const showAccordionData= true;

//   const [isOpenState, setIsOpenState] = useState({});

//   // console.log(id)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://guidelines-5f26942dfcdf.herokuapp.com/api/v2/guidelines/guideline_section?id=${id}`,
//           {
//             headers: {
//               Accept: "application/vnd.api+json",
//             },
//           }
//         );
//         const data = await response.json();
//         setAccordionData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();

//   }, [id]);
//   // console.log(accordionData)

//   const handleBack = () => {

//     setShowAccordion();
//   };

//   const toggleAccordion = (index) => {
//     console.log("accordianopen")
//     setIsOpenState((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

// //   const isOpen = (index) => {
// //       console.log("accordianopen")
// //       return openAccordions.includes(index);
// //   }

//   return (
//     <div className="bg-[#bf72fb1a]">
//       <button
//         onClick={handleBack}
//         className="text-[#a35bd6] ml-[85%] mt-4 hover:underline"
//       >
//         <KeyboardBackspaceIcon />
//         View all Guidelines
//       </button>

//       <div className="mt-[5rem] flex flex-col items-center">
//         {showAccordionData && Object.keys(accordionData).length > 0 ? (
//           <>
//             <span className="text-[25px] font-bold w-[60%] text-[#8347ae]">
//               {accordionData.title}
//             </span>
//             <p
//               className="text-black m-4 w-[60%] "
//               dangerouslySetInnerHTML={{
//                 __html: accordionData.header_meta_data,
//               }}
//             />
//             {accordionData.section_meta_data.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => toggleAccordion(index)}
//                 className="w-[60%] hover:bg-[#ece0e9] mb-4 border-2 shadow-xl rounded-lg flex flex-col cursor-pointer"
//               >
//               <div
//               className={`${
//                 isOpenState[index]
//                   ? "rounded-t-lg"
//                   : "rounded-lg hover:bg-[#a35bd6]"
//               } font-bold px-[2rem] py-4 bg-[#8347ae] text-white flex justify-between`}
//             >
//               <span>{item.title || "Default Title"}</span>
//               <span>{isOpenState[index] ? "-" : "+"}</span>
//             </div>
//             {isOpenState[index] && (
//               <>
//                 <p
//                   className="text-black m-4"
//                   dangerouslySetInnerHTML={{ __html: item.content }}
//                 />
//                 <div className="bg-[#8347ae] rounded-b-lg text-white pl-[97%] relative bottom-0 h-[1rem]" />
//               </>
//             )}
//               </div>
//             ))}
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };

// export default Accordion;

import React, { useState, useEffect, useCallback, memo } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HTMLFlipBook from "react-pageflip";

// Define the Page component
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage bg-gray-100 p-4 shadow-xl overflow-auto h-[100%] rounded-lg" ref={ref}>
      <h1 className="text-[25px] font-bold mt-7 bg-clip-text text-transparent bg-gradient-to-r
       from-[#8347ae] to-[#e90884] shadow-sm border-b-4">
       <i> {props.title} </i>
      </h1>

      <p className="text-justify mt-5" dangerouslySetInnerHTML={{ __html: props.content }}></p>
      <p className=" absolute z-50 top-4 right-4">{props.number}</p>
    </div>
  );
});
;
Page.displayName = 'Page';
const Accordion = memo((props) => {
  const { setShowAccordion, id } = props;

  const [accordionData, setAccordionData] = useState({});
  const showAccordionData = true;

  const [isOpenState, setIsOpenState] = useState({});

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



  
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleBack = () => {
    setShowAccordion();
  };

  const toggleAccordion = (index) => {
    setIsOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <div className="bg-[#bf72fb1a] h-screen">
      <button
        onClick={handleBack}
        className="text-[#a35bd6] ml-[85%] mt-4 hover:underline"
      >
        <KeyboardBackspaceIcon />
        View all Guidelines
      </button>

     

      <div className="h-[60%]  p-[1rem] flex justify-evenly">
        {showAccordionData && Object.keys(accordionData).length > 0 ? (
          <div className="w-[80%] fixed ">
          <HTMLFlipBook
            width={windowSize.width * 0.4} // 80% of viewport width
            height={windowSize.height * 0.9} // 80% of viewport height
         
          
          >
            {accordionData.section_meta_data.map((item, index) => (
              <Page
                key={index}
                title={item.title}
                content={item.content}
                number={index + 1}
              />
            ))}
          </HTMLFlipBook>
          </div>

        ) : (
          ""
        )}
      </div>
    </div>
  );
});
Accordion.displayName = 'Accordion';
export default Accordion;