<template>
  <v-list-item
    class="pl-2 pr-1"
    @keyup.esc="reset"
  >
    <v-checkbox
      v-model="completed"
      color="#00C853"
      @change="toogle(todo)"
    />
    <div
      :class="{'text-decoration-line-through': completed}"
      class="edit_fuild"
    >
      <v-text-field
        v-if="edit"
        v-model="etitle"
        class="edit_input"
        autofocus
        @keyup.enter="editTask(todo, etitle)"
        @blur="editTask(todo, todo.title)"
      />
      <div
        v-else
      >
        {{ todo.title }}
      </div>
    </div>
    <v-spacer />
    <div
      class="d-flex flex-row px-1"
    >
      <v-btn
        v-if="!edit"
        color="orange darken-1 mr-1"
        fab
        small
        dark
        @click="edit = true"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        v-else
        color="green darken-1 mr-1"
        fab
        small
        dark
        @click="editTask(todo, etitle)"
      >
        <v-icon>
          mdi-check-bold
        </v-icon>
      </v-btn>
      <v-btn
        class="red darken-1 pa-0"
        small
        fab
        @click="removeTask(todo.id)"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </v-list-item>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      completed: this.todo.completed,
      etitle: this.todo.title,
      edit: false
    }
  },
  methods: {
    toogle (todo) {
      this.$store.dispatch('todos/toogle', todo)
      // this.$store.dispatch('todos/fetchFromDb')
    },
    async editTask (todo, etitle) {
      await this.$store.dispatch('todos/editTask', { todo, etitle })
      this.reset()
    },
    reset () {
      this.etitle = this.todo.title
      this.edit = false
    },
    removeTask (id) {
      this.$store.dispatch('todos/removeTask', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit_fuild{
    width: 100% !important;
  }

</style>
