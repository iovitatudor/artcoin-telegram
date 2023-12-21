<template>
  <div>
    <configurator
        title="Add new category"
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.config.showConfig ? 'show' : '',
        this.$store.state.config.hideConfigButton ? 'd-none' : ''
      ]"
    >
      <div class="row">
        <form action="" @submit.prevent="submitForm">
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
  components: {ArgonTextarea, ArgonInput, ArgonButton, Configurator},
  data() {
    return {
      errors: [],
      form: {
        parentId: 1,
        name: null,
        description: null,
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
      alert: 'categories/getAlert',
      categories: 'categories/getCategories',
    })
  },
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize"
    }),
    ...mapActions({
      addCategory: "categories/addCategory",
    }),
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          formData.append(field, this.form[field]);
        }
        await this.addCategory(formData);
      }
      return false;
    },
    validateForm() {
      this.errors = [];

      if (this.form.name === null || this.form.name.length < 1) {
        this.errors.push(`${this.form.name} is required!`);
        return false;
      }
      return true;
    },
    resetForm() {
      this.form.parentId = 1;
      this.form.name = null;
      this.form.description = null;
    }
  },
}
</script>