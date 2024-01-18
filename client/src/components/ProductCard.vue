<template>
  <div class="product-card" @click="selectBike(bike)">
    <i class="pi pi-heart-fill" @click="favoriteBike(bike)"></i>
    <div class="call-to-action">Afla mai multe</div>
    <div class="img-container">
      <img :src="bike.image" alt="" />
    </div>
    <div class="info-container">
      <div v-if="(bike.old_price !== 'null' && bike.old_price !== '' && bike.old_price !== null)" class="ribbon">-{{Math.round(((props.bike.old_price - props.bike.price) / props.bike.old_price) * 100)}}%</div>
      <h2>{{ bike.bike_name.toUpperCase() }}</h2>
      <!-- <p>{{ bike.bike_slogan.split(" ").slice(0, 4).join(" ").replace("este", " ").replace("un", "") }}</p> -->
      <p class="price-container">
        <b v-if="bike.price !== 'null'">{{ bike.price }} {{ bike.currency }}</b>
        <b v-else>Pret Indisponibil</b>
        <span v-if="(bike.old_price !== 'null' && bike.old_price !== '' && bike.old_price !== null)"><s>{{ bike.old_price }} {{ bike.currency }}</s></span>
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
import { useToast } from 'primevue/usetoast';
import { useAppStore } from '@/stores/appStore';
import router from '../router';

const appStore = useAppStore();
const toast = useToast();

const favoriteBike = (bike) => {
  appStore.favoriteBike(bike);
  toast.add({severity:'success', summary: 'Vehiculul adaugat la favorite', detail: 'Vehiculul a fost adaugat la favorite', life: 3000});
}

const selectBike = (bike) => {
  console.log(bike);
  appStore.setCurrentBike(bike);
  router.push({ name: 'model'});
}

</script>
<style lang="scss">
.product-card {
  width: 22rem;
  height: 30rem;
  border: 2px solid var(--dark-shade);
  background: var(--dark);
  color: var(--light-shade);
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
  i{
    position: absolute;
    color: var(--main);
    font-size: 2rem;
    top: 0.5rem;
    left: 0.5rem;
  }
}

.product-card:hover {
  border: 2px solid var(--main);
  background: var(--main);
  cursor: pointer;
  .call-to-action {
    top: 42%;
    z-index: 1;
  }
}

.call-to-action {
  width: 100%;
  position: absolute;
  top: 50%;
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
  padding: 0.5rem;
  img {
    width: 100%;
    height: 14rem;
    object-fit: contain;
  }
}
.info-container {
  width: 100%;
  height: 14rem;
  padding: 0 1rem;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  h2{
    color: var(--light-shade) !important;
    font-size: 2rem !important;
    border-bottom: none !important;
    padding: 0 !important;
  }
}

.price-container {
  width: 90%;
  // position: absolute;
  bottom: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  b {
    width: fit-content;
    font-size: 2.5rem;
    line-height: 36px;
  }
  s {
    width: fit-content;
    font-size: 1.5rem;
    line-height: 24px;
  }
}

.ribbon {
  width: 15%;
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

@media screen and (max-width: 1024px) {
  .product-card {
    width: 16rem;
    height: 25rem;
  }
  .info-container {
    height: 10rem;
    h2{
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