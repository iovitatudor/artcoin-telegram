<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Organization</p>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Organization Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="organization" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="col-md-12">
                  <div class="row mt-1">
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.organization.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Email</label>
                      <argon-input type="email"
                                   name="email"
                                   :value="this.organization.email"
                                   @input="form.email = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Phone</label>
                      <argon-input type="tel"
                                   name="phone"
                                   :value="this.organization.phone"
                                   @input="form.phone = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Country</label>
                      <argon-input type="text"
                                   name="country"
                                   :value="this.organization.country"
                                   @input="form.country = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">City</label>
                      <argon-input type="text"
                                   name="city"
                                   :value="this.organization.city"
                                   @input="form.city = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Address</label>
                      <argon-input type="text"
                                   name="address"
                                   :value="this.organization.address"
                                   @input="form.address = $event.target.value"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="alert" role="alert">
                    <p class="text-danger" v-for="error in errors" :key="error">
                      <small>{{ error }}</small>
                    </p>
                  </div>
                </div>
                <div class="col-md-12 mt-5 d-flex justify-content-center">
                  <div class="form-group">
                    <argon-button :fullWidth="true" color="success" variant="gradient">Save</argon-button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "edit-organization",
  components: {
    ArgonAlert,
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      alertVisible: false,
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
      errors: [],
      showMenu: false,
      organization: null,
      form: {
        name: null,
        email: null,
        phone: null,
        country: null,
        city: null,
        address: null,
      }
    };
  },
  watch: {
    alert() {
      if (this.alert.status === 'success') {
        this.alertVisible = true;
        setTimeout(() => this.alertVisible = false, 5000);
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
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchOrganizationById: 'organizations/fetchOrganizationById',
      editOrganization: 'organizations/editOrganization',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchOrganizationById(id);
      this.organization = response.data;
      this.form.name = this.organization.name;
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editOrganization({id: this.organization.id, formData});
        await this.initData();
      }
      return false;
    },
    validateForm() {
      this.errors = [];
      for (const field in this.form) {
        if (this.form[field] === null || this.form[field].length < 1) {
          if (this.form[field] !== null) {
            if (this.form[field].length >= 1) {
              this.errors.push(`${field} is required!`);
            }
            return false;
          }
        }
      }
      return true;
    },
    resetForm() {
      this.form.name = null;
    },
  }
}
;
</script>
