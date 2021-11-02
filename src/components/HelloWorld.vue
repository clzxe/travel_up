<template>
  <div>
    <div class="row" >

      <div class="col-md-8">

        <div class="row" style="margin-top: 2%;font-size: 13px;color: #cecece;margin-bottom: 2%" >
          <div class="col-md-1"></div>
          <div class="col-md-1">
            <el-image style="border-radius:45%;width: 20px;height: 20px" src="static/images/icon_1.jpg"></el-image>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-8">  xxx ： 详细信息<i style="float: right"><img  src="@/assets/images/reply.png"></i></div>
              <div class="col-md-3" v-if="level===1">
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <div class="col-md-3" v-else-if="level===2">
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <div class="col-md-3" v-else-if="level===3">
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <div class="col-md-3" v-else-if="level===4">
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <div class="col-md-3" v-else>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
              </div>

            </div>
            <div class="row">
              <div class="row" >xxx:xxxxxx<a >删除</a></div>
            </div>
            <div class="row" style="margin-top: 2%"><a style="color: #ffb611;font-size: 12px" >更多回复</a></div>

          </div>
        </div>

      </div>
    </div>
    <el-popover
      placement="bottom"
      title="标题"
      width="500"
      height="700"
      trigger="click"
      v-model="emojiShow"
    >
      <el-button slot="reference">😀</el-button>
      <div class="browBox" >
        <ul>
          <li
            v-for="(item, index) in faceList"
            :key="index"
            @click="getBrow(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </el-popover>
    <el-button
      class="submit-btn"
      type="primary"
      @click="submitMessage"
      :disabled="content == ''"
    >发送
    </el-button>
    <el-input
      :rows="5"
      type="textarea"
      placeholder="请输入内容"
      @keyup.enter.native="submitMessage"
      v-model="content"
    >
    </el-input>
    <el-upload style="margin-top: 2%"
               :multiple="multiple"
               action="uploadPics"
               list-type="picture-card"
               :auto-upload="true"
               :limit="1"
               :http-request="handleChange"
               ref="uploadPic1"
    >
      <i class="el-icon-plus"><p style="font-size: 12px">添加封面图片</p></i>
    </el-upload>
<el-button @click="uplad">xxx</el-button>
<el-image src="http://qr1abqd9u.hn-bkt.clouddn.com/0aae7f1d-68e6-4192-a6d7-8e9ae3191ead"></el-image>
  </div>

</template>

