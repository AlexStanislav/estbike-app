<template>
  <div class="product">
    <div class="product-top-container">
      <div class="product-header">
        <span>Acasa</span> / <span>Modele</span> /
        <span class="bike-name-crumb">{{ bikeDisplayName }}</span>
      </div>
      <section class="product-info-left">
        <div class="product-img-container">
          <img lazy :src="mainImage" alt="" />
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
              <li v-if="showRabla"><i class="pi pi-car"></i>Program RABLA</li>
            </ul>
          </div>
          <div class="installment-container" v-if="displayModel.price !== null">
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
              EUR pe luna
            </div>
            <div class="installment-price">
              SAU {{ calculateRonInstallments() }} RON pe luna
            </div>
            <!-- <Button
              severity="danger"
              label="Modalitati de plata"
              @click="buyNow()"
            ></Button> -->
          </div>
        </div>
      </section>
      <section class="product-info-right">
        <div class="product-info-details">
          <h1>{{ bikeDisplayName }}</h1>
          <div class="bike-subtitle">
            Producator:
            {{
              displayModel.brand !== undefined
                ? displayModel.brand.toUpperCase()
                : "Necunoscut"
            }}
          </div>
          <!-- <div class="bike-subtitle">An fabricatie: {{ displayModel.main_year }}</div> -->
          <div class="bike-subtitle">Categoria: {{ getCategory() }}</div>
          <div
            v-if="
              displayModel.permis !== undefined &&
              displayModel.permis.length > 0
            "
          >
            Permis:
            <span
              class="info-permis"
              v-for="permis in displayModel.permis"
              :key="permis"
              >{{ permis.replace(/[{}"']/g, "") }}</span
            >
          </div>
          <div class="bike-subtitle">
            Tip Vehicul:
            {{
              displayModel.vehicle_type !== undefined
                ? displayModel.vehicle_type
                    .replace("bikes", "Motociclete")
                    .replace("scooters", "Scutere")
                    .replace("atv", "ATV")
                : "Necunoscut"
            }}
          </div>
          <p>{{ bikeSlogan }}</p>
          <p
            class="product-description"
            v-if="displayModel.bike_description !== ''"
          >
            {{ getDescription() }}
          </p>
        </div>
        <div class="colors-container" v-if="displayModelColors !== null">
          <h3>Culori disponibile:</h3>
          <ul>
            <li
              v-for="colorName in displayModel.colors"
              :key="colorName"
              @click="changeBikeColor(colorName, displayModel)"
            >
              <span>{{ colorName }}</span>
              <div
                class="color-display"
                v-if="Array.isArray(displayModelColors[colorName])"
              >
                <div
                  class="color-block"
                  v-for="color in displayModelColors[colorName]"
                  :key="color"
                  :style="{ background: `#${color}` }"
                ></div>
              </div>
              <div class="color-display" v-else>
                <div
                  class="color-block"
                  :style="{ background: `#${displayModelColors[colorName]}` }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="product-info-price">
          <div class="omologare-display" v-if="displayModel.omologare !== null">
            Omologare:
            <ul
              v-if="
                displayModel.omologare !== null &&
                displayModel.omologare.length > 1
              "
            >
              <li v-for="omologare in displayModel.omologare" :key="omologare">
                <label>
                  <RadioButton
                    v-model="omologareModel"
                    :binary="true"
                    :value="omologare"
                  />
                  <div>{{ omologare === "l7e" ? "Euro5" : omologare.toUpperCase() }}</div>
                </label>
              </li>
            </ul>
            <div v-else-if="displayModel.omologare !== null">
              {{ displayModel.omologare[0].toUpperCase() }}
            </div>
          </div>
          <div class="eur-price" v-if="displayModel.price !== null">
            <span>{{ currentPrice }} EUR</span>
            <s v-if="displayModel.old_price !== null"
              >{{ currentOldPrice }} EUR</s
            >
          </div>
          <div class="ron-price" v-if="displayModel.price !== null">
            <span>{{ Math.ceil(currentPrice * appStore.forexValue) }} RON</span>
            <s v-if="displayModel.old_price !== null"
              >{{ Math.ceil(currentOldPrice * appStore.forexValue) }} RON</s
            >
          </div>
          <div
            class="product-info-price-discount"
            v-if="displayModel.old_price !== null"
          >
            Reducere de {{ Math.round(((currentPrice - currentOldPrice) / currentPrice) * 100).toFixed(0) }}%
          </div>
        </div>
      </section>
    </div>
    <div class="product-bottom-container">
      <h2>Vehicule similare</h2>
      <div class="similar-models-container">
        <div
          class="similar-model-card"
          v-for="model in similarModels"
          :key="model"
          @click="setModelAsCurrent(model)"
        >
          <div class="similar-img-container">
            <img lazy :src="model.image" alt="" />
          </div>
          <div class="similar-info-container">
            <h3>{{ model.bike_name.toUpperCase() }}</h3>
            <h4 v-if="model.price !== null">
              {{ Array.isArray(model.price) ? model.price[0] : model.price }} {{ model.currency }}
            </h4>
            <h4 v-else>Pret Indisponibil</h4>
            <h4 v-if="model.old_price !== null">
              <s>{{ Array.isArray(model.old_price) ? model.old_price[0] : model.old_price }} {{ model.currency }}</s>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  watchEffect,
  watch,
} from "vue";
import { useAppStore } from "../stores/appStore";
import Carousel from "primevue/carousel";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
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

const omologareModel = ref([]);

const currentPrice = ref(0);
const currentOldPrice = ref(0);

const similarModels = ref([]);
const header =
  document.querySelector(".desktop-nav") !== null
    ? document.querySelector(".desktop-nav")
    : document.querySelector(".mobile-nav");

onBeforeMount(() => {
  appStore.togglePreloader(true);
  if (appStore.currentBike === null) {
    appStore.currentBike = JSON.parse(localStorage.getItem("currentBike"));
  }
  setTimeout(() => {
    appStore.togglePreloader(false);
  }, 1000);
});

const displayModelColors = ref();

function loadCurrentBike() {
  if (appStore.currentBike === null) {
    appStore.currentBike = JSON.parse(localStorage.getItem("currentBike"));
  }
  displayModel.value = appStore.currentBike;
  mainImage.value = displayModel.value.image;
  carouselImages.value = getGallery();

  bikeDisplayName.value = displayModel.value.bike_name.toUpperCase();
  bikeSlogan.value =
    displayModel.value.bike_slogan !== null
      ? displayModel.value.bike_slogan.toUpperCase()
      : "";

  if (
    typeof displayModel.value.price === "object" &&
    displayModel.value.price !== null
  ) {
    currentPrice.value = displayModel.value.price[0].replace(/\D/g, "");
  } else if (displayModel.value.price !== null) {
    currentPrice.value = displayModel.value.price.replace(/\D/g, "");
  } else {
    currentPrice.value = "Pret indisponibil";
  }
  if (
    typeof displayModel.value.old_price === "object" &&
    displayModel.value.old_price !== null
  ) {
    currentOldPrice.value = displayModel.value.old_price[0].replace(/\D/g, "");
  } else if (displayModel.value.old_price !== null) {
    currentOldPrice.value = displayModel.value.old_price.replace(/\D/g, "");
  } else {
    currentOldPrice.value = "Pret indisponibil";
  }

  // if (
  //   displayModel.value.old_price !== "null" &&
  //   displayModel.value.old_price !== ""
  // ) {
  //   discount.value = Math.round(((currentPrice.value - currentOldPrice.value) / currentPrice.value) * 100).toFixed(0);
  // }

  similarModels.value = getRandomSlice(getSimilarModels()[0], 4);
  displayModelColors.value = JSON.parse(displayModel.value.colors_display);
}

onMounted(() => {
  header.classList.add("sticky");
  setTimeout(() => {
    loadCurrentBike();
  }, 300);
});

const changeBikeColor = (color, model) => {
  if (model.brand === "royal_enfield") {
    currentPrice.value = parseInt(model.price[model.colors.indexOf(color)]);
    currentOldPrice.value = parseInt(model.old_price[model.colors.indexOf(color)]);
    console.log(currentPrice.value, currentOldPrice.value);
  } else {
    const brandBikes =
      appStore.allBikes[
        `${displayModel.value.brand}_${displayModel.value.vehicle_type}`
      ];
    const bikeMatch = brandBikes.filter((bike) => {
      return bike.bike_name.includes(color);
    });

    const baseBikeMatch = bikeMatch.filter((bike) => {
      const bikeName = bike.bike_name.split("-");
      const baseBikeName = bikeName.slice(0, bikeName.indexOf(color));
      const currentBikeName = displayModel.value.bike_name.split("-");
      const baseCurrentBikeName = currentBikeName.slice(
        0,
        currentBikeName.indexOf(color)
      );
      console.log("baseBikeName", baseBikeName);
      console.log("baseCurrentBikeName", baseCurrentBikeName);
      if(baseBikeName.join("-") === baseCurrentBikeName.join('-')) {
        console.log(bike)
        return bike;
      }
      
    });
    if (baseBikeMatch.length > 0) {
      setModelAsCurrent(baseBikeMatch[0]);
    }
  }
};

const setModelAsCurrent = (model) => {
  localStorage.setItem("currentBike", JSON.stringify(model));
  appStore.setCurrentBike(model);
  loadCurrentBike();
  window.scrollTo(0, 0);
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
  if (displayModel.value.gallery === null) return gallery;
  if (displayModel.value.gallery[0] === "") {
    gallery.push(motoboomImageResizer(displayModel.value.image));
  } else {
    for (const img of displayModel.value.gallery) {
      gallery.push(motoboomImageResizer(img.replace(/\'/g, "")));
    }
  }
  return gallery;
};

const motoboomImageResizer = (image) => {
  if (image.includes("$http")) {
    image = image.replace("$http", "http");
  }
  if (image.includes("motoboom")) {
    image = image.replace("125x1", "650x1");
  }
  return image;
};
const getCategory = () => {
  if (
    displayModel.value.category !== undefined &&
    displayModel.value.category !== null
  ) {
    return displayModel.value.category.toUpperCase();
  }
};

const calulateInstallments = () => {
  let bikePrice = Array.isArray(displayModel.value.price)
    ? displayModel.value.price[0]
    : displayModel.value.price;
  return Math.round(bikePrice / currentInstallment.value);
};
const calculateRonInstallments = () => {
  let bikePrice = Array.isArray(displayModel.value.price)
    ? displayModel.value.price[0]
    : displayModel.value.price;
  return Math.round(
    Math.ceil(bikePrice * appStore.forexValue) / currentInstallment.value
  );
};

function setMainImage(image) {
  mainImage.value = image;
}

const showRabla = computed(() => {
  if (
    displayModel.value.rabla !== "null" &&
    displayModel.value.rabla !== "undefined" &&
    displayModel.value.rabla !== null &&
    displayModel.value.rabla !== undefined &&
    displayModel.value.rabla !== "" &&
    displayModel.value.rabla !== "NU" &&
    displayModel.value.rabla !== "nu" &&
    displayModel.value.rabla !== "Nu" &&
    displayModel.value.rabla !== "nU" &&
    displayModel.value.rabla !== false &&
    displayModel.value.rabla !== "false"
  ) {
    return true;
  }
});

watch(
  () => omologareModel.value,
  () => {
    const priceIndex = displayModel.value.omologare.indexOf(
      omologareModel.value
    );
    currentPrice.value = displayModel.value.price[priceIndex].replace(
      /\D/g,
      ""
    );
  }
);

watchEffect(() => {
  loadCurrentBike();
});
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

.info-permis {
  margin-right: 0.5rem;
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
  .bike-subtitle {
    margin: 0;
    font-weight: 500;
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
  position: relative;
}

.product-description {
  height: fit-content;
  text-align: justify;
  text-justify: distribute;
  font-family: "Oswald", sans-serif;
  font-weight: 300;
}

.omologare-display {
  font-size: 1.25rem;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      font-family: "Oswald", sans-serif;
      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--dark-shade);
        font-size: 0.9rem;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        div {
          font-size: 1.25rem;
        }
        .p-radiobutton-box {
          border-color: transparent;
          color: #b3b3b3;
        }
        .p-radiobutton-box::after {
          content: " ";
          width: 40px;
          height: 15px;
          background: #b3b3b3;
          clip-path: polygon(
            75% 0%,
            100% 50%,
            75% 100%,
            0% 100%,
            25% 50%,
            0% 0%
          );
        }
        .p-radiobutton .p-radiobutton-box.p-highlight {
          border-color: transparent;
          background: transparent;
          &::after {
            content: " ";
            width: 40px;
            height: 15px;
            background: var(--dark-accent);
            clip-path: polygon(
              75% 0%,
              100% 50%,
              75% 100%,
              0% 100%,
              25% 50%,
              0% 0%
            );
          }
        }
        .p-radiobutton
          .p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover {
          border-color: transparent;
          color: var(--dark-accent);
        }
        .p-radiobutton .p-radiobutton-box:not(.p-disabled).p-focus {
          box-shadow: 0 0 0 0rem var(--dark-accent);
        }
      }
    }
  }
}

.colors-container {
  padding-left: 1rem;
  span {
    width: 100px;
    text-transform: capitalize;
  }
  ul {
    list-style: none;
    margin: 0;
    li {
      display: flex;
      margin-bottom: 0.25rem;
    }
  }
}

.color-display {
  display: flex;
}

.color-block {
  width: 30px;
  height: 30px;
  border: 1px solid var(--dark-shade);
}

.product-info-price {
  padding: 1rem;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  color: var(--dark);
  label {
    font-size: 1.5rem;
  }
  span {
    color: var(--main);
    font-size: 2rem;
    line-height: 60px;
    margin: 0 0.5rem;
  }
  s {
    font-size: 1.5rem;
  }
}

.product-info-price-discount {
  position: absolute;
  right: 1rem;
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
  transition: background 0.1s ease-in-out;
}

.similar-model-card:hover {
  background: var(--main);
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
    text-align: center;
  }
  h3 {
    font-size: 1.1rem;
  }
  h4 {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 1366px) {
  .product {
    width: 95%;
  }
}

@media screen and (max-height: 414px) {
  .product-info-price-discount {
    position: initial;
  }
}
@media screen and (max-width: 414px) {
  .product {
    width: 100%;
  }
  .product-top-container {
    flex-flow: column wrap;
    align-items: center;
  }
  .product-info-left,
  .product-info-right {
    width: 95%;
  }
  .product-info-right {
    padding-left: 0;
  }
  .similar-models-container {
    justify-content: center;
  }
  .similar-model-card {
    width: 90%;
  }
  .product-info-price-discount {
    position: initial;
  }
}
</style>