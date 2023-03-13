<template>
  <div id="text-editor" class="editor-wrapper">
    <div :class="['editor-container', { 'field-error': error }]">
      <editor-menu-bar class="editor-menu" :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
        <div>
          <v-btn :class="[{ 'is-active': isActive.bold() }, 'menu-button']" @click="commands.bold" icon dark>
            <v-icon>
              mdi-format-bold
            </v-icon>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.italic() }, 'menu-button']" @click="commands.italic" icon dark>
            <v-icon>
              mdi-format-italic
            </v-icon>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.underline() }, 'menu-button']" @click="commands.underline" icon dark>
            <v-icon>
              mdi-format-underline
            </v-icon>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.strike() }, 'menu-button']" @click="commands.strike" icon dark>
            <v-icon>
              mdi-format-strikethrough
            </v-icon>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.blockquote() }, 'menu-button']" @click="commands.blockquote" icon dark>
            <v-icon>
              mdi-format-quote-close
            </v-icon>
          </v-btn>

          <div class="divider"></div>

          <v-btn :class="[{ 'is-active': isActive.heading({ level: 2 }) }, 'menu-button']" @click="commands.heading({ level: 2 })" icon dark>
            <span class="button-text">H2</span>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.heading({ level: 3 }) }, 'menu-button']" @click="commands.heading({ level: 3 })" icon dark>
            <span class="button-text">H3</span>
          </v-btn>

          <div class="divider"></div>

          <v-btn :class="[{ 'is-active': isActive.bullet_list() }, 'menu-button']" @click="commands.bullet_list" icon dark>
            <v-icon>
              mdi-format-list-bulleted
            </v-icon>
          </v-btn>

          <v-btn :class="[{ 'is-active': isActive.ordered_list() }, 'menu-button']" @click="commands.ordered_list" icon dark>
            <v-icon>
              mdi-format-list-numbered
            </v-icon>
          </v-btn>

          <div class="divider"></div>

          <div class="link__wrapper" ref="link-trigger">
            <v-btn :class="[{ 'is-active': isActive.link() },'menu-button']" @click="showLinkMenu(getMarkAttrs('link'))" icon dark>
              <v-icon>
                mdi-link
              </v-icon>
            </v-btn>

            <form class="link__form" ref="link-form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)" @keydown.esc="hideLinkMenu">
              <simple
                :initial="linkUrl"
                :return-value="onLinkInput"
                :error-msg="linkError"
                placeholder="Введите адрес ссылки"
              />
              <div class="link__controls">
                <v-btn color="success" x-small text @click="setLinkUrl(commands.link, linkUrl)">Принять</v-btn>
                <v-btn x-small text @click="hideLinkMenu">Отмена</v-btn>
                <v-btn color="error" style="margin-left: auto" x-small text @click="setLinkUrl(commands.link, null)">Удалить</v-btn>
              </div>
            </form>
          </div>
        </div>
      </editor-menu-bar>
      <editor-content
              class="editor-content"
              :data-test="`input-editor-${name}`"
              :editor="editor"
      />
    </div>
    <transition name="slide-down">
      <div v-show="error" class="error-message">
        {{ error }}
      </div>
    </transition>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import {
    Editor,
    EditorContent,
    EditorMenuBar,
  } from "tiptap";
  import {
    Blockquote,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    Bold,
    Italic,
    Link,
    Strike,
    Underline,
    History,
  } from "tiptap-extensions";
  import { SimpleInput } from "@netex/inputs";

  import { BasicObject, InputValue } from "@/store/interfaces";

  interface InputPL {
    getHTML: () => string;
  }

  @Component({
    components: {
      EditorContent,
      EditorMenuBar,
      simple: SimpleInput
    },
  })
  export default class TextArea extends Vue {
    @Prop({ default: false })
    readonly disabled!: string;

    @Prop({ default: "" })
    readonly initial!: string;

    @Prop({ default: false })
    readonly required!: string;

    @Prop({ default: "" })
    readonly name!: string;

    @Prop({ default: () => null })
    readonly returnValue!: (name: string, value: InputValue) => void;

    @Prop({ default: "Поле заполнено некорректно" })
    readonly errorMsg!: string;

    @Prop() readonly min?: BasicObject;
    @Prop() readonly max?: BasicObject;

    editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new Heading({ levels: [2, 3] }),
        new ListItem(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: this.initial,
      onFocus: this.onFocus,
      onUpdate: this.onInputUpdate,
    });

    focus = false;
    error = "";
    linkMenuIsActive = false;
    linkUrl = "";
    linkError = "";
    linkBtnActive = false;

    mounted() {
      if (this.initial) this.returnValue(this.name, this.initial);
    }

    onFocus() {
      this.error = "";
    }

    onInputUpdate({ getHTML }: InputPL) {
      this.returnValue(this.name, getHTML());
    }

    setError(msg: string) {
      this.error = msg;
    }

    onLinkInput(name: string, val: string) {
      this.linkUrl = val;
      this.linkError = "";
    }

    showLinkMenu(attrs: { href: string }) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      document.addEventListener("click",  this.checkClick );
    }

    checkClick(e: Event) {
      const target = e.target as HTMLInputElement;
      const form = this.$refs['link-form'] as HTMLElement;
      const link = this.$refs['link-trigger'] as HTMLElement;
      if (form && target) {
        const btnClick = link.contains(target);
        const formClick = form.contains(target);
        if (formClick) {
          //
        } else if (btnClick) {
          if (this.linkBtnActive) {
            this.hideLinkMenu();
            this.linkBtnActive = false;
          } else {
            this.linkBtnActive = true;
          }
        } else {
          this.hideLinkMenu();
        }
      }
    }

    hideLinkMenu() {
      this.linkUrl = "";
      this.linkMenuIsActive = false;
      this.linkBtnActive = false;
      document.removeEventListener("click", this.checkClick);
    }

    setLinkUrl(
      command: (pl: { href: string }) => void,
      url: string
    ) {
      const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
      const test = reg.test(url);
      if (test || !url) {
        command({ href: url });
        this.linkError = "";
        this.hideLinkMenu();
      } else {
        this.linkError = "Ссылка не валидна";
      }
    }

    beforeDestroy() {
      this.editor.destroy();
    }
  }
