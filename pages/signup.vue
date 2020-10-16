<template>
  <v-container
    fluid
  >
    <transition name="fade">
      <v-alert v-if="error" class="alert" type="error" dismissible>
        {{ error.message }}
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
            <v-toolbar-title>Registration form</v-toolbar-title>
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
                v-model="form.name"
                label="Display Name"
                name="name"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
              <v-text-field
                v-model="form.confpass"
                label="Confirm Password"
                name="confpassword"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="#00C853"
              class="mb-2 ml-2"
              @click="signup"
            >
              Sign Up
            </v-btn>
            <v-spacer />
            <v-btn
              color="#00C853"
              class="mb-2 ml-2"
              @click="$router.push('signin')"
            >
              Sign In
            </v-btn>
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
        password: '',
        name: '',
        confpass: ''
      }
    }
  },
  computed: {
    error () {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    async signup () {
      if (this.form.password === this.form.confpass) {
        await this.$store.dispatch('auth/signup', {
          email: this.form.email,
          password: this.form.password,
          displayName: this.form.name
        })
        this.$router.push({ path: '/' })
      } else {
        this.$store.commit('auth/setError', { message: 'Password does not match' })
        setTimeout(() => {
          this.$store.commit('auth/clearError')
        }, 4000)
      }
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
