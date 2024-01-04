import React from "react";

const MenuModal = (props) => {
  const { isVisibleModal, onCloseModal, setshowDeleteModal,setshowRenameModal } = props;

  if (!isVisibleModal) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onCloseModal(false);
    }
  };

  const handleRenameModal =()=>{
    setshowRenameModal(true)
    onCloseModal(false)
  }

  const handleDeleteModal=()=>{
    setshowDeleteModal(true)
    onCloseModal(false)
  }


  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="  flex flex-col bg-white rounded-lg sm:w-[15%] h-[15%]">
       
          <div className=" font-bold  text-[14px] pl-[1.3rem]  text-center relative top-8 flex flex-col">
            <button className="relative right-[1rem] bottom-3 cursor-pointer mb-2 mx-[4rem] py-2 rounded-md hover:bg-gradient-to-r from-purple-200 to-yellow-200"
            onClick={handleRenameModal}
            >
              {" "}
              Rename
            </button>
            <button
              className="relative right-[1rem] bottom-3 cursor-pointer  mx-[4rem] py-2  rounded-md hover:bg-gradient-to-r from-purple-200 to-yellow-200"
              onClick={handleDeleteModal}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuModal;
