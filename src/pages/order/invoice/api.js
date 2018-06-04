import fly from '@/utils/request'
import $api from '@/api'
const api = {
  add_invoice : (obj)=>fly.request($api+'smart/users/invoice/edit',obj,{method:'POST'}),
}

export default api
