<template>
  <div data-test="input-group" class="form-main">
    <template v-for="(el, ind) in inputData">
      <component
        :is="el.type"
        :key="ind"
        v-bind="el"
        :return-value="getValue"
      />
    </template>
  </div>
</template>

<script>
import Input from '@/components/common/inputs/Input'
export default {
  name: 'InputGroup',
  components: {
    'input-simple': Input
  },
  props: {
    inputData: { type: Array, default: () => [] },
    type: { type: String, default: null },
    dataTransporter: { type: Function, default: () => null }
  },
  data: () => ({
    validated: {},
    isValid: false
  }),
  computed: {
    validInputs() {
      return this.inputData.filter(el => !!this.validated[el.name])
    }
  },
  methods: {
    checkValidations() {
      if (this.inputData.length === this.validInputs.length) {
        this.isValid = true
        this.dataTransporter(this.type, this.validated)
      } else {
        this.isValid = false
        this.dataTransporter(this.type, null)
      }
    },
    getValue(name, value) {
      const valid = Object.assign({}, this.validated) // написано так вместо прямого назначения свойства для принудительного триггера computed методов vue
      valid[name] = value
      this.validated = valid
      this.checkValidations()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-main{
  max-width: 280px;
  button {
    margin-top: 20px;
  }
  .reminder{
    margin-top: 20px;
    margin-bottom: -20px;
    .form-input--required{
      color: #ed636c;
    }
  }
}

</style>
