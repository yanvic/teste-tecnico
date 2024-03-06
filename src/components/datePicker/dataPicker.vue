<template>
  <div>
    <label style="white-space: nowrap" class="col-form-label">{{title}}</label>
    <Datepicker
      :month-change-on-scroll="false"
      :placeholder="placeholder"
      v-model="internalDate"
      :max-date="maxDate"
      :min-date="minDate"
      :format="datePickerFormat"
      :locale="locale"
      autoApply
      :enableTimePicker="false"
      :weekStart="0"
      :dayNames="dayNames"
      @input="updateValue"
      :range="range"
      :disabled="disabled"
    ></Datepicker>
    <span class="text-danger" style="padding-bottom: 0px;font-size: 12px" v-if="errorBool">
                  <div class="text-danger" style="font-size: 12px">
                    <img src="@/assets/images/info_red.svg" class="position-absolute " />
                    <span style="margin-left: 17px">{{ error}}</span>
                  </div>
                </span>
  </div>
</template>

<style scoped>
.black-border{
  border: black 1px solid;
  border-radius: 8px;
}

</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { datePickerFormat } from "@/utils/geral";

export default defineComponent({
  name: 'CustomDatepicker',
  methods: { datePickerFormat },
  props: {
    placeholder: {
      type: String,
      default: 'DD/MM/AAAA'
    },
    modelValue: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    range: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxDate: {
      type: String,
      required: false
    },
    errorBool: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    minDate: {
      type: String,
      required: false
    },
    locale: {
      type: String,
      default: 'pt-BR'
    },
    dayNames: {
      type: Array,
      default: () => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    }
  },
  setup(props, { emit }) {
    const internalDate = ref(props.modelValue);

    watch(internalDate, (newValue) => {
      emit('update:modelValue', newValue);
    });

    const updateValue = (value: any) => {
      internalDate.value = value;
    };

    return {
      internalDate,
      updateValue
    };
  }
})
</script>
<style scoped>

:deep(.dp__input) {
  border-color: #cbc2c2;
  height: 54px;
}

:deep(.dp__input)::placeholder {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

:deep(.dp__input_focus) {
  border-color: #3a3af6;
}

.col-form-label {
  padding: 0;
}

</style>