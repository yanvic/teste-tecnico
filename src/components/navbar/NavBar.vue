<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="navbar-brand">SPA</div>
      <div class="navbar-images">
        <img src="@/assets/images/ibge.png" alt="ibge.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalize, defineComponent } from "vue";
import Button from "@/components/button/Button.vue";
export default defineComponent({
  components: {
    Button
  },

});
</script>
<style>
@import url('https://fonts.cdnfonts.com/css/avenir');
@import url('https://fonts.cdnfonts.com/css/nunito');

.navbar {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5em;
}

.navbar-images img {
  height: 30px;
  justify-content: right;
  width: auto;
}

</style>
