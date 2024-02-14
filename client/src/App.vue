
<template>
  <div>
    <header>
      <DesktopNav v-if="!showMobileNav" />
      <MobileNav v-if="showMobileNav" />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer-container">
        <div class="footer-wrapper">
          <img src="@/assets/img/logo.svg" alt="" />
          <p>
            Moto Brebu reprezinta pasiunea imensa pentru motociclete si ATV-uri
            concretizata intr-un magazin de motociclete si ATV, echipamente si
            accesorii. Proiectul a fost inceput in primavara...
          </p>
          <span @click="router.push('/despre')">Cititi mai mult</span>
        </div>
      </div>
      <div class="footer-container">
        <h3>Stock-ul Nostru</h3>
        <div class="footer-link-list">
          <ul class="footer-brands">
            <li
              v-for="(brand, index) in appStore.homeBrands"
              :key="index"
              @click="goToBrand(index)"
            >
              <i class="pi pi-angle-double-right"></i>{{ index.toUpperCase() }}
            </li>
          </ul>
          <ul>
            <li
              v-for="modelType in appStore.homeModelTypes"
              :key="modelType"
              @click="goToModel(modelType)"
            >
              <i class="pi pi-angle-double-right"></i
              >{{ modelType.toUpperCase() }}
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-container">
        <h3>Utile</h3>
        <div class="footer-link-list">
          <ul>
            <li><i class="pi pi-angle-double-right"></i>Despre noi</li>
            <li><i class="pi pi-angle-double-right"></i>Rabla</li>
            <li><i class="pi pi-angle-double-right"></i>Termeni si conditii</li>
            <li>
              <i class="pi pi-angle-double-right"></i>Politica de cookie-uri
            </li>
            <li><i class="pi pi-angle-double-right"></i>Contact</li>
          </ul>
          <br />
          <ul class="footer-schedule">
            <li><i class="pi pi-clock"></i>Program</li>
            <li>
              <div>Luni:</div>
              10:00 - 15:00
            </li>
            <li>
              <div>Marti-Vineri:</div>
              09:00 - 18:00
            </li>
            <li>
              <div>Sambata:</div>
              10:00 - 17:00
            </li>
            <li>
              <div>Duminica:</div>
              Inchis
            </li>
          </ul>
          <br />
          <ul>
            <li><i class="pi pi-mobile"></i>0712345678</li>
            <li><i class="pi pi-map-marker"></i>Str. Șelimbăr nr 10, Brebu</li>
            <li><i class="pi pi-envelope"></i>motobrebu@example.com</li>
          </ul>
        </div>
      </div>
      <p class="copyright">Copyright © 2024 motobrebu. All rights reserved.</p>
    </footer>
    <Loader :isVisible="appStore.showPreloader" />
    <Toast />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Loader from "./components/Loader.vue";
import { useAppStore } from "./stores/appStore";
import DesktopNav from "./components/DesktopNav.vue";
import MobileNav from "./components/MobileNav.vue";
import Toast from "primevue/toast";
import router from "./router";

const appStore = useAppStore();
const showMobileNav = ref(false);

async function firstAppLoad(){
  if(appStore.bikesLoaded === false){
    await appStore.getAllBikes();
  }

  appStore.toggleFirstLoadComplete();
  appStore.setHomeBrands()
}


onMounted(async () => {

  await appStore.togglePageLoad(firstAppLoad)

  if (appStore.isMobile() || window.innerWidth <= 1024) {
    showMobileNav.value = true;
  }

  window.onresize = () => {
    if (window.innerWidth <= 1024) {
      showMobileNav.value = true;
    } else {
      showMobileNav.value = false;
    }
  };
});

const goToBrand = (query) => {
  appStore.setModelsFilters({brand: query})
  setTimeout(() => {
    router.push({ path: "/modele" });
    window.scrollTo(0, 0);
  }, 100)
}

// const goToModel = (query) => {
//   router.push({ path: "/modele", query: { modelType: query } });
// };
</script>
<style lang="scss">
.sticky {
  width: 100%;
  left: 0;
  padding: 0;
  top: 0;
  background: var(--dark-shade);
  border-bottom: 3px solid var(--main);
  img {
    margin-right: 4rem;
  }
  #header-decoration {
    display: none;
  }
  nav {
    border: none;
  }
  .p-input-icon-left {
    position: absolute;
    right: 0;
    filter: none;
  }
  .p-inputtext {
    background: var(--main);
    height: 50px;
    margin: 0;
  }
  i {
    color: var(--dark-shade);
  }
  #phone-number-container {
    border: none;
    right: 17%;
    position: absolute;
  }
}

main {
  width: 100%;
}

footer {
  width: 100%;
  background: var(--dark-shade);
  color: var(--light-shade);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  position: relative;
  padding: 5rem 0 5rem 0;
  .copyright {
    margin: 0;
    padding: 0.5rem;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 3;
    background: var(--dark);
  }
}

.footer-wrapper {
  width: 50%;
}

.footer-container {
  width: 30%;
  font-size: 1.2rem;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  span {
    border-bottom: 1px solid white;
    cursor: pointer;
  }
  p {
    font-size: 0.8rem;
    text-align: justify;
    text-justify: distribute;
  }
  h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    font-family: "Oswald", sans-serif;
    font-weight: 400;
  }
}

.footer-link-list {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    font-family: "Oswald", sans-serif;
    font-weight: 300;
    i {
      margin-right: 0.5rem;
    }
  }
}

.footer-brands {
  display: flex;
  flex-flow: column wrap;
  height: 80%;
  cursor: pointer;
  li{
    margin-right: 2rem;
  }
}

.footer-schedule {
  div {
    display: inline-block;
    width: 6rem;
  }
}

@media screen and (max-width: 414px) {
  body {
    overflow-x: hidden;
  }
  .footer-container {
    width: 95%;
    margin-bottom: 5rem;
  }
  .footer-brands{
    margin-left: -5rem !important;
  }
}
</style>