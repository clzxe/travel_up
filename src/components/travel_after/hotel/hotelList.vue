<template>
  <div >
    <VNav :currentNav="5" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">酒店列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="text"  v-model="scenicName" class="textbox textbox_225" placeholder="输入景点查询..." v-on:input="scenicName1" />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
          <div style="margin-left: 225px;" v-show="scenicShow">
            <div class="el-select-dropdown el-popper"
                 style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                 x-placement="bottom-start">
              <div class="el-scrollbar" style="">
                <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                  <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                    <li class="el-select-dropdown__item" v-for="(item,index) in selectScenic" :key="index" v-on:click="setScenicVal(item)">{{item.scenicName}}</li>
                  </ul>
                </div>
                <div class="el-scrollbar__bar is-horizontal">
                  <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                </div>
                <div class="el-scrollbar__bar is-vertical">
                  <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                </div>
              </div><!---->
              <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
            </div>
          </div>

        </section>
        <table class="table table-bordered">
          <thead>
          <tr>
            <input type="checkbox" name="id">
            <th>酒店名称</th>
            <th>附近景点</th>
            <th>酒店地址</th>
            <th>联系电话</th>
            <th>酒店图片</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody  v-for="(hotel,index) in hotelList">
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <td style="padding-left: 20px;max-width: 200px;">{{hotel.hotelName}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{hotel.scenicName}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{hotel.hotelAddr}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{hotel.hotelPhone}}</td>
            <td style="text-align: center;">
              <ul class="el-upload-list el-upload-list--picture-card" style="width: 50px;height: 50px" >
                <li class="el-upload-list__item is-success" style="width: 50px;height: 50px" >
                  <img style="width: 100%; height: 100%" :src="hotel.hotelImg" />

                </li>
              </ul>
            </td>
            <td class="center"><router-link :to="{path:'hotelUpdate',query:{hotelId:hotel.hotelId}}" title="编辑"  style="color: #c12e2a;font-size: 25px"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/bianji2.png"></router-link>
              <a  title="删除"   style="color: #00a0e9;font-size: 25px"  @click="del(hotel.hotelId)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/shanchu2.png"></a>
              <a  title="查看" data-toggle="modal"
                  data-target="#seeScenic"   style="color: #ff79c6;font-size: 29px"  @click="getScenic(hotel)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/chakan2.png"></a>
              <a  title="添加酒店房间" data-toggle="modal"
                  data-target="#hotelRoom"   style="color: #ff79c6;font-size: 29px"  @click="insert(hotel)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/fangjian.png"></a>
              <a  title="查看酒店房间" data-toggle="modal"
                  data-target="#hotelRoom"   style="color: #ff79c6;font-size: 29px"  @click="view(hotel.hotelId)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/fangjian2.png"></a>
            </td>
          </tr>
          </tbody>


        </table>
        <div class="modal fade" id="hotelRoom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 800px;height: auto">
          <div class="modal-dialog" style="width: 658px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title" id="hotelRoomLable">查看酒店</h3>
              </div>
              <div class="modal-body">
                <table class="table table-bordered" v-show="themeStatus===1">
                  <thead>
                  <tr>
                    <th><input type="checkbox" name="id" ></th>
                    <th>房间名称</th>
                    <th>房间价格</th>
                    <th>房间图片</th>
                    <th>剩余数量</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody id="showtable" v-for="(hotelRoom,index) in hotelRoomList">
                  <tr>
                    <th><input type="checkbox" name="id" ></th>
                    <td style="padding-left: 20px;max-width: 200px;">{{hotelRoom.hotelRoomName}}</td>
                    <td style="padding-left: 20px;max-width: 200px;">{{hotelRoom.hotelRoomPrice}}</td>
                    <td style="padding-left: 20px;max-width: 200px;" >
                      <ul class="el-upload-list el-upload-list--picture-card" style="width: 50px;height: 50px" >
                        <li class="el-upload-list__item is-success" style="width: 50px;height: 50px" >
                          <img style="width: 100%; height: 100%" :src="hotelRoom.hotelRoomImg" />

                        </li>
                      </ul>
                     </td>
                    <td style="padding-left: 20px;max-width: 200px;" >
                      {{hotelRoom.hotelRoomCount}}
                    </td>
                    <td class="center">
                      <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="delRoom(hotelRoom)"></a>
                      <a  title="修改"
                          class="iconfont travel-iconbianji"  style="color: #ff79c6;font-size: 29px"  @click="update(hotelRoom)"></a>
                    </td>
                  </tr>
                  </tbody>


                </table>
                <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===2">
                  <h1>主题</h1>
                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间名称：</label>

                      <el-input style="font-weight: 100;width: 60%;"  v-model="hotelRoomMessage.hotelRoomName"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间图片：</label>
                      <el-upload style="margin-top: 2%;margin-left: 20%;"
                                 :multiple="multiple"
                                 action="uploadPics"
                                 list-type="picture-card"
                                 :auto-upload="true"
                                 :class="{disabled:uploadDisabled }"
                                 :limit="1"
                                 :http-request="handleChange"
                                 :file-list="fileList"
                                 :on-remove="hangdel"
                                 ref="uploadPic1"
                      >
                        <i class="el-icon-plus"><p style="font-size: 12px">添加封面图片</p></i>
                      </el-upload>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间价格：</label>

                      <el-input style="font-weight: 100;width: 60%;"  v-model="hotelRoomMessage.hotelRoomPrice"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间数量：</label>

                      <el-input style="font-weight: 100;width: 60%;"   v-model="hotelRoomMessage.hotelRoomCount"></el-input>

                    </li>

                  </ul>


                </form>

                <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===3">
                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间名称：</label>

                      <el-input style="font-weight: 100;width: 60%;"  v-model="hotelRoomUpdate.hotelRoomName"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间图片：</label>
                      <ul class="el-upload-list el-upload-list--picture-card" style="margin-left: 20%;" v-show="imageShow" >
                        <li class="el-upload-list__item is-success"  >
                          <img style="width: 100%; height: 100%" :src="hotelRoomUpdate.hotelRoomImg" />
                          <span class="el-upload-list__item-actions" @click="delImg1()"><!----><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                        </li>
                      </ul>
                      <el-upload style="margin-top: 2%;margin-left: 20%;" v-show="uploadShow"
                                 :multiple="multiple"
                                 action="uploadPics"
                                 list-type="picture-card"
                                 :auto-upload="true"
                                 :class="{disabled:uploadDisabled }"
                                 :limit="1"
                                 :http-request="handleChange"
                                 :file-list="fileList"
                                 :on-remove="hangdel"
                                 ref="uploadPic1"
                      >
                        <i class="el-icon-plus"><p style="font-size: 12px">添加封面图片</p></i>
                      </el-upload>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间价格：</label>
                      <el-input style="font-weight: 100;width: 60%;"   v-model="hotelRoomUpdate.hotelRoomPrice"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">房间数量：</label>

                      <el-input style="font-weight: 100;width: 60%;"    v-model="hotelRoomUpdate.hotelRoomCount"></el-input>

                    </li>
                  </ul>


                </form>

                <div>
                  <div style="text-align: center;margin-top: 2%">

                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                    <el-button  class="btn btn-default"data-dismiss="modal"  @click="sub()" v-show="themeStatus===2">保存</el-button>
                    <el-button  class="btn btn-default"data-dismiss="modal"  @click="subUpdate()" v-show="themeStatus===3">保存</el-button>

                  </div>
                </div>
              </div>

            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>
        <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 800px;height: auto">
          <div class="modal-dialog" style="width: 658px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title" id="seeScenicLabel">查看酒店</h3>
              </div>
              <div class="modal-body">
                <form  method="post" name="travel-cus" class="cusForm">

                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">酒店名称：</label>

                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="hotel.hotelName" ></el-input>
                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">附近景点：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="hotel.hotelScenic"></el-input>

                    </li>

                    <li style="margin-top: 2%">
                      <label style="width: 98px">地址：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="hotel.hotelAddr"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">  联系电话：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="hotel.hotelPhone"></el-input>
                    </li>

                    <li style="margin-top: 2%">
                      <label>酒店图片：</label>
                      <label> <ul class="el-upload-list el-upload-list--picture-card" >
                        <li class="el-upload-list__item is-success"  style="width: 146px" >
                          <img style="width: 100%; height: 100%" :src="hotel.hotelImg" />
                        </li>
                      </ul></label>

                    </li>
                  </ul>


                </form>
                <div>
                  <div style="text-align: center;">

                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>

                  </div>
                </div>
              </div>

            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>
        <div id="pags">
          <!-- 分页  -->
          <div id="pagination" style="float:left;"></div>
          <div class="pageNum" style="margin-left:30%" >
            <!--分页-->

            <ul>
              <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
              <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
              <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
                <a v-on:click="btnClick(index)">{{index}}</a>
              </li>
              <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
            </ul>
          </div>
        </div>


      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";
  export default {
    name: "lineList",
    components:{
      VNav
    },
    data(){
      return{
        imageShow:true,
        uploadShow:false,
        photo:'',
        fileList:[],
        uploadDisabled:false,
        multiple: true,
        formData: "",
        modalStatus2: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          searchScenic:0,
          pageIndex:1,
          size:10
        },
        themeStatus:1,
        ImageList:[],
        hotelList:'',
        total:'',
        hotel:[],
        scenic:[],
        scenicShow:false,
        selectScenic: [],
        scenicName:'',
        pageCount:'',
        totalData:'', all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        hotelRoomList:[],
        hotelRoomMessage:{
          hotelId:'',
          hotelRoomName:'',
          hotelRoomPrice:'',
          hotelRoomCount:''
        },
        hotelRoomUpdate:[]
      }
    },
    created: function () {
      this.init();
      this.getThemes();
    },
    computed:{
      indexs: function(){
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all>= 5){
          if(this.cur > 3 && this.cur < this.all-2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left ++
        }
        return ar
      }
    },
    methods:{
      sub() {



        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.formData.append("hotelId",this.hotelRoomMessage.hotelId);
        this.formData.append("hotelRoomName",this.hotelRoomMessage.hotelRoomName);
        this.formData.append("hotelRoomPrice",this.hotelRoomMessage.hotelRoomPrice);
        this.formData.append("hotelRoomCount",this.hotelRoomMessage.hotelRoomCount);
        this.formData.append("headImg",this.photo);
        this.$axios.post("/hotel/save_room", this.formData, config)
          .then(successResponse => {
            alert(successResponse.data.message);
            this.$router.push("/hotelList");
          })
          .catch(failRespose => {
            alert("系统错误");
          })


      },
      subUpdate() {



        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.formData.append("hotelRoomId",this.hotelRoomUpdate.hotelRoomId);
        this.formData.append("hotelId",this.hotelRoomUpdate.hotelId);
        this.formData.append("hotelRoomName",this.hotelRoomUpdate.hotelRoomName);
        this.formData.append("hotelRoomPrice",this.hotelRoomUpdate.hotelRoomPrice);
        this.formData.append("hotelRoomCount",this.hotelRoomUpdate.hotelRoomCount);
        this.formData.append("hotelRoomImg",this.hotelRoomUpdate.hotelRoomImg);
        this.formData.append("headImg",this.photo);
        this.$axios.post("/hotel/update_room", this.formData, config)
          .then(successResponse => {
            alert(successResponse.data.message);
            this.view(this.hotelRoomUpdate.hotelId)
          })
          .catch(failRespose => {
            alert("系统错误");
          })


      },
      insert(hotel){
        this.uploadDisabled=false;
        this.hotelRoomMessage.hotelRoomCount='';
        this.hotelRoomMessage.hotelRoomPrice='';
          this.hotelRoomMessage.hotelRoomName='';
        this.hotelRoomMessage.hotelId=hotel.hotelId;
        this.formData=new FormData();
        this.themeStatus=2;
      },
      view(hotelId){
        this.themeStatus=1;
        this.hotelRoomMessage.hotelId=hotelId;
        this.formData=new FormData();

        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/hotel/room_list?hotelId="+hotelId)
          .then(successReqponse => {
            this.hotelRoomList=successReqponse.data.hotelRoomList;
          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            // this.$router.push("/linesAdd");
          })


      },
      update(hotelRoom){
        this.hotelRoomUpdate=hotelRoom;
        console.log(this.hotelRoomUpdate)

        this.themeStatus=3;
        this.formData=new FormData();

      },
      delImg1(){
        //this.hotel.hotelImg='';
        this.uploadShow=true;
        this.imageShow=false;
      },
      hangdel(){
        this.uploadDisabled=false;
      },
      handleChange(file){
        this.photo = file.file;
        if(file!==undefined){
          this.uploadDisabled=true;
        }

      },
      scenicName1(){
        if (this.scenicName.length === 0) {
          this.scenicShow = false
        } else {
          this.scenicShow = true;
          var citys = [];
          this.scenic.forEach((item, index) => {
            if (item.scenicName.indexOf(this.scenicName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectScenic = citys;
        }
      },
      setScenicVal(item) {
        this.searchDate.searchScenic = item.scenicId;

        this.scenicName = item.scenicName;
        this.scenicShow = false
      },
      getThemes:function(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getThemes")
          .then(successReqponse => {
            this.scenic=successReqponse.data.scenic;
          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            // this.$router.push("/linesAdd");
          })

      },
      getScenic(hotel){
        this.hotel=hotel;
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("hotel/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.hotelList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchScenic=data.searchScenic;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },
//分页
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
      pageClick: function(){
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
      init() {
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=this.cur;
        this.$axios.post("hotel/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.hotelList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchScenic=data.searchScenic;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },

      del(hotelId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("hotel/del?hotelId="+hotelId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.push({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                this.$router.go(0)
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }

      },
      delRoom(hotelRoom) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("hotel/del_room?hotelRoomId="+hotelRoom.hotelRoomId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.push({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                this.view(hotelRoom.hotelId)
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }

      },
      subForm(){
        //获取输入框值
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=1;
        this.$axios.post("hotel/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.hotelList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchScenic=data.searchScenic;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      }
    }
  }

</script>

<style lang="less">
  .disabled .el-upload--picture-card {
    display: none !important;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }

  .modal {
    width: 1000px;
    top: 50%;
    left: 50%;
    margin-toP: -250px;
    margin-left: -400px;
    border: 1px solid #666;

  .header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #666;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
  }

  .content {
    background: orange;
    height: 290px;

  }

  .footer {
    height: 50px;
    line-height: 50px;

  button {
    vertical-align: middle;
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color: #fff;

  &.danger {
     background: red;


   }

  &.default {
     background: #ddd;
   }

  }

  }
  }
  .header_active {
    background-color: #ffd800;
    height: 37px;
  }
</style>
