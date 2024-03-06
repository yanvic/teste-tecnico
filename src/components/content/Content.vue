<template>
  <div :class="[getClasses()]">
    <slot name="slot">

    </slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Content",
  props: {
    contentMargin: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    getClasses(){
      if (this.contentMargin) return "content-margin"
      else return "content"
    }
  }
})

</script>

<style>
  .content {
    width: 100%;
    padding: 32px 40px 40px 40px !important;
    overflow-x: hidden;
  }

  .content-margin {
    width: 100%;
    padding: 32px 40px 40px 40px !important;
    overflow-x: hidden;
  }

  @media screen and (max-width: 599px) {
    .content-margin {
      padding: 32px 20px 20px 20px !important;
    }

    .content {
      width: 100%;
      padding: 32px 20px 20px 20px !important;
      overflow-x: hidden;
    }
  }
</style>