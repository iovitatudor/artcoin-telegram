<template>
  <div class="fixed-plugin">
    <argon-button @click="toggle" color="dark" variant="gradient">
      <i class="fas fa-plus me-2"></i>
      {{ title }}
    </argon-button>
    <div class="block-wrapper" @click.self="toggle">
      <div class="shadow-lg card">
        <div class="pt-3 pb-0 bg-transparent card-header">
          <div class="float-start">
            <h5 class="mt-3 mb-0">{{ title }}</h5>
          </div>
          <div
              class="mt-4 float-end"
              @click="toggle"
          >
            <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
              <i class="fa fa-close"></i>
            </button>
          </div>
        </div>
        <hr class="my-1 horizontal dark"/>
        <div class="pt-0 card-body pt-sm-3">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {activateDarkMode, deactivateDarkMode} from "@/assets/js/dark-mode";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "configurator",
  components: {ArgonButton},
  props: ["toggle", "title"],
  methods: {
    ...mapMutations(["config/navbarMinimize", "config/sidebarType", "config/navbarFixed"]),
    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.config.mcolor = `card-background-mask-${color}`;
    },
    sidebarType(type) {
      this.$store.state.config.sidebarType = type;
    },
    setNavbarFixed() {
      if (
          this.$route.name !== "Profile" ||
          this.$route.name !== "All Projects"
      ) {
        this.$store.state.config.isNavFixed = !this.$store.state.config.isNavFixed;
      }
    },
    setDarkMode() {
      if (this.$store.state.config.darkMode) {
        this.$store.state.config.darkMode = false;
        this.$store.state.config.sidebarType = "bg-white";
        deactivateDarkMode();
        return;
      } else {
        this.$store.state.config.darkMode = true;
        this.$store.state.config.sidebarType = "bg-default";
        activateDarkMode();
      }
    },
    sidenavTypeOnResize() {
      // let white = document.querySelector("#btn-white");
      // if (window.innerWidth < 1200) {
      //   white.classList.add("disabled");
      // } else {
      //   white.classList.remove("disabled");
      // }
    }
  },
  computed: {
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    }
  },
  beforeMount() {
    this.$store.state.config.isTransparent = "bg-transparent";
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  }
};
</script>

<style>
.show .block-wrapper {
  border: 1px solid red;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
