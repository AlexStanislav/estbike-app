<template>
<div class="about">
    <h1 class="title">Despre noi</h1>
    <article class="about-card">
      <h2>Din pasiune pentru motociclete...</h2>
      <p>
        Brebu Moto reprezinta pasiunea imensa pentru motociclete si ATV-uri
        concretizata intr-un magazin de motociclete si ATV, echipamente si
        accesorii. Proiectul a fost inceput in primavara lui 2016 si are la baza
        o echipa tanara si entuziasta, pasionata de mersul pe doua roti dar si
        cu experienta in domeniu. Astfel a aparut un magazin de motociclete, ATV
        si vehicule recreative, un service dedicat acestora, dar si un intreg
        sistem de servicii dedicat clientilor nostrii.
      </p>
      <p>
        Dorim sa aducem o lumina noua in acest segment de piata, sa imbunatatim
        serviciile deja existente, sa putem oferi fiecaruia cea mai buna solutie
        conform asteptarilor sale, sa fim parteneri de incredere celor ce
        apeleaza la serviciile noastre, sa devenim un standard de calitate a
        serviciilor pentru clientii nostri. Astfel, in scurt timp, datorita
        aprecierii clientilor nostri si experientei pe carere o avem, am devenit
        unul dintre principalele magazine de motociclete, echipamente si
        accesorii din jumatarea de est a tarii. Dorinta si eforturile noastre au
        fost concentrate in a oferi partenerilor nostrii o diversitate cat mai
        mare de produse de callitate si brand-uri de top din industrie la cele
        mai bune preturi. Astfel am investit mult intr-un stoc permanent de
        produse pentru a putea raspunde cat mai putin posibil cu fraza „ Va
        aducem pe comanda...”. In acest moment, la noi veti gasi cel mai mare
        magazin de echipamente moto si accesorii moto din sud-estul Romaniei.
      </p>
      <p>
        Cu ajutorul vostru, Brebu Moto devenit dealer oficial in Constanta si
        Dobrogea pentru marcile de motociclete si atv SUZUKI, HONDA, KAWASAKI,
        TRIUMPH, KTM, HUSQVARNA, BETA, SWM, INDIAN si distribuitor YAMAHA, CF
        MOTO, CAN-AM, POLARIS, LINHAI, BRP, TGB, ARCTIC CAT, APRILIA, VESPA,
        PIAGGIO, MOTO GUZZI
      </p>
    </article>
    <article class="about-card">
      <p>
        In ceea ce priveste partea de echipamente moto si accesorii moto in
        stocul nostru veti gasi:
        <ul>
          <li>
            casti ARAI, SHOEI, AGV, AIROH, NOLAN, X-LITE, SCORPION EXO, SHARK, ICON, HJC, SCHUBERTH, MT, IXS.
          </li>
          <li>
            echipamente ALPINESTARS, DAINESE, MACNA, IXON, IXS, ADRENALINE, ICON, CLOVER, REVIT. Suntem importatori ALPINESTARS si distribuitori ALPINESTARS.
          </li>
          <li>
            incaltaminte ALPINESTARS, FORMA, GAERNE, SIDI, ICON.
          </li>
          <li>
            accesorii GIVI, KAPPA, SWMOTECH, OXFORD, PARTS EUROPE.
          </li>
        </ul>
      </p>
      <p>
          La noi veti gasi cele mai bune
          servicii si cele mai accesibile preturi, impreuna cu cele mai potrivite
          sfaturi pentru nevoile dv. Clientii nostrii sunt in primul rand
          prietenii nostrii. Service-ul Brebu Moto este service de motociclete si
          scootere dar si service ATV. Este autorizat RAR pentru intretinere si
          reparatii si este dotat cu scule si aparatura profesionala de ultima
          generatie, diagnoza moto si ATV, condus de tehnicieni priceputi si cu
          experienta. Deasemenea este agreat pentru constatarea si solutionarea
          dosarelor de daune RCA si CASCO. Piesele si consumabilele folosite sunt
          de cea mai buna calitate, garantate si certificate de producatori de top
          din domeniu. Pasiunea dv are nevoie de siguranta.
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