<template>
  <div
    :class="[
      'form-input',
      disabled && 'disabled',
      error && 'invalid',
      (valid && !disabled && val) && 'valid',
    ]"
  >
    <input
      ref="input"
      :type="type"
      :mode="mode"
      :name="name"
      :disabled="disabled"
      :data-test="`dropdown-input-${name}`"
      :class="[
        (!focus && !val) && 'input-hidden',
      ]"
      spellcheck="false"
      autocomplete="off"
      @input="inputHandler"
      @change="changeHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    />
    <label :for="name" :class="(focus || !!val) && 'shrinked'">
      {{ placeholder }}
      <span v-if="required" class="form-input--required">*</span>
    </label>

    <template v-if="$slots.default">
      <div class="input-slot">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <span v-if="valid && !disabled && !!val" class="mark mark--valid">&#x2713;</span>
      <span v-else-if="error" class="mark mark--invalid">&#x2715;</span>
    </template>

    <transition name="slide-down">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from "vue";
  const defaultErr = "Поле обязательно для заполнения";

  const Validations = {
    verify: "verify",
    mask: "mask",
    regex: "regex",
    required: "required",
    min: "min",
    max: "max",
  }

  export default Vue.extend({
    name: "Input",
    components: {},
    props: {
      name: { type: String, default: null },
      initial: { type: String, default: null },
      type: { type: String, default: "text" },
      mode: { type: String || null, default: null },
      placeholder: { type: String, default: "Заполните это поле" },
      required: { type: Boolean, default: false },
      returnValue: { type: Function, default: () => null },
      disabled: { type: Boolean, default: false },
      mask: { type: Object, default: () => null },
      regex: { type: Object, default: () => null },
      min: { type: Object, default: () => null },
      max: { type: Object, default: () => null },
      errorMsg: { type: String, default: defaultErr },
      verify: { type: String, default: null },
      maskOptions: { type: Object, default: () => null },
      tooltip: { type: Object, default: () => null },
    },
    data() {
      return {
        val: "",
        valid: false,
        focus: false,
        error: "",
        validationErrors: [],
        input: this.$refs.input,
        touched: false,
      };
    },
    computed: {
    },
    watch: {
      disabled(n) {
        if (n) {
          this.val = "";
          this.$refs.input.value = "";
          this.valid = false;
          this.error = "";
          this.returnValue(this.name, null);
        }
      },
      errorMsg(n) {
        if (n !== defaultErr) {
          if (typeof n === "string") {
            this.setError(n);
          } else if (n.length) {
            this.setError(n.join(", "));
          }
        }
      }
    },
    mounted() {
      this.input = this.$refs.input;
      if (this.$slots.default) {
        const el = this.$slots.default[0].elm;
        if (el) this.input.style.paddingRight = el.offsetWidth + 20 + 'px';
      }
      this.addMask();
      this.valid = this.input.inputmask ? this.input.inputmask.isValid() : false;
    },
    methods: {
      addMask() {
        //
      },
      setInitial(str) {
        // console.warn(this.name, "initial", str);
        this.val = str;
        this.input.value = str;
      },
      inputHandler(e) {
        this.touched = true;
        this.error = "";
        if (e.isTrusted && !this.isTextField) {
          /* browser input */
          setTimeout(() => {
            this.extractValues();
            this.synthInput();
            // this.input.blur();
          }, 0);
        } else {
          /* user input */
          this.synthInput();
        }
      },
      changeHandler(e) {
        /* other input (copy|paste e.t.c) */
        this.touched = true;
        this.error = "";
        if (!e.isTrusted) {
          this.val = this.extractValues();
          this.checkForValid();
          this.checkForErrors();
          this.returnValue(this.name, this.valid ? this.val : null);
        }
      },
      extractValues() {
        const val = this.input.value;
        if (this.input.inputmask) this.input.inputmask.setValue(val);
        return val;
      },
      synthInput() {
        this.val = this.getValue();
        this.checkForValid();
        if (this.isTextField) {
          this.textScroller();
        }
        this.returnValue(this.name, this.valid ? this.val : null, "input");
      },
      textScroller() {
        const scroll = this.input.scrollHeight;
        const offset = this.input.offsetHeight;
        if (scroll > 80 && scroll > offset) {
          this.input.scrollTop = scroll;
        }
      },
      focusHandler() {
        if (this.valid) this.input.select();
        this.focus = true;
        this.$emit('focus');
      },
      blurHandler() {
        this.checkForErrors();
        this.focus = false;
        this.$emit('blur');
      },
      checkForValid() {
        this.validationErrors = [];
        let valid = true;

        if (
          this.required
          && !this.val
        ) {
          valid = false;
          this.validationErrors.push(Validations.required);
        }
        if (this.verify) {
          valid = this.val === this.verify;
          if (!valid) this.validationErrors.push(Validations.verify);
        }
        if (this.min) {
          valid = this.val.length >= this.min.value;
          if (!valid) this.validationErrors.push(Validations.min);
        }
        if (this.max) {
          valid = this.val.length <= this.max.value;
          if (!valid) this.validationErrors.push(Validations.max);
        }
        if (
          this.regex
          && this.val
        ) {
          const reg = new RegExp(this.regex.value, "i");
          valid = reg.test(this.val);
          if (!valid) this.validationErrors.push(Validations.regex);
        }
        if (
          this.mask
          && this.input.inputmask
        ) {
          valid = this.input.inputmask.isValid();
          if (!valid) this.validationErrors.push(Validations.mask);
        }
        this.valid = !this.validationErrors.length;
      },
      checkForErrors() {
        const errors = this.validationErrors.map((error) => {
          if (error === Validations.required) return this.errorMsg || defaultErr;
          else return this[error].errorMessage;
        });
        if (errors.length) {
          this.setError(errors[0]);
          return true;
        } else {
          this.setError("");
          return false;
        }
      },
      setError(msg) {
        this.error = msg;
        if (this.touched) this.valid = !msg;
      },
      getValue() {
        return this.input.inputmask ? this.input.inputmask.unmaskedvalue() : this.input.value;
      },
      reset() {
        this.touched = false;
        this.val = this.initial || "";
        this.input.value = this.initial || "";
        this.error = "";
        this.valid = false;
      },
      removeTransition() {
        this.input.style.transition = "none";
      },
      addTransition() {
        this.input.style.transition = ".2s";
      },
    },
  });
