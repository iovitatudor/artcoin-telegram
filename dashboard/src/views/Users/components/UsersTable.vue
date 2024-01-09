<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Users table ({{ users.length }})</h6>
      <user-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
            <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Username
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Date of creation
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Status
            </th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div style="margin-right: 10px">
                  <img :src="`${backEndUrl}/${user.avatar}`"
                       class="avatar avatar-sm me-3"
                       alt="user1"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                </div>
              </div>
            </td>

            <td class="align-middle text-left">
              <span class="text-secondary text-xs font-weight-bold">{{ user.username }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ formatDate(new Date(user.created)) }}</span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/users/edit/${user.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeUser(user.id)">
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
import {mapGetters, mapActions} from "vuex";
import UserCreate from "@/views/Users/components/UserCreate.vue";

export default {
  name: "users-table",
  components: {UserCreate},
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
    }
  },
  computed: {
    ...mapGetters({
      users: "users/getUsers",
    })
  },
  methods: {
    ...mapActions({
      removeUser: "users/removeUser",
      fetchUsers: "users/fetchUsers",
    }),
    formatDate(date = new Date()) {
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {
        month: '2-digit',
      });
      const day = date.toLocaleString('default', {day: '2-digit'});
      const hour = date.toLocaleString('default', {hour: '2-digit'});
      const minutes = date.toLocaleString('default', {minute: '2-digit'});

      return [year, month, day].join('-') + "  " + [hour, minutes].join(':');
    }
  }
}
;
</script>
