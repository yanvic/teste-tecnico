<template>
  <!--  <NavBar></NavBar>-->
  <div :class="returnClasses()"
       :style="storeMenuVuex.state.active ? {'grid-template-columns': 'auto 1fr' } :{'grid-template-columns': '223px 1fr' }">
    <SideBar style="z-index: 1030"></SideBar>
    <router-view />
    <!--    <Footer></Footer>-->
  </div>
</template>

<style lang="scss">
@keyframes columnChange {
  0% {
    grid-template-columns: auto 1fr;
  }
  100% {
   grid-template-columns: 223px 1fr;
  }
}

@keyframes columnChange1 {
  0% {
    grid-template-columns: 240px 1fr;
  }
  100% {
    grid-template-columns: 80px 1fr;
  }
}


.divisor-tela1 {
  animation-name: columnChange1;
  animation-duration: 300ms;
  animation-timing-function: ease-in-out;
}

.divisor-tela2 {
  animation-name: columnChange;
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
}

.divisor-tela {
  width: 100%;
  height: 100%;
  display: grid;
  background-color: var(--color_background);
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/sidebar/SideBar.vue";
import NavBar from "@/components/navbar/NavBar.vue";
import Footer from "@/components/footer/Footer.vue";


export default defineComponent({
  name: "HomeView",

  components: {
    NavBar,
    SideBar,
    Footer
  },
  methods: {

  }
});
</script>
