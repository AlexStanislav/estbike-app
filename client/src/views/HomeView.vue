<template>
  <section class="home-view">
    <Skeleton
      width="100%"
      height="400px"
      v-if="store.allBikes === null"
    ></Skeleton>
    <Carousel
      class="home-carousel"
      :value="carouselImages"
      :showNavigators="false"
      circular
      :autoplayInterval="5000"
    >
      <template #item="slotProps">
        <div class="top-gradient"></div>
        <img class="home-carousel-img" :src="slotProps.data.img" :alt="slotProps.data.alt" />
        <div class="carousel-text-container">
          <h1>{{ slotProps.data.title }}</h1>
          <h2>{{ slotProps.data.subtitle }}</h2>
          <Button
            label="Mail multe detalii"
            @click="selectBike(slotProps.data)"
          />
        </div>
        <div class="bottom-gradient"></div>
      </template>
    </Carousel>
    <PopularModels />
    <div class="home-contact">
      <h1>Nu ezitați să luați legatura cu noi</h1>
      <div class="home-contact-container">
        <div class="contact-card facebook-card">
          <i class="pi pi-facebook main-icon"></i>
          <h2>FACEBOOK</h2>
          <h3>Moto Brebu</h3>
          <div class="follow-button">FOLLOW</div>
        </div>
        <div class="contact-card instagram-card">
          <i class="pi pi-instagram main-icon"></i>
          <h2>INSTAGRAM</h2>
          <h3>@motobrebu</h3>
          <div class="follow-button">FOLLOW</div>
        </div>
        <div class="contact-card call-card">
          <span>
            <i class="pi pi-phone"></i>
            <div>0733782453</div>
          </span>
          <span>
            <i class="pi pi-envelope"></i>
            <div>motobrebu@example.com</div>
          </span>
          <span>
            <i class="pi pi-map-marker"></i>
            <div>Str. Șelimbăr nr 10, Brebu</div>
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
import Skeleton from "primevue/skeleton";
import Carousel from "primevue/carousel";
import { onBeforeMount, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useAppStore } from "../stores/appStore";
import PopularModels from "../components/PopularModels.vue";
import Button from "primevue/button";
import router from "../router";
const store = useAppStore();

const carouselImages = ref([]);

function getAllModels() {
  const array = [];
  const models = store.allBikes;
  for (const modelIndex in models) {
    const bikes = models[modelIndex];
    for (const bikeIndex in bikes) {
      const bike = bikes[bikeIndex];
      array.push(bike);
    }
  }

  return array;
}
const selectBike = (bike) => {
  const models = getAllModels();
  for (const model of models) {
    if (model.bike_name === bike.alt) {
      store.setCurrentBike(model);
      router.push({ path: `/model` });
    }
  }
};


const toggleStickyNav = () => {
  const header = document.querySelector(".desktop-nav");
  if (header) header.classList.toggle("sticky", window.scrollY > 0);
};

const getCarouselImages = (allBikes) => {
  const imageArray = [];
  for (const bikeIndex in allBikes) {
    const brand = allBikes[bikeIndex];
    for (const bike of brand) {
      if (bike.is_gallery === true || bike.is_gallery === "true") {
        imageArray.push({
          img: bike.gallery_image,
          alt: bike.bike_name,
          title: bike.gallery_title.replace("-", " ").toUpperCase(),
          subtitle: bike.gallery_description,
        });
      }
    }
  }
  return imageArray;
};

onBeforeMount(() => {
  store.togglePreloader(true);
});

onMounted(() => {
  window.addEventListener("scroll", toggleStickyNav);
  setTimeout(() => {
    store.togglePreloader(false);
  }, 1000);
});

watchEffect(() => {
  if (store.allBikes) {
    carouselImages.value = getCarouselImages(store.allBikes);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", toggleStickyNav);
});
</script>
<style lang="scss">
@import "../assets/imports/home.carousel.scss";
@import "../assets/imports/home.contact.scss";

@media screen and (max-width: 414px) {
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