import axios from 'axios'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      showPreloader: true,
      isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      },
      sidebarOpen: false,
      allBikes: null,
      serverURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
      firstLoadComplete: false,
      favoriteBikes: [],
      currentBike: null,
      homeBrands: [],
      homeModelTypes: []
    }
  },
  actions: {
    setHomeBrands() {
      let brands = [];
      for (const bikeType in this.allBikes) {
        if (!brands.includes(bikeType)) {
          brands.push(bikeType.split("_")[0]);
        }
      }
      this.homeBrands = [...new Set(brands)]
    },
    setHomeModelTypes() {
      let models = [];
      for (const bikeType in this.allBikes) {
        if (!models.includes(bikeType)) {
          models.push(bikeType.split("_")[1]);
        }
      }
      this.homeModelTypes = [...new Set(models)]
    },
    togglePreloader() {
      this.showPreloader = !this.showPreloader
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    getAllBikes() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${this.serverURL}/api/bikes`)
          .then((response) => {
            for (const bikeTypeIndex in response.data) {
              const bikeTypes = response.data[bikeTypeIndex]
              for (const bikeIndex in bikeTypes) {
                const bike = bikeTypes[bikeIndex]
                if ((bike.price === "" || isNaN(parseInt(bike.price))) && bike.old_price !== "") {
                  bike.price = bike.old_price
                  bike.old_price = null
                }
                if (bike.price !== "") {
                  bike.price = bike.price.replace('.', '')
                }
                if (bike.price !== "" && bike.old_price !== "" && bike.old_price !== null) {
                  bike.price = bike.price.replace('.', '')
                  bike.old_price = bike.old_price.replace('.', '')
                }
              }

            }
            this.allBikes = response.data
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    toggleFirstLoadComplete() {
      this.firstLoadComplete = true
    },
    addFavoriteBike(bike) {
      this.favoriteBikes.push(bike)
    },
    removeFavoriteBike(bike) {
      const index = this.favoriteBikes.indexOf(bike)
      if (index > -1) {
        this.favoriteBikes.splice(index, 1)
      }
    },
    clearFavoriteBikes() {
      this.favoriteBikes = []
    },
    setCurrentBike(bike) {
      this.currentBike = bike
    },
    clearCurrentBike() {
      this.currentBike = null
    }
  }
})
