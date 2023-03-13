<template>
  <div
    ref="wrapper"
    :data-test="`input-dropdown-${name}`"
    class="input-drop-search"
    tabindex="-1"
    :style="{
      maxWidth: 'calc(' + avgLength + 'ch + 40px)',
    }"
    @focus="wrapperFocus"
    @blur="wrapperBlur"
    @mouseleave="shouldClose = true"
    @mouseenter="shouldClose = false"
  >
    <div class="input-drop-search__input-wrapper">
      <input
        ref="input"
        v-model="input"
        :data-test="`input-dropdown-search-${name}`"
        :class="['input-drop-search__input', opened && 'extended']"
        type="text"
        tabindex="-1"
        name=""
        :placeholder="initial || placeholder"
        @focus="inputFocus"
        @blur="inputBlur"
        @keyup="keyUpHandler"
      />
      <transition name="fade">
        <button
          :data-test="`input-dropdown-expand${name}`"
          :class="[opened && 'arrow-up']"
          @click="dropDownHandler"
        >
          <v-icon>
            keyboard_arrow_down
          </v-icon>
        </button>
      </transition>
    </div>
    <transition name="fade">
      <!-- eslint-disable -->
      <div
        v-if="opened && filtered.length"
        :data-test="`input-dropdown-list-${name}`"
        class="input-drop-search__list"
      >
        <div :class="['input-drop-search__wrapper']">
          <div
            v-for="(el, i) in decider"
            :key="i"
            :class="[
              'input-drop-search__item',
              el === userSelected && 'chosen-item',
            ]"
            @mousedown="handleClick(el, i)"
            v-html="highLighter(el)"
          />
        </div>
      </div>
      <!-- eslint-enable -->
      <div v-else-if="opened" class="input-drop-search__list">
        <div class="input-drop-search__wrapper">
          <div :class="['input-drop-search__empty']">
            Ничего не найдено
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "InputDrop",
  props: {
    name: { type: String || Number, default: "" },
    action: { type: Function, default: () => null },
    items: { type: Array, default: () => [] },
    returnValue: { type: Boolean, default: false },
    initial: { type: [Number, String], default: "" },
    placeholder: { type: String, default: "" },
    avgLength: { type: Number, default: 20 },
    updatable: { type: Boolean, default: false },
    inverse: { type: Boolean, default: false },
  },
  data: () => ({
    input: "",
    userSelected: "",
    opened: null,
    shouldClose: true,
    wrapperFocused: false,
    inputFocused: false,
  }),
  computed: {
    filtered() {
      return this.items.filter((el) => this.checkIfMatched(el));
    },
    decider() {
      if (this.userSelected) return this.items;
      else return this.filtered;
    },
  },
  watch: {
    initial(n) {
      if (!n && this.updatable) this.input = this.userSelected = "";
      if (n && this.updatable) this.input = this.userSelected = n;
    },
  },
  mounted() {
    if (this.initial) {
      this.input = this.userSelected = this.initial;
    }
  },
  methods: {
    wrapperBlur() {
      this.wrapperFocused = false;
      if (this.shouldClose) this.opened = null;
    },
    wrapperFocus() {
      this.wrapperFocused = true;
    },
    inputBlur() {
      if (!this.userSelected) this.setUserSelected();
      if (this.filtered.length !== 1 && this.input.length) this.inputClear();
      this.inputFocused = false;
      if (this.shouldClose) {
        this.opened = null;
        return;
      }
      this.$refs.wrapper.focus();
    },
    inputFocus() {
      this.inputFocused = true;
      this.opened = true;
      this.$refs.input.select();
      if (this.userSelected) this.$refs.input.select();
    },
    setUserSelected() {
      if (this.filtered.length === 1) {
        this.input = this.userSelected = this.filtered[0];
      } else {
        this.userSelected = null;
      }
    },
    inputClear() {
      this.input = "";
      this.userSelected = null;
      this.opened = false;
    },
    handleClick(el, i) {
      this.userSelected = el;
      this.input = el;
      this.opened = false;
      this.action(this.returnValue ? el : i);
    },
    keyUpHandler() {
      this.opened = true;
      this.userSelected = null;
    },
    dropDownHandler() {
      if (this.wrapperFocused) this.opened = false;
      else this.inputFocus();
    },
    checkIfMatched(data) {
      return data.toString().search(new RegExp(this.input, "gi")) > -1;
    },
    highLighter(str) {
      const string = str.toString();
      if (string.search(new RegExp(this.input, "gi")) > -1) {
        return string.replace(new RegExp(this.input, "gi"), (match) => {
          return '<span class="highlight">' + match + "</span>";
        });
      } else {
        return string;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.input-drop-search {
  position: relative;
  z-index: 15;
  color: black;
  transition: max-width 0.4s;
  &:focus {
    outline: none;
  }
  &__input {
    width: 100%;
    height: 40px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #e1e1e1;
    transition-duration: 0.25s;
    transition-delay: 0.1s;
    padding: 0 20px;
    z-index: 1;
    &-wrapper {
      position: relative;
      z-index: 2;
      button {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 12px;
        top: 12px;
        width: 16px;
        height: 16px;
        background: #02a676;
        border-radius: 50%;
        transition: 0.25s;
        .v-icon {
          color: #fff;
          font-size: 14px;
        }
        &:focus {
          outline: none;
        }
        &.arrow-up {
          transform: rotate(180deg);
        }
      }
    }
    &:not(.extended):hover {
      border: 1px solid #666;
    }
    &:focus {
      outline: none;
      border: 1px solid #666;
    }
    &.extended {
      // background: #e2e2e2;
      height: 80px;
      padding-bottom: 40px;
      margin-bottom: -40px;
    }
  }
  &__list {
    display: flex;
    position: absolute;
    width: 100%;
    top: 40px;
    max-height: 260px;
    border-radius: 10px;
    overflow: hidden;
    // border: 1px solid #e1e1e1;
    flex-direction: column;
    text-align: left;
    padding: 10px 0;
    box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);
    background: #fff;
    transition: 0.1s !important; // исправить артефакт просвечивания границы инпута под
    z-index: 3;
    &::after {
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
    &::before {
      content: "";
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }
  &__wrapper {
    padding: 0 20px;
    overflow-y: auto;
  }
  &__item {
    color: #000;
    cursor: pointer;
    padding: 5px 0;
    &::first-letter {
      text-transform: capitalize;
    }
    &:hover {
      color: #02a676;
    }
  }
  &__empty {
    color: #666;
  }
  .chosen-item {
    color: #02a676;
  }
  .highlight {
    color: #02a676;
  }
}
</style>
