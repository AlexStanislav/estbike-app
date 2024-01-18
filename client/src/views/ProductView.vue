<template>
  <div class="product">
    <div class="product-top-container">
      <div class="product-header">
        <span>Acasa</span> / <span>Modele</span> /
        <span class="bike-name-crumb">{{ bikeDisplayName }}</span>
      </div>
      <section class="product-info-left">
        <div class="product-img-container">
          <img :src="mainImage" alt="" />
          <Carousel
            class="product-carousel"
            verticalViewPortHeight="400px"
            :circular="true"
            :numVisible="5"
            :value="carouselImages"
            :showIndicators="false"
            :orientation="'vertical'"
          >
            <template #item="slotProps">
              <img
                class="product-carousel-img"
                :src="slotProps.data"
                @click="setMainImage(slotProps.data)"
              />
            </template>
          </Carousel>
        </div>
        <div class="product-left-info-details">
          <div>
            <h2>Detalii utile</h2>
            <ul>
              <li><i class="pi pi-percentage"></i>Rate fara dobanda</li>
              <li>
                <i class="pi pi-chart-bar"></i>Finantare flexibila in rate
              </li>
              <li><i class="pi pi-money-bill"></i>Rate fara avans</li>
              <li><i class="pi pi-car"></i>Program RABLA</li>
            </ul>
          </div>
          <div class="installment-container">
            <h2>Calculeaza-ti ratele</h2>
            <label>
              Pentru a plati suma totala in
              <Dropdown
                :options="installmentOptions"
                v-model="currentInstallment"
              />
              luni
            </label>
            <div class="installment-price">
              Va trebuii sa platiti: {{ calulateInstallments() }}
              {{ displayModel.currency }} pe luna
            </div>
            <Button
              severity="danger"
              label="Modalitati de plata"
              @click="buyNow()"
            ></Button>
          </div>
        </div>
      </section>
      <section class="product-info-right">
        <div class="product-info-details">
          <h1>{{ bikeDisplayName }}</h1>
          <h4>Categoria: {{ getCategory() }}</h4>
          <p>{{ bikeSlogan }}</p>
          <p
            class="product-description"
            v-if="displayModel.bike_description !== ''"
          >
            {{ getDescription() }}
          </p>
        </div>
        <div class="product-info-price">
          <b
            ><span>Pret: </span>{{ displayModel.price }}
            {{ displayModel.currency }}</b
          >
          <span
            v-if="
              displayModel.old_price !== '' &&
              displayModel.old_price !== 'null' &&
              displayModel.old_price !== null
            "
          >
            <s
              >{{ displayModel.old_price }} {{ displayModel.currency }}</s
            ></span
          >
          <div
            class="product-info-price-discount"
            v-if="
              displayModel.old_price !== '' &&
              displayModel.old_price !== 'null' &&
              displayModel.old_price !== null
            "
          >
            Reducere de {{ discount }}%
          </div>
        </div>
      </section>
    </div>
    <div class="product-bottom-container">
      <h2>Modele similare</h2>
      <div class="similar-models-container">
        <div
          class="similar-model-card"
          v-for="model in similarModels"
          :key="model"
          @click="setModelAsCurrent(model)"
        >
          <div class="similar-img-container">
            <img :src="model.image" alt="" />
          </div>
          <div class="similar-info-container">
            <h3>{{ model.bike_name.toUpperCase() }}</h3>
            <h4 v-if="model.price !== 'null'">
              {{ model.price }} {{ model.currency }}
            </h4>
            <h4 v-else>Pret Indisponibil</h4>
            <h4
              v-if="
                model.old_price !== 'null' &&
                model.old_price !== '' &&
                model.old_price !== null
              "
            >
              <s>{{ model.old_price }} {{ model.currency }}</s>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAppStore } from "../stores/appStore";
import Carousel from "primevue/carousel";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import router from "../router";
const appStore = useAppStore();
const displayModel = ref({});
const mainImage = ref("");
const carouselImages = ref([]);
const discount = ref(0);
const bikeDisplayName = ref("");
const bikeSlogan = ref("");

const currentInstallment = ref(12);
const installmentOptions = ref([12, 24, 36, 48]);

const similarModels = ref([]);

onMounted(() => {
  setTimeout(() => {
    if (appStore.currentBike === null) {
      router.push({ path: "/" });
    }
    displayModel.value = appStore.currentBike;
    mainImage.value = displayModel.value.image;
    carouselImages.value = getGallery();

    bikeDisplayName.value = displayModel.value.bike_name.toUpperCase();
    bikeSlogan.value = displayModel.value.bike_slogan.toUpperCase();
    if (
      displayModel.value.old_price !== "null" &&
      displayModel.value.old_price !== ""
    ) {
      discount.value = Math.round(
        ((displayModel.value.price - displayModel.value.old_price) /
          displayModel.value.price) *
          100
      ).toFixed(0);
    }

    similarModels.value = getRandomSlice(getSimilarModels()[0], 4);
  }, 300);
});

const setModelAsCurrent = (model) => {
  displayModel.value = model;
  mainImage.value = displayModel.value.image;
  carouselImages.value = getGallery();
  bikeDisplayName.value = displayModel.value.bike_name.toUpperCase();
  bikeSlogan.value = displayModel.value.bike_slogan.toUpperCase();
};

