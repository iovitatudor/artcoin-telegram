<template>
  <div>
    <configurator
        title="Add new organization"
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.config.showConfig ? 'show' : '',
        this.$store.state.config.hideConfigButton ? 'd-none' : ''
      ]"
    >
      <div class="row">
        <form action="" @submit.prevent="submitForm">
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Name</label>
            <argon-input type="text"
                         name="name"
                         :value="form.name"
                         @input="form.name = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Email</label>
            <argon-input type="email"
                         name="email"
                         :value="form.email"
                         @input="form.email = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Phone</label>
            <argon-input type="tel"
                         name="phone"
                         :value="form.phone"
                         @input="form.phone = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Country</label>
            <argon-input type="text"
                         name="country"
                         :value="form.country"
                         @input="form.country = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">City</label>
            <argon-input type="text"
                         name="city"
                         :value="form.city"
                         @input="form.city = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Address</label>
            <argon-input type="text"
                         name="address"
                         :value="form.address"
                         @input="form.address = $event.target.value"/>
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
        email: null,
        phone: null,
        country: null,
        city: null,
        address: null,
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
      alert: 'organizations/getAlert',
    })
  },
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize"
    }),
    ...mapActions({
      addOrganization: "organizations/addOrganization",
    }),
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          formData.append(field, this.form[field]);
        }
        await this.addOrganization(formData);
      }
      return false;
    },
    validateForm() {
      this.errors = [];

      for (const field in this.form) {
        if (this.form[field] === null || this.form[field].length < 1) {
          this.errors.push(`${field} is required!`);
          return false;
        }
      }
      return true;
    },
    resetForm() {
      this.form.name = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.country = null;
      this.form.city = null;
      this.form.address = null;
    }
  },
}
</script>