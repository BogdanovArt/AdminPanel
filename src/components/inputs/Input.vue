<template>
  <div
    :class="[
      'form-input',
      (isDisabled || disabled) && 'disabled',
      error && 'invalid',
      valid && !disabled && !empty && 'valid',
    ]"
  >
    <template v-if="isTextField">
      <textarea
        v-if="isTextField"
        ref="input"
        v-model="val"
        type="text"
        :data-test="`input-${name}`"
        :name="name"
        :disabled="isDisabled || disabled"
        :class="[!focus && empty && 'input-hidden', 'textarea']"
        @input="inputHandler"
        @focus="focusHandler"
        @blur="blurHandler"
        @mousedown="removeTransition"
        @mouseup="addTransition"
        @keyup="keyHandler"
      />
    </template>
    <template v-else>
      <template v-if="mask">
        <input
          ref="input"
          :type="name.includes('password') ? 'password' : 'text'"
          :mode="mode"
          :name="isLogin ? 'username' : name"
          :disabled="isDisabled || disabled"
          :data-test="`input-${name}`"
          :class="[
            !focus && !unmaskedValue.length && 'input-hidden',
            isPhone && 'input-phone',
          ]"
          :placeholder="focus && prefix"
          spellcheck="false"
          v-mask="mask && mask.value"
          v-model="val"
          @input="inputHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @keyup="keyHandler"
          @keydown="keyDownHandler"
          @mousedown="mouseDownHandler"
          @mouseup="mouseUpHandler"
        />
      </template>
      <template v-else>
        <input
          ref="input"
          :type="name.includes('password') ? 'password' : 'text'"
          :mode="mode"
          :name="name"
          :disabled="isDisabled || disabled"
          :data-test="`input-${name}`"
          :class="[
            !focus && !val.length && 'input-hidden',
            isPhone && 'input-phone',
          ]"
          spellcheck="false"
          v-model="val"
          @input="inputHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @keyup="keyHandler"
        />
      </template>
    </template>

    <label :for="name" :class="(focus || unmaskedValue.length) && 'shrinked'">
      {{ placeholder }}
      <span v-if="required" class="form-input--required">*</span>
    </label>

    <template v-if="$slots.default">
      <div class="input-slot">
        <slot></slot>
      </div>
    </template>
    <template v-else-if="!isTextField">
      <span v-if="valid && !disabled && !empty" class="mark mark--valid">
        &#x2713;
      </span>
      <span v-else-if="error" class="mark mark--invalid">&#x2715;</span>
      <tool-tip v-else-if="tooltip" :tooltip="tooltip" />
    </template>

    <transition name="slide-down">
      <div
        v-if="error"
        :data-test="`input-${name}-error`"
        class="error-message"
      >
        {{ error }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import ToolTip from "./ToolTip.vue";

import { InputTypes, Validations } from "@/store/enums";

const defaultErr = "Поле обязательно для заполнения";
const verifyErr = "Пароли не совпадают";

type inputValue = string | number | null;

interface IMaskValidation {
  value: string;
  errorMessage: string;
}

interface ILengthValidation {
  value: number;
  errorMessage: string;
}

interface IToolTip {
  title: string;
  icon?: string;
  external_url?: string;
}

@Component({
  components: {
    ToolTip,
  },
})
export default class Input extends Vue {
  val = "";
  unmaskedValue = "";
  input: HTMLInputElement = this.$refs.input as HTMLInputElement;
  valid = false;
  isDisabled = false;

  mouseDown = false;
  touched = false;
  focus = false;

  validationErrors: Validations[] = [];
  error = "";
  errors: (string | undefined)[] = [];

  @Prop({ type: String, default: "" })
  readonly name!: string;

  @Prop({ type: Object, default: () => null })
  readonly tooltip?: IToolTip;

  @Prop({ type: String, default: "text" })
  readonly type!: string;

  @Prop({ type: String, default: "Заполните это поле" })
  readonly placeholder!: string;

  @Prop({ type: Boolean, default: false })
  readonly required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean;

  @Prop({ type: String, default: defaultErr })
  readonly errorMessage!: string;

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (name: string, val: inputValue) => void;

  @Prop({ type: Function, default: () => null })
  readonly init!: (name: string, init: () => Array<string | undefined>) => void;

  @Prop({ type: String })
  readonly initial?: string;

  @Prop({ type: String })
  readonly prefix?: string;

  @Prop({ type: String })
  readonly mode?: string;

  @Prop({ type: [String, Number] })
  readonly verify?: string | number;

  @Prop({ type: Object })
  readonly mask?: IMaskValidation;

  @Prop({ type: Object })
  readonly regex?: IMaskValidation;

  @Prop({ type: Object })
  readonly max?: ILengthValidation;

  @Prop({ type: Object })
  readonly min?: ILengthValidation;

  get isLogin() {
    return this.name === "login" || this.name === "username";
  }

  get isPhone() {
    return this.name === "phone";
  }

  get isTextField() {
    return this.type === InputTypes.TEXT;
  }

  get empty() {
    return !this.val || this.prefix === this.val;
  }

  created() {
    this.init(this.name, this.forceErrorCheck);
  }

  mounted() {
    this.input = this.$refs.input as HTMLInputElement;
    this.valid = false;
    this.isDisabled = false;
    if (this.initial) {
      const value = this.unmasked(this.initial);
      this.val = this.unmaskedValue = value;
      this.checkForValid();
      this.checkForErrors();
    }
    if (!this.disabled && this.val) this.returnValue(this.name, this.val);
  }

  @Watch("val")
  valueWatcher(n: string) {
    this.unmaskedValue = this.unmasked(n);
  }

  @Watch("disabled")
  disabledWatcher(n: boolean) {
    if (n) {
      this.val = "";
      (this.$refs.input as HTMLInputElement).value = "";
      this.valid = false;
      this.error = "";
      this.returnValue(this.name, null);
    }
  }

  @Watch("errorMessage")
  errorMessageWatcher(n: string | string[]) {
    if (n !== defaultErr) {
      if (typeof n === "string") {
        this.setError(n);
      } else if (n.length) {
        this.setError(n.join(", "));
      }
    }
  }

  public unmasked(value: string) {
    if (this.mask && typeof this.mask.value === "string") {
      const mask = this.mask.value;
      const chars = mask.split("");
      const values = value.split("");
      return chars
        .map((maskChar: string, index: number) => {
          return maskChar !== values[index] ? values[index] : "";
        })
        .join("");
    } else {
      return value;
    }
  }

  public setError(msg: string) {
    this.error = msg;
    if (this.touched) this.valid = !msg;
  }

  inputHandler(e: InputEvent) {
    if (e.isTrusted) this.touched = true;

    this.error = "";

    if (this.prefix) {
      if ((e.target as HTMLInputElement).value.length < this.prefix.length) {
        if (e.data && e.data.length) {
          this.val = this.prefix + e.data;
        } else if (e.inputType === "insertFromPaste") {
          const cleared = this.unmasked(this.val);
          this.val = this.prefix + cleared;
        } else {
          this.val = this.prefix;
        }
      }
    }

    setTimeout(() => {
      this.checkForValid();
      if (this.isTextField) {
        this.textScroller();
      }
      if (this.touched)
        this.returnValue(this.name, this.valid ? this.unmaskedValue : null);
    }, 0);
  }

  keyDownHandler(e: KeyboardEvent) {
    if (this.mouseDown) e.preventDefault();
  }

  keyHandler(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "z") {
      this.forceErrorCheck();
    }
    this.cursorReset(this.input);
  }

  focusHandler() {
    if (this.valid) this.input.select();
    if (!this.val && this.prefix) this.val = this.prefix; // this line might break autofill - remove in case of bugs
    this.focus = true;
  }

  mouseDownHandler() {
    this.mouseDown = true;
    if (!this.val && this.prefix) this.val = this.prefix;
    this.cursorReset(this.input);
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false;
    this.cursorReset(e.target as HTMLInputElement);
  }

  blurHandler() {
    this.focus = false;
    if (this.touched) {
      this.checkForErrors();
      setTimeout(() => {
        this.checkForErrors();
      }, 10);
    }
  }

  cursorReset(input: HTMLInputElement) {
    if (this.prefix) {
      const cursorSelection = input.selectionStart === input.selectionEnd;
      const emptySelected = input.selectionStart
        ? input.selectionStart <= this.prefix.length
        : true;
      if (cursorSelection && emptySelected) {
        input.selectionStart = input.selectionEnd = this.prefix.length;
      }
    }
  }

  maskIsFilled(value = ""): boolean {
    if (this.mask) {
      const maskLength = this.mask.value.length;
      return value.length >= maskLength;
    } else {
      return false;
    }
  }

  textScroller() {
    const scroll = this.input.scrollHeight;
    const offset = this.input.offsetHeight;
    if (scroll > 80 && scroll > offset) {
      this.input.scrollTop = scroll;
    }
  }

  checkForValid() {
    this.validationErrors = [];
    let valid = true;

    if (this.required && !this.unmaskedValue) {
      valid = false;
      this.validationErrors.push(Validations.required);
    }
    if (this.verify) {
      valid = this.unmaskedValue === this.verify;
      if (!valid) this.validationErrors.push(Validations.verify);
    }
    if (this.min) {
      valid = this.unmaskedValue.length >= this.min.value;
      if (!valid) this.validationErrors.push(Validations.min);
    }
    if (this.max) {
      valid = this.unmaskedValue.length <= this.max.value;
      if (!valid) this.validationErrors.push(Validations.max);
    }
    if (this.regex) {
      const reg = new RegExp(this.regex.value, "i");
      valid = reg.test(this.val);
      if (!valid) this.validationErrors.push(Validations.regex);
    }
    if (this.mask) {
      valid = this.maskIsFilled(this.val) || this.empty;
      if (!valid) this.validationErrors.push(Validations.mask);
    }
    this.valid = !this.validationErrors.length;
  }

  checkForErrors() {
    const errors = this.validationErrors.map((error: Validations) => {
      if (error === Validations.verify) {
        return verifyErr;
      } else if (error === Validations.required) {
        return this.errorMessage || defaultErr;
      } else {
        return this[error]?.errorMessage;
      }
    });
    if (errors.length) {
      this.errors = errors;
      if (errors[0]) this.setError(errors[0]);
      return true;
    } else {
      this.errors = [];
      this.setError("");
      return false;
    }
  }

  forceErrorCheck() {
    this.checkForValid();
    this.checkForErrors();
    this.returnValue(this.name, this.valid ? this.unmaskedValue : null);
    return this.errors;
  }

  removeTransition() {
    this.input.style.transition = "none";
  }

  addTransition() {
    this.input.style.transition = ".2s";
  }
}
</script>

