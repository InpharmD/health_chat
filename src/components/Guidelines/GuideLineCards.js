import React, { memo } from 'react'

const GuideLineCards = memo(({cardData,setShowAccordion, setId,setcardName }) => {
    // console.log("card");
    const handleCard = (id,title) => {
        console.log("mainstatus handlecard");
        setShowAccordion();
        setId(id);
        setcardName(title)
      };

  return (
    <>
    {Array.isArray(cardData) && cardData.length > 0 ? (
        cardData.map((item) => {
          const options = { year: "numeric", month: "2-digit" };
          const formattedDate = new Date(
            item.published_at
          ).toLocaleDateString(undefined, options);

          return (
            <div
              key={item.id}
              onClick={() => {
                handleCard(item.id,item.title);
              }}
              className="w-[45%] h-[13rem] bg-white hover:border-2 px-4 py-4 my-2 flex flex-col cursor-pointer rounded-lg shadow-xl"
            >
              <p className="font-bold">{item.title}</p>
              <p className="mt-2 text-[12px]">
                <span className="font-bold"> Status : </span>
                {item.status}
              </p>
              <p className="text-[12px]">
                <span className="font-bold">Date : </span>
                {formattedDate}
              </p>
              <p className="mt-2 text-[12px]">{item.description}</p>
            </div>
          );
        })
      ) : (
        <div className="w-full h-full flex items-center justify-center mt-12">
          <p className="text-[14px] text-orange-500">No Result Found</p>
        </div>
      )}
      </>
  )
})
GuideLineCards.displayName = 'GuideLineCards';
export default GuideLineCards