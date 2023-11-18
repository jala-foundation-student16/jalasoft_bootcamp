export const ButtonBottomNav = ({ icon, active, text, onClick }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 text-white ${
        active ? "bg-blue-700" : ""
      } rounded-full p-3`}
      onClick={onClick ? onClick : null}
    >
      {icon ? icon : null}
      {text? <span className="text-sm w-max">{text}</span> : null}
    </button>
  );
};
