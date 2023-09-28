<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-start">Company Name</th>
        <th class="text-start">Contract Name</th>
        <th class="text-start">Service Name</th>
        <th class="text-end">Income</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key=item.id>
        <td class="text-start">{{ item.companyName }}</td>
        <td class="text-start">{{ item.contractName  }}</td>  
        <td class="text-start">{{ item.serviceName }}</td> 
        <td class="text-end">{{ item.price }}</td>  
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">Total:</td>
        <td class="text-end">{{ calculateTotal() }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>

export default {
  name: 'ItemTable',
  components: { },
  props: {
    items: {
      default: () => [],
    },
  },
  methods: {
    calculateTotal()  {
      return (this.items.reduce((total, item) => total + item.price, 0)).toFixed(2);
    },
  },
}
</script>