<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        dense
        class="navigation_menu"
      >
        <v-app-bar-nav-icon
          class="close_btn"
          @click="drawer = !drawer"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-app-bar-nav-icon>

        <div
          v-if="user"
          class="d-flex flex-column align-center mt-4"
        >
          <v-img
            class="rounded-circle"
            :src="user.photoURL || '/images/no_avatar.png'"
            height="60"
            width="60"
            contain
          />
          <span class="span_name mt-1 mb-4">{{ user.displayName || user.email }}</span>
        </div>

        <v-list-item
          v-if="!user"
          :class="{'mt-10': !user}"
          link
          @click="$router.push('signin')"
        >
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!user"
          link
          @click="$router.push('signup')"
        >
          <v-list-item-action>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-else
          link
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="drawer = !drawer" />
      <nuxt-link class="d-flex" to="/" style="text-decoration: none; color: #fff;">
        <v-img
          class="rounded-circle mx-4"
          src="/images/icon.svg"
          max-height="40"
          max-width="40"
          contain
        />
        <v-toolbar-title>
          ToDo App
        </v-toolbar-title>
      </nuxt-link>

      <v-spacer />
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <template>
          <div
            v-if="user && $vuetify.breakpoint.mdAndUp"
            class="d-flex align-center mr-5"
          >
            <v-img
              class="rounded-circle"
              :src="user.photoURL || '/images/no_avatar.png'"
              max-height="40"
              max-width="40"
              contain
            />
            <span class="ml-2">{{ user.displayName || user.email }}</span>
          </div>
        </template>
        <v-btn
          v-if="!user"
          class="btn primary mr-4 green accent-4 rounded-pill"
          @click="$router.push('signin')"
        >
          Sign In
        </v-btn>
        <v-btn
          v-if="!user"
          class="btn primary mr-4 green accent-4 rounded-pill pa-3"
          @click="$router.push('signup')"
        >
          Sign Up
        </v-btn>
        <v-btn
          v-if="user"
          class="btn primary red accent-4 rounded-pill pa-3"
          @click="logout"
        >
          Log Out
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>
  .navigation_menu{
    position: relative;
    .close_btn{
      position: absolute;
      right: 3%;
    }
  }
</style>
