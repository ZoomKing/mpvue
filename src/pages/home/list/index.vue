<template lang="pug">
.container
  img.home_banner(v-for='(item,index) in adQueryImg',:key='index',:src='item.img',mode='widthFix',:lazyLoad='lazy',@tap='checkLink(item.link)')
  view#PintuanTabUlBox(:class="{isFixed:isFixed}")
    PintuanTabUl(:dataInfo='tabArr',:defaultIndex='defaultIndex',@listenFromPintuanTabUl='listenFromPintuanTabUl',:isFixed='isFixed')
  view.blank_view(v-if='isFixed')
  .home_view_ul
    homeItem(
      v-for='(item,index) in pintuanData',
      :item = 'item',true
      :key='index',:dataInfo='item')
    
  downloadApp(:state='downloadAppState',@listenFromDownload='listenFromDownload',v-if='downloadAppState')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import global from '@/global'
import homeItem from '@/components/home-item'
import request from '@/utils/request'
import api from './api'
import {checkScheme,setTabBar} from '@/utils'
import downloadApp from '@/components/downloadApp'
import PintuanTabUl from './components/pintuanTabUl'
export default {
  data(){
    return{
      suolun:'suolun',
      pintuanData : [],
      tabArr:[],
      currentPage:1,
      isCurrentPage:1,
      pageCount:1,
      adQueryImg:[],
      lazy:true,
      downloadAppState:false,
      // 默认的第一个
      defaultIndex:0,
      // PintuanTabUl节点
      tabUlBoxDomTop:null,
      // 判断是否需要fixed定位
      isFixed:false,
      className:''
    }
  },
  components: {
    homeItem,downloadApp,PintuanTabUl
  },
  computed: {
    ...mapState([
      
    ]),
    webViewHref(){
       return `/pages/home/webView`
    }
  },
  onShow(){
    //禁止分享
    // wx.hideShareMenu();
    // this.pintuanData = [];
    // this.currentPage = 1;
    // this.isCurrentPage = 1;
    // this.pageCount = 1;
    //  this.getPintuanList(this.currentPage);
    // this.getQuery(13);
    // this.adQueryImg =[];
    this.downloadAppState =false;
    
    // setTabBar();
     
  },
  onReady(){
    // setTabBar();
  },
  mounted () {
    this.getQuery(13);
    this.getPintuanGroups();
    
  },
  onReachBottom () {
    if(this.currentPage==this.isCurrentPage && this.currentPage<=this.pageCount){
      this.getPintuanList(this.className,this.currentPage);
    }
  },
  methods: {
    ...mapActions([
      
    ]),
    async getPintuanList(groupName,currentPage){
      let pintuanListData  = await api.getPintuanList(groupName,currentPage);
      this.pintuanData.push(...pintuanListData.value.values);
      this.pageCount = pintuanListData.value.pageCount;
      this.currentPage++;
      this.isCurrentPage = this.currentPage;
      // console.log(pintuanListData.value)
    },
    listenFromPintuanTabUl(msg){
      this.defaultIndex = msg;
      this.className = this.tabArr[msg];
      this.currentPage = 1;
      this.pintuanData = [];
      this.getPintuanList(this.className,this.currentPage);
    },
    //广告位
    async getQuery(positionId){
      this.adQueryImg =[];
      const res = await api.get_query(positionId);
      // let wip = JSON.parse(res.value.values[0].data);
      res.value.values.forEach((item,index)=>{
        let wipImg = JSON.parse(item.data).img;
        let wipLink = JSON.parse(item.data).link;
          this.adQueryImg.push({
            'img':global.imgUrlPrefix+wipImg+"@!1200",
            'link':wipLink
          })
      })
    },
    async getPintuanGroups(){
      let wipRes = await api.getPintuanGroups();
      // console.log(wipRes);
      if(wipRes.succ){
          this.tabArr = wipRes.value.groups;
          this.className = wipRes.value.groups[0];
          this.getPintuanList(this.className,this.currentPage);
          this.getTabUlTop();
      }
     
    },
    checkLink(link){
      if(checkScheme(link)){
          this.downloadAppState =true;
      }else{
        return false
      }
    },
    listenFromDownload(msg){
      this.downloadAppState = msg
    },
    //获取拼团分类的高度
    getTabUlTop(){
        let wipDom = wx.createSelectorQuery();
        //选择id
        wipDom.select('#PintuanTabUlBox').boundingClientRect()
        wipDom.exec((res)=>{
          //取高度
          console.log(res[0].top);
          this.tabUlBoxDomTop = res[0].top;
          // 为了避免出现高度等于0的情况，用递归再次获取高度
          if(this.tabUlBoxDomTop==0){
              this.getTabUlTop()
          }
        })
    }
  },
  onPageScroll(e){
    // this.getTabUlTop();
    //获取一个dom距离顶部的距离是480，但是当滚动条滚到dom顶部的时候，才380左右，差的距离就是navi的高度，现默认100
    // console.log(this.tabUlBoxDomTop)
    
    if((e.scrollTop+100)>=this.tabUlBoxDomTop){
      // console.log(e.scrollTop+100)
        // console.log('suolun')
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
  }
}
</script>

<style lang="less">
.container{
  width: 375px;
  .home_banner{
    width: 100%;
  }
  .home_view_ul{
    width: 100%;
    padding:  10px 16px;
    box-sizing: border-box;
    background: #f7f8fa;
  }
}
.blank_view{
  height: 38px;
}
#PintuanTabUlBox{
  background: white;
}
.isFixed{
  position: fixed;
  top: 0;
}

</style>
