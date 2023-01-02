<template>
  <div>
    <div v-if="cats">
      <a-divider>Showing {{ breed }}</a-divider>
      <a-list
        :grid="{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
          xxxl: 2,
        }"
        :data-source="cats"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card hoverable style="width: 350px">
              <template #cover>
                <img :alt="item.id" :src="item.url" />
              </template>
              <a-card-meta title="Meow">
                <template #description
                  ><a-button @click="viewFullImage(item)" type="primary"
                    >Click me</a-button
                  ></template
                >
              </a-card-meta>
            </a-card>
          </a-list-item>
        </template>
      </a-list>

      <a-button v-if="loadMoreButtonVisibility" type="primary" @click="loadMore">Load more</a-button>
    </div>
    <div v-else>
      <a-divider>No data to show</a-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatGallery",
  props: ["list", "breed"],
  data() {
    return {
      CatList: this.list,
      imageCount: 0,
      loadMoreButtonVisibility: true
    };
  },
  computed: {
    cats() {
      return this.list && this.list.length > 0 ? this.list : false;
    },
  },
  watch: {
    list: {
      immediate: true,
      handler(newVal) {
        this.CatList = newVal;
      },
    },
    imageCoun:{
        immediate: true,
        handler(newVal){
            this.imageCount = newVal
        }
    }
  },
  methods: {
    viewFullImage(data) {
      localStorage.setItem("cat_details", JSON.stringify(data));
      this.$router.push({ params: { image_id: data.id }, name: "details" });
    },
    loadMore(){
        this.$emit('load_more')
    },
    hideLoadMoreButton(){
        this.loadMoreButtonVisibility = false
    },
    showLoadMoreButton(){
        this.loadMoreButtonVisibility = true
    }
  },
};
</script>

<style></style>
