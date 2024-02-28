<template>
  <div class="mobile-nav">
    <i class="pi pi-bars menu-icon" @click="toggleSidebar()"></i>
    <img src="../assets/img/logo.svg" alt="Logo motobrebu" />
    <div id="phone-number-container">
      <i class="pi pi-phone" />
      <div id="phone-number">
        <a href="https://wa.me/0733782453" target="_blank">+40 733 782 453</a>
      </div>
    </div>
    <Sidebar v-model:visible="appStore.sidebarOpen" header="Meniu">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <AutoComplete
          v-model="searchValue"
          :suggestions="suggestions"
          @complete="search"
          optionLabel="bike_name"
          placeholder="Cauta..."
        >
          <template #option="slotProps">
            <div
              class="autocomplete-result"
              @click="selectBike(slotProps.option)"
            >
              {{ slotProps.option.bike_name.toUpperCase() }}
            </div>
          </template>
        </AutoComplete>
      </span>
      <ul class="brands-link">
        <h2>Vehicule</h2>
        <!-- <li v-for="(brand, brandName) in appStore.homeBrands" :key="brandName">
          <span class="brand-sublinks" v-if="hasSublinks(brand)">
            <Accordion :multiple="true">
              <AccordionTab :header="brandName.toUpperCase()">
                <ul>
                  <li v-for="(sublink, index) in brand" :key="index" @click="goToModels(brandName, sublink)">
                    {{
                      sublink
                        .replace("bikes", "Motociclete")
                        .replace("scooters", "Scutere")
                        .replace("atv", "ATV")
                    }}
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </span>
          <span v-else @click="goToModel(brandName)">{{ brandName.toUpperCase() }}</span>
        </li> -->
        <li v-for="(vehicle, index) in vehicleTypes.indexes" :key="index">
          <span class="brand-sublinks">
            <Accordion :multiple="true">
              <AccordionTab
                :header="
                  vehicle
                    .replace('bikes', 'Motociclete')
                    .replace('scooters', 'Scutere')
                    .replace('atv', 'ATV')
                    .replace('utv', 'UTV')
                    .replace('snowmobiles', 'Snowmobile')
                    .toUpperCase()
                "
              >
                <ul>
                  <li
                    v-for="(brand, index) in vehicleTypes.values[vehicle]"
                    :key="index"
                    @click="goToModels(brand, vehicle)"
                  >
                    {{ brand.toUpperCase() }}
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </span>
        </li>
        <h2>Meniu</h2>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/">Acasă</router-link>
        </li>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/despre">Despre Noi</router-link>
        </li>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/modele">Modele</router-link>
        </li>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/rabla">Rabla</router-link>
        </li>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/service">Service</router-link>
        </li>
        <li @click="appStore.sidebarOpen = false">
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>
<script setup>
import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Sidebar from "primevue/sidebar";
import { useAppStore } from "@/stores/appStore";
import { ref, watch, watchEffect } from "vue";
import router from "../router";
const appStore = useAppStore();
const toggleSidebar = () => {
  appStore.toggleSidebar();
};

const searchValue = ref("");
const suggestions = ref([]);

