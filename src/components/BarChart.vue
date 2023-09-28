<template>
  <Bar v-if="dataLoaded"
    :options="this.options"
    :data="this.data"
  />
</template>

<script>

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import helpers from './../includes/helpers'; // used for stringToColor and tooltipFooter

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    items: {},
  },
  data() {
    return {
      data: {
        labels: {},
        datasets: {}  
      },
      dataLoaded: false,
      options: {
        interaction: {
          intersect: false,
          mode: 'x',
        },
        plugins: {
          tooltip: {
            filter: function (tooltipItem) { 
              return tooltipItem.dataset.data[tooltipItem.dataIndex] > 0; // this excludes service prices that are 0 or negative!
            },
            callbacks: {
              footer: helpers.tooltipFooter, // this will add a footer to the tooltip showing a total of the service income prices.
            },
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'CHF', // Swiss Currency Unit. You may use USD, EUR, MXN, ...
            },
          }
        }
      },
    }
  },
  mounted() {
      
    // Create an object to store prices for all services dynamically
    const pricesByService = {};

    // Populate prices for all services
    this.items.forEach((item) => {
      const customerName = item.companyName;
      const serviceName = item.serviceName;
      const price = item.price;

      // Create an object for the service if it doesn't exist
      if (!pricesByService[serviceName]) {
        pricesByService[serviceName] = {};
      }

      // Add the price for the customer of the service
      pricesByService[serviceName][customerName] = price;
    });

    // Get unique customer names and sort them alphabetically
    const customerNames = Array.from(
      new Set(this.items.map((item) => item.companyName))
    ).sort();

    // Create datasets for all services
    const datasets = Object.keys(pricesByService).map((service) => ({
      label: service,
      backgroundColor: helpers.stringToColor(service), // this will give each service a unique color based on md5(service name).
      data: customerNames.map((customerName) =>
        pricesByService[service][customerName] || 0
      ),
    }));
    this.data.labels = customerNames;
    this.data.datasets = datasets;
    this.dataLoaded = true;
    
    if (this.dataset === "Service") {  
    }
  },
}
</script>