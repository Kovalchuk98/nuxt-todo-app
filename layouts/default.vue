<template>
  <v-app id="inspire">
    <Header />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/System/Header.vue'
import Footer from '@/components/System/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data: () => ({
    drawer: false
  })
}
</script>
