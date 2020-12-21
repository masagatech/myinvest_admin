<template>
  <md-snackbar
    :md-position="position"
    :md-duration="isInfinity ? Infinity : duration"
    :md-active.sync="showSnackbar"
    md-persistent
  >
    <span>{{ message }}</span>
    <!-- <md-button class="md-primary" @click="showSnackbar = false"
      >Retry</md-button
    > -->
  </md-snackbar>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class SnakBar extends Vue {
  private showSnackbar = false;
  private message = "";
  private duration = 4000;
  private isInfinity = false;
  private position = "center"
  ShowSnakBar(message) {
    this.showSnackbar = true;
    this.message = message;
  }
}
</script>