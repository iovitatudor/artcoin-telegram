<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <argon-alert v-if="alertVisible">
          {{ alert.message }}
        </argon-alert>
        <sellers-table/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SellersTable from "@/views/Sellers/components/SellersTable.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "specialists",
  components: {
    ArgonAlert,
    SellersTable
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
      alert: 'sellers/getAlert',
    })
  }
};
</script>
