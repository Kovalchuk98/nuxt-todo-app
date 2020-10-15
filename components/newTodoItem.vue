<template>
  <div class="new">
    <v-text-field
      v-model.trim="newTask"
      class="mt-12 px-6"
      rounded
      placeholder="Add new task"
      light
      solo
      autofocus
      @keyup.enter="addTask"
    />
    <v-btn
      class="add_task rounded-circle"
      @click="addTask"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTask: '',
      completed: false
    }
  },
  methods: {
    addTask () {
      if (this.newTask !== '') {
        this.$store.dispatch('todos/add', {
          title: this.newTask,
          completed: this.completed
        })
        this.newTask = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .new{
    position: relative;
    .v-input__slot{
      margin: 0px !important;
    }
    .v-messages{
      display: none !important;
    }
    .v-text-field__details{
      display: none;
    }
     .add_task{
        position: absolute;
        z-index: 2 !important;
        background-color: #00C853 !important;
        width: 70px !important;
        height: 70px !important;
        bottom: 122%;
        right: 8%;
      }
    }
</style>
