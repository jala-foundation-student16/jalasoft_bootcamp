import { CommonButton } from "../../components/CommonButton/CommonButton";
import {
  getExtintores,
  getExtintoresByStatus,
} from "../../functions/extintorManagement";
import ExcelJS from "exceljs";
import { format } from "date-fns";

export const ViewReports = () => {

  function applyHeaderStyle(row, style) {
    row.eachCell((cell) => {
      cell.style = style;
    });
  }

  function arrayDataToString(data){
    let string = "";
    data.forEach((tipo) => string = (string == "" ? "" : string+", ")+ tipo.name);
    return string;
  }

  function generateReport(data, filename) {
    const createSheet = (name, columns) => {
      const sheet = workbook.addWorksheet(name);
      sheet.columns = columns;
      return sheet;
    };

    const headerStyle = {
      font: { name: "sans serif", bold: true, color: { argb: "FFFFFFFF" } }, // Fonte em negrito e texto branco
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF00008B" },
      },
      alignment: { vertical: "middle", horizontal: "center" }, // Alinhamento central
    };


    const sheetColumns = [
      {
        header: "ID",
        key: "id",
        width: 10,
      },
      {
        header: "Cilindro",
        key: "cilindro",
        width: 20,
      },
      {
        header: "Tipo do extintor",
        key: "tipo_extintores",
        width: 20,
      },
      {
        header: "Status",
        key: "status",
        width: 15,
      },
      {
        header: "Carga nominal",
        key: "carga_nominal",
        width: 15,
      },
      {
        header: "Unidade",
        key: "unidade_carga",
      },
      {
        header: "Eixo",
        key: "eixo",
        width: 10,
      },
      {
        header: "Tipo de suporte",
        key: "tipo_suporte",
        width: 20,
      },
      {
        header: "Data de vencimento",
        key: "data_vencimento",
        width: 20,
      },
      {
        header: "Data de vencimento - Teste Hidroestático",
        key: "vencimento_th",
        width: 40,
      },
      {
        header: "Há placa de sinalização?",
        key: "placa_sinalizacao",
        width: 25,
      },
      {
        header: "Galpão",
        key: "galpao",
        width: 25,
      },
      {
        header: "Planta",
        key: "planta",
        width: 25,
      },
      {
        header: "Local",
        key: "local",
        width: 25,
      },
      {
        header: "Ultimo avaliador",
        key: "ultima_avaliacao",
        width: 25,
      },
      {
        header: "Matricula",
        key: "matricula",
        width: 20,
      },
    ];

    const sheetDetailsColumns = [
      { header: "ID", key: "id", width: 10 },
      {
        header: "Cilindro",
        key: "cilindro",
        width: 20,
      },
      {
        header: "Tipo do extintor",
        key: "tipo_extintores",
        width: 20,
      },
      {
        header: "Status",
        key: "status",
        width: 15,
      },
      {
        header: "Carga nominal",
        key: "carga_nominal",
        width: 15,
      },
      {
        header: "Unidade",
        key: "unidade_carga",
      },
      {
        header: "Eixo",
        key: "eixo",
        width: 10,
      },
      {
        header: "Tipo de suporte",
        key: "tipo_suporte",
        width: 20,
      },
      {
        header: "Data de vencimento",
        key: "data_vencimento",
        width: 20,
      },
      {
        header: "Data de vencimento - Teste Hidroestático",
        key: "vencimento_th",
        width: 40,
      },
      {
        header: "Há placa de sinalização?",
        key: "placa_sinalizacao",
        width: 25,
      },
      {
        header: "Galpão",
        key: "galpao",
        width: 25,
      },
      {
        header: "Planta",
        key: "planta",
        width: 25,
      },
      {
        header: "Local",
        key: "local",
        width: 25,
      },
      {
        header: "Avaliador",
        key: "created_by",
        width: 25,
      },
      {
        header: "Matricula",
        key: "modification_registration",
        width: 20,
      },
      {
        header: "Avaliação",
        key: "status_avaliacao",
        width: 15,
      },
      {
        header: "Data da avaliação",
        key: "created_at",
        width: 25,
      },
      {
        header: "Observação",
        key: "observacao",
        width: 35,
      },
    ];


    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Fire Prevention System";
    workbook.created = new Date();

    const sheet = createSheet("Extintores", sheetColumns);
    const sheetDetails = createSheet(
      "Extintores - Detalhamento",
      sheetDetailsColumns
    );

    
    data.forEach((extintor) => {
      sheet.addRow({
        id: extintor.id,
        cilindro: extintor.cilindro,
        tipo_extintores: arrayDataToString(extintor.tipo_extintores),
        status: extintor.status,
        carga_nominal: extintor.carga_nominal,
        unidade_carga: extintor.unidade_carga,
        eixo: extintor.eixo.name,
        tipo_suporte: extintor.tipo_suporte.name,
        data_vencimento: extintor.data_vencimento,
        vencimento_th: extintor.vencimento_th,
        placa_sinalizacao: extintor.placa_sinalizacao
          ? "Há placa"
          : "Não há placa",
        galpao: extintor.galpao.name,
        planta: extintor.planta.name,
        local: extintor.local.name,
        ultima_avaliacao: extintor.ultima_avaliacao,
        matricula: extintor.matricula,
      });
    });

    data?.map((extintor) => {
      sheetDetails.addRow({
        id: extintor.id,
        cilindro: extintor.cilindro,
        tipo_extintores: extintor.tipo_extintores.map(
          (tipo) => `${tipo.name}, `
        ),
        status: extintor.status,
        carga_nominal: extintor.carga_nominal,
        unidade_carga: extintor.unidade_carga,
        eixo: extintor.eixo.name,
        tipo_suporte: extintor.tipo_suporte.name,
        data_vencimento: extintor.data_vencimento,
        vencimento_th: extintor.vencimento_th,
        placa_sinalizacao: extintor.placa_sinalizacao
          ? "Há placa"
          : "Não há placa",
        galpao: extintor.galpao.name,
        planta: extintor.planta.name,
        local: extintor.local.name,
        created_by: " - ",
        modification_registration: " - ",
        status_avaliacao: " - ",
        observacao: " - ",
      });

      extintor.historicos.map((historico) => {
        sheetDetails.addRow({
          id: historico.id,
          cilindro: " - ",
          tipo_extintores: " - ",
          status: " - ",
          carga_nominal: " - ",
          unidade_carga: " - ",
          eixo: " - ",
          tipo_suporte: " - ",
          data_vencimento: " - ",
          vencimento_th: " - ",
          placa_sinalizacao: " - ",
          galpao: " - ",
          planta: " - ",
          local: " - ",
          created_by: historico.created_by,
          modification_registration: historico.modification_registration,
          status_avaliacao: historico.status,
          created_at: format(
            new Date(historico.created_at),
            "dd/MM/yyyy - HH:mm:ss"
          ),
          observacao: historico.observacao,
        });
      });
    });

    
    applyHeaderStyle(sheet.getRow(1), headerStyle);
    applyHeaderStyle(sheetDetails.getRow(1), headerStyle);
    
    sheet.autoFilter = "B1:P1";
    sheetDetails.autoFilter = "B1:S1";
    
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `relatorio_${filename}_${format(
        new Date(),
        "dd-MM-yyyy_HHmm"
      )}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-lg">Relatórios do sistema</h1>

      <div className="flex flex-col md:flex-row gap-2">
        <CommonButton
          content="Todos os extintores"
          id="btnTodosExtintores"
          name="btnTodosExtintores"
          onClick={async () => {
            try {
              const data = await getExtintores();
              generateReport(data, "todos_extintores");
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <CommonButton
          content="Extintores ok"
          id="btnExtintoresOk"
          name="btnExtintoresOk"
          onClick={async () => {
            try {
              const data = await getExtintoresByStatus("OK");
              generateReport(data, "extintores_ok");
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <CommonButton
          content="Extintores divergentes"
          id="btnExtintoresDivergentes"
          name="btnExtintoresDivergentes"
          onClick={async () => {
            try {
              const data = await getExtintoresByStatus("DIVERGENTE");
              generateReport(data, "extintores_divergente");
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <CommonButton
          content="Extintores com problemas"
          id="btnExtintoresProblema"
          name="btnExtintoresProblema"
          onClick={async () => {
            try {
              const data = await getExtintoresByStatus("PROBLEMA");
              generateReport(data, "extintores_problema");
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </div>
    </div>
  );
};
