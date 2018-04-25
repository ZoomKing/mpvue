<template lang="pug">
.address
    .address_box
      addressItem(v-for='(item,index) in addressList',:key='index',:dataInfo='item')
    a.addNewAddress(@click='toNewAddress') {{'添加新地址'}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import addressItem from './components/address-item'
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
    async getAddressList(){
      const res = await api.get_address_list()
        this.addressList = res.value
    },
    toNewAddress(){
      wx.redirectTo({
         url:`/pages/order/newAddress`
      })
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
}
.address_box{
  padding-bottom: 49px;
}
</style>
