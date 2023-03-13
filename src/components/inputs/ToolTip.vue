<template>
  <div
    :class="[
      `tooltip`,
      { [`tooltip--clickable`]: !!tooltip.external_url },
    ]"
  >
    <v-tooltip bottom>
      <template v-slot:activator="scope">
        <div v-on="scope.on">
          <span @click="onClick">
            <v-icon small>{{ tooltip.icon || "mdi-information" }}</v-icon>
          </span>
        </div>
      </template>
      <span>{{ tooltip.title }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ToolTip",
  props: {
    tooltip: { type: Object, default: () => ({}) },
  },
  methods: {
    onClick() {
      const url = this.tooltip.external_url;
      if (url) window.open(url, "_blank");
    },
  },
});
</script>

<style lang="scss" scoped>
a {
  display: inline-block;
}
.tooltip {
  display: flex;
  align-items: center;
  width: 24px;
}
.tooltip--clickable {
  cursor: pointer;
}
</style>
