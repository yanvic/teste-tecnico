<template>
  <TelaExpandida :title="'SPA de pesquisas '" :smaller_spacing="true">
    <template #tela>
      <Content >
        <template #slot>
          <div class="card">
            <div class="card-body" id="card-body">
              <CustomDropdown
                v-model="Qtd"
                :options="optionsFilterQtd"
                label="Quantidade"
                placeholder="Selecione a quantidade"
                class="inputs"
              />
              <CustomDatepicker
                title="Data inicial"
                v-model="data.datePayment.start"
                :max-date="data.datePayment.end"
                class="inputs"
              />
              <CustomDatepicker
                title="Data final"
                v-model="data.datePayment.end"
                :min-date="data.datePayment.start"
                class="inputs"
              />
              <CustomDropdown
                v-model="field"
                :options="optionsFilterFields"
                label="Ordenar"
                placeholder="Selecione um campo"
                class="inputs"
              />
              <div class="arrow-container" @click="ordenarPorCampo(this.field)">
                <div class="circle" :class="{ 'circle-down': icone }">
                  <span v-if="icone">&#8595;</span>
                  <span v-else>&#8593;</span>
                </div>
              </div>
            </div>


            <div class="div-partner-filtros">
              <div>
                <button type="button" class="btn btn-primary " id="buscar-filtros" @click="applyFilters()">Filtrar</button>
                <button class="btn btn-secondary " id="limpar-filtros"   @click="clearFilters()">Limpar</button>
              </div>
            </div>
          </div>
          <div v-if="this.error" class="alert alert-danger text-center" role="alert">
            <div class="error-message-container">
              {{ this.errorMessage }}
            </div>
          </div>
          <div class="card mt-4" >
            <table class="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data de Divulgação</th>
                <th>Tipo</th>
                <th>ID do Produto</th>
                <th>Nome do Produto</th>
                <th>Alias do Produto</th>
                <th>Descrição do Produto</th>
                <th>Ano Referência Início</th>
                <th>Mês Referência Início</th>
                <th>Ano Referência Fim</th>
                <th>Mês Referência Fim</th>
              </tr>
              </thead>
              <tbody v-if="responseData">
              <tr v-for="item in responseData.items" :key="item.id">
                <td>{{ item.id }}</td>
                <td >{{ item.titulo }}</td>
                <td>{{ item.descricao }}</td>
                <td>{{ item.data_divulgacao }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.produto_id }}</td>
                <td>{{ item.nome_produto }}</td>
                <td>{{ item.alias_produto }}</td>
                <td class="hover-cell" v-html="removeHtmlTags(item.descricao_produto)"></td>
                <td>{{ item.ano_referencia_inicio }}</td>
                <td>{{ item.mes_referencia_inicio }}</td>
                <td>{{ item.ano_referencia_fim }}</td>
                <td>{{ item.mes_referencia_fim }}</td>
              </tr>
              </tbody>
            </table>
          </div>

        </template>
      </Content>
    </template>
  </TelaExpandida>
</template>

<script>
import TelaExpandida from "@/components/tela_expandida/TelaExpandida.vue";
import { defineComponent } from "vue";
import axios from 'axios';
import { datePickerFormat, fieldIsNotEmpty, formatcpfCnpj, formatDate } from "@/utils/geral";
import Button from "@/components/button/Button.vue";
import CustomDropdown from "@/components/dropdown/dropdown.vue";
import CustomDatepicker from "@/components/datePicker/dataPicker.vue"
import {
  createDefaultFormInterfaceHistoryNotifications
} from "@/views/form/interfaces/form-interface";
import Content from "@/components/content/Content.vue";

