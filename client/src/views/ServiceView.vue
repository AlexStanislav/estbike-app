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
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_first_name"
            />
            <label>Nume* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_last_name"
            />
            <label>Prenume* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_email"
            />
            <label>Email* </label>
          </span>
          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_address"
            />
            <label>Adresa* </label>
          </span>
        </div>
        <div class="form-container">
          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_phone"
            />
            <label>Telefon* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.client_work_location"
            />
            <label>Punct de lucru* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.vehicle_type"
            />
            <label>Tip Vehicul* </label>
          </span>
          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.brand"
            />
            <label>Marca* </label>
          </span>
        </div>
        <div class="form-container">
          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.category"
            />
            <label>Model* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.main_year"
            />
            <label>An fabricatie* </label>
          </span>

          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.capacitate"
            />
            <label>Capacitate Cilindirca* </label>
          </span>
          <span class="p-float-label">
            <InputText
              type="text"
              class="service-input"
              v-model="formValues.serial_number"
            />
            <label>Serie Cadru* </label>
          </span>
        </div>
      </div>
      <div class="form-container">
        <h2 class="title">Selecteaza operatiuni service</h2>
        <div class="service-check-container">
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Limitare A2 (35kW)"
          />
          <label>
            <div>Limitare A2 (35kW)</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Schimb ulei si filtru"
          />
          <label>
            <div>Schimb ulei si filtru</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Schimb filtru de aer"
          />
          <label>
            <div>Schimb filtru de aer</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Curatat si ungere lant"
          />
          <label>
            <div>Curatat si ungere lant</div>
          </label>
        </div>
        <div class="service-check-container">
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Schimb bujii"
          />
          <label>
            <div>Schimb bujii</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Revizie furca"
          />
          <label>
            <div>Revizie furca</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Reglaj carburatoare"
          />
          <label>
            <div>Reglaj carburatoare</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Schimb kit lant"
          />
          <label>
            <div>Schimb kit lant</div>
          </label>
        </div>
        <div class="service-check-container">
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Verificat aliniament roti"
          />
          <label>
            <div>Verificat aliniament roti</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Probleme racire motor"
          />
          <label>
            <div>Probleme racire motor</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Probleme instalatia electrica"
          />
          <label>
            <div>Probleme instalatia electrica</div>
          </label>
          <Checkbox
            v-model="checkValue"
            class="service-check"
            value="Schimb placute frana"
          />
          <label>
            <div>Schimb placute frana</div>
          </label>
        </div>
      </div>
      <div class="form-container">
        <textarea
          cols="30"
          rows="10"
          placeholder="Alte operatiuni..."
          v-model="formValues.other_operations"
        ></textarea>
      </div>
    </div>
    <span class="terms-container">
      <Checkbox id="terms" v-model="termsValue" :binary="true" />
      <label for="terms">
        Sunt de acord cu
        <router-link to="/termeni">termenii</router-link> privind prelucrarea
        datelor cu caracter personal.
      </label>
    </span>
    <vue-recaptcha
      sitekey="6Leb0W8pAAAAAF27NG02JO1_d-je2Sh75kM5dXnz"
      @verify="captchaVerify"
    />
    <Button label="Trimite" class="service-button" @click="sendData()" />
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref } from "vue";
import { VueRecaptcha } from "vue-recaptcha";
import { useAppStore } from "@/stores/appStore";
import axios from "axios";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const appStore = useAppStore();

const checkValue = ref();
const recaptcha = ref();
const termsValue = ref(false);
const formValues = ref({
  client_first_name: "",
  client_last_name: "",
  client_email: "",
  client_address: "",
  client_phone: "",
  client_work_location: "",
  vehicle_type: "",
  brand: "",
  category: "",
  main_year: "",
  capacitate: "",
  serial_number: "",
  other_operations: "",
});

const captchaVerify = (event) => {
  recaptcha.value = event;
};

const sendData = () => {
  let canSend = false;
  const keys = Object.keys(formValues.value);
  for (const key of keys) {
    if (
      formValues.value[key] !== "" &&
      typeof formValues.value[key] !== "empty string"
    ) {
      formValues.value[key] = formValues.value[key].replace(/[<>&'"]/g, "");
      canSend = true;
    } else {
      canSend = false;
    }
  }

  if (typeof checkValue.value === "object" && checkValue.value.length > 0) {
    canSend = true;
  } else {
    canSend = false;
  }

  if (canSend) {
    if (termsValue.value === false) {
      toast.add({
        severity: "error",
        summary: "Eroare",
        detail: "Va rugam bifati casuta de confirmare",
        life: 3000,
      });
    } else {
      if (recaptcha.value !== undefined) {
        axios
          .post(`${appStore.serverURL}/api/registerRequest`, {
            data: { ...formValues.value },
            serviceOptions: [...checkValue.value],
            captcha: recaptcha.value,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.add({
                severity: "success",
                summary: "Success",
                detail: "Cererea a fost inregistrata",
                life: 3000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.add({
          severity: "error",
          summary: "Eroare",
          detail: "Va rugam bifati casuta ReCaptcha",
          life: 3000,
        });
      }
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Eroare",
      detail: "Toate campurile plus o operatiune de service sunt necesare.",
      life: 3000,
    });
  }
};
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
  margin-bottom: 1rem;
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
  gap: 0.5rem;
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

.terms-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-family: "Oswald";
  gap: 0.5rem;
  margin: 1rem 0;
}

.service-button {
  width: 20rem;
  font-size: 2rem;
  margin-top: 1rem;
  background: var(--main);
  color: var(--light-shade);
  border: none;
  cursor: pointer;
  font-family: "Oswald";
}

@media screen and (max-width: 1366px) {
  #service-form {
    width: 100%;
  }
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