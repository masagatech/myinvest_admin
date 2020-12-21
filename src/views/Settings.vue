
<template>
  <div>
    <Header />
    <div class="mainbody">
      <md-tabs md-alignment="centered">
        <md-tab id="broker"  to="/settings/broker" md-label="Broker"></md-tab>
      </md-tabs>
      <div class="page-container md-layout-row">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/controls/Header.vue"; // @ is an alias to /src

@Component({
  components: {
    Header,
  },
})
export default class Settings extends Vue {}
</script>
