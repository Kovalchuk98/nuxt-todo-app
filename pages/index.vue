<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-container
        class="fuil-width"
        fluid
      >
        <todoList />
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import todoList from '@/components/todoList.vue'
export default {
  components: {
    todoList
  },
  fetch () {
    this.$store.dispatch('todos/fetchFromDb')
  },
  middleware: 'auth'
}
</script>
