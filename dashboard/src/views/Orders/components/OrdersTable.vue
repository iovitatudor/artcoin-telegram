<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Orders ({{ orders.length }})</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>
              <div class="px-3 py-1">
                #{{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ order.price }}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold">
                <router-link
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    :to="`/dashboard/products-services/edit/${order.product.id}`">
                  {{ order.product.name }}
                </router-link>
              </span>
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold"> <p
                  class="text-xs text-secondary mb-0">{{ handleDate(order.created_at) }}</p></span>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeOrder(order.id)">
                Delete
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "users-table",
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      orders: "orders/getOrders",
    })
  },
  methods: {
    ...mapActions({
      removeOrder: "orders/removeOrder",
    }),
    handleDate(date){
      const currentDate = new Date(date);
      return currentDate.toDateString();
    }
  }
};
</script>

<style>
.avatar-md {
  height: 58px !important;
  width: auto !important;
  border-radius: 50% !important;
}
</style>