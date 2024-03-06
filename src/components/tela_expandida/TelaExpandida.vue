<template>
  <div class="tela-expand">
    <NavBar :title="title" :history-router="historyRouter" :smaller_spacing=smaller_spacing></NavBar>
    <div class="tela-expansivel">
      <slot name="tela">
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/navbar/NavBar.vue";

export default defineComponent({
  name: "TelaExpandida",
  props: {
    title: String,
    historyRouter: Object,
    smaller_spacing: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    NavBar
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tela-expand {
  overflow-y: auto;
  padding: 0;
  position: relative;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
}

.tela-expansivel {
  padding: 0;
  width: 100%;
}



@media screen and (max-width: 600px) {
  .tela-expansivel {
    width: auto;
    height: auto;
    margin-left: 0;
    margin-right: 0;
    background-color: #F5F5F5;
  }

  .tela-expand {
    padding: unset;
    position: absolute;
  }
}
</style>

