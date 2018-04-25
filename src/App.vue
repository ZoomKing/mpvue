<script>
import api from './api'
import commonApi from '@/utils/commonApi'
import  global from './global'

export default {
  mpType: 'app',
  data(){
    return {
    }
  },
  onLaunch(){
    func.getSalt();
    wx.getSystemInfo({
      success(res){
        global.requestHeaderInfo = {
            deviceID:res.brand+res.model
        }
      }
    })
  },
  
}
const func ={
  async getSalt(){
    let a = await commonApi.getSalt();
    global.requestHeaderInfo.salt = a.value;
    func.get_config();
  },
  async get_config(){ 
     const res = await commonApi.getConfig();
      global.imgUrlPrefix = res.value.imgUrlPrefix+'/';
      global.serviceTel = res.value.serviceTel;
  }
}
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
</style>