<script>
  const appData = require("@/assets/images/emojis.json");
  import {MP} from '@/map.js'
  import emoji from "./common/emoji";
  import emotions from '@/assets/js/emotionList.js'
  export default {
    name: 'emotion-box',
    data() {
      return {
        jgNameDialog: false,
        show: false,
        postionMap:{  //地图坐标
          lng: 120.211486,
          lat: 30.256576
        },
        location: '',
        keyword: '北京市故宫',  //搜索框关键词
        zoom: 12.8,   //放大比例
        address:'',   //位置详细信息
        add:{
          siteName:'',
          site:'',
          jd:'',
          wd:'',
          desce:'',
          type:'',
          jgName:'',
          jgNum:'',
        },
        start1:false,
        start2:false,
        start3:false,
        start4:false,
        start5:false,
        organizationData:[],
        jgName:'',
        jgNum:'',
        ak:'LGVgx5ssMTH0AyM14HKD6gGtMlFmlGqu',
        checkList:[],
        //聊天输入内容
        content: "",
        //表情框是否展示
        emojiShow: false,
        //表情列表
        faceList: [],
        //表情文本
        getBrowString: "",
        isAllChecked:false,
        search:[],
        cityName:'厦门',
        level:4,
      }
    },
    mounted:function() {
      this.keyword='北京市八达岭长城';
      this.start();
      alert(this.start1)

    },

    singleChecked:function(){
      if(4===this.checkList.length){
        this.isAllChecked=true;
      }else {
        this.isAllChecked=false;
      }

    },
    chooseAll:function(e){
      if(this.checkList.length!==0){
        this.checkList=[];
      }
      if(this.isAllChecked){

      }
    },
    methods: {
      start(){
        if(this.level===1){
          this.start1=true;
          this.start2=false;
          this.start3=false;
          this.start4=false;
          this.start5=false;
        }
        else if(this.level===2){
          this.start1=true;
          this.start2=true;
          this.start3=false;
          this.start4=false;
          this.start5=false;
        }
        else if(this.level===3){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=false;
          this.start5=false;
        }
        else if(this.level===4){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=true;
          this.start5=false;
        }
        else if(this.level===5){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=true;
          this.start5=true;
        }
      },
      getPoint(e){    //点击地图获取一些信息，
        this.show = true;
        this.postionMap.lng = e.point.lng;     //通过  e.point.lng获取经度
        this.postionMap.lat = e.point.lat;     //通过  e.point.lat获取纬度
        this.add.jd = e.point.lng;
        this.add.wd = e.point.lat;
        this.zoom = e.target.getZoom()

        let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
        geocoder.getLocation(e.point,rs=>{
          this.add.site = rs.address;
          //地址描述(string)=
          // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
          // console.log(rs.addressComponents);//结构化的地址描述(object)
          // console.log(rs.addressComponents.province); //省
          // console.log(rs.addressComponents.city); //城市
          // console.log(rs.addressComponents.district); //区县
          // console.log(rs.addressComponents.street); //街道
          // console.log(rs.addressComponents.streetNumber); //门牌号
          // console.log(rs.surroundingPois); //附近的POI点(array)
          // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
        });
      },
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {
        //这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
        //并且信息窗口点击一次显示，一次消失
        //于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
        setInterval(()=>{
          this.show = true
        },100)
      },
      map(){
        var map = new BMap.Map("container",{enableMapClick:true});        //在container容器中创建一个地图,参数container为div的id属性;
        var point = new BMap.Point(120.2,30.25);    //创建点坐标
        map.centerAndZoom(point, 14);                //初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom();                //激活滚轮调整大小功能
        map.addControl(new BMap.NavigationControl());    //添加控件：缩放地图的控件，默认在左上角；
        map.addControl(new BMap.MapTypeControl());        //添加控件：地图类型控件，默认在右上方；
        map.addControl(new BMap.ScaleControl());        //添加控件：地图显示比例的控件，默认在左下方；
        map.addControl(new BMap.OverviewMapControl());  //添加控件：地图的缩略图的控件，默认在右下方； TrafficControl
        search = new BMap.LocalSearch("中国", {
          onSearchComplete: function(result){
            if (search.getStatus() == BMAP_STATUS_SUCCESS){
              var res = result.getPoi(0);
              var point = res.point;
              map.centerAndZoom(point, 11);
            }
          },renderOptions: {  //结果呈现设置，
            map: map,
            autoViewport: true,
            selectFirstResult: true
          } ,onInfoHtmlSet:function(poi,html){//标注气泡内容创建后的回调函数，有了这个，可以简单的改一下返回的html内容了。
            // alert(html.innerHTML)
          }//这一段可以不要，只不过是为学习更深层次应用而加入的。
        });
        console.log(search)
        function  setCity(){
          search.search(this.cityName);
        };
        search.search('厦门');
        console.log(search)
      },

      setCity(){
        this.search.search(this.cityName);
  },
      handleChange(file){
        this.photo = file.file;


      },
      uplad(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.formData=new FormData();
        this.formData.append('image', this.photo);
        this.$axios.post("/strategy/upload_img2", this.formData, config)
          .then(successReqponse => {
            alert(successReqponse.data.link);
            // this.$router.replace("/scenicList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })
      },
//加载表情，存放到表情列表中
      loadEmojis() {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      },
      // 获取用户点击之后的标签 ，存放到输入框内
      getBrow(index) {
        for (let i in this.faceList) {
          if (index == i) {
            this.getBrowString = this.faceList[index];
            this.content += this.getBrowString;
          }
        }
        this.emojiShow = false;
      },
      submitMessage(){
        alert(this.content.toString())
        //提交。。。
      }
    }
  }
</script>
<style lang="scss" scoped>
  .browBox {
    width: 100%;
    height: 200px;
    background: #e6e6e6;
    z-index: 100;
    bottom: 0px;
    overflow: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      li {
        cursor: pointer;
        width: 10%;
        font-size: 26px;
        list-style: none;
        text-align: center;
      }
    }
  }
  .submit-btn {
    margin: 0 15px 10px 0;
    float: right;
  }

  .map {
    width: 80%;
    height: 400px;
  }
</style>
