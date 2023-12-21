<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Categories ({{ categories.length }})</h6>
      <categories-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class=" p-0">
        <div class="row">
          <div class="col-md-7 offset-md-0">
            <div class="card offset-card">
              <div class="card-body">
                <div class="list-group">
                  <div v-for="(category) in categories" :key="category.id">
                    <router-link :to="`/dashboard/categories/edit/${category.id}`" class="list-group-item">
                      <span>{{ category.name }}</span>
                      <span v-if="category.children.length === 0">
                          <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit Category"
                              @click.prevent="removeCategory(category.id)">
                            Delete
                          </a>
                      </span>
                    </router-link>
                    <div v-if="category.children.length > 0">
                      <div v-for="(child, childIndex) in category.children" :key="childIndex">
                        <router-link :to="`/dashboard/categories/edit/${child.id}`"
                                     class="list-group-item category-child">
                          <span>{{ child.name }}</span>
                          <span>
                          <a
                              href="javascript:;"
                              class="text-secondary font-weight-bold text-xs"
                              data-toggle="tooltip"
                              data-original-title="Edit Category"
                              @click.prevent="removeCategory(child.id)">
                            Delete
                          </a>
                        </span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesCreate from "@/views/Categories/components/CategoriesCreate.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "categories-table",
  components: {
    CategoriesCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
    })
  },
  methods: {
    ...mapActions({
      removeCategory: "categories/removeCategory",
    }),
  }
};
</script>

<style>
.category-child {
  margin-left: 20px;
}

.list-group-item {
  display: flex !important;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
}

.list-group-item span {
  min-width: 50px;
  margin-left: 20px;
}

.offset-card {
  margin: 20px 30px 50px 30px;
}
</style>