<template>
  <div>
    <a-card hoverable style="width: 100%">
      <template #cover>
        <router-link to="/">
                <a-button class="back-button" type="primary" :size="size">
                <template #icon>
                    <DownloadOutlined />
                </template>
                Back    
            </a-button>
        </router-link>
        
        <img :alt="detail.id" :src="fullDetails.imgUrl" />
      </template>
      <a-card-meta :title="fullDetails.name">
        <template #description>
            <b class="origin">Origin : {{ fullDetails.origin }}</b>
            <br>
            <b class="temperament">{{ fullDetails.temp }}</b>
            <br>
            <p>
                {{ fullDetails.description  }}
            </p>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "CatDetails",
  data() {
    return {
      detail: JSON.parse(localStorage.getItem("cat_details")),
    };
  },
  computed: {
    fullDetails() {
      let info = {
        imgUrl: this.detail.url,
        name: this.detail.breeds[0].name,
        temp: this.detail.breeds[0].temperament,
        origin: this.detail.breeds[0].origin,
        description: this.detail.breeds[0].description,
      };
      return info;
    },
  },
};
</script>
<style scoped>
.back-button {
    position: absolute;
    z-index: 99;
    width: 10%;
    margin: 10px;
}
</style>
