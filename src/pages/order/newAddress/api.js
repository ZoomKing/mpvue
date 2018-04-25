import fly from '@/utils/request'
import $api from '@/api'
const api = {
  add_new_address:(obj)=>fly.request($api+'smart/users/address/edit',obj,{method:"POST"})
}

export default api
