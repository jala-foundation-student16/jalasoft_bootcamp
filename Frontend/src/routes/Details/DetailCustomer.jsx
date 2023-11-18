import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewCustomer } from "../../pages/Read/ViewCustomer";
import { getCustomer } from "../../functions/customerManagement";

export const DetailCustomer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      try {
        const data = await getCustomer(id);
        if (data == null) {
          toast.error("There was an error loading data, try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
          navigate("/customer");
        } else {
          setCustomer(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("There was an error loading data, try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
        navigate("/customer");
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewCustomer customer={customer} />
    </LoadingComponent>
  );
};
