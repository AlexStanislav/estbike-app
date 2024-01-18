<template>
  <section class="home-view">
    <Carousel class="home-carousel" :value="carouselImages" :showNavigators="false" circular  :autoplayInterval="5000">
      <template #item="slotProps">
        <div class="top-gradient"></div>
        <img :src="slotProps.data.img" :alt="slotProps.data.alt" />
        <div class="carousel-text-container">
          <h1>{{ slotProps.data.title }}</h1>
          <h2>{{ slotProps.data.subtitle }}</h2>
          <Button label="Mail multe detalii" />
        </div>
        <div class="bottom-gradient"></div>
      </template>
    </Carousel>
    <div class="home-promo">
      <h1>Promotii</h1>
      <div class="promo-categories">
        <div class="promo-box" v-for="(model, index) in popularModels" :key="index" :data-model="index" @click="selectModel">
          <div class="promo-box-shape" :style="{backgroundImage: `url(${motoboomImageResizer(model[1].gallery.split(',')[3])}`}">
            <img :src="`${imgURL(`../assets/img/logo/${index.replace(/_bikes/g, '')}`)}.svg`" :class="`${index.replace(/_bikes/g, '')}-logo`">
            <div class="promo-box-gradient"></div>
          </div>
        </div>
      </div>
      <div class="promo-container">
        <ProductCard v-for="(model, index) in currentPromoModels" :key="index" :bike="model"/>
      </div>
    </div>
    <div class="home-contact">
      <h1>Nu ezitați să luați legatura cu noi</h1>
      <div class="home-contact-container">
        <div class="contact-card facebook-card">
          <i class="pi pi-facebook main-icon"></i>
          <h2>FACEBOOK</h2>
          <h3>EST Bike Adventure</h3>
          <div class="follow-button">FOLLOW</div>
        </div>
        <div class="contact-card instagram-card">
          <i class="pi pi-instagram main-icon"></i>
          <h2>INSTAGRAM</h2>
          <h3>@estbike</h3>
          <div class="follow-button">FOLLOW</div>
        </div>
        <div class="contact-card call-card">
          <span>
            <i class="pi pi-phone"></i>
            <div>0712345678</div>
          </span>
          <span>
            <i class="pi pi-envelope"></i>
            <div>estbike@example.com</div>
          </span>
          <span>
            <i class="pi pi-map-marker"></i>
            <div>Str. Șelimbăr nr 10, Brebu </div>
          </span>
        </div>
        <div class="contact-card map-card">
          <iframe
          id="home-map"
          src="https://maps.google.com/maps?q=EST%20Bike%20Campina&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="320"
          height="320"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Carousel from "primevue/carousel";
import { onMounted, onUnmounted, ref } from "vue";
import { useAppStore } from "../stores/appStore";
import ProductCard from "@/components/ProductCard.vue";
import Button from "primevue/button";
const store = useAppStore();

const carouselImages = ref([]);
const popularModels = ref({});
const currentlySelectedModel = ref("");
const currentPromoModels = ref([]) 

const selectModel = (event) => {
  const index = event.target.getAttribute("data-model");
  let promoCategory = document.getElementsByClassName("promo-box");
  currentlySelectedModel.value = index;
  currentPromoModels.value = popularModels.value[index];
  for (let i = 0; i < promoCategory.length; i++) {
    promoCategory[i].classList.remove("promo-box-active");
  }
  event.target.classList.add("promo-box-active");
}

const imgURL = (url) => {
  return new URL(url, import.meta.url).href;
}

const motoboomImageResizer = (image) => {
  if (image.includes("motoboom")) {
    image = image.replace("125x1", "650x1");
  }
  return image;
}

onMounted(() => {
  window.addEventListener("scroll", toggleStickyNav);
  setTimeout(() => {
    const allBikes = store.allBikes;
    carouselImages.value = getCarouselImages(allBikes);
    popularModels.value = getPopularModels(allBikes);
    currentPromoModels.value = popularModels.value[(Object.keys(popularModels.value)[0])];
  
    let promoCategory = document.getElementsByClassName("promo-box");
    if(promoCategory.length > 0) promoCategory[0].classList.add("promo-box-active");
  }, 300);
});

const getCarouselImages = (allBikes) => {
  const imageArray = [];
  for (const bikeIndex in allBikes) {
    const bike = allBikes[bikeIndex];
    if (
      bikeIndex === "yamaha_bikes" ||
      bikeIndex === "kawasaki_bikes" ||
      bikeIndex === "suzuki_bikes"
    ) {
      let bikeImg = bike[1].gallery.split(",")[3];
      let bikeSlogan = bike[1].bike_slogan;
      if (bikeImg.includes("motoboom")) {
        bikeImg =
          "https://www.totalmotorcycle.com/wp-content/uploads/2018/09/2019-Kawasaki-KX65a.jpg";
        bikeSlogan = "Creata pentru invingatori";
      }
      imageArray.push({
        img: bikeImg,
        alt: bike[1].bike_name,
        title: bike[1].bike_name.replace("-", " ").toUpperCase(),
        subtitle: bikeSlogan,
      });
    }
  }
  return imageArray;
};

const getPopularModels = (allBikes) => {
  const finalPopular = {};
  for (const bikeTypeIndex in allBikes) {
    const bikeTypes = allBikes[bikeTypeIndex];
    let popular = []
    for (const bikeIndex in bikeTypes) {
      const bike = bikeTypes[bikeIndex];
      if( bike.old_price !== null && bike.old_price !== "null" && bike.old_price !== ""){
        popular.push(bike)
      }
    }

    popular = popular.slice(0, 3);

    if(bikeTypeIndex.includes("_bikes") && popular.length > 0){
      finalPopular[bikeTypeIndex] = popular
    }
  }
  return finalPopular
};

const toggleStickyNav = () => {
  const header = document.querySelector(".desktop-nav");
  if (header) header.classList.toggle("sticky", window.scrollY > 0);
};

onUnmounted(() => {
  window.removeEventListener("scroll", toggleStickyNav);
});
</script>
<style lang="scss">
@import "../assets/imports/home.carousel.scss";
@import "../assets/imports/home.promo.scss";
@import "../assets/imports/home.contact.scss";

@media screen and (max-width: 412px) {
  .promo-box {
    width: 18rem;
    height: 10rem;
    margin: 0.5rem 0;
    .promo-box-shape {
      width: 17.5rem;
      height: 9.5rem;
    }
  }
}
</style>