export default defineComponent({
  name: "NotificationHistory",
  components: {
    Content,
    Button,
    TelaExpandida,
    CustomDatepicker,
    CustomDropdown
  },
  data() {
    return {
      data: createDefaultFormInterfaceHistoryNotifications(),
      error: false,
      icone: true,
      errorMessage: "A data inicial deve ser maior que a data final ou menor que a data atualmente",
      datePayment: {
        start: "",
        end: ""
      },
      responseData: null,
      id: "",
      Qtd: 0,
      optionsFilterQtd : Array.from({ length: 25 }, (_, index) => ({ value: index + 1, label: `${index + 1}` })),
      field: 0,
      optionsFilterFields: [
        { value: 1, label: "ID" },
        { value: 2, label: "Título"},
        { value: 3, label: "Descrição"},
        { value: 4, label: "Data de Divulgação"},
        { value: 5, label: "Tipo" },
        { value: 6, label: "ID do Produto" },
        { value: 7, label: "Nome do Produto" },
        { value: 8, label: "Alias do Produto" },
        { value: 9, label: "Descrição do Produto" },
        { value: 10, label: "Ano Referência Início" },
        { value: 11, label: "Mês Referência Início" },
        { value: 12, label: "Ano Referência Fim" },
        { value: 13, label: "Mês Referência Fim" },
      ]
    };
  },
  methods: {
    datePickerFormat,
    formatDate,
    removeHtmlTags(html) {
      // Use DOMParser para analisar o HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Obtenha o texto sem tags
      const textContent = doc.body.textContent;

      return textContent;
    },

    async listarTabela() {
      try {
        const queryString = this.verifyFilters();
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v3/calendario/${queryString}`);

        // Atualiza os dados do componente com os dados recebidos
        this.responseData = response.data;

        console.log('Dados recebidos:', this.responseData);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },

    ordenarPorCampo() {
        if (this.field === 0) {
          this.field = 1;
        }
     const campoMapping = {
        "ID": 'id',
        "Título": 'titulo',
        "Descrição": 'descricao',
        "Data de Divulgação": 'data_divulgacao',
        "Tipo": 'tipo',
        "ID do Produto": 'produto_id',
        "Nome do Produto": 'nome_produto',
        "Alias do Produto": 'alias_produto',
        "Descrição do Produto": 'descricao_produto',
        "Ano Referência Início": 'ano_referencia_inicio',
        "Mês Referência Início": 'mes_referencia_inicio',
        "Ano Referência Fim": 'ano_referencia_fim',
        "Mês Referência Fim": 'mes_referencia_fim',
      };


      let campo = campoMapping[this.optionsFilterFields.find(option => option.value === this.field)?.label];
      debugger
      // Verifica se o campo é do tipo string
      if (typeof this.responseData.items[0][campo] === 'string') {
        const orderFactor = this.ordemCrescente ? 1 : -1;

        this.responseData.items.sort((a, b) => {
          return orderFactor * a[campo].localeCompare(b[campo]);
        });

        this.icone = this.ordemCrescente;
      } else {
        // Se for do tipo numérico, aplicar a lógica de ordenação por data
        if (this.ordemCrescente) {
          this.responseData.items.sort((a, b) => new Date(a[campo]) - new Date(b[campo]));
          this.icone = true
        } else {
          this.responseData.items.sort((a, b) => new Date(b[campo]) - new Date(a[campo]));
          this.icone = false
        }

      }
      //atribuir o novo valor
      this.ordemCrescente = !this.ordemCrescente;
},

    async applyFilters() {
      try {
        const queryString = this.verifyFilters();
        let result = await this.listarTabela(queryString)
      } catch (error) {
        console.error("Error fetching form:", error);
      }
      this.data.block = true

    },

    verifyFilters() {
      let url = "";
      debugger
      url += "&qtd=" + (this.Qtd !== 0 ? this.Qtd : 5);

      const startDate = fieldIsNotEmpty(this.data.datePayment.start)
        ? formatDate(this.data.datePayment.start, "YYYY-MM-DD")
        : "2020-01-01";

      const endDate = fieldIsNotEmpty(this.data.datePayment.end)
        ? formatDate(this.data.datePayment.end, "YYYY-MM-DD")
        : formatDate(new Date(), "YYYY-MM-DD");

      // Verifica se a data inicial é maior que a data final
      if (startDate > endDate) {
        console.error("Erro: A data inicial não pode ser maior que a data final.");
        this.error = true
      }else {
        this.error = false
      }
      url += `&de=${startDate}&ate=${endDate}`;

      let urlNew = "";
      let newVector = url.split("&");
      if (newVector.length > 0) {
        for (var i = 0; i < newVector.length; i++) {
          if (i > 0) {
            if (i == 1) urlNew += "?" + newVector[i];
            else urlNew += "&" + newVector[i];
          }
        }
      }
      return urlNew;
    },

    clearFilters() {
      this.data.valorInputClient = null;
      this.data.datePayment.start = null;
      this.data.datePayment.end = null;
      this.error = false;
      window.location.reload();
    },

  },

  async mounted() {
    try {
      debugger
      const queryString = this.verifyFilters();
      await this.listarTabela(queryString);
    } catch (error) {
      console.error("Error fetching user form:", error);
    }
  }
});

</script>


<style scoped>

/*botao seta*/
.arrow-container {
  position: relative;
  cursor: pointer;
}

.circle {
  width: 30px;
  height: 30px;
  background-color: #3498db; /* Cor de fundo do círculo */
  border-radius: 50%; /* Bordas arredondadas para criar um círculo */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* Animação de transição da cor de fundo */
}

.circle-down {
  background-color: #2980b9; /* Cor de fundo quando a seta está para baixo */
}

.circle:hover {
  background-color: #e74c3c; /* Cor de fundo ao passar o mouse */
}

span {
  color: white; /* Cor do ícone */
  font-size: 18px;
}

/*hover no campo descricao*/
.hover-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 35vw;
  transition: max-width 1.0s;
  cursor: pointer;
}

.hover-cell:hover {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  max-width: none;
}
@import url('https://fonts.cdnfonts.com/css/avenir');
:root {
  --preto-300: #E4E4E4;
}

.card{
  border-radius: 12px;
  border: 1px solid var(--preto-300, #E4E4E4);
}
#card-body{
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 32px;
  padding-bottom: 0px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 24px;
  row-gap: 16px;
}

.div-partner-filtros {
  margin-top: 32px;
  margin-left: 32px;
  margin-bottom: 32px;
}

#limpar-filtros {
  height: 48px;
  margin-left: 16px;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.card {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
}

.modern-table thead {
  background: #007bff;
  color: white;
}

.modern-table tbody tr {
  transition: background 0.3s;
}

.modern-table tbody tr:hover {
  background: #f2f2f2;
}

@media screen and (max-width:991px) {
  #card-body {
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 24px;
  }

  .div-partner-filtros{
    margin-left: 24px;
    margin-right: 24px;
    grid-template-columns: 1fr;
  }
  .div-partner-filtros div {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    width: auto;
    padding-right: 0px;
    column-gap: 24px;
  }

  #limpar-filtros {
    margin-left: 0px;
  }
}

@media screen and (max-width: 500px) {
  #card-body {
    grid-template-columns: 1fr;
  }

  .div-partner-filtros {
    display: flex !important;
    flex-direction: column;
  }

  .div-partner-filtros div {
    display: flex !important;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
    row-gap: 16px;
    flex-direction: column;
  }

  #limpar-filtros {
    margin-left: 0px;
  }
}


</style>