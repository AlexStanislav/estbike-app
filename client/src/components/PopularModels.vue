<template>
  <div class="home-promo">
    <h1>Promotii</h1>
    <div class="promo-categories">
      <div
        class="promo-box"
        v-for="(model, index) in popularModels"
        :key="index"
        :data-model="index"
        @click="selectModel"
      >
      <div class="promo-box-shape">
       {{ modelCardName(index).includes("_") ? modelCardName(index).replace("_", " ") : modelCardName(index) }}
      </div>
        <!-- <div
          class="promo-box-shape"
          :style="{
            backgroundImage: `url(${motoboomImageResizer(model[0].gallery[1])}`,
          }"
        >
          <img
            :src="`${imgURL(
              `../assets/img/logo/${index.replace(/_bikes/g, '')}`
            )}.svg`"
            :class="`${index.replace(/_bikes/g, '')}-logo`"
          />
          <div class="promo-box-gradient"></div>
        </div> -->
      </div>
    </div>
    <div class="promo-container">
      <ProductCard
        v-for="(model, index) in currentPromoModels"
        :key="index"
        :bike="model"
      />
    </div>
  </div>
</template>
<script setup>
import ProductCard from "./ProductCard.vue";
import { ref, watchEffect } from "vue";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

const popularModels = ref({});
const currentlySelectedModel = ref("");
const currentPromoModels = ref([]);

const selectModel = (event) => {
  const index = event.target.getAttribute("data-model");
  let promoCategory = document.getElementsByClassName("promo-box");
  currentlySelectedModel.value = index;
  currentPromoModels.value = popularModels.value[index];
  for (let i = 0; i < promoCategory.length; i++) {
    promoCategory[i].classList.remove("promo-box-active");
  }
  event.target.classList.add("promo-box-active");
};

const imgURL = (url) => {
  return new URL(url, import.meta.url).href;
};

const motoboomImageResizer = (image) => {
  if (image && image.includes("motoboom")) {
    image = image.replace("125x1", "650x1");
  }
  return image;
};

const getPopularModels = (allBikes) => {
  const finalPopular = {};
  for (const brandIndex in allBikes) {
    const bikes = [];
    const brand = allBikes[brandIndex];

    // const oldPriceBrands = brand.filter((bike) => {
    //   if (bike.old_price !== null) {
    //     return bike;
    //   }
    // })

    // oldPriceBrands.filter((bike) => {
    //   if (bike.is_popular === true) {
    //     bikes.push(bike);
    //     finalPopular[brandIndex] = bikes;
    //   }
    // });

    brand.filter((bike) => {
      if (bike.old_price !== null) {
        bikes.push(bike);
        finalPopular[brandIndex] = bikes;
      }
    });
  }
  return finalPopular;
};

const modelCardName = (name) => {
  if(name.includes("atv")){
    return `ATV ${name.replace("_atv", "").toUpperCase()}`;
  }
  if(name.includes("ssv")){
    return `SSV ${name.replace("_ssv", "").toUpperCase()}`;
  }
  if(name.includes("scooters")){
    return `Scutere ${name.replace("_scooters", "").toUpperCase()}`;
  }
  if(name.includes("bikes")){
    return `Motociclete ${name.replace("_bikes", "").toUpperCase()}`;
  }
  if(name.includes("snowmobiles")){
    return `Snowmobile ${name.replace("_snowmobiles", "").toUpperCase()}`;
  }
}

watchEffect(() => {
  popularModels.value = getPopularModels(appStore.allBikes);
  const firstBrand = Object.keys(popularModels.value)[0];
  currentPromoModels.value = popularModels.value[firstBrand];
});
</script>
<style lang="scss">
@import "../assets/imports/home.promo.scss";
</style>