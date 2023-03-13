<template>
  <div class="image-input">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="upload-warning">
          {{ dialogMessage }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            x-small
            style="text-transform: none"
            @click="closeModal"
          >
            Понятно
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="files.length" class="image-previews">
      <draggable
        class="list-group"
        v-model="files"
        v-bind="options"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <div
          class="list-group-item"
          v-for="(element, index) in files"
          :key="element.order"
        >
          <image-wrapper
            :item="element"
            :remove="fileDelete"
            :disabled="disableControls"
            :on-file-drop="(e) => imageDropHandler(e, index)"
          />
        </div>
      </draggable>
    </div>
    <!--<v-btn @click="fileDelete">del</v-btn>-->

    <form
      v-show="!maxCount || files.length < maxCount"
      :class="['drop-zone', { hovered: fileHover }]"
      ref="fileform"
      @dragover="onEnter"
      @dragleave="onLeave"
      @drop.stop.prevent="imageDropHandler"
    >
      <div class="file-info">
        <v-icon large> mdi-image </v-icon>
        <p>
          Перетащите изображение в эту область,<br />
          чтобы начать автоматическую загрузку
        </p>
        <div>
          <span class="text-divider">или</span>
        </div>
        <v-btn class="file-uploader" @click="$refs.manual.click()">
          Загрузите изображение вручную
        </v-btn>
        <!-- добавить ручную загрузку -->
        <input
          v-show="false"
          type="file"
          ref="manual"
          :accept="formats"
          @change="imageDropHandler"
        />
      </div>
    </form>
    <ul class="file-info__tips">
      <li>
        {{ this.imagesLimits ? userWarnings.resolution : "" }}
      </li>
      <li>
        {{ userWarnings.size }}
      </li>
      <li>Формат изображения должен быть {{ readableFormats }}</li>
    </ul>
    <div v-show="changed" class="change-revert">
      <v-btn color="error" @click="revert">ОТМЕНИТЬ</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import draggable from "vuedraggable";

import ImageWrapper from "@/components/common/ImageWrapper";

import axios from "@/utils/interceptors";

const defaultFormats = ["image/jpeg", "image/png", "image/jpg"];

export default Vue.extend({
  name: "ImageInput",
  components: {
    ImageWrapper,
    draggable,
  },
  props: {
    name: { type: String, default: null },
    required: { type: Boolean, default: false },
    returnValue: { type: Function, default: () => null },
    disabled: { type: Boolean, default: false },
    errorMsg: { type: String, default: "Поле заполнено некорректно" },
    endpoint: { type: String, default: "/api/admin/v1/files/image" },
    formats: { type: Array, default: () => defaultFormats },
    items: { type: Array, default: () => null },
    maxCount: { type: Number, default: 0 },
    maxWidth: { type: Number, default: 2560 },
    maxHeight: { type: Number, default: 2560 },
    minWidth: { type: Number, default: 320 },
    minHeight: { type: Number, default: 320 },
    maxSize: { type: Number, default: 6 },
    minSize: { type: Number, default: 0 },
  },
  data: () => ({
    options: {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    },
    files: [],
    lastSavedValue: [],
    fileHover: false,
    disableControls: false,
    dialog: false,
    dialogMessage: "",
  }),
  mounted() {
    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ].forEach((evt) => {
      this.$refs.fileform.addEventListener(evt, this.preventer, false);
    });

    if (this.items.length) {
      this.setItems();
    }
  },
  watch: {
    items() {
      this.setItems();
    },
  },
  computed: {
    ids() {
      return this.files.map((el) => el.id);
    },
    changed() {
      return JSON.stringify(this.ids) !== JSON.stringify(this.lastSavedValue);
    },
    readableFormats() {
      const readableChunks = [];

      this.formats.forEach((rawExtension, ind) => {
        let chunk = rawExtension;

        if (ind === this.formats.length - 2) {
          chunk += " или";
        } else if (ind !== this.formats.length - 1) {
          chunk += ",";
        }

        readableChunks.push(chunk.replace("image/", ""));
      });
      return readableChunks.join(" ");
    },
    minSizeMsg() {
      let size = this.minSize;
      let sizeReadable = "мб";
      if (this.minSize && this.minSize < 1) {
        size = this.minSize * 1000;
        sizeReadable = "кб";
      }
      return size > 0 ? ` и не менее ${size} ${sizeReadable}` : "";
    },
    userWarnings() {
      return {
        multi: "Выберите одно изображение",
        format: `Загрузите файл в формате ${this.readableFormats}`,
        size: `Размер изображения должен быть не более ${this.maxSize} мб${this.minSizeMsg}`,
        resolution: `Разрешение изображения должно быть не менее ${this.minWidth}x${this.minHeight} и не более ${this.maxWidth}х${this.maxHeight}`,
        common: "Ошибка загрузки файла",
        success: "Изображение успешно загружено",
        server: "Ошибка отправки изображения",
      };
    },
    imagesLimits() {
      return this.maxHeight || this.minHeight || this.maxWidth || this.minWidth;
    },
  },
  methods: {
    preventer(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    setItems() {
      this.setFilesFromItems();
      this.lastSavedValue = this.ids;
      this.returnValue(this.name, this.ids);
    },
    revert() {
      this.setFilesFromItems();
      this.returnValue(this.name, this.lastSavedValue);
    },
    setFilesFromItems() {
      this.files = this.items.map((el, i) => {
        return { ...el, order: i + 1 };
      });
    },
    async imageDropHandler(e, index) {
      const file = await this.handleDropEvent(e);
      if (file) {
        const image = await this.sendFile(file);
        if (image) {
          this.fileAdd(image.url, image.id, index);
          const ids = this.files.map((img) => img.id);
          this.returnValue(this.name, ids);
        }
      }
    },
    async handleDropEvent(e) {
      this.onLeave();
      const files = e.target.files || e.dataTransfer.files;
      if (files.length > 1) {
        this.openModal(this.userWarnings.multi);
      } else if (files.length) {
        const error = await this.fileCheck(files[0]);
        if (error) {
          this.openModal(error);
          return null;
        }
        return files[0];
      } else {
        this.openModal(this.userWarnings.common);
      }
    },
    async fileCheck(file) {
      const types = this.formats || defaultFormats;

      if (file.size > this.maxSize * 1e6) {
        return this.userWarnings.size;
      } else if (this.minSize && file.size < this.minSize * 1e6) {
        return this.userWarnings.size;
      } else if (types.indexOf(file.type) < 0) {
        return this.userWarnings.format;
      } else {
        const size = await this.getImageSize(file);
        if (
          this.imagesLimits &&
          (size.w > this.maxWidth ||
            size.w < this.minWidth ||
            size.h > this.maxHeight ||
            size.h < this.minHeight)
        ) {
          return this.userWarnings.resolution;
        } else {
          return false;
        }
      }
    },
    getImageSize(file) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () =>
          resolve({ w: img.naturalWidth, h: img.naturalHeight });
      });
    },
    async sendFile(file) {
      const formData = new FormData();
      formData.append("image", file);
      const request = {
        method: "POST",
        url: this.endpoint,
        data: formData,
      };

      try {
        const res = await axios(request);
        const { image } = res.data;
        return image;
      } catch (err) {
        console.warn(err);
        this.openModal(err.message);
        return null;
      } finally {
        this.$refs.manual.value = ``;
      }
    },
    openModal(msg) {
      this.dialog = true;
      this.dialogMessage = msg;
    },
    closeModal() {
      this.dialog = false;
      this.dialogMessage = "";
    },
    onEnter(e) {
      if (e.dataTransfer.types.length) this.fileHover = true;
    },
    onLeave() {
      this.fileHover = false;
    },
    fileAdd(link, id, index) {
      const order = this.files.length
        ? Math.max.apply(
            null,
            this.files.map((el) => el.order),
          ) + 1
        : 1;
      const file = {
        order: order,
        url: link,
        id,
      };
      if (index !== undefined) {
        const currentFile = this.files[index];
        file.order = currentFile.order;
        (file.url = link), (file.id = id), this.files.splice(index, 1, file);
        return;
      }
      this.files.push(file);
    },
    async fileDelete(file) {
      let { action } = file;

      if (!action) {
        action = {
          method: "DELETE",
          url: `${this.endpoint}/${file.id}`,
        };
      }

      await axios(action)
        .then(() => {
          const index = this.files.findIndex(
            (item) => item.order === file.order,
          );
          this.files.splice(index, 1);
          this.returnValue(this.name, this.ids);
        })
        .catch((err) => {
          console.warn(err);
          this.openModal(err.message);
        });
    },
    onDragStart() {
      this.disableControls = true;
    },
    onDragEnd() {
      this.disableControls = false;
      this.returnValue(this.name, this.ids);
    },
  },
});
</script>

