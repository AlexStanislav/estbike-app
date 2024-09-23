<template>
    <section class="utile">
        <h1>Date utile</h1>
        <section class="utile-top-section">
            <section class="utile-filters">
                <span class="p-float-label">
                    <Dropdown v-model="filters.brand" :options="allBrands" @change="handleBrandChange" />
                    <label>Marca</label>
                </span>
                <span class="p-float-label">
                    <Dropdown v-model="filters.capacitate" :options="brandMotor" @change="handleMotorChange" />
                    <label>Capacitate cilindrica</label>
                </span>
                <span class="p-float-label">
                    <Dropdown v-model="filters.model" optionLabel="bike_name" :options="models"
                        @change="handleModelChange" />
                    <label>Model</label>
                </span>
            </section>
            <section class="utile-bike-image">
                <!-- <Skeleton style="width: 500px;height: 350px;" v-if="modelImage === '#'" /> -->
                <img :src="modelImage" alt="">
            </section>
        </section>
        <section class="utile-bottom-section">
            <Button v-if="filters.model !== null" class="download-button" severity="danger" label="Descarca" icon="pi pi-download" @click="downloadPDF()"/>
            <section class="utile-tech-info">
                <table class="tech-table">
                    <th colspan="2">
                        <h2>{{ modelName }}</h2>
                    </th>
                    <tr v-for="(info, index) in modelTech" :key="index">
                        <td>{{ info.label.split("")[0].toUpperCase() + info.label.slice(1) }}</td>
                        <td>{{ info.value }}</td>
                    </tr>
                </table>
            </section>
        </section>
    </section>
</template>
<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import { useAppStore } from "../stores/appStore";
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

const allModels = ref([])

const allBrands = ref([])
const brandMotor = ref([])
const models = ref([])

const modelImage = ref('#')

const modelName = ref('')
const modelTech = ref([])

const filters = ref({
    brand: null,
    capacitate: null,
    model: null,
})

const store = useAppStore();
onBeforeMount(() => {
    store.togglePreloader(true);
});

onMounted(async () => {
    const header = document.querySelector(".desktop-nav");
    if (header !== null) {
        header.classList.add("sticky");
    }
    setTimeout(() => {
        store.togglePreloader(false);
    }, 1000);

    if (store.allBikes === null) {
        await store.getAllBikes();
    }
    allModels.value = getAllModels(store.allBikes);
    allBrands.value = getAllBrands(allModels.value);
});

function getAllModels(bikesArray) {
    const models = Object.values(bikesArray).flat();
    const finalModels = models.filter((model) => {
        return model.display_model
    });

    return finalModels
}

function getAllBrands(bikesArray) {
    const brands = []
    bikesArray.forEach(element => {
        if (element.tech !== null) {
            brands.push((element.brand.split('')[0].toUpperCase() + element.brand.slice(1)).replace("_", " "))
        }
    });

    return [... new Set(brands)]
}

function handleBrandChange(event) {
    const brand = event.value
    const capacity = getMotorInfo(brand)
    brandMotor.value = capacity
    models.value = []
    filters.value.capacitate = null
    filters.value.model = null
    modelImage.value = '#'
}

function getMotorInfo(brand = null) {
    let motorCapacities = [];
    let capacity;
    for (const model of allModels.value) {
        if (brand !== null && model.brand === brand.toLowerCase().replace(" ", "_")) {
            capacity = model.capacitate;
            if (capacity !== null) {
                motorCapacities.push(capacity);
            }
        }
        if (brand === null) {
            capacity = model.capacitate;
            if (capacity !== null) {
                motorCapacities.push(capacity);
            }
        }
    }

    for (let motorIndex in motorCapacities) {
        const motor = motorCapacities[motorIndex];
        if (motor < 50) {
            motorCapacities[motorIndex] = (Math.round(motor / 25) * 25).toString();
        }
        if (motor >= 50 && motor < 125) {
            motorCapacities[motorIndex] = "50";
        }
        if (motor >= 120 && motor < 200) {
            motorCapacities[motorIndex] = "125";
        }
        if (motor >= 200 && motor <= 500) {
            motorCapacities[motorIndex] = "200-500";
        }
        if (motor > 500 && motor <= 800) {
            motorCapacities[motorIndex] = "500-800";
        }
        if (motor > 800) {
            motorCapacities[motorIndex] = "800+";
        }
    }

    const uniqueRoundedMotors = [
        ...new Set([...new Set(motorCapacities)]),
    ].sort((a, b) => {
        const aValue = parseInt(a.split("-")[0]);
        const bValue = parseInt(b.split("-")[0]);
        return aValue - bValue;
    });

    return uniqueRoundedMotors;
}

function handleMotorChange() {
    const filteredModels = allModels.value.filter((model) => {
        const brandMatch = !filters.value.brand || model.brand === filters.value.brand.toLowerCase().replace(" ", "_")

        let motorMatch = true
        if (filters.value.capacitate.includes("-")) {
            motorMatch =
                parseInt(model.capacitate) >=
                parseInt(filters.value.capacitate.split("-")[0]) &&
                parseInt(model.capacitate) <=
                parseInt(filters.value.capacitate.split("-")[1]);
        } else if (filters.value.capacitate.includes("+")) {
            motorMatch = parseInt(model.capacitate) >= 800;
        } else {
            if (parseInt(filters.value.capacitate) === 50) {
                motorMatch =
                    parseInt(model.capacitate) >= 50 &&
                    parseInt(model.capacitate) < 100;
            }
            if (parseInt(filters.value.capacitate) === 125) {
                motorMatch =
                    parseInt(model.capacitate) >= 120 &&
                    parseInt(model.capacitate) < 200;
            }
        }

        return (brandMatch && motorMatch)
    })

    for (const model of filteredModels) {
        model.bike_name = model.bike_name.replace(/-/g, ' ').toUpperCase()
    }

    filters.value.model = null
    modelImage.value = '#'
    models.value = filteredModels
    modelName.value = ''
    modelTech.value = []
}

function handleModelChange() {
    modelImage.value = filters.value.model.image
    modelName.value = filters.value.model.bike_name
    modelTech.value = filters.value.model.tech
}

async function downloadPDF(){
    const request = await fetch(`${store.serverURL}/api/downloadPDF`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters.value.model)
    })
    const response = await request.blob()
    const url = window.URL.createObjectURL(response)
    const a = document.createElement('a');
    a.style.display = 'none'
    a.href = url
    a.download = 'tech-data.pdf'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
}

</script>
<style scoped>
.utile {
    width: 60%;
    min-height: 100vh;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
}

.utile h1 {
    text-align: center;
    font-size: 2em;
    padding-bottom: 0.35em;
    border-bottom: 2px solid var(--dark-shade);
}

.utile-top-section {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 2em;
}

.utile-filters {
    width: 40%;
    display: flex;
    flex-flow: column wrap;
    gap: 2em;
    padding-top: 2em;
}

.utile .p-dropdown {
    width: 100%;
}

.utile-bike-image {
    width: 500px;
    height: 350px
}

.utile-bike-image img {
    width: 100%;
    height: auto;
}

.utile-bottom-section{
    padding-bottom: 2em;
}

.utile-bottom-section .download-button {
    width: 100%;
}

.tech-table td:first-child {
    width: 25%;
    text-align: center;
}

.tech-table td {
    border: 1px solid #bebebe;
    padding: 0.5em 1em;
    box-sizing: border-box;
}
</style>