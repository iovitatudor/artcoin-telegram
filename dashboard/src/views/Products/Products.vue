<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <argon-alert v-if="alertVisible">
          {{ alert.message }}
        </argon-alert>
        <products-table/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsTable from "@/views/Products/components/ProductsTable.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import {mapGetters} from "vuex";

export default {
  name: "products",
  components: {ArgonAlert, ProductsTable},

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
      alert: 'products/getAlert',
    })
  }
};
</script>
