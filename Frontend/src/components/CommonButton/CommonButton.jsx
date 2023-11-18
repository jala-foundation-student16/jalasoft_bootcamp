export const CommonButton = ({
  content,
  id,
  name,
  colored = true,
  icon,
  onClick,
  warn = false,
  danger = false,
  className
}) => {
  return (
    <button
      name={name}
      id={id}
      className={`flex gap-2 justify-center p-2 rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-lg ${className} ${
        colored
          ? warn
            ? "bg-amber-600 text-white hover:bg-amber-700 w-full"
            : danger
            ? "bg-red-600 text-white hover:bg-red-800 w-full"
            : "bg-blue-400 text-white hover:bg-blue-700 w-full"
          : "border border-blue-700 text-blue-700 hover:bg-blue-900 hover:text-white"
      }`}
      onClick={onClick ? onClick : null}
    >
      {icon ? icon : ""}
      {content}
    </button>
  );
};
