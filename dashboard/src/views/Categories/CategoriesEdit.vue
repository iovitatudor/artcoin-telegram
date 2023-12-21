<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Category</p>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Category Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="category" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="col-md-12">
                  <div class="row mt-1">
                    <div class="col-md-12">
                      <label class="form-control-label">Parent Category</label>
                      <div class="form-group">
                        <select class="form-select" v-model="form.parentId">
                          <option value="1" selected>Without a parent</option>
                          <option :value="category.id" v-for="category in categories" :key="category.id">
                            {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.category.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                    <div class="col-md-12">
                      <label class="form-control-label">Description</label>
                      <argon-textarea
                          name="description"
                          :value="form.description"
                          @input="form.description = $event.target.value"/>
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
import ArgonTextarea from "@/components/ArgonTextarea.vue";

export default {
  name: "edit-category",
  components: {
    ArgonTextarea,
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
      category: null,
      form: {
        parentId: 1,
        name: null,
        description: null,
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
      categories: 'categories/getCategories',
      alert: 'categories/getAlert',
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchCategoryById: 'categories/fetchCategoryById',
      editCategory: 'categories/editCategory',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchCategoryById(id);
      this.category = response.data;
      this.form.name = this.category.name;
      this.form.parentId = this.category.parentId;
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editCategory({id: this.category.id, formData});
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
