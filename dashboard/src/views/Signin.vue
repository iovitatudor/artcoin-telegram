<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="singIn">
                    <div class="mb-3">
                      <argon-input type="email"
                                   placeholder="Email"
                                   name="email"
                                   size="lg"
                                   :value="form.email"
                                   @input="form.email = $event.target.value"/>
                    </div>
                    <div class="mb-3">
                      <argon-input type="password"
                                   placeholder="Password"
                                   name="password"
                                   size="lg"
                                   :value="form.password"
                                   @input="form.password = $event.target.value"/>
                    </div>
                    <div class="text-center">
                      <argon-button
                          type="submit"
                          class="mt-4"
                          variant="gradient"
                          color="success"
                          fullWidth
                          size="lg"
                      >Sign in
                      </argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
                class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                  class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden">
                <img src="../assets/img/artcoin.svg" alt="" height="400">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">
                  Artcoin
                </h4>
                <p class="text-white position-relative">
                  A bridge for Institutions and their communities to sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  data() {
    return {
      credentials: {
        email: 'root@email.com',
        password: 'pass',
      },
      form: {
        email: null,
        password: null,
      },
    }
  },
  components: {
    ArgonInput,
    ArgonButton,
  },
  created() {
    this.$store.state.config.hideConfigButton = true;
    this.$store.state.config.showNavbar = false;
    this.$store.state.config.showSidenav = false;
    this.$store.state.config.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.config.hideConfigButton = false;
    this.$store.state.config.showNavbar = true;
    this.$store.state.config.showSidenav = true;
    this.$store.state.config.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    singIn() {
      if (this.form.email !== this.credentials.email) {
        alert('email error');
        return;
      }
      if (this.form.password !== this.credentials.password) {
        alert('password error');
        return;
      }
      this.setWithExpiry('auth', '1', 10800000)
      return this.$router.push('dashboard');
    },
    setWithExpiry(key, value, ttl) {
      const now = new Date()
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      }
      localStorage.setItem(key, JSON.stringify(item))
    }
  }
}
;
</script>
