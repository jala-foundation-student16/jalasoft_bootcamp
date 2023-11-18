import { useParams } from "react-router-dom"
import { AddHistorico } from "../../pages/Create/AddHistorico";

export const CreateAvaliacao = () => {
    const { id } = useParams();
    
    return <AddHistorico id={id} />
}