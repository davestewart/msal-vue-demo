<template>
  <h1>Monthly services income per customer</h1>
  <div class="row">
    <div class="col-12">
      <BarChart v-if="dataLoaded" :items="items" />
    </div>
	<div class="col-12">
      <ItemTable v-if="dataLoaded" :items="items" />
    </div>
  </div>
</template>

<script>
  import BarChart from '../components/BarChart.vue';
  import ItemTable from '../components/ItemTable.vue';
  import request from 'superagent'; // using superagent instead of fetch, node-fetch or axios.

  // defaults for express.js server
  const protocol = 'http';
  const host = 'localhost';
  const port = '3000';

  export default {
    components: {
      BarChart,
      ItemTable,
    },
    setup() {
      
    },
    data() {
      return {
        items: [],
        dataLoaded: false,
      };
    },
    mounted() {
      this.dataLoaded = false;
      
	  /*
	  
       I'm using an express.js backend that calls the Autotask REST API.
       I'm not ready to publish the express.js Autotask implementation yet.
       The relevant 'connection point' looks like this inside express.js:
       
       app.get('/contractServiceUnits', getContractServiceUnits);
	   
      */
		
      const currentDateISO = new Date().toISOString();
      const unitsFilter = [
        {
          "op": "lte",
          "field": "startDate",
          "value": currentDateISO
        },
        {
          "op": "gte",
          "field": "endDate",
          "value": currentDateISO
        }
      ]
	  const sampleData = [
        {
          unitID: 12323,
          contractID: 67782,
          contractServiceID: 12,
          contractServiceInvoiceDescription: undefined,
          serviceName: 'TV Cable',
          contractName: "Bugs",
          contractCategory: 2,
          companyName: "ACME",
          units: 300,
          price: 3000,
          unitPrice: 10
        },
        {
          unitID: 123553,
          contractID: 67783,
          contractServiceID: 11,
          contractServiceInvoiceDescription: undefined,
          serviceName: 'MN-Backup',
          contractName: "Managed Backup Service",
          contractCategory: 1,
          companyName: "Initech",
          units: 2,
          price: 420,
          unitPrice: 210
        },
        {
          unitID: 73123,
          contractID: 67783,
          contractServiceID: 11,
          contractServiceInvoiceDescription: undefined,
          serviceName: 'MN-Backup',
          contractName: "Managed Backup Service",
          contractCategory: 1,
          companyName: "Initech",
          units: 2,
          price: 420,
          unitPrice: 210
        },
        {
          unitID: 1282,
          contractID: 67683,
          contractServiceID: 13,
          contractServiceInvoiceDescription: undefined,
          serviceName: 'The Bobs Consulting',
          contractName: "Consulting Initech",
          contractCategory: 1,
          companyName: "Initech",
          units: 10,
          price: 14400,
          unitPrice: 1440
        },
        {
          unitID: 199123,
          contractID: 67783,
          contractServiceID: 11,
          contractServiceInvoiceDescription: undefined,
          serviceName: 'MN-Backup',
          contractName: "Managed Backup Service",
          contractCategory: 1,
          companyName: "Initech",
          units: 2,
          price: 420,
          unitPrice: 210
        }
      ]
	  /*
      request
        .get(`${protocol}://${host}:${port}/contractServiceUnits`)
        .query({ unitsFilter: JSON.stringify(unitsFilter) })
        .end((error, response) => {
          if (error) {
            console.error('Error:', error);
          } else {
            // console.log(response);
            this.items = response.body.data;
            this.dataLoaded = true;
          }
        });
	  */
	  
	  this.items = sampleData;
	  this.dataLoaded = true;
	  
    }
  }
</script>