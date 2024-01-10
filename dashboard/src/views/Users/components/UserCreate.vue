<template>
  <div>
    <configurator
        title="Add new user"
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.config.showConfig ? 'show' : '',
        this.$store.state.config.hideConfigButton ? 'd-none' : ''
      ]"
    >
      <div class="row">
        <form action="" @submit.prevent="createUser">
          <div class="col-md-12">
            <div class="col-md-12">
              <label for="example-text-input" class="form-control-label">Username</label>
              <argon-input type="text"
                           name="username"
                           :value="form.username"
                           @input="form.username = $event.target.value"/>
            </div>
            <label for="example-text-input" class="form-control-label">Name</label>
            <argon-input type="text"
                         name="name"
                         :value="form.name"
                         @input="form.name = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Phone</label>
            <argon-input type="phone"
                         name="phone"
                         :value="form.phone"
                         @input="form.phone = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="formFile" class="form-control-label">Avatar</label>
            <div class="form-group">
              <input class="form-control" type="file" @change="uploadFile" ref="file" id="formFile">
            </div>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Password</label>
            <argon-input type="password"
                         name="password"
                         :value="form.password"
                         @input="form.password = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Password Confirmation</label>
            <argon-input type="password"
                         name="password-confirmation"
                         :value="form.passwordConfirmation"
                         @input="form.passwordConfirmation = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <div class="alert" role="alert">
              <p class="text-danger" v-for="error in errors" :key="error">
                <small>{{ error }}</small>
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <argon-button :fullWidth="true" color="success" variant="gradient">Save</argon-button>
            </div>
          </div>
        </form>
      </div>
    </configurator>
  </div>
</template>

<script>
import Configurator from "@/widgets/Configurator.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import {mapActions, mapMutations, mapGetters} from "vuex";

export default {
  components: {ArgonInput, ArgonButton, Configurator},
  data() {
    return {
      errors: [],
      form: {
        name: null,
        username: null,
        phone: null,
        avatar: null,
        password: "aaBBccDD12!@",
        passwordConfirmation: "aaBBccDD12!@",
      }
    }
  },
  watch: {
    alert() {
      if (this.alert.status === 'success') {
        this.resetForm();
        this.toggleConfigurator();

      }
      if (this.alert.status === 'error') {
        this.errors.push(this.alert.message);
      }
    }
  },
  computed: {
    ...mapGetters({
      alert: 'users/getAlert',
    })
  },
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize"
    }),
    ...mapActions({
      addUser: "users/addUser",
    }),
    async createUser() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field]) {
            formData.append(field, this.form[field]);
          }
        }
        await this.addUser(formData);
      }
      return false;
    },
    uploadFile() {
      this.form.avatar = this.$refs.file.files[0];
    },
    validateForm() {
      this.errors = [];
      const passwordValidRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      // if (this.form.name === null || this.form.name.length < 1) {
      //   this.errors.push(`Name is required!`);
      //   return false;
      // }
      //
      // if (this.form.username === null || this.username.length < 1) {
      //   this.errors.push(`User is required!`);
      //   return false;
      // }

      if (!this.form.password.match(passwordValidRegex)) {
        this.errors.push(`Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`);
        return false;
      }
      if (this.form.password !== this.form.passwordConfirmation) {
        this.errors.push(`passwords not match!`);
        return false;
      }
      return true;
    },
    resetForm() {
      this.form.name = null;
      this.form.username = null;
      this.form.phone = null;
      this.form.avatar = null;
      this.form.password = "aaBBccDD12!@";
      this.form.passwordConfirmation = "aaBBccDD12!@";
    }
  },
}
</script>