<style lang="scss" scoped>
.image-input {
  width: 100%;
}
.image-previews {
  display: flex;
  flex-wrap: wrap;
  margin: 5px -5px;
}
.change-revert {
  margin: 10px 0;
}
.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  border: 2px dashed $border-color;
  border-radius: 4px;
  background: #f2f2f2;
  transition: 0.25s;
  min-height: 300px;
  > * {
    margin: 5px;
  }
  .text-divider {
    display: inline-block;
    position: relative;
    &:before {
      display: inline-block;
      content: "";
      width: 130px;
      border-bottom: 1px solid #aaa;
      margin: 0.25rem 1rem;
    }
    &:after {
      display: inline-block;
      content: "";
      width: 130px;
      border-bottom: 1px solid #aaa;
      margin: 0.25rem 1rem;
    }
  }
  button {
    margin-top: 20px;
    text-transform: none;
    color: #aaa;
  }
}
.drop-zone.hovered {
  border-color: $main-color;
  background: #fff;
  .file-info {
    pointer-events: none;
    opacity: 0.25;
  }
}
.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.25s;
}
.file-info__tips {
  font-size: 12px;
  margin-top: 20px;
  color: #818181;
  list-style: none;
  padding: 0;
}
.upload-warning.v-card__text {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  min-height: 200px;
}
.list-group {
  display: flex;
  flex-wrap: wrap;
  min-height: 20px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  cursor: move;
  i {
    cursor: pointer;
  }
}
</style>
