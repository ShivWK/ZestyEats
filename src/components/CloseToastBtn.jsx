const CloseToastBtn = ({ closeToast }) => {
  return (
    <button className="cursor-pointer" onClick={closeToast}>
      <i className="ri-close-large-fill text-xl font-medium text-white"></i>
    </button>
  );
};

export default CloseToastBtn;
