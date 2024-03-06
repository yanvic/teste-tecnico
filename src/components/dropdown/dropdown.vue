<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomDropdown",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: ''
    },
    showOptions: {
      type: Boolean,
      default: true,
    },
    noResultsText: {
      type: String,
      default: 'Não há resultados',
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    searchFilter: {
      type: Function,
      default: null,
    },
    errorBool: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue', 'search-change'],
  methods: {
    updateValue(value: any) {
      this.$emit('update:modelValue', value);
    },
    handleSearchChange(value: string) {
      this.$emit('search-change', value);
    }
  }
});
</script>

<template>
  <div class="input-height">
  <label style="white-space: nowrap" class="col-form-label">{{ label }}</label>

  <Multiselect
    :value="modelValue"
    :options="options"
    @input="updateValue"
    :show-options="showOptions"
    :noResultsText="noResultsText"
    :searchable="searchable"
    @search-change="handleSearchChange"
    :search-filter="searchFilter"
    :class="errorBool ? 'form-control input-parcelling-error' : 'form-control input-parcelling'"
    autocomplete="off"
    :placeholder="placeholder"
  ></Multiselect>
    <span class="text-danger" style="padding-bottom: 0px;font-size: 12px" v-if="errorBool">
                  <div class="text-danger" style="font-size: 12px">
                    <img src="@/assets/images/info_red.svg" class="position-absolute " />
                    <span style="margin-left: 17px">{{ error}}</span>
                  </div>
                </span>
  </div>
</template>


<style scoped>
.input-height{
  height: 60px !important;
}

.col-form-label {
  padding:0;
}
.col-form-label {
  padding: 0;
}

:deep(.multiselect-dropdown) {
  border-color: #3a3af6 !important;
  border-bottom-right-radius: 8px!important;
  border-bottom-left-radius: 8px!important;
}

:deep(.multiselect.is-active .multiselect-dropdown) {
  display: block;
  visibility: visible;
  z-index: 100;
}

:deep(.multiselect-option.is-selected) {
  background: #FDE3F2 !important;
  color: black!important;
}
:deep(.multiselect.is-active) {
  box-shadow: none !important;
  border-color:  #3a3af6  !important;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
}

:deep(.multiselect-dropdown) {
  border-color:  #3a3af6  !important;
  border-bottom-right-radius: 8px!important;
  border-bottom-left-radius: 8px!important;
}

:deep(.multiselect-option.is-pointed) {
  background-color: #FDE3F2!important;
}

.input-height {
  height: 15px
}


</style>