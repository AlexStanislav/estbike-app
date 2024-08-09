<template>
  <div class="contact">
    <h1>Contact</h1>
    <div class="contact-wrapper">
      <div class="contact-info">
        <h2 class="contact-subtitle">Nu ezitați să ne contactați</h2>
        <div class="contact-info-wrapper">
          <div class="info-row">
            <div class="info-picto"><i class="pi pi-phone"></i></div>
            <div class="info-content">
              <a href="https://wa.me/+40774515065" target="_blank"
                >+40 774 515 065</a
              >
            </div>
          </div>
          <div class="info-row">
            <div class="info-picto">
              <i class="pi pi-envelope"></i>
            </div>
            <div class="info-content">
              <a href="mailto:office@brebumoto.ro">office@brebumoto.ro</a>
            </div>
          </div>
          <div class="info-row">
            <div class="info-picto">
              <i class="pi pi-envelope"></i>
            </div>
            <div class="info-content">
              <a href="mailto:campina@brebumoto.ro">campina@brebumoto.ro</a>
            </div>
          </div>
          <div class="info-row">
            <div class="info-picto">
              <i class="pi pi-map-marker"></i>
            </div>
            <div class="info-content">Strada Șelimbăr nr. 10, Comuna Brebu</div>
          </div>
          <div class="social-media">
            <div class="contact-card facebook-card">
              <i class="pi pi-facebook main-icon"></i>
              <h2>FACEBOOK</h2>
              <h3>Brebu Moto</h3>
              <div class="follow-button">FOLLOW</div>
            </div>
            <div class="contact-card instagram-card">
              <i class="pi pi-instagram main-icon"></i>
              <h2>INSTAGRAM</h2>
              <h3>@brebumoto</h3>
              <div class="follow-button">FOLLOW</div>
            </div>
          </div>
        </div>
      </div>
      <div class="maps">
        <h2 class="contact-subtitle">Locațiile noastre</h2>
        <div class="iframe-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11250.472360489086!2d25.7747136!3d45.174583!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6b60a315be9c5724!2sEST%20BIKE%20Campina!5e0!3m2!1sro!2sro!4v1664964232514!5m2!1sro!2sro"
            width="100%"
            height="300"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
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
  setTimeout(() => {
    store.togglePreloader(false);
  }, 1000);
  const header = document.querySelector(".desktop-nav");
  if (header !== null) {
    header.classList.add("sticky");
  }
});
</script>
<style lang="scss">
.contact {
  width: 90%;
  margin: 80px auto 0 auto;
  h1,
  .contact-subtitle {
    color: var(--dark-shade);
    width: 80%;
    text-align: center;
    margin: 2vh auto;
    border-bottom: 2px ridge var(--dark-shade);
    padding-bottom: 0.5rem;
  }
}

.contact-wrapper {
  display: flex;
  padding-bottom: 2rem;
}
.contact-info,
.maps {
  width: 40vw;
}

.maps iframe {
  margin: 1rem 0;
  border: 2px solid var(--light-accent) !important;
}

.contact-info-wrapper {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.info-row {
  width: 80%;
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.info-picto {
  background: var(--main);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 1.5rem;
  }
}
.info-content {
  font-size: 1.5rem;
  color: var(--main);
  a {
    text-decoration: none;
    color: var(--main);
  }
}

.social-media {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.main-contact-wrapper {
  width: 270px;
  height: 270px;
  display: flex;
  flex-flow: column;
  margin: 3rem 0.5rem;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
}

@media screen and (max-width: 1024px) {
  .contact-wrapper {
    flex-flow: column;
  }

  .contact-info {
    width: 95% !important;
  }

  .contact-info-wrapper {
    flex-flow: column !important;
  }

  .social-media {
    flex-flow: column;
  }

  .maps {
    width: 95% !important;
    margin: auto;
  }
}
</style>