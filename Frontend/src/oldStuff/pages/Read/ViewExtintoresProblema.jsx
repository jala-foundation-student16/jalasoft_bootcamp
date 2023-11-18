import { CardItemBoxed } from "../../components/CardItemBoxed/CardItemBoxed";

export const ViewExtintoresProblema = ({ divergente, problema, user }) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <section id="hello-user">
        <h1 className="text-3xl">Olá {user.name}</h1>
      </section>
      <section id="extintoresDivergentes" className="flex flex-col gap-2">
        <h1 className="text-xl">Extintores com divergência</h1>
        <ul className="flex flex-col gap-4">
          {divergente.map((extintor) => (
            <CardItemBoxed
              extintor={extintor}
              key={extintor.id}
              role={user.role}
            />
          ))}

          {divergente.length == 0 && (
            <p className="pt-3">Não há extintores com divergências</p>
          )}
        </ul>
      </section>

      <section id="extintoresProblemas" className="flex flex-col gap-2">
        <h1 className="text-xl">Extintores com problemas</h1>
        <ul className="flex flex-col gap-4">
          {problema.map((extintor) => (
            <CardItemBoxed
              extintor={extintor}
              key={extintor.id}
              role={user.role}
            />
          ))}

          {problema.length == 0 && (
            <p className="pt-3">Não há extintores com problemas</p>
          )}
        </ul>
      </section>
    </div>
  );
};
