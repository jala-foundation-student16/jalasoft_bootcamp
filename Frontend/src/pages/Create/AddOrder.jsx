import { ArrowLeft, ArrowRight, Check, Trash } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { transformCustomersToOptions } from "../../functions/common";
import { addOrder } from "../../functions/orderManagement";
import { useState } from "react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { PaginationNumbers } from "../../components/PaginationNumbers/PaginationNumbers";
import { getScheduleByBudget } from "../../functions/scheduleManagement";

export const AddOrder = ({ customers }) => {
  const [remarks, setRemarks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedRemarks, setSelectedRemarks] = useState([]);

  const [page, setPage] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleRequest = async (data) => {
    const request = await addOrder(data);
    if (request) {
      toast.success("Order added with success.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/order"), 1000);
    } else {
      toast.error("Ops! there was an error while adding data.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  function enableView(event, id) {
    console.log(getValues());
    if (event) {
      document.getElementById(`task_remark_${id}`).classList.remove("hidden");
    } else {
      document.getElementById(`task_remark_${id}`).classList.add("hidden");

      removeRemarkFromArray(id);
    }
  }

  async function nextPage() {
    let isValid = false;

    switch (page) {
      case 1:
        isValid = await trigger(["customer"]);
        break;
      case 2:
        const aux = await getScheduleByBudget(getValues().project_budget);
        const auxTasks = [];
        const auxRemarks = [];
        aux.forEach((e) => {
          if (auxTasks.length > 0) {
            if (!auxTasks.some((t) => t.id == e.remark.task.id)) {
              auxTasks.push(e.remark.task);
            }
          } else {
            auxTasks.push(e.remark.task);
          }

          auxRemarks.push(e.remark);
        });

        setTasks(auxTasks);
        setRemarks(auxRemarks);
        isValid = await trigger(["client_budget"]);
        break;
      case 3:
        isValid = await trigger(["client_budget"]);
        break;
    }

    if (isValid) {
      setPage((prevState) => prevState + 1);
    }
  }

  function previousPage() {
    setPage((prevState) => prevState - 1);
  }

  function addRemarkToArray(remarkId) {
    const remark = remarks.filter((r) => r.id === remarkId);

    const isThisTaskOnArray = checkIfTaskIsOnArray(remark[0]);

    if (isThisTaskOnArray) {
      removeRemarkFromArray(remark[0].task.id);
      const aux = [...selectedRemarks, remark[0]];
      setSelectedRemarks(aux);
      console.log(aux);
    } else {
      const aux = [...selectedRemarks, remark[0]];
      setSelectedRemarks(aux);
      console.log(aux);
    }

    calculateCalendar();
  }

  function removeRemarkFromArray(taskId) {
    const remarks = selectedRemarks.filter((r) => r.task.id !== taskId);
    setSelectedRemarks(remarks);
  }

  function checkIfTaskIsOnArray(remark) {
    const isThereRepeatedTask = selectedRemarks.filter(
      (r) => r.task.id === remark.task.id
    );

    if (isThereRepeatedTask.length > 0) {
      return true;
    }
    return false;
  }

  function calculateCalendar() {
    // selectedRemarks.forEach((r)=>console.log(r))
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl font-medium">Add order</h1>

      <PaginationNumbers quantity={4} pageActive={page} />

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleRequest)}
      >
        {page == 1 && (
          <>
            <h2 className="text-lg font-medium">Client selection</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="select_customer">Client</label>
              <Select
                className="basic-single shadow-md"
                classNamePrefix="select"
                isMulti={false}
                isSearchable={true}
                name="select_customer"
                {...register("customer", {
                  required: "You must select a customer.",
                })}
                onChange={(option) => {
                  setValue("customer", option?.value || "");
                  setValue("customer_name", option?.label || "");
                }}
                options={transformCustomersToOptions(customers)}
              />
              {errors?.customer?.message && (
                <p className="text-red-500 text-right text-sm">
                  {errors.customer?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="txt_customerInformation">
                Customer Information
              </label>
              <textarea
                id="txt_customerInformation"
                name="txt_customerInformation"
                {...register("customer_information", {
                  maxLength: 240,
                })}
                className={`class="block p-2.5 text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ${
                  errors?.customer_information?.message ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors?.customer_information?.message && (
                <p className="text-red-500 text-right text-sm">
                  {errors.customer_information?.message}
                </p>
              )}
            </div>
          </>
        )}

        {page == 2 && (
          <>
            <h2 className="text-lg font-medium">Budget Information</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="project_budget">Project budget</label>
              <div className="flex items-center gap-3">
                <span className="font-medium text-lg">$</span>
                <CommonInput
                  type="number"
                  name="project_budget"
                  extra={{
                    ...register("project_budget", {
                      required: "The project budget cannot be empty",
                    }),
                  }}
                />
              </div>
              {errors?.project_budget?.message && (
                <p className="text-red-500 text-right text-sm">
                  {errors.project_budget?.message}
                </p>
              )}
            </div>
          </>
        )}

        {page == 3 && (
          <>
            <h2 className="text-lg font-medium">Order services</h2>
            <div className="flex flex-col gap-2 mb-3">
              {tasks.map((task) => {
                const remark = remarks.filter((r) => r.task.id === task.id);
                return (
                  <div
                    key={task.id}
                    id={`holder-${task.id}`}
                    className="flex flex-col gap-2"
                  >
                    <CommonInput
                      type="checkbox"
                      name={`task_${task.id}`}
                      {...register("task-" + task.id)}
                      checkbox={true}
                      content={`${task.name} - ${remark[0].name}`}
                      className="w-6 h-6 p-4"
                      onChange={(e) => {
                        setValue("task-" + task.id, e.target.checked);
                        enableView(e.target.checked, task.id);
                      }}
                    />

                    <Select
                      className="basic-single shadow-md hidden"
                      classNamePrefix="select"
                      id={`task_remark_${task.id}`}
                      isMulti={false}
                      isSearchable={false}
                      name={`task_remark_${task.id}`}
                      onChange={(option) => addRemarkToArray(option.value)}
                      options={transformToOptions(remark)}
                    />
                  </div>
                );
              })}
            </div>

            <hr />

            <div>
              <h2 className="text-lg font-medium mb-2">Services selected</h2>
              <ul className="flex flex-col gap-2">
                {selectedRemarks.map((r) => {
                  return (
                    <li className="flex justify-between text-center">
                      <span>{r.task.name}</span>
                      <span>{r.name}</span>
                      <span>${r.price}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        {page == 4 && (
          <>
            <h2 className="text-lg font-medium">Order resume</h2>
            <div className="flex flex-col gap-2">
              <p>Client:{getValues("customer_name")}</p>
              <p>Observation: {getValues("customer_information")}</p>

              <hr />

              <span htmlFor="client_budget">Tasks:</span>
              <ul className="flex flex-col gap-2">
                {selectedRemarks.map((r) => {
                  return (
                    <li className="flex justify-between text-center">
                      <span>{r.task.name}</span>
                      <span>{r.name}</span>
                      <span>${r.price}/month executed</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        <div className="flex gap-5">
          {/* {page > 1 && (
            <CommonButton
              icon={<ArrowLeft size={24} />}
              id="btn_previousStep"
              name="btn_previousStep"
              content="Previous"
              onClick={(e) => {
                e.preventDefault();
                previousPage();
              }}
            />
          )} */}

          {page < 4 && (
            <CommonButton
              icon={<ArrowRight size={24} />}
              id="btn_nextStep"
              name="btn_nextStep"
              content="Next"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
            />
          )}

          {page == 4 && (
            <>
              <CommonButton
                icon={<Trash size={24} />}
                warn={true}
                id="btn_reset"
                name="btn_reset"
                content="Reset order"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              />

              <CommonButton
                icon={<Check size={24} />}
                id="btn_submit"
                name="btn_submit"
                content="Create order"
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};
