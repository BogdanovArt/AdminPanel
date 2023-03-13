<template>
  <div class="breadcrumbs">
    <ul v-if="list">
      <template v-for="(el, ind) in list">
        <li :key="ind" style="flex: 0 1 auto;">
          <template v-if="el.url">
            <a :href="el.url" @click.stop.prevent="router(el.url)">
              <div class="crumb-item">
                <v-icon v-if="el.icon" small>
                  {{
                    el.icon.indexOf("mdi-") > -1 ? el.icon : "mdi-" + el.icon
                  }}
                </v-icon>
                <span>{{ el.name }}</span>
              </div>
            </a>
          </template>
          <div v-else class="crumb-item">
            <v-icon v-if="el.icon">
              {{ el.icon }}
            </v-icon>
            <span>{{ el.name }}</span>
          </div>
        </li>
        <li v-if="ind + 1 < list.length" :key="el.name" class="crumb-divider">
          &#8594;
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    list: { type: Array, default: () => [] },
    executor: { type: Function, default: () => null },
  },
  methods: {
    router(route) {
      const action = {
        route,
        method: "GET",
      };
      this.executor(action);
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin: 0 -20px 0 -20px;
  /*overflow-x: auto;*/
  ul {
    list-style: none;
    padding: 0 20px;
    margin-top: 0;
    display: inline-flex;
    justify-content: flex-start;
    min-width: 100%;
    max-width: 100%;
    li {
      min-width: 17px;
      max-width: 100%;
      overflow: hidden;
    }
    a {
      text-decoration: none;
      color: $main-color;
      i {
        color: $main-color;
      }
      &:hover {
        color: $hover-color;
        i {
          color: $hover-color;
        }
      }
    }
    .crumb-item {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 12px;
      > *:not(:last-child) {
        margin-right: 5px;
      }
    }
    .crumb-divider {
      margin: 0 3px;
      line-height: 13px;
    }
  }
  span {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @media only screen and (max-width: 768px) {
    overflow-x: auto;
    ul {
      max-width: none;
      min-width: auto;
      li {
        overflow: visible;
      }
    }
  }
}
</style>
