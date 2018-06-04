<template lang="pug">
.address
    .address_box(v-if='addressList.length')
      addressItem(v-for='(item,index) in addressList',:key='index',:dataInfo='item')
    .no_address(v-else)
      img(src='/static/assets/order_nothing_110.png')
      view {{'您还没有地址哦~'}}
    view.addNewAddress
      view(@tap='wxImport') {{'从微信导入'}}
      a(@click='toNewAddress') {{'添加新地址'}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import addressItem from './components/address-item'
import global  from '@/global'
import api from './api'
export default {
  data(){
    return {
      addressList:[]
    }
  },
  computed: {
  },
  onReachBottom () {
    
  },
  methods: {
    ...mapMutations(['changeShowAddress']),
    async getAddressList(){
      const res = await api.get_address_list()
        this.addressList = res.value
    },
    toNewAddress(){
      wx.redirectTo({
         url:`/pages/order/newAddress`
      })
    },
    wxImport(){
          wx.chooseAddress({
              success:(res)=>{
                  this.changeShowAddress({
                      "region": res.provinceName+';'+res.cityName+';'+res.countyName,
                      "address": res.detailInfo,
                      "name": res.userName,
                      "phone": res.telNumber,
                  });
                  let obj = {
                      'region':res.provinceName+';'+res.cityName+';'+res.countyName,
                      "address": res.detailInfo,
                      "name": res.userName,
                      "phone": res.telNumber,
                      'isDefault':false
                  }
                  this.addNewAddress(obj);
              },
              fail:(res)=>{
                  wx.showToast({
                      title: '微信导入失败,请尝试使用手动导入',
                      icon: 'none',
                      duration: 2000
                  })
              }
          })
    },
    async addNewAddress(obj){
        const res = await api.add_new_address(obj);
        if(res.succ){
            wx.redirectTo({
                url: '/pages/order/preorder'
            })
        }
    }
  },
   mounted () {
    this.getAddressList();
  },
  components:{
    addressItem
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.addNewAddress{
  position: fixed;
  width: 100%;
  height: 48px;
  text-align: center;
  line-height: 48px;
  bottom: 0;
  left: 0;
  background: @bgColor;
  color: white;
  font-size: 18px;
  display: flex;
  a,view{
    flex:1;
  }
  view{
    background: @normalFontColor;
  }
  a{
     background: @bgColor;
  }
}
.no_address{
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: @normalFontColor;
  img{
    width: 80px;
    height: 80px;
  }
}
.address_box{
  padding-bottom: 49px;
}
</style>
