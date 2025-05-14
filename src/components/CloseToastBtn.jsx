const CloseToastBtn = ({ closeToast }) => {
  return (
    <button
    className="cursor-pointer"
      onClick={closeToast}
    >
      <i className="ri-close-large-fill text-xl text-white font-medium"></i>
    </button>
  );
};

export default CloseToastBtn;
