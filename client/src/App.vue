
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
          <img lazy src="@/assets/img/logo/logo-inverted.png" alt="" />
          <p>
            Brebu Moto reprezinta pasiunea imensa pentru motociclete si ATV-uri
            concretizata intr-un magazin de motociclete si ATV, echipamente si
            accesorii. Proiectul a fost inceput in primavara...
          </p>
          <span @click="router.push('/despre')">Cititi mai mult</span>
          <p>&nbsp;</p>
          <p style="color: var(--main);">
            Toate informatiile au rol de prezentare, iar BrebuMoto nu raspunde
            de erori de afisaj.
          </p>
        </div>
      </div>
      <div class="footer-container">
        <h3>Stock-ul Nostru</h3>
        <div class="footer-link-list">
          <ul class="footer-brands">
            <li
              v-for="brand in Object.keys(appStore.homeBrands).sort((a, b) =>
                a.localeCompare(b)
              )"
              :key="brand"
              @click="goToBrand(brand)"
            >
              <i class="pi pi-angle-double-right"></i>{{ brand.toUpperCase().replace(/_/g, " ") }}
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
            <li>
              <i class="pi pi-angle-double-right"></i
              ><router-link to="/despre">Despre noi</router-link>
            </li>
            <!-- <li>
              <i class="pi pi-angle-double-right"></i
              ><router-link to="/rabla">Rabla</router-link>
            </li> -->
            <li>
              <i class="pi pi-angle-double-right"></i
              ><router-link to="/termeni">Termeni si conditii</router-link>
            </li>
            <li>
              <i class="pi pi-angle-double-right"></i
              ><router-link to="/cookies">Politica de cookie-uri</router-link>
            </li>
            <li>
              <i class="pi pi-angle-double-right"></i
              ><router-link to="/contact">Contact</router-link>
            </li>
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
            <li><i class="pi pi-mobile"></i>0774515065</li>
            <li><i class="pi pi-map-marker"></i>Str. Șelimbăr nr 10, Brebu</li>
            <li><i class="pi pi-envelope"></i>office@brebumoto.ro</li>
          </ul>
        </div>
      </div>
      <p class="copyright">Copyright © {{ new Date().getFullYear() }} brebumoto. Toate drepturile rezervate.</p>
    </footer>
    <Loader :isVisible="appStore.showPreloader" />
    <Toast />
    <ScrollTop></ScrollTop>
    <Dialog class="gdpr-dialog" modal v-model:visible="appStore.showGDPRDialog">
      <div class="gdpr">
        <p>
          Pentru buna functionare a site-ului, folosim cookie-uri sau alte
          technologii similare. Informatiile colectate de aceste technologii nu
          contin date personale sau date care pot fii folosite pentru a
          identifica utilizatorii. Prin continuare utilizarii acestui site, va
          exprimati acordul cu utilizarea acestor technologii.
        </p>
        <p>
          Puteti citi mai multe despre cookie-uri si termenii de utilizare
          <router-link to="/cookies">aici</router-link> si respectiv
          <router-link to="/termeni">aici</router-link>
        </p>
        <Button @click="acceptGDPR()" severity="danger">Am inteles</Button>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Loader from "./components/Loader.vue";
import { useAppStore } from "./stores/appStore";
import DesktopNav from "./components/DesktopNav.vue";
import MobileNav from "./components/MobileNav.vue";
import Toast from "primevue/toast";
import router from "./router";
import ScrollTop from "primevue/scrolltop";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const appStore = useAppStore();
const showMobileNav = ref(false);

async function firstAppLoad() {
  if (appStore.bikesLoaded === false) {
    await appStore.getAllBikes();
  }

  await appStore.toggleFirstLoadComplete();
  await appStore.setHomeBrands();
}

onMounted(async () => {
  await appStore.togglePageLoad(firstAppLoad);

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

onUnmounted(() => {
  localStorage.removeItem("modelBrand")
  localStorage.removeItem("modelType")
});

const goToBrand = (query) => {
  appStore.togglePreloader(true);
  appStore.setModelsFilters({ brand: query });
  setTimeout(() => {
    router.push({ path: "/vehicule" });
    window.scrollTo(0, 0);
  }, 100);
};

function acceptGDPR() {
  localStorage.setItem("gdpr", true);
  appStore.toggleGDPRDialog(false);
}
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
  img{
    width: 198px;
  }
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
  a {
    color: var(--light-shade);
    text-decoration: none;
  }
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
  li {
    margin-right: 2rem;
  }
}

.footer-schedule {
  div {
    display: inline-block;
    width: 6rem;
  }
}

.gdpr-dialog {
  width: 40%;
  .p-dialog-content {
    background: var(--dark-shade);
    color: var(--light-shade);
    border-radius: 5px;
    p {
      font-size: 1.2rem;
    }
  }
  .p-dialog-header,
  .p-dialog-footer {
    display: none;
  }
}

@media screen and (max-height: 414px) {
  .footer-container {
    font-size: 0.8em;
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
  .footer-brands {
    margin-left: -5rem !important;
  }
  .gdpr-dialog {
    width: 90%;
    .p-dialog-content p {
      font-size: 1rem;
    }
  }
}

@media screen and (max-height: 851px) and (orientation: landscape) {
  .gdpr-dialog {
    width: 90%;
    .p-dialog-content p {
      font-size: 1rem;
    }
  }
}
</style>