<template>
  <div
      class="collapse navbar-collapse w-auto h-auto h-100"
      id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
            url="/dashboard"
            :class="getRoute() === 'dashboard' ? 'active' : ''"
            :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/users"
            :class="getRoute() === 'users' ? 'active' : ''"
            :navText="'Users'"
        >
          <template v-slot:icon>
            <i class="ni ni-circle-08 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/sellers"
            :class="getRoute() === 'sellers' ? 'active' : ''"
            :navText="'Sellers'"
        >
          <template v-slot:icon>
            <i class="ni ni-badge text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/orders"
            :class="getRoute() === 'orders' ? 'active' : ''"
            :navText="'Orders'"
        >
          <template v-slot:icon>
            <i class="ni ni-delivery-fast text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/categories"
            :class="getRoute() === 'categories' ? 'active' : ''"
            :navText="'Categories'"
        >
          <template v-slot:icon>
            <i class="ni ni-building text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          ProductsMock/Services
        </h6>
      </li>
    </ul>
    <ul class="nav-customize">
      <li class="nav-item">
        <div class="drop-down-nav">
          <div class="nav-link" v-for="category in categories" :key="category.id">
            <div v-if="category.children.length > 0">
              <p>{{ category.name }}</p>
              <router-link :to="'/dashboard/products-services/' + child.id " class="a-link"
                           v-for="child in category.children"
                           :key="child.id">
                {{ child.name }} &#x279A;
              </router-link>
            </div>
            <div v-else>
              <router-link :to="'/dashboard/products-services/' + category.id " class="p-link">
                <p>{{ category.name }} &#x279A;</p>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import {mapGetters} from "vuex";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
    })
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>


<style lang="scss">
.nav-customize {
  list-style: none;
  margin-left: 5px;
  padding-left: 0;
  margin-top: 10px;

  .drop-down-nav {

    .nav-link {
      padding-bottom: 0;
      padding-top: 0;
      padding-left: 20px;
      margin-bottom: 10px;

      p {
        font-size: 14px;
        font-weight: 600;
        margin-top: 20px;
        color: #67748e;
      }

      .p-link {
        color: #67748e;

        &:hover {
          color: #00a5bb;
        }
      }

      .a-link {
        color: #67748e;
        margin-left: 10px;
        margin-bottom: 10px;
        display: flex;

        &:hover {
          color: #00a5bb;
        }
      }
    }
  }
}

</style>