<template>
  <form
    :class="['image-wrapper', { hovered: fileHover }]"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
    @drag.stop.prevent="() => null"
    @dragstart.stop.prevent="() => null"
    @dragend.stop.prevent="() => null"
    @dragover.prevent="onEnter"
    @dragleave.prevent="onLeave"
    @drop.prevent="dropHandler"
  >
    <img class="image-item" :src="item.url" alt="Изображение товара" />
    <div class="image-controls-wrapper">
      <div class="image-controls" v-show="showActions && !disabled">
        <v-btn @click="edit(item)" icon title="Переместить">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
        <v-btn @click="remove(item)" icon title="Удалить">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ImageWrapper",
  props: {
    item: { type: Object, default: () => ({}) },
    remove: { type: Function, default: () => null },
    edit: { type: Function, default: () => null },
    onFileDrop: { type: Function, default: () => null },
    disabled: { type: Boolean, default: () => null },
  },
  data: () => ({
    showActions: false,
    fileHover: false,
  }),
  watch: {
    disabled(n) {
      if (!n) this.showActions = false;
    },
  },
  methods: {
    onEnter(e) {
      if (e.dataTransfer.types.length) this.fileHover = true;
    },
    onLeave() {
      this.fileHover = false;
    },
    dropHandler(e) {
      this.fileHover = false;
      if (e.target.files || (e.dataTransfer.files && e.dataTransfer.files.length)) {
        this.onFileDrop(e);
      }
    },
  },
});
</script>

<style
  lang="scss"
  scoped
>
.image-wrapper {
  position: relative;
  margin: 5px;
  max-width: 170px;
  max-height: 170px;
  width: 170px;
  height: 170px;
  border: 1px dashed transparent;
  border-radius: 6px;
  transition: 250ms;
  overflow: hidden;
  img {
    opacity: 1;
    transition: inherit;
  }
  &.hovered {
    border-color: $main-color;
    img {
      opacity: 0.25;
    }
  }
}
.image-item {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.image-controls {
  display: flex;
  background: #fff;
  border-radius: 18px;
  box-shadow: $shadow-main;
}
.image-controls-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
}
</style>
