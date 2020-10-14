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
    >
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }}</span>
    </v-img>

    <newTodoItem />
    <v-list
      class="item_list mt-2"
    />
  </v-card>
</template>

<script>
export default {
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
    created () {
      return this.getTime()
    },
    beforeDestroy () {
      return clearInterval(this.getTime())
    }
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

</style>
