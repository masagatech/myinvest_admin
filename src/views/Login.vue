<template>
  <div class="Login">
    <div class="md-layout">
      <div class="md-layout-item text-center">
        <md-card
          class="mt-5"
          style="display: inline-block; max-width: 400px; width: 100%"
        >
          <md-card-header>
            <div class="md-icon md-size-3x mb-4">person</div>
            <div class="md-title">
              Login to <span class="text-success">MY-INVEST</span>
            </div>
            <div class="md-subhead"></div>
          </md-card-header>
          <md-card-content>
            <md-field md-clearable>
              <label>Email</label>

              <md-input v-model="user.email"></md-input>
            </md-field>

            <md-field class="mb-5">
              <label>Password</label>

              <md-input v-model="user.password" type="password"></md-input>
            </md-field>

            <md-button
              class="md-raised m-0 md-primary"
              v-on:click="onLoginClick"
              style="width: 100%"
              >LOGIN</md-button
            >

            <p>version 1.0</p>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <SnakBar ref="snk" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/service/auth.service";
import GlobalService from "@/service/gloabl-service";
import Response from "@/model/response";
import SnakBar from "@/components/SnakBar.vue";
import UserModel from "@/model/user";

@Component({
  components: {
    SnakBar: SnakBar,
  },
})
export default class Login extends Vue {
  user = {
    email: "",
    password: "",
  };
  onLoginClick() {
    AuthService.login({
      browserinfo: {},
      email: this.user.email,
      password: this.user.password,
    })
      .then((d: Response) => {
        if (d.resultKey == 1) {
          // email: "pratikway.90@gmail.com"
          // id: "5fa6427edccaa942f4053052"
          // name: "pratik naik"
          const user: UserModel = d.resultValue;
          GlobalService.setUser(user);
          this.$refs.snk["ShowSnakBar"]("Login Successfully");
          this.$router.push("/");
        } else {
          console.log(d.message);
          this.$refs.snk["ShowSnakBar"](d.message);
        }
      })
      .catch((c) => {
        console.log(c);
      });

    //  this.$router.push('/')
  }
}
</script>
