export const PaginationNumbers = ({ quantity, pageActive }) => {
  const paginationItems = [];

  for (let i = 1; i <= quantity; i++) {
    paginationItems.push(
      <span
        key={i}
        className={`w-8 h-8 text-white rounded-full flex justify-center items-center ${
          i < pageActive
            ? "bg-green-600"
            : i > pageActive
            ? "bg-gray-500"
            : "bg-blue-600"
        }`}
      >
        {i}
      </span>
    );

    if (i < quantity) {
      paginationItems.push(
        <hr
          key={`hr${i}`}
          className={`w-10 h-1 ${
            i < pageActive
              ? "bg-green-600"
              : i >= pageActive
              ? "bg-gray-500"
              : "bg-blue-600"
          }`}
        />
      );
    }
  }

  return <div className="flex justify-center items-center">{paginationItems}</div>;
};
