import fly from '@/utils/request'
import $api from '@/api'

const api = {
    getGoodsDetail: (id)=>fly.get($api+'smart/items/detail',{
        id:id
    }),
    getSkuList:(obj) => fly.request($api+'smart/items/sku_list',obj,{method:'GET'}),
    getPintuanList: (itemId) => fly.get($api+'smart/pintuan/tuan_list',{
        size:10,
        itemId:itemId
    }),
    //团详情
    get_tuan_detail:(id)=> fly.get($api+'smart/pintuan/tuan_detail',{'id':id}),
    //一分抽详情
    get_cent_detail:(id)=> fly.get($api+'smart/draw/tuan_detail',{'id':id}),

}

export default api
