<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Product/Service</p>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Product/Service Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="product" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="row">
                  <div class="col-md-6">
                    <label class="form-control-label">Seller</label>
                    <select class="form-select" v-model="form.sellerId">
                      <option :value="seller.id" v-for="seller in sellers" :key="seller.id">{{ seller.name }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-control-label">Category</label>
                    <select class="form-select" v-model="form.categoryId">
                      <option :value="categories.id" v-for="categories in categories" :key="categories.id">
                        {{ categories.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="form-control-label">Name</label>
                    <argon-input type="text"
                                 name="name"
                                 :value="form.name"
                                 @input="form.name = $event.target.value"/>
                  </div>
                  <div class="col-md-6">
                    <label class="form-control-label">Destination</label>
                    <argon-input type="text"
                                 name="availability"
                                 :value="form.destination"
                                 @input="form.destination = $event.target.value"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="col-md-12">
                      <label class="form-control-label">Price</label>
                      <argon-input type="number"
                                   name="price"
                                   :value="form.price"
                                   @input="form.price = $event.target.value"/>
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
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12">
                      <label class="form-control-label">Description</label>
                      <div class="form-group">
                        <textarea name="description" class="form-control" rows="5"
                                  v-model="form.description"></textarea>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <label for="formFile" class="form-control-label">Image</label>
                      <div class="form-group">
                        <input class="form-control" type="file" @change="uploadFile" ref="file" id="formFile">
                      </div>
                      <div v-if="product.image">
                        <img :src="`${backEndUrl}/${product.image}`"
                             class="avatar me-3"
                             alt="user1"
                             v-if="product.image !== 'avatar-mock.png'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
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
      product: null,
      form: {
        sellerId: null,
        categoryId: null,
        name: null,
        description: null,
        price: null,
        destination: null,
        availability: null,
        area: null,
        location: null,
        facilities_amenities: null,
        unit_item: null,
        seats_numbers: null,
        image: null,
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
      alert: 'products/getAlert',
      sellers: 'sellers/getSellers',
      categories: 'categories/getChildrenCategories',
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchTaskTypeById: 'products/fetchProductById',
      editProduct: 'products/editProduct',
    }),
    uploadFile() {
      this.form.image = this.$refs.file.files[0];
    },
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchTaskTypeById(id);
      this.product = response.data;
      this.form.sellerId = this.product.seller.id;
      this.form.categoryId = this.product.category.id;
      this.form.name = this.product.name;
      this.form.description = this.product.description;
      this.form.price = this.product.price;
      this.form.destination = this.product.destination;
      this.form.availability = this.product.availability;
      this.form.area = this.product.area;
      this.form.location = this.product.location;
      this.form.facilities_amenities = this.product.facilities_amenities;
      this.form.unit_item = this.product.unit_item;
      this.form.seats_numbers = this.product.seats_numbers;
      this.form.image = this.product.image;
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editProduct({id: this.product.id, formData});
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
  }
}
;
</script>
