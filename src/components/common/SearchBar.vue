<template>
  <div class="search-bar">
    <v-text-field
      placeholder="Поиск по наименованию"
      outlined
      v-model="value"
      data-test="search-bar"
      @keydown.enter="searchHandler"
    />
    <v-icon
      class="search-button"
      data-test="search-bar-button"
      @click="searchHandler"
    >
      mdi-magnify
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class SearchBar extends Vue {
  value = "";

  @Prop({ type: Function, default: () => null })
  readonly handler!: any;

  @Prop({ type: String, default: "" })
  readonly query!: string;

  @Watch("query")
  queryWatcher() {
    this.value = this.query;
  }

  searchHandler() {
    this.handler(this.value);
  }

  mounted() {
    this.queryWatcher();
  }
}
</script>

<style lang="scss">
.search-bar {
  position: relative;
  max-width: 100%;
  width: 400px;
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    margin: 0;
    box-shadow: none;
    background: #fff;
    min-height: 42px !important;
    max-height: 42px !important;
    input {
      padding-right: 25px;
    }
  }
  fieldset {
    border-color: $border-color;
  }
  .v-input--is-focused {
    fieldset {
      border-color: $main-color;
    }
  }
  button.search-button {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 5px;
    &:hover {
      color: $main-color;
    }
  }
}
</style>
