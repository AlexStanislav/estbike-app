<template>
  <div class="desktop-nav">
    <img v-if="isSticky || router.currentRoute.value.path !== '/'" style="padding-left: 50px;" lazy
      src="../assets/img/logo/logo-inverted.png" alt="brebumoto Logo" @click="goTo('/')" />
    <img v-else lazy src="../assets/img/logo/logo.png" alt="brebumoto Logo" @click="goTo('/')" />
    <nav class="main-nav">
      <router-link @mouseenter="hideMenu()" to="/">Acasă</router-link>
      <router-link @mouseenter="hideMenu()" to="/despre">Despre Noi</router-link>
      <a @mouseenter="toggleMenu" @click="goTo('/vehicule')">
        <span>
          Vehicule
          <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" @mouseleave="hideMenu()" />
        </span>
      </a>
      <!-- <router-link @mouseenter="hideMenu()" to="/rabla">Rabla</router-link> -->
      <router-link @mouseenter="hideMenu()" to="/service">Service</router-link>
      <router-link @mouseenter="hideMenu()" to="/contact">Contact</router-link>
      <router-link @mouseenter="hideMenu()" to="/utile">Utile</router-link>
    </nav>
    <div id="phone-number-container">
      <i class="pi pi-phone" />
      <div id="phone-number">
        <a href="https://wa.me/0774515065" target="_blank">+40 774 515 065</a>
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
      <!-- <input type="text"class="search-input" contenteditable="true" @input="autoComplete" placeholder="Cauta..."> -->
      <AutoComplete v-model="searchValue" :suggestions="suggestions" @complete="search" @keyup.enter="selectResult"
        optionLabel="bike_name" placeholder="Cauta...">
        <template #option="slotProps">
          <div class="autocomplete-result" @click="selectBike(slotProps.option)">
            {{ slotProps.option.bike_name.replace(/-/g, " ").toUpperCase() }} {{ slotProps.option.main_year !== null ?
            '-': ''}} {{ slotProps.option.main_year }}
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
import Menu from "primevue/menu";
const appStore = useAppStore();

const isSticky = ref(false);


const goTo = (url) => {
  menu.value.hide();
  router.push({ path: url });
};

if (appStore.isMobile() === false) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0 && menu.value !== null) {
      isSticky.value = true;
      menu.value.hide()
    } else {
      isSticky.value = false;
    }

    console.log(isSticky.value);
  });
}

const menuItems = ref([
  {
    label: "ATV",
    command: () => {
      goAndSetVehicle("/vehicule", "atv");
    },
  },
  {
    label: "Motociclete",
    command: () => {
      goAndSetVehicle("/vehicule", "bikes");
    },
  },
  {
    label: "Scutere",
    command: () => {
      goAndSetVehicle("/vehicule", "scooters");
    },
  },
  {
    label: "Snowmobile",
    command: () => {
      goAndSetVehicle("/vehicule", "snowmobiles");
    },
  },
  {
    label: "SSV",
    command: () => {
      goAndSetVehicle("/vehicule", "ssv");
    },
  },
]);

const menu = ref();
const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const goAndSetVehicle = (url, vehicleType) => {
  appStore.setQueryVehicleType(vehicleType)
  localStorage.setItem("modelType", vehicleType)
  localStorage.removeItem("modelBrand")
  setTimeout(() => {
    router.push({ path: url });
  }, 100);
};

const hideMenu = () => {
  menu.value.hide();
};

const searchValue = ref("");
const suggestions = ref([]);

const search = (event) => {
  const models = getAllModels();
  suggestions.value = models.filter((model) => {
    let bikeName = model.bike_name.replace(/-/g, " ");
    if (bikeName.toLowerCase().includes(event.query.toLowerCase())) {
      return bikeName;
    }
  });
};

const selectResult = (e) => {
  console.log(e.target.value);
  const bike = suggestions.value.find((bike) => {
    return (bike.bike_name === e.target.value);
  })

  setTimeout(() => {
    selectBike(bike);
  }, 100);
}

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
  if (router.currentRoute.value.path === "/model") {
  }
  searchValue.value = "";
  appStore.setCurrentBike(bike);
  localStorage.setItem("currentBike", JSON.stringify(bike));
  router.push({ path: "/model" });
};
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
    width: auto;
    height: 50px;
    margin-right: 1rem;
    margin-left: 1rem;
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

  .p-input-icon-left>.p-autocomplete-input {
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

.search-input {
  width: 300px;
  height: 50px;
  border-radius: 0;
  border: none;
  background: var(--main);
  color: var(--light-shade);
  margin-top: 0.2rem;
  clip-path: polygon(10% 0%, 100% 1%, 100% 100%, 10% 100%, 0% 50%);
  padding-left: 3rem;
  font-size: 1.2rem;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--light-shade);
}

.autocomplete-result {
  width: 300px;
  font-size: 0.8em;
}

.p-autocomplete-panel {
  margin-top: 10px;
  margin-left: -15px;
}

.main-nav {
  width: 50%;
  height: 50px;
  font-size: 1.2rem;
  background: var(--dark-shade);
  display: flex;
  border-bottom: 3px solid var(--main);

  a {
    cursor: pointer;
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

.p-menu.p-menu-overlay {
  background: var(--dark-shade);
  border-radius: 0;
}

.p-menuitem-text {
  color: #fff;
}

.p-menuitem-content:hover {
  background: var(--main) !important;
  color: #fff;
}

.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus>.p-menuitem-content {
  background: transparent;
  color: #fff;
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
  width: 15%;
  height: 50px;
  border-bottom: 3px solid var(--main);
  display: flex;
  color: var(--light-shade);
  background: var(--dark-shade);
  align-items: center;
  justify-content: flex-end;

  i {
    font-size: 1.2rem;
    color: var(--light-shade);
  }
}

#phone-number {
  font-size: 1rem;
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

@media screen and (max-width: 1280px) {
  .desktop-nav {
    width: 100%;
  }

  .sticky {
    img {
      margin-right: 1rem !important;
    }

    #phone-number-container {
      right: 22% !important;
    }
  }
}
</style>