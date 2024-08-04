<template>
  <div id="preloader" v-if="isVisible">
    <div id="preload-content">
      <div id="preload-logo">
        <img lazy src="@/assets/img/logo/logo.png" alt="Logo motobrebu" />
      </div>
      <div id="spinner-container">
        <div id="pulsing-spinner"></div>
        <div id="first-spinner"></div>
        <div id="second-spinner"></div>
      </div>
      <!-- <div class="load-bar"></div> -->
    </div>
  </div>
</template>
<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: true
  }
})
</script>
<style lang="scss">
#preloader {
  width: 100vw;
  height: 100vh;
  background: white;
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
}

.load-bar {
  width: 320px;
  height: 20px;
  transform: skewX(-45deg);
  background: linear-gradient(var(--main 0 0) left -30px top 0/30px 20px no-repeat #ccc);
  animation: loading 1s infinite linear;
}

#preload-logo {
  width: 100%;
  text-align: center;
  top: 73%;
  position: absolute;
  img {
    width: 160px;
  }
}

@keyframes loading {
  100% {
    background-position: right -30px top 0;
  }
}

#spinner-container {
  width: 100vw;
  height: 20rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#pulsing-spinner {
  width: 8rem;
  height: 8rem;
  position: absolute;
  background: var(--main);
  border-radius: 100%;
  animation: pulsating 1s linear infinite;
}

#first-spinner {
  width: 20rem;
  height: 20rem;
  border: 15px solid transparent;
  border-radius: 100%;
  position: absolute;
  border-bottom: 15px solid var(--main);
  border-top: 15px solid var(--main);
  animation: firstSpinner 2s linear infinite;
}

#second-spinner {
  width: 18rem;
  height: 18rem;
  border: 10px solid transparent;
  border-left: 10px solid var(--dark-shade);
  border-right: 10px solid var(--dark-shade);
  border-radius: 100%;
  position: absolute;
  animation: secondSpinner 2s linear infinite;
}

@keyframes firstSpinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes secondSpinner {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes pulsating {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 8rem;
    height: 8rem;
  }
}
</style>