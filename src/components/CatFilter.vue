<template>
  <a-select
      show-search
      placeholder="Select a breed"
      option-filter-prop="children"
      :searchValue="breedName"
      @change="handleChange"
      style="width: 200px"
    >
    <!-- :filter-option="filterOption" -->
    <a-select-option v-for="d in breeds" :key="d.id" :value="d.id">{{
      d.name
    }}</a-select-option>
  </a-select>
</template>

<script>
export default {
  name: "CatFilter",
  data() {
    return {
      breed:
        localStorage.getItem("current_breed") !== null
          ? localStorage.getItem("current_breed")
          : null,
      breedName:localStorage.getItem("current_breed") !== null
          ? localStorage.getItem("full_breed_name")
          : null,
      breeds: localStorage.getItem('breed_list') !== null
            ? JSON.parse(localStorage.getItem("breed_list"))
            : [],
      CatList: [],
      currentPagination: 10,
      imageCount: 0
    };
  },
  mounted() {
    this.getCatBreeds();
    this.checkCurrentBreed();
  },
  methods: {
    checkCurrentBreed() {
      let current_breed = localStorage.getItem("current_breed");
      let itemSet = current_breed !== null;
      console.log(itemSet);
      if (itemSet) {
        this.handleChange(current_breed);
      }
    },
    getCatsImages() {
      let payload = {
        breed_ids: this.breed,
        limit: this.currentPagination,
      };
      let currentCount = 0 
      this.axios.get("/images/search", { params: payload }).then((response) => {
        this.$emit("change", { list: response.data, breed: this.breed });
        currentCount = response.data.length 
        if(this.imageCount == currentCount){
            this.$emit("image_count_limit");
            this.$notification['warning']({
                message: 'Ooops',
                description:"That is all we have right now.",
            });
        }
        this.imageCount = response.data.length
      }).catch( error => {
        this.$notification['error']({
            message: 'Ooops',
            description:"Apologies but we could not load new cats for you at this time! Miau!",
        });
      });
    },
    getCatBreeds() {
      this.axios.get("/breeds").then((response) => {
        this.breeds = response.data;
        localStorage.setItem("breed_list",JSON.stringify(response.data))
      });
    },
    loadMore(){
        this.currentPagination += 10;
        this.getCatsImages();
        return this.imageCount;
    },
    handleChange(value) {
      this.breed = value;
      let name = this.breeds.find(({ id }) => id === value).name
      localStorage.setItem("current_breed", value);
      localStorage.setItem("full_breed_name", name)
      this.getCatsImages();
    },
  },
};
</script>

<style></style>
