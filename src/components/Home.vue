<template>
  <CatFilterVue @change="refreshList" @image_count_limit="hideLoadMoreButton"  ref="filter" />
  <CatGalleryVue  :list="CatList" :breed="Breed" @load_more="loadMore" ref="gallery" />
</template>

<script>
import CatFilterVue from "./CatFilter.vue";
import CatGalleryVue from "./CatGallery.vue";
export default {
  name: "HomeVue",
  components: { CatFilterVue, CatGalleryVue },
  data() {
    return {
      CatList: [],
      Breed: null,
      imageCount:0
    };
  },
  methods: {
    refreshList(cats) {
      this.CatList = cats.list;
      this.Breed = cats.breed;
    },
    loadMore(){
      this.imageCount = this.$refs.filter.loadMore();
    },
    hideLoadMoreButton(){
      this.$refs.gallery.hideLoadMoreButton();
    },
    showLoadMoreButton(){
      this.$refs.gallery.showLoadMoreButton();
    },
  },
  computed: {
    SelectedBreed() {
      return this.CatList > 0 ? this.CatList : [];
    },
  },
};
</script>

<style></style>
