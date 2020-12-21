<template>
  <div class="p-2">
    <div class="md-layout md-alignment-center">
      <md-card
        v-for="item in items"
        :key="item.code"
        class="md-layout-item md-xlarge-size-33 md-large-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
      >
        <md-card-media>
          <img v-bind:src="item.logo" alt="People" />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ item.name }}</div>
          <div class="md-subhead">{{ item.shortinfo }}</div>
        </md-card-header>

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button
                class="md-raised"
                :disabled="item.loading || false"
                @click="onBrokerConnect(item)"
                v-bind:class="item.userid ? 'md-accent' : 'md-primary'"
                >{{ item.userid ? "Disconnect" : "Connect" }}</md-button
              >
            </div>

            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content>
            <md-card-content>
              {{ item.desc }}
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BrokerService from "../../service/broker-service";
import Response from "../../model/response";
@Component({
  components: {},
})
export default class BrokerAccount extends Vue {
  items = [];

  mounted() {
    this.getBrokers();
  }

  getBrokers() {
    BrokerService.get("5fa6427edccaa942f4053052")
      .then((d: Response) => {
        if (d.resultKey == 1) {
          if (d.resultValue == null) {
            this.items = [];
            // resolve(this.instruments);
          } else {
            this.items = d.resultValue;
            // resolve(this.instruments);
          }
        }
      })
      .catch((c) => {
        console.log(c);
      });
  }

  onBrokerConnect(broker) {
    if (broker.loading === undefined) {
      Vue.set(broker, "loading", true);
    } else {
      broker.loading = true;
    }
   
    const that = this; // eslint-disable-line
    BrokerService.login({
      broker: broker.code,
      uid: "5fa6427edccaa942f4053052",
    })
      .then((d: Response) => {
        //
        if (d.resultKey == 1) {
          if (d.resultValue != null) {
            // resolve(this.instruments);
            //const retVals = { address: null, delivery: null };
            //d.resultValue =  "http://localhost:8009/api/v1/integration/back_url?request_token=a21322122e21221323&redirect_params=5fa6427edccaa942f4053052"
            this.OpenDialog(
              d.resultValue,
              function (vR) {
             
                that.getBrokers()
              },
              500,
              550
            );
            // window.location.href = d.resultValue;
          } else {
            broker.loading = false;
          }
        } else {
          broker.loading = false;
        }
      })
      .catch((c) => {
        broker.loading = false;
        console.log(c);
      });
  }

  OpenDialog(url, callback, w, h) {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const win: any = window.open(
      url,
      "MyDialog",
      `
      scrollbars=yes,
      menubar=0,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    const timer = setInterval(function () {
     
      if (win.closed) {
        clearInterval(timer);
        //const returnValue = win.returnValue  || '';
        callback('');
      }
    }, 500);
  }
}
</script>
