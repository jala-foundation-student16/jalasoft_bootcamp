export const CommonInput = ({
  type = "text",
  name,
  id,
  value,
  onChange,
  className,
  readOnly = false,
  extra,
  checkbox = false,
  content = "",
  full = true
}) => {
  return (
    <div className="flex gap-2 items-center">
    <input
      type={type}
      name={name}
      id={id}
      {...(value ? `value=${value}` : null)}
      className={`border rounded-md p-2 shadow-md transition-all ease duration-300 ${className} ${
        readOnly ? "bg-slate-200" : ""
      } ${checkbox ? "" : full ? "w-full" : ""}`}
      onChange={onChange ? onChange : null}
      readOnly={readOnly}
      {...extra}
    />
    {checkbox ? content : "" }
    </div>
  );
};
