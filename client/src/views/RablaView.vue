<template>
  <section class="rabla-view">
    <h1 class="title">Informatii Rabla</h1>
    <div id="rabla-contents">
        <h2 class="title">Cuprins</h2>
        <ol>
            <li class="contents-item" v-for="(link, index) in indexLinks" :key="index" @click="goTo(link)">
                {{ link.id.replace("rabla-", "").replace("-", " ").split("").map((letter) => letter.toUpperCase()).join("") }}
            </li>
        </ol>
    </div>
    <article id="rabla-intro">
      <h1>Salut motociclistule,</h1>
      <p>
        Noi suntem Brebu Moto si iti multumim ca ne-ai ales pe noi ca furnizori de
        vehicule pentru pasiunea ta.
        <br />
        Pe noi ne gasesti fizic in locatiile de mai jos, dar poti achizitiona si
        de la distanta iar noi iti putem livra motocicleta/scuterul/atv-ul dorit
        chiar la domiciliu.
        <br />
        BIKE CAMPINA – Strada Selimbar nr.10 localitatea BREBU MANASTIREI jud
        PRAHOVA campina@brebumoto.ro
        <br />
        <br />
        Aceasta este o sinteza a informatiilor prezente in Ghidul de Finantare
        pentru programul Rabla Clasic. Ghidul compet il regasiti aici pe site-ul
        <a
          href="https://www.afm.ro/main/programe/psipan/2022/ordin_180-02_02_2022-psipan.pdf"
          target="_blank"
          >AFM</a
        >.
        <br />
        <br />
        Va rugam sa parcurgeti cu atentie informatiile de mai jos. Inscrierea in
        program si achizitia vehiculelor noi se desfasoara conform pasilor
        prezentati mai jos. Toate documentele vor fi trimise catre Brebu Moto
        CONSTANTA pe email la adresa logistica@brebumoto.ro sau fizic (pot fi
        trimise si prin curier) la adresa noastra din CONSTANTA , strada Medeea
        nr 1A (cu mentiunea departament logistica) in forma solicitata mai jos.
      </p>
    </article>
    <article id="rabla-eligibil">
        <h2>Ce VEHICULE sunt ELIGIBILE pentru PROGRAMUL RABLA ?</h2>
        <p>
            Motociclete sau scutere (L3e sau L4e) cu cilindree peste 50cc si viteza peste 45 km/h ce pot fi INMATRICULATE la DRPCIV si ale caror emisii NU depasesc 120g CO_2/km in sistem WMTC
            <br>
            <br>
            Achizitia ATV-urilor NU este permisa prin programul RABLA
        </p>
    </article>
    <article id="rabla-casat">
        <h2>Ce TREBUIE CASAT</h2>
        <p>
            In programul RABLA CLASSIC se pot casa DOAR autoturisme si se pot achizitiona motociclete, scutere sau autoturisme.
            <br><br>
            Pentru încadrarea în programul Rabla, mașina dusă la casare trebuie să aibă o vechime mai mare sau egală cu 6 ani de la prima înmatriculare in România. Mașina trebuie să conțină cumulativ componentele esențiale (motor, transmisie, tren rulare, caroserie, șasiu etc.) 
            <br><br>
            NU este necesar ca autoturismul sa fie proprietatea personala a solicitantului. Acesta poate participa in program si poate casa un autovehicul ce se afla in proprietatea altei persoane (fizice sau juridice) iar aceasta este de acord cu cedarea dreptului de casare.
            <br><br>
            Daca nu aveti autoturism pentru casare te putem ajuta cu procurarea unuia cu drept de casare. Solicitarile le puteti trimite la email <b> <a href="mailto:logistica@brebumoto.ro">logistica@brebumoto.ro</a></b>
        </p>
    </article>
    <article id="rabla-prime-casare">
        <h2>Care sunt PRIMELE de casare</h2>
        <p>
            Prima de casare pentru un vehicul ce are minim 6 ani vechime este de 6.000 Ron.
            <br><br>
            La această primă se pot adăuga 2 ecobonusuri:
            <br><br>
            1. Pentru vehicul achiziționat cu emisie mai mică sau egală de 90g CO2/km – se adauga un ecobonus de 1500 Ron (aici se califica scuterele si motocicletele cu motor mai mic, doar dacă se înmatriculează).
            <br><br>
            2. Pentru vehicul casat mai vechi de 15 ani (de la prima înmatriculare) și maxim Euro3 – se adauga un ecobonus suplimentar de 1500 Ron
            <br><br>
            Prin urmare, clientul poate beneficia de 6000, 7500 sau 9000 de Ron, în funcție de criteriile de mai sus. Valorile includ TVA.
            <br><br>
            IMPORTANT: Suma tichetului Rabla și a ecobonusurilor nu poate depăși 50% din valoarea produsului achiziționat (cu TVA inclus).
        </p>
    </article>
    <article id="rabla-acte-necesare">
        <h2>ACTELE NECESARE PT INSCRIEREA INSCRIEREA IN PROGRAM</h2>
        <p>
           <ul>
                <li>Buletinul (actul de identitate) al solicitantului</li>
                <br>
                <li>Buletinul proprietarului autovehiculului ce va fi casat (in cazul in care masina nu este proprietatea solicitantului)</li>
                <br>
                <li>Cartea de identitate a a vehiculului</li>
                <br>
                <li>Talonul vehiculului (certificatul de inmatriculare)</li>
                <br>
                <li>
                    Certificat fiscal de informare eliberat de Primariile sau Directia impozite si taxe locale de domiciliu, care sa ateste ca nu aveti datorii curente la bugetul local. Valabilitatea acestui document este de maxim 30 zile de la data emiterii. Fiscalul este necesar DOAR pt solicitantul particuparii in program.
                </li>
            </ul>
            <br><br>
            Certificat fiscal ANAF eliberat de Directia Regioanala a Finantelor Publice care sa ateste ca nu aveti datorii la ANAF. Valabilitatea acestui document este de maxim 90 zile de la data emiterii. Fiscalul este necesar DOAR pt solicitantul particuparii in program.
            
            <br><br>
            In cazul  unor situatii particulare solicitantul va trebui sa prezinte si urmatoarele documente:
            <br><br>
            <ul>
                <li>
                    certificatul de moştenitor sau, în situaţia succesiunii pe cale judecătorească, sentinţa civilă definitivă. Atunci când certificatul de moştenitor ori  sentinţa civilă atestă existenţa mai multor moştenitori, este necesară prezentarea unei împuterniciri notariale, în original, prin care persoana reprezentantă este expres mandatată să acţioneze şi să încheie acte juridice în cadrul programului, în numele, pe seama şi în interesul tuturor comoştenitorilor, în vederea: casării autovehiculului uzat, radierii autovehiculului uzat din evidenţa circulaţiei şi achiziţionării autovehiculului nou;
                </li>
                <br>
                <li>
                    certificatul de căsătorie sau orice act administrativ eliberat de către autoritatea competentă material şi teritorial, care atestă schimbarea/modificarea numelui şi/sau prenumelui, în copie certificată
                </li>
                <br>
                <li>
                    împuternicirea notarială, în original, prin care solicitantul mandatează în mod expres o altă persoană să acţioneze şi să încheie acte juridice în cadrul programului, în numele, pe seama şi în interesul său, în vederea: casării autovehiculului uzat, radierii autovehiculului uzat din evidenţa circulaţiei, achiziţionării autovehiculului nou; în această situaţie se va prezenta şi actul care atestă identitatea şi domiciliul sau reşedinţa în România a persoanei împuternicite, eliberat de către autorităţile române, în termen de valabilitate, în copie certificata conforma cu originalul;
                </li>
            </ul>
        </p>
    </article>
    <article id="rabala-pasi">
        <h2>PASII PROCEDURALI ai DOSARULUI RABLA</h2>
        <p>
            <ol>
                <li>Verificati disponibilitatea motocicletei/scuterului pe brebumoto.ro, telefonic 0752312097, 0757777064, 0774515065 sau email <a href="mailto:office@brebumoto.ro">office@brebumoto.ro</a>. Rezervati motocicleta/scuterul dorit pt achizitie.</li>
                <br>
                <li>Actele de mai sus trebuie transmise catre noi in ORIGINAL sau SCANATE (nu fotografiate cu telefonul), predate in showroom sau pe email: logistica@brebumoto.ro. Nu sunt acceptate pe whatsapp, messenger, etc.</li>
                <br>
                <li>Noi inscriem datele primite in sistemul AFM. Ele sunt verificate in sistem de catre reprezentantii AFM si daca sunt corecte se emite NOTA de INSCRIERE cu numar unic. In acest moment sunteti acceptati in program. Nota de Inscriere este valabila 300 zile de la data inscrierii.</li>
                <br>
                <li>Nota de Inscriere se inmaneaza solicitantului in vederea  casarii autovehicului uzat si ulterior radierii lui;</li>
                <br>
                <li style="color: #f00">
                    <b>
                        IN ACEST MOMENT FACETI COPII LEGALIZATE pentru urmatoarele documente: 
                        <ul>
                            <li>carte de identitate autovehicul fata/verso</li>
                            <li>talon autovehicul fata/verso</li>
                            <li>certificat fiscal primarie</li>
                            <li>certificat fiscal ANAF</li>
                            <li>buletin solicitant</li>
                        </ul>
                    </b>
                </li>
                <br>
                Un exemplar original sau legalizat  trebuie trimis catre noi dupa ce se finalizeaza distrugerea si radierea. Fara aceste documente ne rezervam dreptul de a nu continua procesul de vanzare prin programul Rabla.
                <br><br>
                <li>Solicitantul sau proprietarul, va preda autovehiculul uzat la orice colector autorizat, in vederea casarii şi emiterii certificatului de distrugere;</li>
                <br>
                <li>Apoi radiati autovehiculul din evidenţa circulaţiei la DRPCIV şi obţineti certificatul de radiere;</li>
                <br>
                <li>Scoaterea autovehiculului din evidenta fiscala de la Directia de Impozite si Taxe Locale</li>
                <br>
                <li>Verificati ca toate datele si seriile inscrise pe documentele originale si copii sa fie perfect lizibile si neinterpretabile.</li>
                <br>
                <li>
                    Ne transmiteti fizic sau prin curier in original sau copii legalizate urmatoarele documente:
                    <b>
                        <ul style="color: #f00">
                            <br>
                            <li>carte de identitate autovehicul fata/verso – original sau copie legalizata</li>
                            <br>
                            <li>talon autovehicul fata/verso – original sau copie legalizata</li>
                            <br>
                            <li>certificat fiscal primarie – original sau copie legalizata</li>
                            <br>
                            <li>certificat fiscal ANAF – original sau copie legalizata</li>
                            <br>
                            <li>buletin solicitant – copie legalizata</li>
                            <br>
                            <li>certificatul de distrugere – copie</li>
                            <br>
                            <li>certificatul de radiere - copie</li>
                        </ul>
                    </b>
                </li>
                <br>
                <li>Introducem datele despre casare si radiere in sistemul AFM. Acestea sunt verificate si daca sunt corecte atunci se poate trece la formalitatile de vanzare ale motocicletei/scuterului</li>
                <br>
                <li>Se factureaza final si se achita final motocicleta/scuterul nou. Daca motocicleta/scuterul este in stoc, se efectueaza formalitatile de predare-primire catre beneficiar.</li>
                <br>
                Daca noul vehicul contractat nu este in stoc la acel moment, acesta se poate livra catre beneficiar in termen de maxim 300 de zile din momentul inscrierii in program, conform contractului de comanda incheiat.
                <br><br>
                <b>
                    <li style="color: #f00">
                        Este obligatorie inmatricularea permanenta a vehiculului nou achizitionat la DRPCIV, pe numele beneficiarului programului Rabla, in termen de 90 zile de la emiterea facturii de achizitie. Nerespectarea acestui termen atrage plata contravalorii primei de casare obtinute in program, catre institutiile statului.
                    </li>
                    <br><br>
                    <span style="color: #f00">ATENTIE!!!!!! – motocicleta/scuterul nou achizitionat nu poate fi instrainat minim 1 an de la data achizitiei. Nerespectarea acestui termen atrage plata contravalorii primei de casare obtinute in program, catre institutiile statului.</span>
                </b>
            </ol>
        </p>
    </article>
    <article id="rabla-disclaimer">
        <p>
            Intrucat procesul de inscriere si achizitie in programul Rabla Clasic presupune timp, responsabilitate, atentie si corectitudine, va rugam ca transmiterea datelor si documentelor necesare sa fie facuta in forma prezentata si solicitata mai jos conform etapelor descrise.
            <br><br>
            In cazul transmiterii incomplete a documentelor necesare dosaruluui,  sau in formatul solicitat, catre departamente diferite ale Brebu Moto  sau la adrese diferite fata de cea mentionata, se va implementa un cost suplimentar de asistenta si consultanta in valoare de 500 ron tva/inclus/dosar intrucat ne solicita suplimentar, ca timp de solutionare si efort uman.
            <br><br>
            Intrucat stocurile si disponibilitatile  vehiculelor sunt foarte schimbatoare datorita cererii crescute, a livrarilor insuficiente sau intarziate de probleme de productie si transport ne rezervam dreptul de a refuza vanzarea vehiculelor prin Programul Rabla Clasic in conditii speciale cum ar fi: stoc redus, disponibilitati fara termene de livrare clare, lipsa unei rezervari sau a unei precomenzi cu incasarea unui avans, etc.
            <br><br>
            Achizitia prin participarea in programul Rabla Clasic este o facilitate oferita de statul Roman si nu o obligativitate din partea dealerului.
            <br><br>
            <br><br>
            <br><br>
            Toate drepturile pentru acest text sunt rezervate Brebu Moto.
        </p>
    </article>
  </section>
</template>
<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useAppStore } from "../stores/appStore";
const store = useAppStore();

const indexLinks = ref([]);

const goTo = (element) => {
  let offset = 60;
  let elementPos = element.getBoundingClientRect().top;
  let position = elementPos + window.pageYOffset - offset;

  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};

onBeforeMount(() => {
  store.togglePreloader(true);
})

onMounted(() => {
  setTimeout(() => {
    store.togglePreloader(false);
  }, 1000);
  for (const link of document.getElementsByTagName("article")) {
    indexLinks.value.push(link);
  }
  const header = document.querySelector(".desktop-nav");
  if (header !== null) {
    header.classList.add("sticky");
  }
});
</script>
<style lang="scss">
.rabla-view {
  margin-top: 80px;
  width: 80%;
  margin: 80px auto 0 auto;
}

#rabla-contents {
  width: 200px;
  background: var(--light-shade);
  padding: 1rem;
  margin-top: 2rem;
  position: absolute;
}

.contents-item {
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.contents-item:hover {
  color: var(--main);
}

#rabla-intro,
#rabla-eligibil {
  margin-left: 300px;
}

article {
  margin-top: 3rem;
  p {
    font-size: 1rem;
  }
}
</style>