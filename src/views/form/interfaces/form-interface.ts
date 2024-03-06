export interface FormInterface {
  clientesExibidos: any[],
  loadingBtnConfirm: boolean,
  blocRequisition: boolean,
  valorInputClient: any,
  block: boolean,
  itemsNomeInput: any[],
  itemsInfo: any[],
  itemsNome: any[],
  clients: any[],
  datePayment: DatePaymentNotification,
  allClients: any[],
  nomeFilter: string,
  totalPages: number,
  itemsPerPage: number,
  isPageChanging: boolean,
  fieldsTableNotifications: FieldsTableNotifications[]
  dataTableNotifications: any[]
}

export interface DatePaymentNotification {
  start: any,
  end: any
}

export interface FieldsTableNotifications {
  key: string;
  label: string;
}

export function createDefaultFormInterfaceHistoryNotifications(): FormInterface {
  return {
    clientesExibidos: [],
    loadingBtnConfirm: false,
    blocRequisition: false,
    valorInputClient: "",
    block: false,
    isPageChanging: false,
    itemsNomeInput: [],
    itemsInfo: [],
    itemsNome: [],
    clients: [],
    datePayment: {
      start: "",
      end: ""
    },
    allClients: [],
    nomeFilter: "",
    totalPages: 170,
    itemsPerPage: 40,
    fieldsTableNotifications: [
      { key: "id", label: "ID" },
      { key: "name", label: "Cliente" },
      { key: "title", label: "Titulo" },
      { key: "message", label: "Mensagem" },
      { key: "status_push_notification", label: "Status do envio" },
      { key: "created_at", label: "Data do Envio" },
      { key: "created_at_time", label: "Horário do envio" }
    ],
    dataTableNotifications: [],
  };
}