<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <argon-alert v-if="alertVisible">
          {{ alert.message }}
        </argon-alert>
        <orders-table/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import OrdersTable from "@/views/Orders/components/OrdersTable.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "orders",
  components: {
    ArgonAlert,
    OrdersTable
  },
  data() {
    return {
      alertVisible: false,
    }
  },
  watch: {
    alert() {
      if (this.alert.status === 'success') {
        this.alertVisible = true;
        setTimeout(() => this.alertVisible = false, 5000);
      }
    }
  },
  computed: {
    ...mapGetters({
      alert: 'orders/getAlert',
    })
  }
};
</script>
