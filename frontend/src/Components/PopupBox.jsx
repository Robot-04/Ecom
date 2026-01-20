const PopupBox = ({ message, onClose, type }) => {

  const isSuccess = type === "success";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl rounded-xl flex items-center justify-between px-4">
      <div className={`relative rounded-xl w-full h-10 text-center justify-center my-5 mx-5 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        <p className="font-mono py-2">
          {message}
        </p>
        <button
          className="absolute top-1 right-3 text-xl font-bold hover:cursor-pointer transform transition-transform duration-300 hover:scale-150"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PopupBox;
