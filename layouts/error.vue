<template>
  <v-app dark>
    <v-flex class="d-flex flex-column justify-center align-center">
      <h1>{{ pageNotFound }}</h1>
      <nuxt-link to="/" style="color: #fff;">
        Back to Home Page
      </nuxt-link>
    </v-flex>
  </v-app>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
    this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 40px;
  color: white;
}
</style>
