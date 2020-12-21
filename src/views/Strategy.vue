
<template>
  <div class="strategy p-1">
    <md-card class="text-left">
      <div class="md-layout p-2">
        <div class="md-layout-item md-xsmall-size-100">
          <span style="font-size: 20px; font-weight: bold; color: #448aff">
            Stategy</span
          >
          <div>
            <md-button @click="newStrategy()" class="md-default md-raised"
              ><md-icon>control_point</md-icon> Add Strategy</md-button
            >
          </div>
        </div>
        <div class="md-layout-item md-xsmall-size-100"></div>
        <div class="md-layout-item md-xsmall-size-100">
          <div>
            <md-field class="mb-0">
              <label>Search</label>
              <md-input v-model="filter"></md-input>
            </md-field>
          </div>
        </div>
      </div>
    </md-card>
    <div class="md-layout mt-3">
      <div class="md-layout-item">
        <DataTable
          :value="strategyList"
          class="order_table"
          :resizableColumns="true"
          columnResizeMode="fit"
          :paginator="true"
          :rows="10"
        >
          <Column headerStyle="width: 120px" header="Action">
            <template #body="slotProps">
              <div>
                <span style="display: none">{{ slotProps.data.id }}</span>

                <md-button
                  @click="onPlay(slotProps)"
                  :disabled="slotProps.data.isstarted"
                  class="md-icon-button md-dense md-primary m-0"
                >
                  <md-icon class="text-success m-0"
                    >play_circle_outline</md-icon
                  >
                </md-button>
                <md-button
                  @click="onPause(slotProps)"
                  :disabled="!slotProps.data.isstarted"
                  class="md-icon-button md-dense md-primary m-0"
                >
                  <md-icon class="text-warning m-0"
                    >pause_circle_outline</md-icon
                  >
                </md-button>
                <md-button
                  @click="editFill(slotProps.data)"
                  :disabled="slotProps.data.isstarted"
                  class="md-icon-button md-dense md-primary m-0"
                >
                  <md-icon class="text-primary m-0">edit</md-icon>
                </md-button>
                <md-button
                  @click="onRemove(slotProps)"
                  :disabled="slotProps.data.isstarted"
                  class="md-icon-button md-dense m-0"
                >
                  <md-icon class="text-danger m-0">delete_forever</md-icon>
                </md-button>
              </div>
            </template>
          </Column>

          <Column field="id" headerStyle="width: 50px" header="#"></Column>
          <Column header="Future Instrument">
            <template #body="slotProps">
              <div :class="stockClass(slotProps.data)">
                {{ slotProps.data.name }}
              </div>
            </template>
          </Column>
          <Column field="qty" headerStyle="width: 80px" header="Qty"></Column>
          <Column headerStyle="width: 80px" header="Position">
            <template #body="slotProps">
              <div :class="stockClass(slotProps.data)">
                {{ slotProps.data.gtt_type }}
              </div>
            </template>
          </Column>
          <Column
            field="expiry"
            headerStyle="width: 120px"
            header="Expiry Date"
          ></Column>
          <Column
            headerStyle="width: 100px;text-align:center;"
            header="Order Price"
          >
            <template #body="slotProps">
              <div class="text-right">
                {{ slotProps.data.order_price }}
              </div>
            </template></Column
          >
          <Column
            headerStyle="width: 100px;text-align:center;"
            header="Stop Loss"
          >
            <template #body="slotProps">
              <div class="text-right">
                <small>{{ slotProps.data.trigger_point }}</small>
                <div class="d-block"></div>
                {{ slotProps.data.stop_loss_price }}
              </div>
            </template></Column
          >
          <Column
            headerStyle="width: 100px;text-align:center;"
            header="Stop Loss Ord. Lvl"
          >
            <template #body="slotProps">
              <div class="text-right">
                <small>{{ slotProps.data.stop_loss_point }}</small>
                <div class="d-block"></div>
                {{ slotProps.data.stop_loss_order_level }}
              </div>
            </template></Column
          >
          <!-- <Column
            field="stop_loss_price"
            headerStyle="width: 100px"
            header="SL Amount"
          ></Column> -->
        </DataTable>
      </div>
    </div>

    <md-dialog class="strategy" :md-active.sync="showDialog">
      <md-dialog-title>Strategy</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout md-gutter p-2">
          <div
            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          >
            <md-radio v-model="strategy.gtt_type" :value="'SELL'"
              >SELL</md-radio
            >
            <md-radio v-model="strategy.gtt_type" :value="'BUY'">BUY</md-radio>
          </div>

          <div
            class="md-layout-item md-medium-size-66 md-small-size-50 md-xsmall-size-100"
          >
            <md-field>
              <label>Strategy Name</label>
              <md-input class="text-left" v-model="strategy.name"></md-input>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter p-2">
          <div
            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          >
            <label class="p-text">Instrument</label>
            <AutoComplete
              v-model="selectedInstrument"
              :suggestions="instruments"
              @item-select="onInstrumentSelect"
              @complete="getInstruments($event)"
              field="name"
            >
              <template #item="slotProps">
                <div>{{ slotProps.item.name }}</div>
              </template>
            </AutoComplete>
            <small class="text-danger">Expiry: {{ strategy.expiry }}</small>
            <!-- <md-autocomplete
              v-model="selectedInstrument"
              :md-options="instruments"
            >
            </md-autocomplete> -->
            <!-- <md-autocomplete
              v-model="selectedInstrument"
              :md-options="instruments"
              @md-changed="getInstruments"
            >
              <label>Future Instrument</label>

              <template slot="md-autocomplete-item" slot-scope="{ item }">{{
                item.name
              }}</template>
            </md-autocomplete> -->
          </div>
          <div
            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          >
            <md-field>
              <label>QTY</label>
              <md-input
                class="text-right"
                v-model.number="strategy.qty"
              ></md-input>
            </md-field>
          </div>
          <div
            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          >
            <md-field>
              <label>Trigger Order Price</label>
              <md-input
                @keyup="onTriggerOrder"
                class="text-right"
                v-model.number="strategy.order_price"
              ></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter p-2">
          <div
            class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100"
          >
            <md-field>
              <label>Trigger Point</label>
              <md-input
                @keyup="onTriggerPoint"
                class="text-right"
                v-model="strategy.trigger_point"
              ></md-input>
            </md-field>
            <md-chip class="md-primary"
              >{{ strategy.gtt_type }} Future Stop Loss :
              <b>{{ strategy.stop_loss_price }}</b></md-chip
            >
          </div>

          <div
            class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100"
          >
            <md-field>
              <label
                >{{ strategy.gtt_type == "BUY" ? "SELL" : "BUY" }} Futures Stop
                Loss Point</label
              >
              <md-input
                @keyup="onTriggerStopLossPoint"
                class="text-right"
                v-model="strategy.stop_loss_point"
              ></md-input>
            </md-field>
            <md-chip class="md-primary"
              >{{ strategy.gtt_type == "BUY" ? "SELL" : "BUY" }} Futures Stop
              Loss Order Level (+) :
              <b>{{ strategy.stop_loss_order_level }}</b></md-chip
            >
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Do you want to delete  strategy?"
      md-content="This action will not able to undo once click on sure."
      md-confirm-text="Sure"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <SnakBar ref="snk" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";
