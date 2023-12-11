<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <argon-alert v-if="alertVisible">
          {{ alert.message }}
        </argon-alert>
        <users-table/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import UsersTable from "@/views/Users/components/UsersTable.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "users",
  components: {ArgonAlert, UsersTable},
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
      alert: 'users/getAlert',
    })
  }
};
</script>