const search = (event) => {
  const models = getAllModels();
  suggestions.value = models.filter((model) => {
    return model.bike_name.toLowerCase().includes(event.query.toLowerCase());
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

const getVehicleTypes = () => {
  const vehicleTypes = {};
  const models = getAllModels();
  for (const modelIndex in models) {
    const bike = models[modelIndex];
    const vehicleType = bike.vehicle_type.toLowerCase();
    if (!vehicleTypes[vehicleType]) {
      vehicleTypes[vehicleType] = [];
    }
  }

  for (const modelIndex in models) {
    const bike = models[modelIndex];
    const vehicleType = bike.vehicle_type.toLowerCase();
    vehicleTypes[vehicleType].push(bike.brand);
  }

  for (const vehicleType in vehicleTypes) {
    vehicleTypes[vehicleType] = [...new Set(vehicleTypes[vehicleType])];
  }

  return {
    indexes: Object.keys(vehicleTypes).sort((a, b) => a.localeCompare(b)),
    values: vehicleTypes,
  };
};

const vehicleTypes = getVehicleTypes();

const goToModels = (brand, vehicleType) => {
  appStore.setModelsFilters({ brand, type: vehicleType });
  router.push({ path: "/modele" });
  appStore.sidebarOpen = false;
};

const goToModel = (brand) => {
  appStore.setModelsFilters({ brand: brand });
  router.push({ path: "/modele" });
  appStore.sidebarOpen = false;
};

watch(
  () => appStore.sidebarOpen,
  () => {
    const body = document.querySelector("body");
    if (!appStore.sidebarOpen) {
      searchValue.value = "";
      body.style.overflow = "initial";
    } else {
      body.style.overflow = "hidden";
    }
  }
);

const selectBike = (bike) => {
  appStore.togglePreloader(true);
  if (router.currentRoute.value.path === "/model") {
    router.go(-1);
    setTimeout(() => {
      router.go(1);
    });
  }
  searchValue.value = "";
  appStore.setCurrentBike(bike);
  router.push({ path: "/model" });
};

const hasSublinks = (brand) => {
  if (brand.length > 1) return true;
  else return false;
};
</script>
<style lang="scss">
.mobile-nav {
  width: 100%;
  background: var(--dark-shade);
  display: flex;
  align-items: center;
  border-bottom: 3px solid var(--main);
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 15;
  img {
    width: 200px;
    height: 50px;
  }
  .menu-icon {
    color: var(--light-shade);
    font-size: 2rem;
    position: absolute;
    left: 1rem;
    z-index: 3;
    cursor: pointer;
  }
  #phone-number-container {
    border: none;
    display: flex;
    right: 1rem;
    position: absolute;
    width: fit-content;
  }
  #phone-number {
    font-size: 1rem;
  }
}
.p-sidebar {
  background: var(--dark-shade);
  color: var(--light-shade);
  border-right: 3px solid var(--main);
  font-family: "Oswald", sans-serif;
}

.p-sidebar-content {
  padding-top: 1rem;

  .p-inputtext:hover {
    border-color: var(--main);
  }
  .p-inputtext:focus {
    box-shadow: none;
    border-color: var(--main);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    h2 {
      border-bottom: 1px solid var(--light-shade);
      padding-bottom: 0.25rem;
    }
    li {
      font-size: 1.2rem;
      a {
        text-decoration: none;
        color: var(--light-shade);
        font-weight: 300;
        transition: color 0.2s ease;
      }
      a:hover {
        color: var(--main);
      }
    }
  }
}

.p-sidebar .p-sidebar-header .p-sidebar-close,
.p-sidebar .p-sidebar-header .p-sidebar-icon {
  color: var(--main);
}

.brand-sublinks {
  li {
    cursor: pointer;
  }
  .p-accordion-toggle-icon {
    position: absolute;
    right: 0;
  }
  .p-accordion .p-accordion-header .p-accordion-header-link,
  .p-accordion
    .p-accordion-header:not(.p-disabled).p-highlight
    .p-accordion-header-link {
    background: var(--dark-shade);
    padding: 0;
    border: none;
  }
  .p-accordion .p-accordion-content {
    background: var(--dark-shade);
    padding: 0 0 0 1rem;
    border: none;
    color: var(--light-shade);
  }
  .p-accordion-header-text {
    font-size: 1.2rem;
    font-weight: 400;
    font-family: "Oswald", sans-serif;
  }
}

@media screen and (max-width: 414px) {
  .mobile-nav {
    width: 100vw;
    .menu-icon {
      font-size: 1.5rem;
    }
    img {
      width: 140px;
      height: 35px;
    }
    #phone-number-container {
      font-size: 0.8rem;
      height: 35px;
      right: 0;
      #phone-number {
        font-size: 0.8rem;
      }
      i {
        font-size: 1rem;
      }
    }
  }
}
</style>