<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Sellers ({{ sellers.length }})</h6>
      <sellers-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Status
            </th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(seller, index) in sellers" :key="seller.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img :src="`${backEndUrl}/${seller.avatar}`"
                       class="avatar avatar-md"
                       alt="user1"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ seller.name }}</h6>

                </div>
              </div>
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold"> <p
                  class="text-xs text-secondary mb-0">{{ seller.email }}</p></span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/sellers/edit/${seller.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeSeller(seller.id)">
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
import sellersCreate from "@/views/Sellers/components/SellersCreate.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "users-table",
  components: {
    sellersCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      sellers: "sellers/getSellers",
    })
  },
  methods: {
    ...mapActions({
      removeSeller: "sellers/removeSeller",
    }),
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