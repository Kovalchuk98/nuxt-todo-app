<template>
  <v-container
    fluid
  >
    <transition name="fade">
      <v-alert v-if="error" class="alert" type="error" dismissible>
        {{ error.message || '' }}
      </v-alert>
    </transition>
    <v-row
      class="mt-4"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card>
          <v-toolbar
            color="#00C853"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="form.email"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="form.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-4 d-flex flex-wrap">
            <v-btn
              color="#00C853"
              class="ml-2"
              :loading="loading"
              @click="signin"
            >
              Sign In
            </v-btn>
            <v-spacer />
            <div class="ml-2 d-flex flex-wrap">
              <v-btn
                color="orange"
                class="mr-4"
                @click="signInWithGoogle"
              >
                Sign In with
                <v-icon class="ml-2">
                  mdi-google
                </v-icon>
              </v-btn>
            </div>
            <nuxt-link to="/signup" class="mr-4" style="color: #fff; text-decoration: none;">
              <strong> Create Account </strong>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.auth.loading
    },
    error () {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    signin () {
      const { ...user } = this.form
      this.$store.dispatch('auth/signin', user)
        .then(() => {
          this.$router.push({ path: '/' })
        })
    },
    signInWithGoogle () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(() => {
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .alert{
    position: absolute;
    top: 1%;
    right: 0;
    z-index: 3;
  }
</style>