function getRandomSlice(array, sliceLength) {
  if (!Array.isArray(array) || array.length === 0 || sliceLength <= 0) {
    return [];
  }

  const startIndex = Math.floor(
    Math.random() * (array.length - sliceLength + 1)
  );
  const endIndex = startIndex + sliceLength;

  return array.slice(startIndex, endIndex);
}

const getSimilarModels = () => {
  const similarModelsArray = [];
  let matchedArray = false;
  for (const model in appStore.allBikes) {
    const bikeType = appStore.allBikes[model];
    for (const bikeIndex in bikeType) {
      const bike = bikeType[bikeIndex];
      if (bike.bike_name !== undefined) {
        if (bike.bike_name === displayModel.value.bike_name) {
          similarModelsArray.push(bikeType);
        }
      }
    }
  }
  return [...similarModelsArray];
};

const getDescription = () => {
  if (displayModel.value.bike_category === "") {
    return displayModel.value.bike_slogan;
  } else {
    return displayModel.value.bike_description;
  }
};

const getGallery = () => {
  const gallery = [];
  for (const img of displayModel.value.gallery.split(",")) {
    gallery.push(motoboomImageResizer(img));
  }
  return gallery;
};

const motoboomImageResizer = (image) => {
  if (image.includes("motoboom")) {
    image = image.replace("125x1", "650x1");
  }
  return image;
};
const getCategory = () => {
  if (displayModel.value.category !== undefined) {
    return displayModel.value.category.toUpperCase();
  }
};

const calulateInstallments = () => {
  return Math.round(displayModel.value.price / currentInstallment.value);
};

function setMainImage(image) {
  mainImage.value = image;
}
</script>
<style lang="scss">
.product {
  width: 80%;
  margin: 80px auto 0 auto;
  span {
    cursor: pointer;
  }
}

.product-top-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  gap: 2rem;
}

.bike-name-crumb {
  color: var(--main);
}

.product-header {
  width: 100%;
  position: absolute;
  top: 0;
  height: 50px;
  z-index: 5;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  padding: 0 1rem;
  color: var(--dark-shade);
  background: #dedede;
}

.product-info-left,
.product-info-right {
  width: 50%;
  margin-top: 50px;
}

.product-info-left {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
}

.product-left-info-details {
  color: var(--dark-shade);
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  border-top: 1px solid var(--dark-shade);
  padding-top: 0.5rem;
  h2 {
    margin: 1rem 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.3rem;
    color: var(--dark);
    margin-bottom: 0.5rem;
    i {
      background: var(--main);
      font-size: 1rem;
      color: var(--light-shade);
      padding: 0.4rem;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.installment-container {
  display: flex;
  height: fit-content;
  flex-flow: column nowrap;
  padding: 1rem;
  label {
    font-size: 1.3rem;
  }
  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }
  .p-dropdown {
    border: none;
    border-radius: 0;
  }
  .p-button {
    margin-top: 2rem;
  }
}

.installment-price {
  font-size: 1.5rem;
  color: var(--main);
}

.product-info-right {
  display: flex;
  height: fit-content;
  flex-flow: column nowrap;
  padding-left: 2rem;
  padding-top: 2rem;
  color: var(--dark-shade);
  position: relative;
  h1,
  h4 {
    margin: 0;
  }
  p {
    font-size: 1.1rem;
    color: var(--dark);
  }
}
.product-img-container {
  width: 100%;
  height: 500px;
  display: flex;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.product-carousel {
  width: 110px;
  height: 100%;
  padding-left: 5px;
}

.product-info-details {
  padding: 1rem;
}

.product-description {
  height: fit-content;
  text-align: justify;
  text-justify: distribute;
  font-family: "Oswald", sans-serif;
  font-weight: 300;
}

.product-info-price {
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  b {
    color: var(--main);
    font-size: 3rem;
  }
  span {
    color: var(--dark);
    font-size: 2rem;
    line-height: 60px;
  }
}

.product-info-price-discount {
  width: 15rem;
  color: var(--light-shade);
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  background: var(--main);
  clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0% 100%, 10% 50%, 0% 0%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-carousel-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  cursor: pointer;
}

.product-bottom-container {
  h2 {
    color: var(--dark-shade);
    font-size: 2.5rem;
    text-align: center;
    border-bottom: 2px solid var(--dark-shade);
    padding-bottom: 0.5rem;
  }
}

.similar-models-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 2rem;
}
.similar-model-card {
  width: 20rem;
  height: 25rem;
  background: var(--dark);
  display: flex;
  flex-flow: column nowrap;
  border: 2px solid var(--dark);
  cursor: pointer;
}

.similar-img-container {
  width: 100%;
  height: 60%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
}

.similar-info-container {
  width: 100%;
  height: 40%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  h3,
  h4 {
    color: var(--light-shade);
    margin: 0;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 412px) {
  .product{
    width: 100%;
  }
  .product-top-container {
    flex-flow: column wrap;
    align-items: center;
  }
  .product-info-left, .product-info-right {
    width: 95%;
  }
  .product-info-right {
    padding-left: 0;
  }
  .similar-models-container {
    justify-content: center;
  }
  .similar-model-card{
    width: 90%;
  }
}
</style>