<style lang="scss" scoped>
$main-dimension: 40px;
$border-color: rgba(0, 0, 0, 0.12);
$success: green;
.form-input {
  position: relative;
  border-radius: 2px;
  transition: 0.2s;
  width: 100%;
  max-width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  label {
    position: absolute;
    color: #a3a5a5;
    line-height: $main-dimension;
    z-index: 15;
    left: 20px;
    top: 0;
    bottom: 0;
    pointer-events: none;
    transform-origin: top left;
    transition: 0.2s;
  }

  input,
  textarea {
    position: relative;
    height: $main-dimension;
    line-height: $main-dimension;
    width: 100%;
    padding: 0 30px 0 12px;
    border: 1px solid $border-color;
    border-radius: 2px;
    z-index: 10;
    transition: 0.2s;

    &:not(:disabled) {
      background: #fff;
    }

    &:hover {
      border-color: #d3d3d3;
    }

    &:focus {
      outline: none;
      border-color: $main-color;
    }
  }

  textarea {
    height: 80px;
    min-height: 80px;
    max-height: 500px;
    padding: 12px;
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
    z-index: 10;
  }

  .mark--valid {
    color: $success;
  }

  .mark--invalid {
    color: $warning-color;
  }

  .mark--disabled {
    z-index: 90;
    cursor: pointer;
  }

  .shrinked {
    opacity: 0;
  }

  .error-message {
    color: $warning-color;
    font-size: 12px;
    padding-left: 12px;
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
  color: $warning-color;
}

.form-input.valid {
  input,
  textarea {
    border-color: $main-color;
  }
}

.form-input.invalid {
  input,
  textarea {
    border-color: $warning-color !important;
  }
}

.disabled {
  background: #f2f2f2;

  label {
    color: #666;
  }
}
</style>
