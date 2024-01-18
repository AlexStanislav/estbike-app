<template>
  <div class="service">
    <h1 class="title">Service</h1>
    <p>
      Acum ai posibilitatea să îți programezi motocicleta, scuterul sau ATV-ul
      în Service-ul nostru. Completează atent formularul de mai jos cu datele
      necesare iar colegii noștri te vor contacta pentru a stabili ziua și ora
      rezervării.
    </p>
    <div id="service-form">
      <h2 class="title">Cerere Service</h2>
      <div class="form-wrapper">
        <div class="form-container">
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Nume* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Prenume* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Email* </label>
          </span>
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Adresa* </label>
          </span>
        </div>
        <div class="form-container">
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Telefon* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Punct de lucru* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Tip Vehicul* </label>
          </span>
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Marca* </label>
          </span>
        </div>
        <div class="form-container">
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Model* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>An fabricatie* </label>
          </span>

          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Capacitate Cilindirca* </label>
          </span>
          <span class="p-float-label">
            <InputText type="text" class="service-input" />
            <label>Serie Cadru* </label>
          </span>
        </div>
      </div>
      <div class="form-container">
        <h2 class="title">Selecteaza operatiuni service</h2>
        <div class="service-check-container">
          <label>
            <input type="checkbox" class="service-check" />
            <div>Limitare A2 (35kW)</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Schimb ulei si filtru</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Schimb filtru de aer</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Curatat si ungere lant</div>
          </label>
        </div>
        <div class="service-check-container">
          <label>
            <input type="checkbox" class="service-check" />
            <div>Schimb bujii</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Revizie furca</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Reglaj carburatoare</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Schimb kit lant</div>
          </label>
        </div>
        <div class="service-check-container">
          <label>
            <input type="checkbox" class="service-check" />
            <div>Verificat aliniament roti</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Probleme racire motor</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Probleme instalatia electrica</div>
          </label>
          <label>
            <input type="checkbox" class="service-check" />
            <div>Schimb placute frana</div>
          </label>
        </div>
      </div>
      <div class="form-container">
        <textarea
          cols="30"
          rows="10"
          placeholder="Alte operatiuni..."
        ></textarea>
      </div>
    </div>
    <button class="service-button">Trimite</button>
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
</script>
<style lang="scss">
textarea {
  resize: none;
  font-size: 1rem;
}
.service {
  h1 {
    font-family: "Oswald";
  }
  h2 {
    border-bottom: none;
  }
  p {
    font-size: 1.3rem;
    font-family: "Oswald";
  }
  width: 70%;
  margin: 80px auto 20px auto;
  font-family: "OpenSans";
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

#service-form {
  width: 70%;
  display: flex;
  flex-flow: column wrap;
  padding: 0.5rem;
  justify-content: center;
  font-family: "Oswald";
  border-top: 2px solid var(--dark-shade);
  border-bottom: 2px solid var(--dark-shade);
}

.form-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.form-container {
  display: flex;
  flex-flow: column wrap;
  padding: 1rem 0;
  justify-content: center;
  .p-float-label {
    margin: 1rem 0.5rem;
  }
}

.service-check-container {
  display: flex;
  justify-content: center;
  label {
    width: 12rem;
    display: flex;
    align-items: center;
    .service-check {
      width: 1rem;
      height: 1rem;
      margin-right: 5px;
    }
  }
}

.service-button {
  width: 20rem;
  font-size: 2rem;
  margin-top: 1rem;
  background: var(--main);
  color: var(--light-shade);
  border: 2px solid var(--dark-shade);
  cursor: pointer;
  font-family: "Oswald";
}

@media screen and (max-width: 1024px) {
  .service {
    width: 95% !important;
    p {
      text-align: center;
      margin: 1rem 0;
    }
  }

  #service-form {
    width: 100% !important;
  }

  .form-wrapper {
    flex-flow: column wrap !important;
    align-items: center;
  }

  .form-control {
    width: fit-content !important;
  }

  .service-check-container {
    flex-flow: column;
  }
}
</style>