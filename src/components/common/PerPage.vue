<template>
  <div id="per-page">
    <span class="input-title">Отображать по: </span>
    <v-col>
      <v-select
        :items="items"
        :value="initial"
        solo
        @input="handler"
      ></v-select>
    </v-col>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'PerPage',
  data: () => ({
    items: [50, 150, 250]
  }),
  props: {
    handler: {
      type: Function,
      default: () => null,
    }
  },
  computed: {
    initial() {
      const val = parseInt(this.$route.query.per_page, 10)
      return val || 50
    }
  },
})
</script>

<style lang="scss" scoped>
.input-title {
  color: #808080;
  font-size: 12px;
  line-height: 42px;
  margin-right: 10px;
}
#per-page {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 90px;
}
</style>
