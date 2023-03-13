<template>
  <div :class="['modal-controls']">
       <v-btn color="accent" round dark>Удалить привязку
          <v-icon dark right small>delete</v-icon>
        </v-btn>
  </div>
</template>

<script>
  export default {
    name: "Controls",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      trigger: {
        type: Function,
        default: () => null
      }
    }
  }
</script>


