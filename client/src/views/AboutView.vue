<template>
<div class="about">
    <h1 class="title">Despre noi</h1>
    <article class="about-card">
      <h2>Despre Noi</h2>
      <p>
        La Brebu Moto, pasiunea pentru două roți ne definește. Suntem o echipă dedicată să oferim cele mai bune motociclete, scutere și ATV-uri, adaptate nevoilor fiecărui client. Indiferent dacă ești în căutarea unui scuter de 125 cmc pentru a te bucura de libertatea drumurilor orașului, sau dacă visezi la o motocicletă care să te ducă oriunde dorești, suntem aici să te ghidăm. În plus, suntem la curent cu toate schimbările legislative, inclusiv Legea B125, și te ajutăm să faci alegerile corecte pentru a te bucura în siguranță de experiența pe două roți. Alături de noi, vei găsi nu doar vehicule de calitate, ci și un partener de încredere în călătoria ta pe drumurile vieții.
      </p>
    </article>
    <article class="about-card">
      <h2>De ce Noi</h2>
      <p>
        Alegerea Brebu Moto înseamnă mai mult decât achiziționarea unui simplu vehicul; înseamnă să faci parte dintr-o comunitate de entuziaști care apreciază calitatea și siguranța. Oferim o gamă variată de scutere de 125 cmc, ideale pentru cei care doresc să beneficieze de Legea B125, motociclete performante și ATV-uri robuste, toate alese cu grijă pentru a răspunde celor mai exigente cerințe. Ne mândrim cu expertiza noastră și cu suportul pe care îl oferim clienților, fie că ești la început de drum sau un rider experimentat. La Brebu Moto, găsești vehiculul perfect pentru tine, alături de servicii excepționale care îți fac experiența de cumpărare simplă și plăcută.
      </p>
    </article>
  </div>
</template>
<script setup>
import { onMounted, onBeforeMount } from "vue";
import { useAppStore } from "../stores/appStore";
const store = useAppStore();
onBeforeMount(() => {
  store.togglePreloader(true);
});

onMounted(() => {
  const header = document.querySelector(".desktop-nav");
  if (header !== null) {
    header.classList.add("sticky");
  }
  setTimeout(() => {
    store.togglePreloader(false);
  }, 1000);
});
</script>
<style lang="scss">
.about {
  width: 80%;
  margin: 80px auto 0 auto;
}
.about-card {
  background: var(--dark);
  color: var(--light-shade);
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0;
  h2 {
    border-bottom: 1px solid var(--light-shade);
    padding-bottom: 0.3rem;
  }
  p {
    text-indent: 50px;
  }
  li {
    text-indent: 0;
  }
}
</style>