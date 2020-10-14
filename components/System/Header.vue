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
          class="d-flex flex-column align-center mt-4"
        >
          <v-img
            class="rounded-circle"
            src="/no_avatar.png"
            height="60"
            width="60"
            contain
          />
        </div>

        <v-list-item
          link
        >
          <v-list-item-action>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
        >
          <v-list-item-action>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link class="d-flex" to="/" style="text-decoration: none; color: #fff;">
        <v-img
          class="rounded-circle mx-4"
          src="/icon.svg"
          max-height="40"
          max-width="40"
          contain
        />
        <v-toolbar-title>
          ToDo App
        </v-toolbar-title>
      </nuxt-link>

      <v-spacer />
      <template>
        <template>
          <div
            class="d-flex align-center mr-5"
          >
            <v-img
              class="rounded-circle"
              src="/no_avatar.png"
              max-height="40"
              max-width="40"
              contain
            />
          </div>
        </template>
        <v-btn
          class="btn primary mr-4 green accent-4 rounded-pill"
        >
          Sign In
        </v-btn>
        <v-btn
          class="btn primary mr-4 green accent-4 rounded-pill pa-3"
        >
          Sign Up
        </v-btn>
        <v-btn
          class="btn primary red accent-4 rounded-pill pa-3"
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
  methods: {

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
