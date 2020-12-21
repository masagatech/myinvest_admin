<template>
  <div id="nav">
    <md-toolbar>
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <span class="md-title">MY-INVEST</span>
          <md-button v-on:click="routeTo('/')" class="md-icon-button">
            <md-icon>home</md-icon>
            <md-tooltip md-direction="bottom">Home</md-tooltip>
          </md-button>
        </div>
        <!-- <md-menu md-direction="bottom-start">
          <md-button md-menu-trigger><md-icon>menu</md-icon></md-button>

          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 2</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu> -->

        <!-- <md-autocomplete
          class="search"
          v-model="selectedEmployee"
          :md-options="employees"
          md-layout="box"
        >
          <label>Search...</label>
        </md-autocomplete>  -->

        <div class="md-toolbar-section-end">
          <md-button v-on:click="routeTo('/strategy')" class="md-icon-button">
            <md-icon>alt_route </md-icon>
            <md-tooltip md-direction="bottom">Stategy</md-tooltip>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>help_outline </md-icon>
            <md-tooltip md-direction="bottom">Help</md-tooltip>
          </md-button>
          <md-button
            v-on:click="routeTo('/settings/broker')"
            class="md-icon-button"
          >
            <md-icon>settings</md-icon>
            <md-tooltip md-direction="bottom">Settings</md-tooltip>
          </md-button>
         
          <md-menu md-direction="bottom-start">
             
            <md-button md-menu-trigger class="md-icon-button">
              <md-icon>person</md-icon>
              <md-tooltip md-direction="bottom">Account</md-tooltip>
            </md-button>

            <md-menu-content>
              
              <md-menu-item @click="menuClick('profile')">Profile</md-menu-item>
              <md-menu-item @click="menuClick('logout')"> Log Out</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </div>
    </md-toolbar>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
  </div>
</template>

<script lang="ts">
import GlobalService from "@/service/gloabl-service";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Header extends Vue {
  loginUser;
  routeTo(path) {
    this.$router.push(path);
  }
  menuClick(path) {
    if (path == "logout") {
      GlobalService.logOut();
      this.routeTo("/login");
    }
    console.log("");
  }
  mounted() {
    const user = GlobalService.getUser();
    this.loginUser = user.name;
  }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-menu-content {
  z-index: 1111 !important;
}
.mainbody {
  padding-top: 64px;
}
#nav {
  position: fixed;
  z-index: 11;
  left: 0;
  right: 0;
}
</style>
