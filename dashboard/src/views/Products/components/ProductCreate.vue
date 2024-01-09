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
            <label class="form-control-label">Seller</label>
            <select class="form-select" v-model="form.sellerId">
              <option :value="seller.id" v-for="seller in sellers" :key="seller.id">{{ seller.name }}</option>
            </select>
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
            <label class="form-control-label">Price</label>
            <argon-input type="number"
                         name="price"
                         :value="form.price"
                         @input="form.price = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Destination</label>
            <argon-input type="text"
                         name="availability"
                         :value="form.destination"
                         @input="form.destination = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Availability</label>
            <select class="form-select" v-model="form.availability">
              <option value="Weekdays, 09:00 - 18:00">Weekdays, 09:00 - 18:00</option>
              <option value="Working days, 09:00 - 18:00">Working days, 09:00 - 18:00</option>
              <option value="Individual">Individual</option>
            </select>
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
            <select class="form-select" v-model="form.location">
              <option value="MediaCor">MediaCor</option>
              <option value="ArtCor">ArtCor</option>
              <option value="Remotely">Remotely</option>
              <option value="Cineplex">Cineplex</option>
              <option value="Geneza Art">Geneza Art</option>
              <option value="Librarius">Librarius</option>
              <option value="Kaufland">Kaufland</option>
            </select>
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
            <select class="form-select" v-model="form.unit_item">
              <option value="1 hour">1 hour</option>
              <option value="1 ticket">1 ticket</option>
              <option value="1 set">1 set</option>
              <option value="1 box">1 box</option>
            </select>
          </div>
          <div class="col-md-12">
            <label class="form-control-label">Seats Numbers</label>
            <argon-input type="number"
                         name="seats_numbers"
                         :value="form.seats_numbers"
                         @input="form.seats_numbers = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="formFile" class="form-control-label">Image</label>
            <div class="form-group">
              <input class="form-control" type="file" @change="uploadFile" ref="file" id="formFile">
            </div>
          </div>
          <div class="row">

            <div class="col-md-6">
              <div class="form-check">
                <br><input class="form-check-input" type="checkbox" name="top" id="top" v-model="form.top"/>
                <label for="top" class="custom-control-label">
                  Top Sale
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check">
                <br> <input class="form-check-input" type="checkbox" name="hot" id="hot" v-model="form.hot"/>
                <label for="hot" class="custom-control-label">
                  Hot Sale
                </label>
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

export default {
  props: {
    currentCategory: {
      type: Object,
    },
  },
  components: {ArgonTextarea, ArgonInput, ArgonButton, Configurator},
  data() {
    return {
      errors: [],
      form: {
        sellerId: null,
        name: null,
        description: null,
        price: null,
        top: false,
        hot: false,
        destination: null,
        availability: null,
        area: null,
        location: null,
        facilities_amenities: null,
        unit_item: null,
        seats_numbers: null,
        image: null,
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
      categories: 'categories/getCategories',
      sellers: 'sellers/getSellers',
    })
  },
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize",
    }),
    ...mapActions({
      addProduct: "products/addProduct",
    }),
    uploadFile() {
      this.form.image = this.$refs.file.files[0];
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          formData.append(field, this.form[field]);
        }
        formData.append('categoryId', this.currentCategory.id);
        await this.addProduct(formData);
      }
      return false;
    },
    validateForm() {
      this.errors = [];
      if (this.form.name === null || this.form.name.length < 1) {
        this.errors.push(`Name is required!`);
        return false;
      }
      if (this.form.price === null || this.form.price.length < 1) {
        this.errors.push(`Price is required!`);
        return false;
      }
      if (this.form.description === null || this.form.description.length < 1) {
        this.errors.push(`Description is required!`);
        return false;
      }
      if (this.form.image === null || this.form.image.length < 1) {
        this.errors.push(`Image is required!`);
        return false;
      }
      if (this.form.sellerId === null || this.form.sellerId.length < 1) {
        this.errors.push(`Seller is required!`);
        return false;
      }
      return true;
    },
    resetForm() {
      this.form.sellerId = null;
      this.form.name = null;
      this.form.description = null;
      this.form.price = null;
      this.form.top = false;
      this.form.hot = false;
      this.form.destination = null;
      this.form.availability = null;
      this.form.area = null;
      this.form.location = null;
      this.form.facilities_amenities = null;
      this.form.unit_item = null;
      this.form.seats_numbers = null;
      this.form.image = null;
    }
  },
}
</script>

<style>
.form-group {
  margin-bottom: 0px !important;
}
.card .card-body {
  overflow-y: scroll;
}
</style>