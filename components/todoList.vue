<template>
  <v-card
    class="todo_main mt-md-8 ma-auto"
    max-width="700"
    fixed
    dark
  >
    <v-img
      class="img white--text align-end"
      height="200px"
      :src="selectPic"
    >
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }}</span>
      <h5
        v-if="leftTodos != lengthTodos"
        class="left_counter"
      >
        {{ leftTodos }} of {{ lengthTodos }} tasks
      </h5>
      <h5
        v-else
        class="left_counter"
      >
        No active tasks
      </h5>
    </v-img>
    <newTodoItem />
    <h4
      v-if="todos == false"
      class="text-center py-4"
    >
      Sorry, you don't have tasks at this moment
    </h4>
    <!-- <div
      v-else
      class="item_list mt-2"
    > -->
    <v-list
      class="item_list mt-2"
    >
      <transition-group name="fade" mode="out-in">
        <todoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
        />
      </transition-group>
    </v-list>
    <v-bottom-navigation
      :value="activeBtn"
      color="#00C853"
      horizontal
    >
      <v-btn
        @click="completed = false"
      >
        <span>All</span>
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>
      <v-btn
        @click="completed = true"
      >
        <span>Completed</span>
        <v-icon>mdi-bookmark-check-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="completed"
        @click="removeCompleted"
      >
        <span>Clear</span>
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
      <v-btn
        v-else
        @click="removeAll"
      >
        <span>Clear All</span>
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
import newTodoItem from '@/components/newTodoItem.vue'
import todoItem from '@/components/todoItem.vue'
export default {
  components: {
    newTodoItem,
    todoItem
  },
  // async fetch ({ store }) {
  //   await store.dispatch('todos/fetchFromDb')
  // },
  // async asyncData ({ store }) {
  //   await store.dispatch('todos/fetchFromDb')
  // },
  data () {
    return {
      date: '',
      time: '',
      headerPic: ['wp_1.jpg', 'wp_2.jpg', 'wp_3.jpg', 'wp_4.jpg', 'wp_5.jpg'],
      selectPic: 'wp_4.jpg',
      activeBtn: 0,
      completed: false
    }
  },
  computed: {
    todos () {
      return !this.completed ? this.$store.state.todos.list : this.$store.state.todos.list.filter(item => item.completed)
      // const todoList = this.$store.state.todos.list
      // todoList.slice()
      // todoList.sort((a, b) => a.due - b.due)
      // return todoList
    },
    lengthTodos () {
      return this.$store.state.todos.list.length
    },
    leftTodos () {
      return this.$store.state.todos.list.filter(item => item.completed).length
    },
    boolTodo () {
      return this.$store.getters['todos/todos']
    }
  },
  // beforeMount () {
  //   this.$store.dispatch('todos/fetchFromDb')
  // },
  created () {
    return this.getTime()
  },
  beforeDestroy () {
    return clearInterval(this.getTime())
  },
  methods: {
    getTime () {
      setInterval(() => {
        const date = new Date()
        const locale = 'en-us'
        const day = date.toLocaleString(locale, { month: 'long', day: 'numeric', year: 'numeric' })
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
        this.date = day
        this.time = time
      }, 1000)
    },
    getRandomPic (items) {
      setInterval(() => {
        const nump = Math.floor(Math.random() * items.length)
        this.selectPic = items[nump]
      }, 300000)
    },
    removeCompleted () {
      this.$store.dispatch('todos/removeCompleteTasks')
    },
    removeAll () {
      this.$store.dispatch('todos/removeAll')
    }
  }
}
</script>

<style lang="scss" scoped>
      .img{
        position: relative;
        overflow: inherit;
        .date{
            position: absolute;
            top: 20%;
            right: 3%;
            color: #fff;
            font-size: 2rem;
        }
          .time{
            position: absolute;
            top: 35%;
            right: 3%;
            color: #fff;
            font-size: 3rem;
            font-weight: bold;
        }
          .left_counter{
          position: absolute;
          left: 5%;
          bottom: -17%;
          font-size: 14px;
          font-weight: bold;
          color: #fff;
        }
      }
      .add_task{
        position: absolute;
        z-index: 1000 !important;
        background-color: #00C853 !important;
        width: 70px !important;
        height: 70px !important;
        bottom: -18%;
        right: 8%;
      }
      .item_list{
        // display: flex;
        // position: relative;
        max-height: 40vh;
        overflow-y: auto;
      }
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
    }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }

</style>
