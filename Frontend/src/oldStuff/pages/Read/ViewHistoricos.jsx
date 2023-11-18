export const ViewHistoricos = ({ historicos }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-lg">Historicos</h1>
      <ul className="flex flex-col gap-1">
        {historicos.map((historico) => {
          return <>
            <li>
              <p>Status: {historico.status}</p>
              <p>Observação: {historico.observacao}</p>
              <p>Criado em: {historico.created_at}</p>
              <p>Criado por: {historico.username}</p>
            </li>
          </>;
        })}
      </ul>
    </div>
  );
};
