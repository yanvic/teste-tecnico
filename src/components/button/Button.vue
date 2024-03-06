<template>
  <div>
    <b-button :class="typeButton == 'APLICAR'? 'button-integration':'button-integration-apagar'" squared>{{ name }}
    </b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    name: String,
    typeButton: String
  }
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
