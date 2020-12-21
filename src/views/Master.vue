<template>
  <div>
    <Header />
    <div class="mainbody">
      <router-view />
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
export default class Home extends Vue {}
</script>
