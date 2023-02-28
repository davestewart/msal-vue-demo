import { reactive, ref } from 'vue'
import { Api } from '@/services/api'

export const data = ref(null)

export async function load () {
  data.value = await Api.get('/users/current') // change this for your endpoint
}

export const user = reactive({
  data,
  load,
})
