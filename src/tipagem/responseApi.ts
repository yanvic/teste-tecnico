import { int } from "aws-sdk/clients/datapipeline";

export interface ResponseApi {
  data: any[],
  error: string,
  status: int
}
export interface Item {
  id: number;
  titulo: string;
  descricao: string;
  data_divulgacao: string;
  tipo_id: number;
  tipo: string;
  produto_id: number;
  nome_produto: string;
  alias_produto: string;
  descricao_produto: string;
  ano_referencia_inicio: number;
  mes_referencia_inicio: number;
  ano_referencia_fim: number;
  mes_referencia_fim: number;
  link: string;
}

