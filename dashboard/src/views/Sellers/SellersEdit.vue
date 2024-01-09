<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Profile</p>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Seller Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="seller" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="col-md-8">
                  <div class="row mt-1">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Username</label>
                      <argon-input type="text"
                                   name="username"
                                   :value="this.seller.username"
                                   @input="form.username = $event.target.value"/>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.seller.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                  </div>
                  <div class="row  mt-5">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Password</label>
                      <argon-input type="password"
                                   name="password"
                                   :value="this.form.password"
                                   @input="form.password = $event.target.value"/>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Password Confirmation</label>
                      <argon-input type="password"
                                   name="password-confirmation"
                                   :value="this.form.passwordConfirmation"
                                   @input="form.passwordConfirmation = $event.target.value"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 text-center">
                  <label for="formFile" class="form-control-label">Avatar</label>
                  <div class="form-group">
                    <input class="form-control" type="file" @change="uploadFile" ref="file" id="formFile">
                  </div>
                  <argon-avatar :img="`${backEndUrl}/${seller.avatar}`" class="rounded-circle" size="300"/>
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
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "profile",
  components: {
    ArgonAlert,
    ArgonInput,
    ArgonButton,
    ArgonAvatar
  },
  data() {
    return {
      alertVisible: false,
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
      errors: [],
      showMenu: false,
      seller: null,
      form: {
        name: null,
        username: null,
        avatar: null,
        password: null,
        passwordConfirmation: null,
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
    },
  },
  computed: {
    ...mapGetters({
      alert: 'sellers/getAlert',
    })
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    ...mapActions({
      fetchSellerById: 'sellers/fetchSellerById',
      editSeller: 'sellers/editSeller',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchSellerById(id);
      this.seller = JSON.parse(JSON.stringify(response.data));
      this.form.username = await this.seller.username;
      this.form.name = await this.seller.name;
      this.form.avatar = await this.seller.avatar;

    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editSeller({id: this.seller.id, formData});
        await this.initData();
      }
      return false;
    },
    uploadFile() {
      this.form.avatar = this.$refs.file.files[0];
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
