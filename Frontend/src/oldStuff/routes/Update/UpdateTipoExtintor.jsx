import { useEffect, useState } from "react";
import { UpdTipoExintor } from "../../pages/Update/UpdTipoExtintor"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTipoExtintor } from "../../functions/tipoExtintorManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateTipoExtintor = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tipoExtintor, setTipoExtintor] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

     useEffect(() => {
       async function getTipoExtintorUnity() {
         try {
           const data = await getTipoExtintor(id);
           if (data == null) {
             toast.error(
               "Houve um erro no carregamento dos dados, tente novamente.",
               {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
               }
             );
             setIsLoading(false);
             navigate("/tipo_extintor");
           } else {
             setTipoExtintor(data);
             setIsLoading(false);
           }
         } catch (error) {
           console.log(error);
           toast.error(
             "Houve um erro no carregamento dos dados, tente novamente.",
             {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
             }
           );
           setIsLoading(false);
           navigate("/tipo_extintor");
         }
       }

       getTipoExtintorUnity();
     }, []);


    return (
      <LoadingComponent isLoading={isLoading}>
        <UpdTipoExintor tipoExtintor={tipoExtintor} />
      </LoadingComponent>
    );
}