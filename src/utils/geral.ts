import moment from "moment";

moment.locale("pt-br");

export const datePickerFormat = (date: Date | Date[]): string => {
  const dates = Array.isArray(date) ? date : [date];

  const formattedDates = dates.map(singleDate => {
    const year = singleDate.getFullYear();
    const month = (`0${singleDate.getMonth() + 1}`).slice(-2);
    const day = (`0${singleDate.getDate()}`).slice(-2);

    return `${day}/${month}/${year}`;
  });

  return formattedDates.join(' - ');
};

export const fieldIsNotEmpty = (field: any): boolean => {
  if (field === undefined || field === null) return false;
  if (field === "0001-01-01T00:00:00Z" || field === "0001-01-01" || field === "0000-12-31T21:26:00-02:34") return false;
  if (field.toString().trim().length === 0) return false;
  return true;
};

export const formatcpfCnpj = (v: string): string => {
  if (v == null || v == "") return "";
  v = v.replace(/\D/g, "");

  if (v.length <= 13) { //CPF
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else { //CNPJ
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }
  return v;
};

export const formatDate = (date: any, format = "DD/MM/YYYY"): string => {
  if (date === null || date === undefined || date === "0001-01-01T00:00:00Z") return " - ";
  if (typeof (date) === "object") return moment(date).format(format);

  let dateStr: any = date.replace(/[A-Za-z]/g, " ");
  if (moment(dateStr).isValid()) {
    if (moment(dateStr).year() === 0) return " - ";
    else return moment(dateStr).format(format);
  } else {
    return " - ";
  }
};

