<template>
  <div class="home">
    <div class="md-layout mt-3">
      <div class="md-layout-item mr-1 ml-1">
        <md-card>
          <md-card-header>
            <md-card-media style="height: 40px">
              <md-icon class="md-size-2x md-primary">alt_route</md-icon>
            </md-card-media>
            <md-card-header-text>
              <div class="md-title m-0">10</div>
              <div class="md-subhead">Total Strategy</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
      </div>

      <div class="md-layout-item mr-1 ml-1">
        <md-card class="p-0">
          <md-card-header>
            <md-card-media style="height: 40px">
              <md-icon class="md-size-2x md-primary">label_important</md-icon>
            </md-card-media>
            <md-card-header-text>
              <div class="md-title m-0">8</div>
              <div class="md-subhead">Active Strategy</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
      </div>

      <div class="md-layout-item mr-1 ml-1">
        <md-card>
          <md-card-header>
            <md-card-media style="height: 40px">
              <md-icon class="md-size-2x md-primary">shopping_cart</md-icon>
            </md-card-media>
            <md-card-header-text>
              <div class="md-title m-0">10</div>
              <div class="md-subhead">Active Orders</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
      </div>

      <div class="md-layout-item mr-1 ml-1">
        <md-card>
          <md-card-header>
            <md-card-media style="height: 40px">
              <md-icon class="md-size-2x md-primary">done_all</md-icon>
            </md-card-media>
            <md-card-header-text>
              <div class="md-title m-0">100</div>
              <div class="md-subhead">Completed Orders</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
      </div>
    </div>
    <div class="p-1">
      <md-card class="text-left p-1">
        <div class="md-layout p-1">
          <div class="md-layout-item md-xsmall-size-100">
            <span style="font-size: 20px; font-weight: bold; color: #448aff">
              ORDERS</span
            >
            <div>
              <md-radio v-model="radio" value="ALL">ALL</md-radio>
              <md-radio v-model="radio" value="SELL" class="md-primary"
                >SELL</md-radio
              >
              <md-radio v-model="radio" value="BUY" class="md-primary"
                >BUY</md-radio
              >
            </div>
          </div>
          <div class="md-layout-item md-xsmall-size-100 pl-2  pr-2">
          <div>
          <!-- <md-datepicker v-model="selectedDate" />
          <md-datepicker v-model="selectedDate" /> -->
          </div>
          </div>
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
      <DataTable
        :value="users"
        class="order_table"
        :resizableColumns="true"
        columnResizeMode="fit"
        :paginator="true"
        :rows="10"
      >
        <Column
          headerStyle="width: 70px"
          headerClass="text-center"
          bodyClass="text-center"
          header="Action"
        >
          <template #body="slotProps">
            <div>
              <span style="display: none">{{ slotProps.data.id }}</span>

              <md-button
                :disabled="slotProps.data.status == 'completed'"
                class="md-icon-button md-dense m-0"
              >
                <md-icon class="text-danger m-0">delete_forever</md-icon>
              </md-button>
            </div>
          </template>
        </Column>

        <Column
          field="id"
          headerClass="text-center"
          bodyClass="text-center"
          headerStyle="width: 100px"
          header="#"
        ></Column>
        <Column
          headerStyle="width: 80px"
          headerClass="text-center"
          bodyClass="text-center"
          header="Staus"
        >
          <template #body="slotProps">
            <div>
              <md-icon
                v-if="slotProps.data.status == 'completed'"
                :title="slotProps.data.status"
                >done_all</md-icon
              >
              <md-icon
                v-if="slotProps.data.status == 'active'"
                :title="slotProps.data.status"
                >done</md-icon
              >
              <md-icon
                v-if="slotProps.data.status == 'canceled'"
                :title="slotProps.data.status"
                >cancel</md-icon
              >
            </div>
          </template></Column
        >
        <Column
          headerStyle="width: 170px"
          headerClass="text-center"
          bodyClass="text-center"
          header="Date"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.date }}
            </div>
          </template></Column
        >
        <Column
          field="position"
          bodyClass="text-center"
          headerStyle="width: 80px"
          headerClass="text-center"
          header="Type"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.position }}
            </div>
          </template>
        </Column>
        <Column
          field="name"
          headerStyle="min-width: 120px"
          header="Future  Instrument"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>
        <Column
          bodyClass="text-center"
          headerClass="text-center"
          headerStyle="width: 80px"
          header="Qty"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.qty }}
            </div>
          </template>
        </Column>

        <Column
          field="ordprice"
          headerStyle="width: 100px"
          bodyClass="text-right"
          headerClass="text-center"
          header="Avg. Price"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.ordprice }}
            </div>
          </template></Column
        >

        <!-- <Column field="slprice" headerStyle="width: 100px" bodyClass="text-right" header="SL Amount">
        <template #body="slotProps">
          <div :class="stockClass(slotProps.data)">
            {{ slotProps.data.slprice }}
          </div>
        </template></Column
      > -->
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
Vue.component("DataTable", DataTable);
Vue.component("Column", Column);
@Component({
  components: {},
})
export default class Home extends Vue {
  radio = "ALL";
  filter = "";

  buysell = ["BUY", "SELL"];
  status = ["completed", "active", "canceled"];
  private users: Array<object> = [
    {
      id: 1,
      name: "BANK NIFTY OCT CUP",
      ordprice: 500000.0,
      date: "11-Oct-2020 01:00:10 am",
      position: "SELL",
      qty: 10,
      status: "completed",
      slpt: 25,
      slprice: 500025,
    },
    {
      id: 2,
      name: "BANK NIFTY OCT CUP",
      ordprice: 300000.0,
      status: "active",
      qty: 5,
      position: "BUY",
      date: "11-Oct-2020 01:00:10 am",
      slpt: 25,
      slprice: 300025,
    },
  ];

  mounted() {
    for (let i = 2; i < 2000; i++) {
      this.users.push({
        id: i,
        name: "BANK NIFTY OCT CUP",
        ordprice: 500000.0,
        date: "11-Oct-2020 01:00:10 am",
        position: this.buysell[Math.floor(Math.random() * 2)],
        qty: Math.floor(Math.random() * 500),
        status: this.status[Math.floor(Math.random() * 3)],
        slpt: 25,
        slprice: 500025,
      });
    }
  }

  stockClass(data) {
    return [
      {
        sell: data.position === "SELL",
        buy: data.position === "BUY",
      },
    ];
  }
  stockSymbol(data) {
    return [
      {
        active: data.status == "active",
        deactive: data.status == "deactive",
      },
    ];
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

.completed {
  color: #ffa726 !important;
}

.active {
  color: #66bb6a !important;
}

.canceled {
  color: #ff3426 !important;
}
</style>

<style>
.order_table.p-datatable .p-datatable-tbody > tr > td {
  padding: 2px !important;
  font-size: 13px;
}
.order_table.p-datatable .p-datatable-thead > tr > th {
  padding-left: 2px !important;
  padding-right: 2px !important;
  font-size: 15px;
}
</style>