</script>

<style lang="scss">
#text-editor {
  width: 100%;
  .link__wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .link__controls {
    display: flex;
  }
  .link__form {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 300px;
    border-radius: 4px;
    box-shadow: $shadow-main;
    background: #fff;
    bottom: 40px;
    z-index: 10;
  }
  .error-message {
    height: 12px;
    color: $warning-color;
    font-size: 12px;
    line-height: 12px;
    padding-left: 20px;
    text-align: left;
    max-height: 12px;
    opacity: 1;
    margin: 8px 0 2px 0;
    transition: 0.3s;
  }
  .editor-menu {
    display: flex;
    align-items: center;
    padding: 10px;
    button.menu-button {
      margin: 0 2px;
      i {
        color: #000;
      }
      .button-text {
        color: #000;
      }
      &:hover {
        i {
          color: $hover-color;
        }
        .button-text {
          color: $active-color;
        }
      }
    }
    button.is-active {
      background-color: $main-color;
      i {
        color: #fff !important;
      }
      .button-text {
        color: #fff !important;
      }
    }
    .divider {
      position: relative;
      display: inline-block;
      margin: 5px;
      width: 1px;
      height: 20px;
      border-right: $border;
    }
  }
  .editor-content {
    border-radius: 2px;
    border: 1px solid $border-color;
    >div.ProseMirror {
      border-top: $border;
      padding: 10px;
      min-height: 200px;
      max-height: 400px;
      overflow: auto;
    }
    >div.ProseMirror.ProseMirror-focused {
      outline: none;
      border: 1px solid $main-color;
      margin: 0 -1px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .editor-container {
    border-radius: 4px;
    border: $border;
  }
  .editor-container.field-error {
    border-color: $warning-color;
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
  p {
    margin: 0;
  }
}

</style>
