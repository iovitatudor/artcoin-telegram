<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <argon-alert v-if="alertVisible">
          {{ alert.message }}
        </argon-alert>
        <products-table :products="products" :currentCategory="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsTable from "@/views/Products/components/ProductsTable.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "products",
  components: {ArgonAlert, ProductsTable},

  data() {
    return {
      alertVisible: false,
      products: [],
      category: {},
    }
  },
  watch: {
    alert() {
      this.initData();
      if (this.alert.status === 'success') {
        this.alertVisible = true;
        setTimeout(() => this.alertVisible = false, 5000);
      }
    },
    $route (){
      this.initData();
    },
  },
  computed: {
    ...mapGetters({
      alert: 'products/getAlert',
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchProductsByCategory: 'products/fetchProductsByCategory',
      fetchCategoryById: 'categories/fetchCategoryById',
    }),
    async initData() {
      const categoryId = this.$route.params.id;
      const categoryResponse = await this.fetchCategoryById(categoryId);
      this.category = categoryResponse.data;
      const productsResponse = await this.fetchProductsByCategory(categoryId);
      this.products = productsResponse.data;
    },
  }
};
</script>