</script>

<style lang="scss" scoped>
  $blue: $main-color;
  $err: $warning-color;
  .form-input {
    position: relative;
    /*background: #fff;*/
    border-radius: 2px;
    transition: 0.2s;
    width: 100%;
    max-width: 100%;
    &:not(:last-of-type) {
      /*margin-bottom: 10px;*/
    }
    label {
      position: absolute;
      color: #a3a5a5;
      line-height: 40px;
      z-index: 15;
      left: 20px;
      top: 0;
      bottom: 0;
      transform-origin: top left;
      pointer-events: none;
      transition: 0.2s;
    }
    input, textarea {
      position: relative;
      height: 40px;
      line-height: 40px;
      width: 100%;
      padding: 0 30px 0 20px;
      border: 1px solid #d3d3d3;
      background: #fff;
      /*background: transparent;*/
      border-radius: 2px;
      z-index: 10;
      transition: 0.2s;
      &:hover {
        border-color: #aeaeae;
      }
      &:focus {
        outline: none;
        border-color: $blue;
      }
    }
    textarea {
      height: 80px;
      min-height: 80px;
      max-height: 500px;
      padding: 12px 20px;
      line-height: 16px;
      resize: vertical;
    }
    input.input-hidden {
      color: transparent;
    }
    .mark {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 12px;
      top: 12px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
    }
    .mark--valid {
      z-index: 20;
      color: $blue;
    }
    .mark--invalid {
      color: $err;
    }
    .mark--disabled {
      z-index: 90;
      cursor: pointer;
    }
    .shrinked {
      opacity: 0;
    }
    .error-message {
      color: $err;
      font-size: 12px;
      padding-left: 20px;
      text-align: left;
      opacity: 1;
      margin: 8px 0 2px 0;
      transition: 0.3s;
    }
    .slide-down-enter {
      opacity: 0;
      max-height: 0;
      margin: 0;
    }
    .slide-down-leave-to {
      opacity: 0;
      max-height: 0;
      margin: 0;
    }
    .input-slot {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 15;
    }
  }
  .form-input--required {
    color: $err;
  }
  .form-input.valid {
    input, textarea {
      border-color: $blue;
    }
  }
  .form-input.invalid {
    input, textarea {
      border-color: $err !important;
    }
  }
  .disabled {
    background: #f2f2f2;
    label {
      color: #666;
    }
  }
</style>
