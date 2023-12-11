<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Organizations table({{ organizations.length }})</h6>
      <organizations-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Organization</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Email</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Phone</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Address</th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(organization, index) in organizations" :key="organization.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td class="align-middle ps-4">
              <b class="text-secondary text-xs">{{ organization.name }}</b>
            </td>
            <td class="align-middle ps-4">
              <b class="text-secondary text-xs">{{ organization.email }}</b>
            </td>
            <td class="align-middle ps-4">
              <b class="text-secondary text-xs">{{ organization.phone }}</b>
            </td>
            <td class="align-middle ps-4">
              <b class="text-secondary text-xs">{{ organization.address }}</b>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/organizations/edit/${organization.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeOrganization(organization.id)">
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
import OrganizationsCreate from "@/views/Organizations/components/OrganizationsCreate.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "organizations-table",
  components: {
    OrganizationsCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      organizations: "organizations/getOrganizations",
    })
  },
  methods: {
    ...mapActions({
      removeOrganization: "organizations/removeOrganization",
    }),
  }
};
</script>