import DataTable from "primevue/datatable";
import StrategyService from "../service/strategy.service";
import InstrumentService from "../service/instrument.service";
import Response from "../model/response";
import SnakBar from "../components/SnakBar.vue";
import Column from "primevue/column";
import AutoComplete from "primevue/autocomplete";

Vue.component("DataTable", DataTable);
Vue.component("Column", Column);
Vue.component("AutoComplete", AutoComplete);

@Component({
  components: { SnakBar },
})
export default class Stategy extends Vue {
  private showDialog = false;
  private active = false;
  private value = null;
  private qty = 0;
  private filter = "";
  private selectedInstrument: any = "";
  private instruments: any = [];
  private emptyStrategy = "";
  private strategy = {
    id: "",
    name: "",
    type: "FUTURE",
    gtt_type: "SELL",
    instrument_id: 0,
    instrument_name: "",
    qty: 0,
    order_price: 0.0,
    trigger_order_price: 0.0,
    trigger_point: 0,
    stop_loss_price: 0.0,
    stop_loss_point: 0,
    stop_loss_order_level: 0.0,
    user_created: "2819248214289123",
    isstarted: false,
    expiry: "2020-01-01",
    exchange: "",
    tradingsymbol: "",
  };

  private strategyList = [];
  mounted() {
    this.emptyStrategy = JSON.stringify(this.strategy);
    this.getGrid();
  }

