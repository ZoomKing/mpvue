import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_address_list:()=>fly.request($api+'smart/users/address/list',null,{method:"GET"})
}

export default api
