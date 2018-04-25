import fly from '@/utils/request'
import $api from '@/api'

const api = {
    register: (obj)=>fly.request($api+'smart/users/register',obj,{method:'POST'}),
    send_confirm_code:(phone)=>fly.request($api+'smart/users/send_confirm_code?phone='+phone,null,{method:'POST'})
}

export default api
