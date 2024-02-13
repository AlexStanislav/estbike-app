<template>
  <div class="models">
    <section class="filter-section">
      <Button
        class="reset-filters"
        icon="pi pi-filter-slash"
        label="Reseteaza filtrele"
        @click="resetFilters()"
      />
      <div class="price-filter">
        <div class="price-inputs">
          <InputText type="text" v-model.number="priceRange" />
          <InputText type="text" v-model.number="maxPrice" />
        </div>
        <div class="slider-container">
          <Slider v-model="priceRange" :min="minPrice" :max="maxPrice" />
        </div>
        <Button label="Filtreaza" @click="filterByPrice()" />
      </div>
      <Accordion :multiple="true" :activeIndex="[0, 1, 2]">
        <AccordionTab header="Marca">
          <ul>
            <li
              v-for="(category, index) in brands()"
              :key="index"
              :header="category"
            >
              <label>
                <RadioButton v-model="brand" :binary="true" :value="category" />
                <span _style="{color: `var(--${category}-color)`}">{{
                  category.toUpperCase()
                }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab header="Tip">
          <ul>
            <li v-for="(type, index) in modelTypes()" :key="index">
              <label>
                <RadioButton v-model="modelType" :binary="true" :value="type" />
                <span>{{ type.toUpperCase() }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab header="Categorie">
          <ul>
            <li v-for="(category, index) in bikeCategories" :key="index">
              <label>
                <RadioButton
                  v-model="categories"
                  :binary="true"
                  :value="category"
                />
                <span>{{ category.toUpperCase() }}</span>
              </label>
            </li>
          </ul>
        </AccordionTab>
      </Accordion>
    </section>
    <section class="bike-section">
      <div class="bike-section-header">
        <span class="header-models-type">{{ headerModels }}</span>
        <span class="header-models-count">{{ allModels.length }} MODELE</span>
        <span
          >Pagina {{ currentPage + 1 }}/{{
            Math.ceil(allModels.length / rowsPerPage)
          }}</span
        >
        <Dropdown
          class="price-filter-dropdown"
          v-model="currentPriceOption"
          :options="priceFilter"
          @change="handlePriceFilterChange"
        />
      </div>
      <div class="bike-section-display">
        <ProductCard
          v-for="(bike, index) in displayedModels"
          :key="index"
          :bike="bike"
        />
      </div>
      <div class="bike-section-footer">
        <Paginator
          :rows="rowsPerPage"
          :totalRecords="allModels.length"
          @page="handlePaginatorChange"
        ></Paginator>
      </div>
    </section>
  </div>
</template>
<script setup>
import Dropdown from "primevue/dropdown";
import { useAppStore } from "@/stores/appStore";
import { onMounted, ref, watch } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import RadioButton from "primevue/radiobutton";
import ProductCard from "@/components/ProductCard.vue";
import Paginator from "primevue/paginator";
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import router from "../router";

const priceFilter = ["Initial", "Pret Crescator", "Pret Decrescator"];
const currentPriceOption = ref("Initial");

const appStore = useAppStore();

const brand = ref([]);
const modelType = ref([]);
const categories = ref([]);
const priceRange = ref(0);
const minPrice = ref(0);
const maxPrice = ref();

const bikeCategories = ref([]);
const models = ref({});
const allModels = ref([]);
const currentPage = ref(0);
const rowsPerPage = ref(10);
const displayedModels = ref([]);
const headerModels = ref("Toate modelele");

onMounted(() => {
  setTimeout(() => {
    models.value = appStore.allBikes;
    allModels.value = getAllModels();
    displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
    priceRange.value = getPriceRange()[0];
    minPrice.value = getPriceRange()[0];
    maxPrice.value = getPriceRange()[1];
    const query = router.currentRoute.value.query;
    const queryType = Object.keys(query)[0];
    const queryValue = query[queryType];

    if (queryType === "modelType") {
      modelType.value = queryValue;
    }
    if (queryType === "brand") {
      brand.value = queryValue;
    }
  }, 300);
});

const handlePriceFilterChange = () => {
  if (currentPriceOption.value === "Pret Crescator") {
    allModels.value = allModels.value.sort((a, b) => a.price - b.price);
    displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
  }
  if (currentPriceOption.value === "Pret Decrescator") {
    allModels.value = allModels.value.sort((a, b) => b.price - a.price);
    displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
  }
  if (currentPriceOption.value === "Initial") {
    allModels.value = getAllModels();
    displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
  }
};

const filterByPrice = () => {
  let filteredModels = [];
  for (const bike of allModels.value) {
    if (bike.price !== "null") {
      if (parseInt(bike.price) >= priceRange.value) {
        filteredModels.push(bike);
      }
    }
  }
  console.log(filteredModels);
  displayedModels.value = filteredModels;
};

const getPriceRange = () => {
  const prices = [];
  for (const bike of allModels.value) {
    if (bike.price !== "null") {
      prices.push(bike.price);
    }
  }

  return [Math.min(...prices), Math.max(...prices)];
};

const resetFilters = () => {
  headerModels.value = "Toate modelele";
  allModels.value = getAllModels();
  displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
  currentPage.value = 0;
  brand.value = [];
  modelType.value = [];
};

function handlePaginatorChange(event) {
  currentPage.value = event.page;
  let startIndex = currentPage.value * rowsPerPage.value;
  let endIndex = startIndex + rowsPerPage.value;
  displayedModels.value = allModels.value.slice(startIndex, endIndex);
}

const modelTypes = () => {
  let types = [];
  for (const bikeType in models.value) {
    if (!types.includes(bikeType.split("_")[1])) {
      types.push(bikeType.split("_")[1]);
    }
  }
  return [...new Set(types)];
};

const brands = () => {
  let brands = [];
  for (const bikeType in models.value) {
    if (!brands.includes(bikeType)) {
      brands.push(bikeType.split("_")[0]);
    }
  }
  return [...new Set(brands)];
};

function getAllModels() {
  const array = [];
  for (const modelIndex in models.value) {
    const bikes = models.value[modelIndex];
    for (const bikeIndex in bikes) {
      const bike = bikes[bikeIndex];
      array.push(bike);
    }
  }

  return array;
}

watch(brand, () => {
  console.log(brand.value);
  if (brand.value.length !== 0) {
    let bikeCategory = brand.value;
    let allCategories = [];
    for (const bikeType in models.value) {
      if (
        bikeCategory.includes(bikeType.split("_")[0])
      ) {
        headerModels.value = bikeCategory.toUpperCase();
        allModels.value = models.value[bikeType];
        displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
        modelType.value = [];
        for (const bike of models.value[bikeType]) {
          allCategories.push(bike.category);
        }
      }
    }

    modelType.value = "bikes";
    bikeCategories.value = [...new Set(allCategories)];
  }
});

watch(modelType, () => {
  if (modelType.value.length !== 0) {
    let bikeType = modelType.value;
    let allTypes = [];
    let allCategories = [];
    for (const bikeIndex in models.value) {
      let bikeIndexArray = bikeIndex.split("_");
      if (brand.value.length === 0) {
        if (bikeIndexArray[1] === bikeType) {
          for (const bike of models.value[bikeIndex]) {
            allTypes.push(bike);
          }
          for (const bike of models.value[bikeIndex]) {
            allCategories.push(bike.category);
          }
        }

        headerModels.value = bikeType.toUpperCase();
        bikeCategories.value = [...new Set(allCategories)];
      } else {
        if (
          bikeIndexArray[1] === bikeType &&
          bikeIndexArray[0] === brand.value
        ) {
          for (const bike of models.value[bikeIndex]) {
            allTypes.push(bike);
          }
          for (const bike of models.value[bikeIndex]) {
            allCategories.push(bike.category);
          }
        }
        headerModels.value = `${brand.value.toUpperCase()} ${bikeType.toUpperCase()}`;
        bikeCategories.value = [...new Set(allCategories)];
      }
    }
    allModels.value = allTypes;
    displayedModels.value = allModels.value.slice(0, rowsPerPage.value);
  }
});

watch(categories, () => {
  let currentCategory = [];
  for (const bike of allModels.value) {
    if (bike.category === categories.value) {
      currentCategory.push(bike);
    }
  }

  displayedModels.value = currentCategory;
});
</script>
<style lang="scss">
.models {
  padding-top: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.filter-section {
  width: 15%;
  height: fit-content;
  border: 1px solid #b3b3b3;
  position: relative;
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
        .p-radiobutton .p-radiobutton-box.p-highlight {
          border-color: var(--dark-accent);
          background: var(--dark-accent);
        }
        .p-radiobutton
          .p-radiobutton-box:not(.p-disabled):not(.p-highlight):hover {
          border-color: var(--dark-accent);
        }
        .p-radiobutton .p-radiobutton-box:not(.p-disabled).p-focus {
          box-shadow: 0 0 0 0rem var(--dark-accent);
        }
      }
    }
  }
}

.price-filter {
  padding: 1rem;
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
  .p-inputtext {
    width: 30%;
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
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
  background: var(--light-accent);
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
    font-size: 1.3rem;
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

.bike-section-display {
  margin-top: 1rem;
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
}

.price-filter-dropdown {
  position: absolute;
  width: 13rem;
  right: 2rem;
  background: transparent;
  border: none;
  span {
    font-size: 1rem;
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

@media screen and (max-width: 412px) {
  .models {
    flex-flow: column wrap;
  }
  .filter-section {
    width: 100%;
  }
  .bike-section {
    width: 100%;
  }
  .bike-section-display {
    justify-content: center;
  }
  .bike-section-header {
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