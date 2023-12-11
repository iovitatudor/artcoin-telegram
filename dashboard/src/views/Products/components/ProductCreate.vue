<template>
  <div>
    <configurator
        title="Add new Product/Service"
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.config.showConfig ? 'show' : '',
        this.$store.state.config.hideConfigButton ? 'd-none' : ''
      ]"
    >
      <div class="row">
        <form action="" @submit.prevent="submitForm">
          <div class="col-md-12">
            <label class="form-control-label">Category</label>
            <aragon-select></aragon-select>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Name</label>
            <argon-input type="text"
                         name="name"
                         :value="form.name"
                         @input="form.name = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Description</label>
            <argon-textarea
                name="description"
                :value="form.description"
                @input="form.description = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Destination</label>
            <argon-input type="text"
                         name="destination"
                         :value="form.destination"
                         @input="form.destination = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Availability</label>
            <argon-input type="text"
                         name="availability"
                         :value="form.availability"
                         @input="form.availability = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Area</label>
            <argon-input type="text"
                         name="area"
                         :value="form.area"
                         @input="form.area = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Location</label>
            <argon-input type="text"
                         name="location"
                         :value="form.location"
                         @input="form.location = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Facilities Amenities</label>
            <argon-input type="text"
                         name="facilities_amenities"
                         :value="form.facilities_amenities"
                         @input="form.facilities_amenities = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Unit Item</label>
            <argon-input type="text"
                         name="unit_item"
                         :value="form.unit_item"
                         @input="form.unit_item = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Seats Numbers</label>
            <argon-input type="text"
                         name="seats_numbers"
                         :value="form.seats_numbers"
                         @input="form.seats_numbers = $event.target.value"/>
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
import ArgonTextarea from "@/components/ArgonTextarea.vue";
import AragonSelect from "@/components/AragonSelect.vue";

export default {
  components: {AragonSelect, ArgonTextarea, ArgonInput, ArgonButton, Configurator},
  data() {
    return {
      errors: [],
      form: {
        name: null,
        reward: null,
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
      alert: 'products/getAlert',
    })
  },
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize"
    }),
    ...mapActions({
      addProduct: "products/addProduct",
    }),
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          formData.append(field, this.form[field]);
        }
        await this.addProduct(formData);
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
      this.form.reward = null;
    }
  },
}
</script>