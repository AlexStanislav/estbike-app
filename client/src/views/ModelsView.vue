<template>
  <div class="models">
    <section class="filter-section">
      <Button class="filters-button reset-filters" icon="pi pi-filter-slash" label="Reseteaza filtrele"
        @click="methods.resetFilters()" />
      <Button class="filters-button apply-filters" icon="pi pi-filter" label="Filtreaza"
        @click="methods.applyFilters()" />
      <Accordion :multiple="true" :activeIndex="filtersActiveIndex">
        <!-- <AccordionTab header="Tip Vehicul">
          <ul class="type-tab">
            <li v-for="(type, index) of typeFilter" :key="index">
              <label>
                <RadioButton
                  v-model="modelType"
                  :binary="true"
                  :value="type.value"
                />
                <span>{{ type.label.toUpperCase() }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab> -->
        <AccordionTab :disabled="brandFilter.length === 0" header="Producator">
          <ul class="brand-tab">
            <li v-for="(brand, index) of brandFilter" :key="index">
              <label>
                <RadioButton v-model="modelBrand" :binary="true" :value="brand" />
                <span>{{
                  brand.includes("_")
                    ? brand.replace("_", " ").toUpperCase()
                    : brand.toUpperCase()
                }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab :disabled="motorFilters.length === 0" header="Capacitate Cilindrica">
          <ul class="category-tab">
            <li v-for="(info, index) in motorFilters" :key="index" :header="info">
              <label>
                <RadioButton v-model="modelMotor" :binary="true" :value="info" />
                <span>{{ info.includes("+") ? info : `${info}cc` }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab header="Omologare" :disabled="filters.type !== 'atv' && filters.type !== 'ssv'">
          <ul class="omologare-tab">
            <li>
              <label>
                <RadioButton v-model="modelOmologare" :binary="true" value="l7e" />
                <span>Euro5</span>
              </label>
            </li>
            <li>
              <label>
                <RadioButton v-model="modelOmologare" :binary="true" value="t3b" />
                <span>T3</span>
              </label>
            </li>
            <li>
              <label>
                <RadioButton v-model="modelOmologare" :binary="true" value="neinmatriculabil" />
                <span>Neinmatriculabil</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab :disabled="categoriesFilter.length === 0" header="Categorie">
          <ul class="category-tab">
            <li v-for="(category, index) in categoriesFilter" :key="index" :header="category"
              @click="toggleAccordion(category)">
              <label>
                <RadioButton v-model="modelCategory" :binary="true" :value="category" />
                <span>{{ category.toUpperCase() }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab :disabled="licenseFilter.length === 0 || disableLicenseTab" header="Categorie Permis">
          <ul class="license-tab">
            <li v-for="(license, index) of licenseFilter" :key="index">
              <label>
                <RadioButton v-model="modelLicense" :binary="true" :value="license" />
                <span>{{ license.toUpperCase() }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <!-- <AccordionTab :disabled="yearsFilter.length === 0" header="An">
          <ul>
            <li
              v-for="(year, index) in yearsFilter"
              :key="index"
              :header="year"
            >
              <label>
                <RadioButton v-model="modelYear" :binary="true" :value="year" />
                <span>{{ year }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab> -->
        <AccordionTab :disabled="displayedModels.length === 0" header="Pret">
          <div class="price-filter">
            <div class="price-inputs">
              <InputText class="min-price-input" type="text" v-model.number="priceRange[0]" :placeholder="minPrice"
                readonly />
              <InputText class="max-price-input" type="text" v-model.number="priceRange[1]" :placeholder="maxPrice"
                readonly />
            </div>
            <div class="slider-container">
              <Slider v-model="priceRange" :min="minPrice" :max="maxPrice" range :step="100" />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </section>
    <section class="bike-section">
      <div class="mobile-vehicle-reset" v-if="appStore.isMobile() && displayedModels.length !== 0">
        <Button label="Alege alt tip de vehicul" class="change-vehicle" icon="pi pi-filter-slash"
          @click="methods.resetFilters()" />
      </div>
      <section class="bike-section-header" v-if="displayedModels.length > 0">
        <span class="header-models-count">{{ numberOfModels }} MODELE</span>
        <span>Pagina {{ currentPage + 1 }}/{{
          Math.ceil(numberOfModels / rowsPerPage)
        }}</span>
        <span class="price-filter-dropdown-container">
          <span class="price-filter-label">Aranjeaza dupa pret:</span>
          <Dropdown class="price-filter-dropdown" v-model="currentPriceOption" :options="priceFilter"
            @change="methods.handlePriceFilterChange" />
        </span>
      </section>
      <section class="bike-section-display" v-if="modelsLoaded">
        <ProductCard v-for="(bike, index) in displayedModels" :key="index" :bike="bike" />
      </section>
      <section class="bike-section-empty" v-else>
        <Skeleton animation="wave" class="mb-2" width="17rem" height="25rem" v-for="i in 11" :key="i"></Skeleton>
      </section>
      <div class="bike-section-no-match" v-if="displayedModels.length === 0 && Object.keys(filters).length > 0">
        <span>Nu au fost gasite vehicule corespunzatoare filtrelor</span>
      </div>
      <section class="vehicle-type-selection" v-if="displayedModels.length === 0 && Object.keys(filters).length === 0">
        <h2>Va rugam alegeti tipul de vehicul dorit pentru vizualizare</h2>

        <div class="vehicle-card-container">
          <div class="vehicle-type-card" v-for="vehicleType in typeFilter" :key="vehicleType"
            @click="methods.handleVehicleTypeChange(vehicleType)">
            <div class="clip-path-bg"></div>
            <h3>{{ vehicleType.label.toUpperCase() }}</h3>
          </div>
        </div>
      </section>
      <div class="bike-section-footer" v-if="displayedModels.length > 0">
        <Paginator ref="paginatorRef" :rows="rowsPerPage" :totalRecords="allModels.length"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink JumpToPageDropdown"
          @page="handlePaginatorChange">
        </Paginator>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useAppStore } from "@/stores/appStore";
import { onMounted, ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import RadioButton from "primevue/radiobutton";
import ProductCard from "@/components/ProductCard.vue";
import Paginator from "primevue/paginator";
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";
import { storeToRefs } from "pinia";

const numberOfModels = ref(0);

const priceFilter = ["Initial", "Crescator", "Decrescator"];
const currentPriceOption = ref("Initial");

const filtersActiveIndex = ref([]);

const paginatorRef = ref(null);
const modelsLoaded = ref(false);

const appStore = useAppStore();
const allModels = ref([]);
const displayedModels = ref([]);
const currentPage = ref(0);
const rowsPerPage = ref(15);
const priceRange = ref([0, 100000]);
const minPrice = ref(0);
const maxPrice = ref();

const yearsFilter = ref([]);
const modelYear = ref([]);

const categoriesFilter = ref([]);
const modelCategory = ref([]);

const motorFilters = ref([]);
const modelMotor = ref([]);

const licenseFilter = ref([]);
const modelLicense = ref([]);

const omologareFilter = ref([]);
const modelOmologare = ref([]);

const brandFilter = ref([]);
const modelBrand = ref([]);

const typeFilter = ref([]);
const modelType = ref([]);

const brandCount = ref([]);

const filters = ref({});
const modelFilters = storeToRefs(appStore).modelsFilters;
const queryVehicleType = storeToRefs(appStore).queryVehicleType;

const initialVehicleTypeSelected = ref(false);
const disableLicenseTab = ref(false);
const toggleAccordion = function (category) {
  if (category.toLowerCase().includes("children") || category.toLowerCase().includes("cross")) {
    filters.value.permis = null;
    disableLicenseTab.value = true
    filtersActiveIndex.value = filtersActiveIndex.value.filter((item) => item !== 4);
  } else {
    disableLicenseTab.value = false
  }
};
const methods = {
  getModelsNumber: function (filters) {
    const models = this.getAllModels();
    const filteredModels = models.filter((model) => {
      const yearMatch =
        !filters.main_year || filters.main_year === model.main_year;
      const categoryMatch =
        !filters.category || filters.category === model.category;

      const motorMatch =
        !filters.capacitate ||
        (parseInt(model.capacitate) >= filters.capacitate - 25 &&
          parseInt(model.capacitate) <= filters.capacitate + 25);

      const licenseMatch =
        !filters.permis || model.permis.includes(filters.permis);

      const brandMatch = !filters.brand || filters.brand === model.brand;

      const typeMatch =
        !filters.type || filters.type === model.vehicle_type.toLowerCase();

      const priceMatch =
        !filters.priceRange ||
        (model.price >= filters.priceRange[0] &&
          model.price <= filters.priceRange[1]);

      if (priceMatch) {
        return (
          yearMatch &&
          categoryMatch &&
          motorMatch &&
          licenseMatch &&
          brandMatch &&
          priceMatch &&
          typeMatch
        );
      } else {
        return (
          yearMatch &&
          categoryMatch &&
          motorMatch &&
          licenseMatch &&
          brandMatch &&
          typeMatch
        );
      }
    });

    return filteredModels.length;
  },
  getAllModels: function () {
    const allBikes = appStore.allBikes;
    // const swm = allBikes["swm_bikes"];
    // const filteredSwm = swm
    //   .map((bike) => {
    //     const { colors, ...rest } = bike;
    //     const bikeNameArr = bike.bike_name.split("-")
    //     let bikeName = bike.bike_name;
    //     if(colors){
    //       if(bikeNameArr.length >= 3){
    //         bikeName = bikeNameArr.slice(0, 2).join("-")
    //       } else{
    //         bikeName = bikeNameArr.slice(0, 3).join("-")
    //       }
    //     }
    //     return { ...rest, bike_name: bikeName, colors: colors };
    //   })
    //   .filter(
    //     (bike, index, self) =>
    //       index === self.findIndex((t) => t.bike_name === bike.bike_name)
    //   );

    // allBikes["swm_bikes"] = filteredSwm;
    const models = Object.values(allBikes).flat();
    const finalModels = models.filter((model) => model.display_model);
    return finalModels;
  },
  getYears: function (brand = null) {
    const years = allModels.value
      .map((bike) => {
        if (brand !== null && bike.brand === brand) {
          return bike.main_year;
        }
        if (brand === null) {
          return bike.main_year;
        }
      })
      .filter(
        (value, index, self) =>
          value !== null &&
          value !== "" &&
          value !== undefined &&
          self.indexOf(value) === index
      )
      .sort((a, b) => b - a);
    return years;
  },
  getCategories: function (brand = null) {
    const categories = [];
    let category;
    for (const bike of allModels.value) {
      if (brand !== null && bike.brand === brand) {
        category = bike.category;
        if (
          category !== null &&
          category !== undefined &&
          category !== "" &&
          category !== "null" &&
          (typeof category !== "object" || Object.keys(category).length !== 0)
        ) {
          categories.push(category);
        }
      }
      if (brand === null) {
        category = bike.category;
        if (
          category !== null &&
          category !== undefined &&
          category !== "" &&
          category !== "null" &&
          (typeof category !== "object" || Object.keys(category).length !== 0)
        ) {
          categories.push(category);
        }
      }
    }

    const uniqueCategories = [...new Set(categories)];

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  },
  getMotorInfo: function (brand = null) {
    let motorCapacities = [];
    let capacity;
    for (const model of allModels.value) {
      if (brand !== null && model.brand === brand) {
        if (model.vehicle_type === filters.value.type) {
          capacity = model.capacitate;
          if (capacity !== null) {
            motorCapacities.push(capacity);
          }
        }
      }
      if (brand === null) {
        capacity = model.capacitate;
        if (capacity !== null) {
          motorCapacities.push(capacity);
        }
      }
    }

    const roundToNearestMultiple = function (values, step) {
      values.sort((a, b) => a - b);
      return values.map((value) => Math.round(value / step) * step);
    };

    for (let motorIndex in motorCapacities) {
      const motor = motorCapacities[motorIndex];
      if (motor < 50) {
        motorCapacities[motorIndex] = (Math.round(motor / 25) * 25).toString();
      }
      if (motor >= 50 && motor < 125) {
        motorCapacities[motorIndex] = "50";
      }
      if (motor >= 120 && motor < 200) {
        motorCapacities[motorIndex] = "125";
      }
      if (motor >= 200 && motor <= 500) {
        motorCapacities[motorIndex] = "200-500";
      }
      if (motor > 500 && motor <= 800) {
        motorCapacities[motorIndex] = "500-800";
      }
      if (motor > 800) {
        motorCapacities[motorIndex] = "800+ ";
      }
    }

    const uniqueRoundedMotors = [
      ...new Set([...new Set(motorCapacities)]),
    ].sort((a, b) => {
      const aValue = parseInt(a.split("-")[0]);
      const bValue = parseInt(b.split("-")[0]);
      return aValue - bValue;
    });

    return uniqueRoundedMotors;
  },
  filterModels: function (filters) {
    const models = this.getAllModels();
    const filteredModels = models.filter((model) => {
      const yearMatch =
        !filters.main_year || filters.main_year === model.main_year;
      const categoryMatch =
        !filters.category || filters.category === model.category;
      let motorMatch = true;
      if (filters.capacitate) {
        if (filters.capacitate.includes("-")) {
          motorMatch =
            parseInt(model.capacitate) >=
            parseInt(filters.capacitate.split("-")[0]) &&
            parseInt(model.capacitate) <=
            parseInt(filters.capacitate.split("-")[1]);
        } else if (filters.capacitate.includes("+")) {
          motorMatch = parseInt(model.capacitate) >= 800;
        } else {
          if (parseInt(filters.capacitate) === 50) {
            motorMatch =
              parseInt(model.capacitate) >= 50 &&
              parseInt(model.capacitate) < 100;
          }
          if (parseInt(filters.capacitate) === 125) {
            motorMatch =
              parseInt(model.capacitate) >= 120 &&
              parseInt(model.capacitate) < 200;
          }
        }
      }

      const omologareMatch =
        !filters.omologare ||
        (model.omologare !== null &&
          model.omologare.includes(filters.omologare));

      const licenseMatch =
        !filters.permis || model.permis.includes(filters.permis);

      const brandMatch = !filters.brand || filters.brand === model.brand;

      const typeMatch =
        !filters.type || filters.type === model.vehicle_type.toLowerCase();


      let priceMatch = true;
      if (Array.isArray(model.price)) {
        let price = parseInt(model.price[0].replace('.', ''))
        priceMatch = !filters.priceRange || (price >= filters.priceRange[0] && price <= filters.priceRange[1]);
      } else {
        priceMatch =
          !filters.priceRange ||
          (model.price >= filters.priceRange[0] &&
            model.price <= filters.priceRange[1]);
      }

      return (
        yearMatch &&
        categoryMatch &&
        motorMatch &&
        omologareMatch &&
        licenseMatch &&
        brandMatch &&
        priceMatch &&
        typeMatch
      );

      // if (priceMatch) {
      //   return (
      //     yearMatch &&
      //     categoryMatch &&
      //     motorMatch &&
      //     omologareMatch &&
      //     licenseMatch &&
      //     brandMatch &&
      //     priceMatch &&
      //     typeMatch
      //   );
      // } else {
      //   return (
      //     yearMatch &&
      //     categoryMatch &&
      //     motorMatch &&
      //     omologareMatch &&
      //     licenseMatch &&
      //     brandMatch &&
      //     typeMatch
      //   );
      // }
    });

    allModels.value = filteredModels;

    numberOfModels.value = allModels.value.length;
    const startIndex = 0;
    const endIndex = startIndex + rowsPerPage.value;
    filteredModels.sort((a, b) => a.price - b.price);
    displayedModels.value = filteredModels.slice(startIndex, endIndex);
  },
  applyFilters: function (value = null) {
    modelsLoaded.value = false;
    if(value) {
      this.filterModels(value);
    } else{
      this.filterModels(filters.value);
    }
    setTimeout(() => {
      modelsLoaded.value = true;
    }, 1000);
  },
  resetFilters: function () {
    filtersActiveIndex.value = [];
    modelYear.value = [];
    modelCategory.value = [];
    modelMotor.value = [];
    modelLicense.value = [];
    modelBrand.value = [];
    modelType.value = [];
    modelsLoaded.value = false;
    initialVehicleTypeSelected.value = false;

    brandFilter.value = [];
    motorFilters.value = [];
    categoriesFilter.value = [];
    licenseFilter.value = [];
    yearsFilter.value = [];
    setTimeout(() => {
      displayedModels.value = [];
      priceRange.value = methods.getPriceRange();
      minPrice.value = methods.getPriceRange()[0];
      maxPrice.value = methods.getPriceRange()[1];
      appStore.clearModelsFilters();
    }, 50);

    localStorage.removeItem("modelBrand");
    localStorage.removeItem("modelType");

    setTimeout(() => {
      modelsLoaded.value = true;
      filters.value = {};
    }, 1000);
  },
  handlePriceFilterChange: function () {
    if (currentPriceOption.value === "Crescator") {
      allModels.value = allModels.value.sort((a, b) => a.price - b.price);
      displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
    }
    if (currentPriceOption.value === "Decrescator") {
      allModels.value = allModels.value.sort((a, b) => b.price - a.price);
      displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
    }
    if (currentPriceOption.value === "Initial") {
      allModels.value = methods.getAllModels();
      methods.applyFilters();
      displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
    }
  },
  getPriceRange: function (brand = null) {
    const prices = allModels.value
      .map(bike => Array.isArray(bike.price) ? bike.price[0] : bike.price)
      .filter(price => price !== null && !price.includes('.'))
      .map(price => price.replace('.', ''));

    return brand
      ? [Math.min(...prices.filter(price => price !== null && bike.brand === brand)),
      Math.max(...prices.filter(price => price !== null && bike.brand === brand))]
      : [Math.min(...prices), Math.max(...prices)];
  },
  getLicenseFilters: function (brand = null) {
    const licenseCategories = [];
    const allLicenses = [];
    const regexMatch = /[{}""'']/g;
    for (const model of allModels.value) {
      if (brand !== null && model.brand === brand) {
        if (
          model.permis !== null &&
          model.permis !== "null" &&
          model.permis.length > 0
        ) {
          if (model.permis[0].match(regexMatch)) {
            model.permis = model.permis[0].replace(regexMatch, "").split(",");
          }

          licenseCategories.push(model.permis);
        }
      }
      if (brand === null) {
        if (
          model.permis !== null &&
          model.permis !== "null" &&
          model.permis.length > 0
        ) {
          if (model.permis[0].match(regexMatch)) {
            model.permis = model.permis[0].replace(regexMatch, "").split(",");
          }

          licenseCategories.push(model.permis);
        }
      }
    }

    for (const licenseArray of licenseCategories) {
      allLicenses.push(...licenseArray);
    }

    const uniqueLicenses = [...new Set(allLicenses)];
    uniqueLicenses.sort((a, b) => a.localeCompare(b));

    const finalArray = uniqueLicenses.filter((license) => license !== "");

    return finalArray;
  },
  getBrands: function (models = []) {
    const modelsToFilter = models.length > 0 ? models : appStore.allBikes;
    let brands = [];
    for (const bike of modelsToFilter) {
      if (!brands.includes(bike.brand)) {
        if(bike.brand !== 'husqvarna' && bike.brand !== 'gasgas' && bike.brand !== 'ktm'){
          brands.push(bike.brand);
        }
      }
    }

    brands.sort((a, b) => a.localeCompare(b));

    this.getBrandNumbers();

    return [...new Set(brands)];
  },
  getBikeType: function () {
    let bikeType = [];
    for (const bike of allModels.value) {
      if (!bikeType.includes(bike)) {
        if (bike.vehicle_type.toLowerCase() === "bikes") {
          bikeType.push({ label: "motociclete", value: bike.vehicle_type });
        }

        if (bike.vehicle_type.toLowerCase() === "scooters") {
          bikeType.push({
            label: "scutere",
            value: bike.vehicle_type.toLowerCase(),
          });
        }

        if (bike.vehicle_type.toLowerCase() === "atv") {
          bikeType.push({
            label: "atv",
            value: bike.vehicle_type.toLowerCase(),
          });
        }
        if (bike.vehicle_type.toLowerCase() === "ssv") {
          bikeType.push({
            label: "ssv",
            value: bike.vehicle_type.toLowerCase(),
          });
        }
        if (bike.vehicle_type.toLowerCase() === "snowmobiles") {
          bikeType.push({
            label: "snowmobile",
            value: bike.vehicle_type.toLowerCase(),
          });
        }
      }
    }

    const removeDuplicateObjects = function (array, key) {
      return array.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t[key] === obj[key])
      );
    };

    return removeDuplicateObjects(bikeType, "value");
  },
  handleVehicleTypeChange: function (vehicleType) {
    const typeValue = vehicleType.value ? vehicleType.value : vehicleType;

    if(!localStorage.getItem("modelType")){
      localStorage.setItem("modelType", typeValue)
    }

    console.log("typeValue", typeValue)

    filtersActiveIndex.value = [0];
    modelType.value = typeValue;
    modelsLoaded.value = false;
    setTimeout(() => {
      this.applyFilters();
      this.setFilters();
      modelsLoaded.value = true;
      numberOfModels.value = methods.getModelsNumber(filters.value);
    }, 300);
  },
  setFilters: function (models = null) {
    const filterModels = models !== null ? models : allModels.value;
    brandFilter.value = this.getBrands(filterModels);
    motorFilters.value = this.getMotorInfo();
    licenseFilter.value = this.getLicenseFilters();
    categoriesFilter.value = this.getCategories();
    yearsFilter.value = this.getYears();
    priceRange.value = methods.getPriceRange();
    minPrice.value = priceRange.value[0];
    maxPrice.value = priceRange.value[1];
  },
  setBrandFilters: function (brand) {
    for (const index in filters.value) {
      if (index !== "type" && index !== "brand" && index !== "priceRange") {
        filters.value[index] = null;
      }
    }
    allModels.value = methods.getAllModels();
    motorFilters.value = this.getMotorInfo(brand);
    categoriesFilter.value = this.getCategories(brand);
    yearsFilter.value = this.getYears(brand);
    licenseFilter.value = this.getLicenseFilters(brand);
  },
  getBrandNumbers: function () {
    const brandNumbers = {};
    for (const model of allModels.value) {
      if (!brandNumbers[model.brand]) {
        brandNumbers[model.brand] = 1;
      } else {
        brandNumbers[model.brand] += 1;
      }
    }
    brandCount.value = brandNumbers;
  },
};

function handlePaginatorChange(event) {
  currentPage.value = event.page;
  let startIndex = currentPage.value * rowsPerPage.value;
  let endIndex = startIndex + rowsPerPage.value;
  displayedModels.value = allModels.value.slice(startIndex, endIndex);
  window.scrollTo(0, 0);
}

watch(
  () => modelYear.value,
  () => {
    filters.value.main_year = modelYear.value;
  }
);

watch(
  () => modelCategory.value,
  () => {
    filters.value.category = modelCategory.value;
  }
);

watch(
  () => modelMotor.value,
  () => {
    filters.value.capacitate = modelMotor.value;
  }
);

watch(
  () => modelOmologare.value,
  () => {
    filters.value.omologare = modelOmologare.value;
  }
);

watch(
  () => modelLicense.value,
  () => {
    filters.value.permis = modelLicense.value;
  }
);


function removeKeyFromObject(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

watch(
  () => modelBrand.value,
  () => {
    if (modelBrand.value !== null) {
      filters.value.brand = modelBrand.value;
      methods.setBrandFilters(modelBrand.value);
      filters.value = removeKeyFromObject(filters.value, 'priceRange');
      methods.applyFilters();
      modelOmologare.value = null;
      modelLicense.value = null;
      modelMotor.value = null;

      localStorage.setItem("modelBrand", modelBrand.value);
    }
  }
);

watch(
  () => modelType.value,
  () => {
    filters.value.type = modelType.value;
  }
);

watch(modelFilters, () => {
  if (modelFilters.value.length > 0) {
    appStore.togglePreloader(false);
    filterByQuery();
  }
});

watch(queryVehicleType, () => {
  if (queryVehicleType.value) {
    methods.handleVehicleTypeChange(queryVehicleType);
    const tempFilters = { ...filters.value };
    filters.value = {};
    for (const filter in filters.value) {
      if (filter === "type") {
        filters.value["type"] = tempFilters["type"];
      }
    }
    modelBrand.value = null;
  }
});

watch(
  () => priceRange.value,
  () => {
    filters.value.priceRange = priceRange.value;
  }
);

onMounted(async () => {
  if (appStore.showPreloader) {
    await appStore.togglePreloader(false);
  }
  await appStore.togglePreloader(true);
  await appStore.getAllBikes();
  setTimeout(() => {
    appStore.togglePreloader(false);
  }, 1000);
  if (appStore.allBikes) {
    allModels.value = methods.getAllModels();
    typeFilter.value = methods.getBikeType();

    typeFilter.value.sort((a, b) => a.label.localeCompare(b.label));

    setTimeout(() => {
      modelsLoaded.value = true;
    }, 1000);

    if (modelFilters.value.length > 0) {
      filterByQuery();
    }

    if (queryVehicleType.value) {
      methods.handleVehicleTypeChange(queryVehicleType);
    }

    setTimeout(() => {
      const header = document.querySelector(".desktop-nav");
      if (header !== null) {
        header.classList.add("sticky");
      }
    }, 500);

    if(localStorage.getItem("modelBrand") || localStorage.getItem("modelType")) {
      const storageBrand = localStorage.getItem("modelBrand");
      const storageType = localStorage.getItem("modelType");
      methods.handleVehicleTypeChange(storageType)

      setTimeout(() => {
        modelBrand.value = storageBrand;
      }, 300);
    }
}
});

const filterByQuery = () => {
  const filters = modelFilters.value[0];
  modelBrand.value = filters.brand;
  if (filters.type !== undefined) {
    modelType.value = filters.type;
  }
  setTimeout(() => {
    methods.applyFilters();
    methods.setFilters();
  }, 300);
};
</script>
<style lang="scss">
.models {
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.filter-section {
  width: 13%;
  height: fit-content;
  border: 1px solid #b3b3b3;
  position: relative;
  margin-left: 2rem;
  justify-self: flex-start;

  .p-accordion-header {
    width: 100%;
    background: #e8e8e8;
  }

  .p-accordion-header-link {
    width: fit-content;
    background: transparent;
    border: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-family: "Oswald", sans-serif;
      padding: 0.5rem 0;

      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--dark-shade);
        font-size: 0.9rem;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        .p-radiobutton-box {
          border-color: transparent;
          color: #b3b3b3;
        }

        .p-radiobutton-box::after {
          content: " ";
          width: 40px;
          height: 15px;
          background: #b3b3b3;
          clip-path: polygon(75% 0%,
              100% 50%,
              75% 100%,
              0% 100%,
              25% 50%,
              0% 0%);
        }

        .p-radiobutton .p-radiobutton-box.p-highlight {
          border-color: transparent;
          background: transparent;

          &::after {
            content: " ";
            width: 40px;
            height: 15px;
            background: var(--dark-accent);
            clip-path: polygon(75% 0%,
                100% 50%,
                75% 100%,
                0% 100%,
                25% 50%,
                0% 0%);
          }
        }

        .p-radiobutton .p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover {
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

.category-tab {
  height: fit-content;
  overflow: auto;
}

.price-filter {
  padding: 1rem;
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;

  .p-inputtext {
    width: 50%;
  }

  .slider-container {
    width: 100%;
  }

  .price-inputs {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
}

.reset-filters {
  width: 100%;
  border-radius: 0;
  background: var(--light-accent);
  border: none;
}

.apply-filters {
  width: 100%;
  border-radius: 0;
  background: var(--warning);
  border: none;
}

.bike-section {
  width: 82%;
  margin-right: 1rem;
  margin-bottom: 2rem;
}

.bike-section-header {
  width: 100%;
  height: 50px;
  background: #e3e3e3;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 3;
  position: relative;

  span {
    font-size: 1rem;
  }
}

.price-filter-dropdown-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: absolute;
  align-items: center;
  right: 2rem;

  .price-filter-label {
    font-size: 1.2rem;
  }

  .price-filter-dropdown {
    width: 13rem;
    right: 2rem;
    top: 0.1rem;
    background: transparent;
    border: none;

    span {
      font-size: 1rem;
    }
  }
}

.bike-section-footer {
  position: relative;
  width: 100%;
  background: #dedede;
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  .p-paginator {
    background: transparent;
  }

  .p-paginator .p-paginator-pages .p-paginator-page {
    min-width: 2rem;
    height: 2rem;
  }
}

.vehicle-type-selection {
  display: flex;
  flex-flow: column;
  align-items: center;

  h2 {
    text-align: center;
  }
}

.vehicle-card-container {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}

.vehicle-type-card {
  width: 15rem;
  text-align: center;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  position: relative;

  .clip-path-bg {
    width: 15rem;
    height: 100%;
    position: absolute;
    background: var(--dark-shade);
    z-index: -1;
    left: 0;
    top: 0;
    clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 10% 100%, 0% 50%, 10% 0%);
  }
}

.vehicle-type-card:hover {
  transform: translate(-2px, -2px);
  filter: drop-shadow(4px 4px 0px var(--main));
}

.mobile-vehicle-reset {
  display: flex;
  justify-content: center;
}

.change-vehicle {
  width: 90%;
  background: var(--dark-shade);
  border: none;
  color: #fff;
  margin-top: 1rem;
}

.bike-section-display {
  margin-top: 1rem;
  height: 95%vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row wrap;
  gap: 2rem;
}

.bike-section-empty {
  margin-top: 1rem;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row wrap;
  gap: 2rem;
}

.bike-section-no-match {
  span {
    display: block;
    width: 100%;
    font-size: 1.5rem;
    font-family: "Oswald";
    text-align: center;
  }
}

@media screen and (max-width: 1366px) {
  .filter-section {
    width: 20%;
    margin-right: 2rem;
  }
}

@media screen and (max-width: 1024px) {
  .models {
    gap: 0.5rem;
  }

  .filter-section {
    width: 20%;
  }

  .price-filter {
    .p-inputtext {
      width: 100%;
    }

    .price-inputs {
      flex-flow: column wrap;
    }
  }

  .bike-section-display {
    gap: 0.5rem;
  }
}

@media screen and (max-width: 414px) {
  .models {
    flex-flow: column wrap;
  }

  .filter-section {
    width: 80%;
  }

  .bike-section {
    width: 100%;
  }

  .bike-section-display {
    justify-content: center;
  }

  .bike-section-header {

    .price-filter-label,
    .header-models-count,
    .header-models-type {
      display: none;
    }

    span {
      font-size: 1rem;
    }
  }

  .bike-section-footer nav {
    width: 100%;

    .p-paginator {
      padding: 0;
    }
  }
}
</style>