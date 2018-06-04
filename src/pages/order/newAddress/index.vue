<template lang="pug">
.address
    .address-item
        .address-item-name {{'收货人姓名'}}
        input(placeholder='请点击输入',v-model='addressName')
    .address-item
        .address-item-name {{'手机号码'}}
        input(placeholder='请点击输入',v-model='addressPhoneNumber',maxlength='11')
    .address-item
        picker(mode="region",@change="bindRegionChange",value='region')
            view.picker {{region[0]+region[1]+region[2]}}
        img(src='/static/assets/usercenter_more_orders_arrow_16@3x.png')
    .address-detailed
        .address-item
            .address-item-name {{'详细地址'}}
            input(placeholder='请点击输入',v-model='addressDetailAddress')
        view
            img(:src='imgSrc',@click='changeDefaultAddress')
            text {{'设置为默认地址'}}
    #save_address(@click='saveAddress') {{'保存'}}
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import {checkMobile} from '@/utils'
import api from './api'
export default {
  data(){
      return {
           region: ['省份', '城市', '区县'],
           addressName:'',
           addressPhoneNumber:'',
           addressDetailAddress:'',
           addressIsDefault:false,
           addressInfo:{},
      }
  },
  computed: {
      imgSrc(){
          if(this.addressIsDefault){
              return  `/static/assets/payment_check_common_icon@3x.png`
          }else{
              return  `/static/assets/payment_uncheck_common_icon@3x.png`
          }
          
      }
  },
  mounted () {
    
  },
 
  onReachBottom () {
    
  },
  methods: {
    ...mapMutations([  
        'changeShowAddress',
    ]),
    bindRegionChange: function (e) {
        let isTrue = true;
        
        e.target.value.forEach((item,index)=>{
            if(!item){
                isTrue = false
            }
        })
        if(isTrue){
            this.region = e.target.value;
        }else{
            wx.showToast({
                title: '选择区域地址失败，请重新选择',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        
    },
    changeDefaultAddress(){
        this.addressIsDefault = !this.addressIsDefault;
    },
    saveAddress(){
        this.addressInfo = {
            region:this.region.join(';'),
            address:this.addressDetailAddress,
            name:this.addressName,
            phone:this.addressPhoneNumber,
            isDefault:this.addressIsDefault
        }
        if(this.addressName.replace(/(^\s*)|(\s*$)/g, "")==''){
            wx.showToast({
                title: '请输入收货人姓名',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if(!checkMobile(this.addressPhoneNumber)){
            wx.showToast({
                title: '请输入正确的手机号码',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if(this.region.join('')=='省份城市区县'){
            wx.showToast({
                title: '请选择省份/城市/区县',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if(this.addressDetailAddress.replace(/(^\s*)|(\s*$)/g, "")==''){
            wx.showToast({
                title: '请输入详细地址',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        // console.log(this.addressInfo);
        this.addNewAddress(this.addressInfo);
       
    },
    async addNewAddress(obj){
        const res = await api.add_new_address(obj);
        if(res.succ){
            this.changeShowAddress(obj);
            this.addressName = '';
            this.addressPhoneNumber = '';
            this.addressDetailAddress = '';
            this.addressIsDefault = '';
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
.address{
    border-top: 1px solid #f4f4f4;
    .address-item{
        display: flex;
        width: 335px;
        position: relative;
        margin: 0 auto;
        border-bottom: 1px solid #f4f4f4;
        height: 54px;
        justify-content: space-between;
        font-size: 14px;
        align-items: center;
        .address-item-name{
            width: 100px;
        }
        picker{
            width: 100%;
            line-height: 54px;
        }
        input{
            text-align: right;
        }
        >img{
            position: absolute;
            right: 0px;
            top: 17px;
            width: 20px;
            height: 20px;
        }
    }
    .address-detailed{
        border-bottom: 1px solid #f4f4f4;
        height: 100px;
        .address-item{
             border-bottom: 0;
        }
        >view:nth-child(2){
            padding-left: 20px;
            height: 46px;
            display: flex;
            align-items: center;
            font-size: 12px;
            >img{
                margin-right: 10px;
                width: 16px;
                height: 16px;
            }
        }
    }
    #save_address{
        width: 375px;
        height: 48px;
        background: @bgColor;
        color: white;
        position: fixed;
        bottom: 0;
        line-height: 48px;
        text-align: center;
        font-size: 18px;
    }
}
</style>
