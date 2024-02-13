import axios from 'axios'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      showPreloader: true,
      isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      },
      forexValue: 0,
      sidebarOpen: false,
      allBikes: null,
      bikesLoaded: false,
      serverURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
      firstLoadComplete: false,
      favoriteBikes: [],
      currentBike: null,
      homeBrands: {},
      homeModelTypes: [],
      modelsFilters: []
    }
  },
  actions: {
    setModelsFilters(data){
      this.modelsFilters = []
      this.modelsFilters.push(data)
    },
    getBikes() {
      return new Promise((resolve, reject) => {
        resolve(this.allBikes)
      })
    },
    setHomeBrands() {
      let brands = {};
      for (const bikeType in this.allBikes) {
        const bikeInfo = bikeType.split("_");
        brands[bikeInfo[0]] = []
      }

      for (const bikeType in this.allBikes) {
        const bikeInfo = bikeType.split("_");
        brands[bikeInfo[0]].push(bikeInfo[1])
      }

      this.homeBrands = brands
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
    togglePreloader(value = null) {
      this.showPreloader = value !== null ? value :  !this.showPreloader
    },
    async togglePageLoad(callback){
      this.showPreloader = true

      if(callback){
        await callback()

        setTimeout(() => {
          this.showPreloader = false
        }, 1000)
      }else{
        setTimeout(() => {
          this.showPreloader = false
        }, 1000)
      }
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    async getAllBikes() {
      try {
        const response = await axios.get(`${this.serverURL}/api/bikes`)
        this.allBikes = await response.data.bikes
        const value = await response.data.forex
        this.forexValue = parseFloat(value)
      } catch (error) {
        console.log(error)
      } finally {
        this.bikesLoaded = true
      }
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

// for (const bikeTypeIndex in response.data) {
//   const bikeTypes = response.data[bikeTypeIndex]
//   for (const bikeIndex in bikeTypes) {
//     const bike = bikeTypes[bikeIndex]
//     if ((bike.price === "" || isNaN(parseInt(bike.price))) && bike.old_price !== "") {
//       bike.price = bike.old_price
//       bike.old_price = null
//     }
//     if (bike.price !== "") {
//       bike.price = bike.price.replace('.', '')
//     }
//     if (bike.price !== "" && bike.old_price !== "" && bike.old_price !== null) {
//       bike.price = bike.price.replace('.', '')
//       bike.old_price = bike.old_price.replace('.', '')
//     }
//   }

// }