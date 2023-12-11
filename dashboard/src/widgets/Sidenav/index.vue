<template>
  <div
      v-show="this.$store.state.config.layout === 'default'"
      class="min-height-300 position-absolute w-100"
      :class="`${this.$store.state.config.darkMode ? 'bg-transparent' : 'bg-success'}`"
  />
  <aside
      class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl fixed-start ms-3"
      :class="`${
      this.$store.state.config.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    }
    ${
      this.$store.state.config.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.config.sidebarType}`"
      id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
          class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
      ></i>
      <router-link class="m-0 navbar-brand logo" to="/">
        <img
            src="/logo.svg"
            class="navbar-brand-img h-100"
            alt="main_logo"
        />
        ARTCOIN
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark"/>
    <sidenav-list :cardBg="custom_class"/>
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct-dark.png";
import logoWhite from "@/assets/img/logo-ct.png";

export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoWhite
    };
  },
  props: ["custom_class", "layout"]
};
</script>

<style lang="scss">
.logo {
  display: flex !important;
  align-items: center;
  justify-content: center !important;
  text-align: center !important;
  font-size: 25px !important;
  color: #DD1A33 !important;

  img {
    margin-right: 15px;
  }
}
</style>