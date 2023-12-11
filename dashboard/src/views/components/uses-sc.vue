<template>
  <div>
<!--    <button @click="generateUsers">Generate Users</button>-->
<!--    <button @click="addAddresses">Add Addresses</button>-->
  </div>
</template>

<script>
import accountsAll from "../accounts-all.json";
import addressAll from "../addresses.json";
import {mapActions} from "vuex";
// import {UsersApi} from "@/api/usersApi";

export default {
  name: "CreateUsers",
  data() {
    return {
      users: accountsAll,
      address: addressAll,
    }
  },
  methods: {
    ...mapActions({
      addUser: "users/addUser",
    }),
    async addAddresses() {
      // const min = 4000;
      // const max = 5000;
      //
      // let myAddresses = JSON.parse(JSON.stringify(this.address));
      // myAddresses = myAddresses.sort(() => 0.5 - Math.random());
      //
      // for (let i = min; i <= max; i++) {
      //   try {
      //     const response = await UsersApi.addPublicKey({public_key: Object.values(myAddresses[i])[0]});
      //     console.log(response);
      //   } catch (e) {
      //     console.error(e);
      //   }
      // }
    },
    async generateUsers() {
      // const min = 4990;
      // const max = 5010;
      //
      // for (let i = min; i <= max; i++) {
      //   const formData = new FormData();
      //   for (const field in this.users[i]) {
      //     formData.append(field, this.users[i][field]);
      //   }
      //   UsersApi.create(formData).then((res) => {
      //     console.log(this.users[i].name, res.data);
      //   });
      // }
    }
  }
};
</script>
