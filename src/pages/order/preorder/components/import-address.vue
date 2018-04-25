<template lang="pug">
.import_address
    .fill(@tap='cancel')
    .import_address_style
        view(@tap='wxImport') {{'从微信导入'}}
        a(:href='aHref') {{'手动添加'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import api from '../api'
export default {
  props:{
     
  },
  computed: {
      aHref(){
          return `/pages/order/newAddress`
      }
  },
  mounted () {
    
  },
  onReachBottom () {
    
  },
  methods: {
      ...mapMutations(['changeImportAddressState','changeShowAddress']),
      cancel(){
          this.changeImportAddressState(false)
      },
      wxImport(){
            this.changeImportAddressState(false);
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
                        'isDefault':true
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
  components:{
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.import_address{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .fill{
        flex:1;
    }
    .import_address_style{
        height: 108px;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 14px;
        background: white;
        text-align: center;
        line-height: 54px;
        >button,>a{
            height: 54px;
        }
        >button:nth-child(1){
            border-bottom: 1px solid #f7f8fa;
        }
    }
}
</style>