  calculatePoint() {
    this.strategy.order_price = this.strategy.order_price || 0;
    this.strategy.trigger_point = this.strategy.trigger_point || 0;
    this.strategy.stop_loss_point = this.strategy.stop_loss_point || 0;

    console.log(this.strategy.order_price);

    this.strategy.stop_loss_price =
      parseFloat(this.strategy.order_price.toString()) +
      parseFloat(this.strategy.trigger_point.toString());
    this.strategy.stop_loss_order_level =
      parseFloat(this.strategy.stop_loss_price.toString()) +
      parseFloat(this.strategy.stop_loss_point.toString());
    if (parseFloat(this.strategy.order_price.toString()) == 0) {
      this.strategy.stop_loss_price = 0;
      this.strategy.stop_loss_order_level = 0;
    }
  }

  onTriggerOrder(e) {
    this.calculatePoint();
    console.log(this.strategy.order_price);
  }

  onTriggerPoint(e) {
    this.calculatePoint();
    console.log(this.strategy.order_price);
  }
  onTriggerStopLossPoint(e) {
    this.calculatePoint();
    console.log(this.strategy.order_price);
  }

  onPlay(item) {
    console.log("");
    this.startStrategy(item);
  }

  onPause(item) {
    console.log("");
    item.data.isstarted = false;
  }

  onRemove(item) {
    this.active = true;
    console.log(item);
  }

  stockClass(data) {
    return [
      {
        sell: data.gtt_type === "SELL",
        buy: data.gtt_type === "BUY",
      },
    ];
  }

  onConfirm() {
    console.log("");
  }
  onCancel() {
    console.log("");
  }

  autotimeout;
  getInstruments(searchText) {
    if (this.autotimeout) clearTimeout(this.autotimeout);
    this.autotimeout = setTimeout(() => {
      this.fillData(searchText);
    }, 600);
  }

  onInstrumentSelect() {
    this.strategy.instrument_name = this.selectedInstrument.name;
    this.strategy.tradingsymbol = this.selectedInstrument.tradingsymbol;
    this.strategy.exchange = this.selectedInstrument.exchange;
    this.strategy.instrument_id = parseInt(
      this.selectedInstrument.instrument_token
    );
    //this.strategy.expiry = this.selectedInstrument.expiry
    console.log(this.selectedInstrument);
  }

  fillData(searchTerm) {
    console.log(searchTerm);

    // this.instruments = new Promise((resolve) => {
    //   if (!searchTerm) {
    //     this.instruments = [];
    //     resolve(this.instruments);
    //   } else {
    InstrumentService.autocomplete(searchTerm.query)
      .then((d: Response) => {
        if (d.resultKey == 1) {
          if (d.resultValue == null) {
            this.instruments = [];
            // resolve(this.instruments);
          } else {
            this.instruments = d.resultValue;
            // resolve(this.instruments);
          }
        }
      })
      .catch((e) => {
        this.instruments = [];
        // resolve(this.instruments);
      });
    //   }
    // });
  }

  getGrid() {
    StrategyService.get("")
      .then((d: Response) => {
        if (d.resultKey == 1) {
          this.strategyList = d.resultValue;
        }
      })
      .catch((e) => {});
  }

  save() {
    this.strategy.trigger_point = parseInt(
      this.strategy.trigger_point.toString()
    );
    this.strategy.stop_loss_point = parseInt(
      this.strategy.stop_loss_point.toString()
    );
    StrategyService.upsert(this.strategy)
      .then((d: Response) => {
        if (d.resultKey == 1) {
          this.$refs.snk["ShowSnakBar"](d.message);
          this.getGrid();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    this.showDialog = false;
  }

  editFill(item) {
    this.showDialog = true;
    StrategyService.edit(item._id)
      .then((d: Response) => {
        if (d.resultKey == 1) {
          this.strategy.id = d.resultValue._id;
          this.selectedInstrument = d.resultValue.instrument_name;
          //this.selectedInstrument.instrument_token = d.resultValue.instrument_id;
          this.strategy = d.resultValue;
        }
      })
      .catch((e) => {});
  }

  newStrategy() {
    this.strategy = JSON.parse(this.emptyStrategy);
    this.selectedInstrument = "";
    this.showDialog = true;
  }

  startStrategy(item) {
    debugger;
    StrategyService.start(item.data._id)
      .then((d: Response) => {
        if (d.resultKey == 1) {
          item.data.isstarted = true;
        }
        this.$refs.snk["ShowSnakBar"](d.message);
      })
      .catch((e) => {
        this.$refs.snk["ShowSnakBar"](e);
        console.log(e);
      });
  }
}
</script>
<style scoped>
.sell {
  color: #ffa726;
}

.buy {
  color: #66bb6a;
}
</style><style >
.strategy .md-dialog-container {
  width: 90%;
}
</style>
<style>
</style>