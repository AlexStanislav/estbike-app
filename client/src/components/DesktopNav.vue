<template>
  <div class="desktop-nav">
    <img
      src="../assets/img/logoest.jpg"
      alt="ESTBike Logo"
      @click="goTo('/')"
    />
    <nav class="main-nav">
      <router-link to="/">Acasă</router-link>
      <router-link to="/despre">Despre Noi</router-link>
      <router-link to="/modele">Modele</router-link>
      <router-link to="/rabla">Rabla</router-link>
      <router-link to="/service">Service</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <div id="phone-number-container">
      <i class="pi pi-phone" />
      <div id="phone-number">
        <a href="https://wa.me/0733782453" target="_blank">+40 733 782 453</a>
      </div>
    </div>
    <div id="header-decoration">
      <div id="top-decoration"></div>
      <div id="top-decoration-shadow"></div>
      <div id="bottom-decoration"></div>
      <div id="bottom-decoration-shadow"></div>
    </div>
    <div class="search-container p-input-icon-left">
      <i class="pi pi-search" />
      <AutoComplete
        v-model="searchValue"
        :suggestions="suggestions"
        @complete="search"
        optionLabel="bike_name"
        placeholder="Cauta..."
      >
        <template #option="slotProps">
          <div class="autocomplete-result" @click="selectBike(slotProps.option)">
            {{ slotProps.option.bike_name }}
          </div>
        </template>
      </AutoComplete>
    </div>
  </div>
</template>
<script setup>
import AutoComplete from "primevue/autocomplete";
import router from "../router";
import { ref } from "vue";
import { useAppStore } from "../stores/appStore";
const appStore = useAppStore();
const goTo = (url) => {
  router.push({ path: url });
};

const searchValue = ref("");
const suggestions = ref([]);

const search = (event) => {
  const models = getAllModels();
  suggestions.value = models.filter((model) => {
    if(model.bike_name.toLowerCase().includes(event.query.toLowerCase())){
      return model.bike_name.replace(/-/g, " ");
    }
  });
  
};

function getAllModels() {
  const array = [];
  const models = appStore.allBikes;
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
  if(router.currentRoute.value.path === '/model'){
    router.go(-1);
    setTimeout(() => {
      router.go(1)
    })
  }
  searchValue.value = "";
  appStore.setCurrentBike(bike);
  router.push({ path: '/model' })
}
</script>
<style lang="scss">
.desktop-nav {
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  width: 80%;
  left: 10%;
  position: fixed;
  z-index: 10;
  img {
    width: 132px;
    height: 50px;
    margin-right: 1rem;
    cursor: pointer;
  }
  .p-input-icon-left {
    margin-left: 5rem;
    filter: drop-shadow(0px 3px 0px var(--main));
  }
  i {
    color: var(--dark-accent);
    z-index: 3;
    left: 1.5rem;
  }
  .p-input-icon-left > .p-autocomplete-input {
    padding-left: 3rem;
  }
  .p-autocomplete-input {
    background: var(--dark-shade);
    border: none;
    color: var(--light-shade);
    margin-top: 0.2rem;
    border-radius: 0;
    clip-path: polygon(10% 0%, 100% 1%, 100% 100%, 10% 100%, 0% 50%);
    padding-left: 3rem;
  }

  .p-inputtext::-moz-placeholder {
    color: #fff;
    opacity: 1;
  }

  .p-inputtext:focus {
    box-shadow: 0 0 0 0.2rem var(--main);
  }
}

.main-nav {
  width: 50%;
  height: 50px;
  font-size: 1.2rem;
  background: var(--dark-shade);
  display: flex;
  border-bottom: 3px solid var(--main);
  a {
    text-decoration: none;
    color: var(--light-shade);
    padding: 0.5rem 1rem;
    transition: all 0.15s ease-in;
    text-shadow: 0px 0px 2px #000;
  }
  a:hover {
    background: var(--main);
    color: var(--light-shade);
  }
  a.router-link-exact-active {
    background: var(--main);
    color: var(--light-shade);
  }
}

#header-decoration {
  width: 40px;
  height: 40px;
  position: relative;
}

#top-decoration {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 50px 0 0;
  border-color: #1c131c transparent transparent transparent;
  position: absolute;
  z-index: 2;
}
#top-decoration-shadow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 55px 0 0;
  border-color: var(--main) transparent transparent transparent;
  position: absolute;
  z-index: 0;
}
#bottom-decoration-shadow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 50px 0 0 53px;
  border-color: transparent transparent transparent var(--main);
  position: absolute;
  z-index: 0;
}

#bottom-decoration {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 47px 0 0 47px;
  border-color: transparent transparent transparent #1c131c;
  position: absolute;
  z-index: 1;
}

#phone-number-container {
  width: fit-content;
  height: 50px;
  border-bottom: 3px solid var(--main);
  display: flex;
  color: var(--light-shade);
  background: var(--dark-shade);
  align-items: center;
  i {
    font-size: 1.5rem;
    color: var(--light-shade);
  }
}

#phone-number {
  font-size: 1.2rem;
  margin: 0.5rem 0.5rem;
  a {
    text-decoration: none;
    color: var(--light-shade);
  }
}

@media screen and (max-width: 1366px) {
  .desktop-nav {
    width: 90%;
    left: 5%;
  }
  nav {
    width: 60%;
  }
  #phone-number-container {
    width: 15%;
  }
  #phone-number {
    font-size: 0.9rem;
  }
}
</style>