<template>
  <div class="mobile-nav">
    <i class="pi pi-bars menu-icon" @click="toggleSidebar()"></i>
    <img src="../assets/img/logoest.jpg" alt="Logo EstBike" />
    <div id="phone-number-container">
      <i class="pi pi-phone" />
      <div id="phone-number">
        <a href="https://wa.me/0733782453" target="_blank">+40 733 782 453</a>
      </div>
    </div>
    <Sidebar v-model:visible="appStore.sidebarOpen" header="Meniu">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" placeholder="Cauta" />
      </span>
      <ul>
        <li><router-link to="/">Acasă</router-link></li>
        <li><router-link to="/despre">Despre Noi</router-link></li>
        <li><router-link to="/modele">Modele</router-link></li>
        <li><router-link to="/rabla">Rabla</router-link></li>
        <li><router-link to="/service">Service</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </Sidebar>
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();
const toggleSidebar = () => {
  appStore.toggleSidebar();
  console.log(appStore.sidebarOpen);
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
  z-index: 3;
  img {
    width: 132px;
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
    align-items: center;
    margin-top: 2rem;
    li {
      font-size: 1.5rem;
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

@media screen and (max-width: 412px) {
  .mobile-nav {
    width: 100vw;
    .menu-icon {
      font-size: 1.5rem;
    }
    img {
      width: 100px;
      height: 35px;
    }
    #phone-number-container {
      font-size: 0.8rem;
      height: 35px;
      right: 0;
      #phone-number {
        font-size: 0.8rem;
      }
      i{
        font-size: 1rem;
      }
    }
  }
  
}
</style>