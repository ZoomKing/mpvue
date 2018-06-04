<template lang="pug">
.container
  img.home_banner(v-for='(item,index) in adQueryImg',:key='index', :src='item.img',mode='widthFix',@tap='checkScheme(item.link)')
  .time
      text {{'距离结束'}}
      text.active {{timeArr[0]}}
      text {{'天'}}
      text.active {{timeArr[1]}}
      text {{'时'}}
      text.active {{timeArr[2]}}
      text {{'分'}}
      text.active {{timeArr[3]}}
      text {{'秒'}}
  .home_view_ul
    centItem(
      v-for='(item,index) in centListData',
      :item = 'item',
      :key='index',:dataInfo='item')
  downloadApp(:state='downloadAppState',@listenFromDownload='listenFromDownload',v-if='downloadAppState')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import global from '@/global'
import centItem from '@/components/cent-item'
import request from '@/utils/request'
import {formatTime3,checkScheme} from '@/utils'
import downloadApp from '@/components/downloadApp'
import api from './api'
export default {
  data(){
    return{
      centListData : [],
      currentPage:1,
      isCurrentPage:1,
      pageCount:1,
      id:'',
      timeArr:['0','0','0','0'],
      adQueryImg:[],
      downloadAppState:false
    }
  },
  onShow(){
    //禁止分享
    // wx.hideShareMenu()
    // this.centListData = [];
    // this.currentPage = 1;
    // this.isCurrentPage = 1;
    // this.pageCount = 1;
    //  this.getQuery(14);
    // this.getCurrentDrawFunc();
    // this.adQueryImg =[];
    this.downloadAppState =false;
  },
  components: {
    centItem,downloadApp
  },
  computed: {
    ...mapState([
      
    ]),
  },
  mounted () {
    this.getQuery(14);
    this.getCurrentDrawFunc();
    
  },
  onReachBottom () {
    if(this.currentPage==this.isCurrentPage && this.currentPage<=this.pageCount){
      this.getCentDrawListFunc(this.id,this.currentPage);
    }
  },
  methods: {
    ...mapActions([
      
    ]),
    async getCentDrawListFunc(id,currentPage){
      let centDrawListData  = await api.getCentDrawList(id,currentPage);
      this.centListData.push(...centDrawListData.value.values);
      this.pageCount = centDrawListData.value.pageCount;
      this.currentPage++;
      this.isCurrentPage = this.currentPage;
    },
    async getCurrentDrawFunc(){
      let data = await api.getCurrentDraw();
      this.id = data.value.id;  
      this.getCentDrawListFunc(this.id,this.currentPage);
      setInterval(()=>{
        this.timeArr = formatTime3(data.value.endTime);
      },1000)
      
    },
     //广告位
    async getQuery(positionId){
      this.adQueryImg =[]; 
      const res = await api.get_query(positionId);
      // let wip = JSON.parse(res.value.values[0].data);
      // this.adQueryImg = global.imgUrlPrefix+ wip.img +'@!1200'
      res.value.values.forEach((item,index)=>{
        let wipImg = JSON.parse(item.data).img;
        let wipLink = JSON.parse(item.data).link;
          this.adQueryImg.push({
            'img':global.imgUrlPrefix+wipImg+"@!1200",
            'link':wipLink
          })
      })
    },
    checkScheme(link){
      if(checkScheme(link)){
          this.downloadAppState =true;
      }else{
        return false
      }
    },
    listenFromDownload(msg){
      this.downloadAppState = msg
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
    padding: 16px;
    box-sizing: border-box;
    background: #f7f8fa;
  }
  .time{
     line-height: 60px;
     font-size: 12px;
     display: flex;
     align-items: center;
     .active{
       width: 20px;
       height: 20px;
       background: #333234;
       text-align: center;
       line-height: 20px;
       color: white;
       margin: 0 5px;
       display: inline-block;
     }
  }
}

</style>
