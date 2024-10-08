<template>
  <div class="product-card" @click="selectBike(bike)">
    <!-- <i class="pi pi-heart-fill" @click="favoriteBike(bike)"></i> -->
    <!-- <div class="call-to-action">Afla mai multe</div> -->
    <div class="img-container">
      <div class="extra-info-container">
        <span class="license-info" v-if="showLicense">
          Permis:
          <span v-for="(license, index) in bikeLicenses" :key="index">
            {{ license.replace(/'/g, '') }}</span
          >
        </span>
        <!-- <span class="rabla-info" v-if="showRabla">Eligibila Rabla</span> -->
      </div>
      <img lazy :src="bike.image" />
    </div>
    <div class="info-container">
      <div v-if="showDiscount" class="ribbon">
        {{ discount }}%
      </div>
      <h2>
        {{
          bike.bike_name.toUpperCase().match(/'\d+/g)
            ? bike.bike_name.replace(/'\d+/g, "").toUpperCase().replace(/-/g, " ")
            : bike.bike_name.toUpperCase().replace(/-/g, " ")
        }}
      </h2>
      <p class="price-container">
        <b class="bike-price" v-if="bike.price !== null">{{ typeof bikePrice === 'string' ? parseInt(bikePrice.replace(/\D/g, "")) : bikePrice }} EUR</b>
        <b v-else>Pret Indisponibil</b>
        <span class="bike-old-price" v-if="bikeOldPrice !== null && bikeOldPrice !== 0"
          ><s>{{ typeof bikeOldPrice === 'string' ? parseInt(bikeOldPrice.replace(/\D/g, "")) : bikeOldPrice }} EUR</s></span
        >
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  bike: {
    type: Object,
    required: true,
    default: () => {},
  },
});
import { useToast } from "primevue/usetoast";
import { useAppStore } from "@/stores/appStore";
import router from "../router";
import { computed } from "vue";

const appStore = useAppStore();
const toast = useToast();

const bikeLicenses = computed(() => {
  const finalArray = [];
  for (const license of props.bike.permis) {
    finalArray.push(license.replace(/[{}""]/g, ""));
  }
  return finalArray;
});

const discount = computed(() => {
  let price = 0;
  let old_price = 0;
  if(Array.isArray(props.bike.price)){
    price = typeof props.bike.price[0] === 'string' ? parseInt(props.bike.price[0].replace(/\D/g, "")) : props.bike.price[0];
  }else{
    price = props.bike.price;
  }

  if(Array.isArray(props.bike.old_price)){
    old_price = typeof props.bike.old_price[0] === 'string' ? parseInt(props.bike.old_price[0].replace(/\D/g, "")) : props.bike.old_price[0];
  }
  else{
    old_price = props.bike.old_price;
  }

  return Math.abs(Math.round(((old_price - price) / old_price) * 100)).toFixed(0);
});

const selectBike = (bike) => {
  appStore.togglePreloader(true);
  appStore.setCurrentBike(bike);
  localStorage.setItem("currentBike", JSON.stringify(bike));
  router.push({ name: "model" });
};

const bikePrice = computed(() => {
  if (props.bike.price === null) return "Pret Indisponibil";
  if (
    props.bike.brand === "royal_enfield" ||
    props.bike.brand === "linhai" ||
    props.bike.brand === "argo" ||
    props.bike.brand === "tgb" 
  ) {
    console.log(props.bike.bike_name, props.bike.price);
    return typeof props.bike.price === "string" ? parseInt(props.bike.price.replace(/\D/g, "")) : props.bike.price[0];
  }
  if(Array.isArray(props.bike.price)){
    return typeof props.bike.price[0] === "string" ? parseInt(props.bike.price[0].replace(/\D/g, "")) : props.bike.price[0];
  }
  if (
    props.bike.brand.toLowerCase().includes("gasgas") ||
    props.bike.brand.toLowerCase().includes("husqvarana") ||
    props.bike.brand.toLowerCase().includes("ktm") ||
    props.bike.brand.toLowerCase().includes("vespa") ||
    props.bike.brand.toLowerCase().includes("piaggio")
  ) {
    return Math.round(props.bike.price * 1.19);
  } else {
    return props.bike.price;
  }
});

const bikeOldPrice = computed(() => {
  if (
    props.bike.brand === "royal_enfield" ||
    props.bike.brand === "linhai" ||
    props.bike.brand === "argo" ||
    props.bike.brand === "tgb"
  ) {
    if(props.bike.old_price === null) return null;
    return typeof props.bike.old_price === 'string' ? parseInt(props.bike.old_price[0].replace(/\D/g, "")) : props.bike.old_price[0];
  }
  if(Array.isArray(props.bike.old_price)){
    return typeof props.bike.old_price[0] === 'string' ? parseInt(props.bike.old_price[0].replace(/\D/g, "")) : props.bike.old_price[0];
  }
  if (
    props.bike.brand.toLowerCase().includes("gasgas") ||
    props.bike.brand.toLowerCase().includes("husqvarana") ||
    props.bike.brand.toLowerCase().includes("ktm") ||
    props.bike.brand.toLowerCase().includes("vespa") ||
    (props.bike.brand.toLowerCase().includes("aprilia") &&
      props.bike.vehicle_type.toLowerCase().includes("bikes")) ||
    props.bike.brand.toLowerCase().includes("piaggio")
  ) {
    return Math.round(props.bike.old_price * 1.19);
  } else {
    return props.bike.old_price;
  }
});

const showDiscount = computed(() => {
  return (
    props.bike.old_price !== "null" &&
    props.bike.old_price !== "" &&
    props.bike.old_price !== null && 
    props.bike.old_price[0] !== null
  );
});

const showLicense = computed(() => {
  if (
    props.bike.permis !== "null" &&
    props.bike.permis !== "undefined" &&
    props.bike.permis !== null &&
    props.bike.permis !== undefined &&
    props.bike.permis !== "" &&
    props.bike.permis.length > 0
  ) {
    return true;
  }
});

const showRabla = computed(() => {
  if (
    props.bike.rabla !== "null" &&
    props.bike.rabla !== "undefined" &&
    props.bike.rabla !== null &&
    props.bike.rabla !== undefined &&
    props.bike.rabla !== "" &&
    props.bike.rabla.toLowerCase() !== "nu" &&
    props.bike.rabla !== false &&
    props.bike.rabla !== "false"
  ) {
    return true;
  }
});
</script>
<style lang="scss">
.product-card {
  width: 17rem;
  height: 25rem;
  border: 2px solid var(--dark-shade);
  background: var(--dark);
  color: var(--light-shade);
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
  i {
    position: absolute;
    color: var(--main);
    font-size: 1.6rem;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 3;
  }
}

.product-card:hover {
  border: 2px solid var(--main);
  background: var(--main);
  cursor: pointer;
  .call-to-action {
    top: 50%;
    z-index: 1;
  }
}

.call-to-action {
  width: 100%;
  position: absolute;
  top: 60%;
  left: 0;
  color: var(--main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: -1;
  transition: all 0.15s ease-in-out;
  text-shadow: 0.5px 0.5px 0px var(--dark-shade);
}

.img-container {
  background: #fff;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 0.5rem;
  img {
    width: 100%;
    height: 14rem;
    object-fit: contain;
  }
}
.info-container {
  width: 100%;
  height: 10rem;
  padding: 0 1rem;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  h2 {
    color: var(--light-shade) !important;
    font-size: 1.2rem !important;
    border-bottom: none !important;
    padding: 0 !important;
    margin: 0.5rem 0 0 0;
  }
}

.price-container {
  width: 90%;
  // position: absolute;
  bottom: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin: 0;
  b {
    width: fit-content;
    font-size: 1.5rem;
  }
  s {
    width: fit-content;
    font-size: 1rem;
  }
}

.ribbon {
  width: 20%;
  margin: 0;
  padding: 0;
  background: var(--main);
  color: white;
  padding: 0.5rem 0;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
}
.ribbon:before,
.ribbon:after {
  content: "";
  position: absolute;
  top: 0;
  margin: 0 -1px; /* tweak */
  width: 100%;
  height: 100%;
  background: var(--main);
}
.ribbon:before {
  right: 100%;
}

.ribbon:after {
  left: 100%;
}

.extra-info-container {
  position: absolute;
  z-index: 3;
  bottom: 0rem;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.25rem;
  padding: 0.25rem;
  overflow: hidden;
}

.license-info {
  width: fit-content;
  background: var(--success);
  padding: 0rem 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.2rem;
}

.rabla-info {
  width: fit-content;
  background: var(--success);
  padding: 0rem 0.5rem;
  border-radius: 0.2rem;
}

@media screen and (max-width: 1024px) {
  .product-card {
    width: 16rem;
    height: 25rem;
  }
  .info-container {
    height: 10rem;
    h2 {
      font-size: 1.2rem !important;
      margin: 0;
    }
  }
  .price-container {
    b {
      font-size: 1.2rem;
    }
    s {
      font-size: 1rem;
    }
  }
}
</style>