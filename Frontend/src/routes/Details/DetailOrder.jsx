import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewOrder } from "../../pages/Read/ViewOrder";
import { getOrder } from "../../functions/orderManagement";

export const DetailOrder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await getOrder(id);
      console.log(data);
      if (data) {
        setOrder(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/usuario");
      }
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewOrder order={order} />
    </LoadingComponent>
  );
};
