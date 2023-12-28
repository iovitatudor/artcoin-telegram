<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>{{ currentCategory.name }} : ProductsMock/Services ({{ products.length }})</h6>
      <product-create :currentCategory="currentCategory"/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Product</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Price</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">CategoryPage</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Seller</th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img :src="`${backEndUrl}/${product.image}`"
                       class="avatar avatar-sm me-3"
                       alt="user1"
                       v-if="product.image !== 'avatar-mock.png'"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ product.name }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle ps-4">
              <span class="text-secondary text-xs">{{ product.price }}</span>
            </td>
            <td class="align-middle ps-4">
              <span class="text-secondary text-xs">{{ product.category.name }}</span>
            </td>
            <td class="align-middle ps-4">
              <span class="text-secondary text-xs">{{ product.seller.name }}</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/products-services/edit/${product.id}`"
              >
                <b class="text-primary">Edit</b>
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeProduct(product.id)">
                <b class="text-danger">Delete</b>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import ProductCreate from "@/views/Products/components/ProductCreate.vue";

export default {
  name: "products-table",
  props: ['products', 'currentCategory'],
  components: {
    ProductCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
    }
  },
  methods: {
    ...mapActions({
      removeProduct: "products/removeProduct",
    }),

  }
};
</script>