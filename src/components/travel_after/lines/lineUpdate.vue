<template>
  <div id="app">
    <VNav :currentNav="2" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增产品</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div class="form-group">
            <label class="col-sm-2 control-label">产品标题</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%"  v-model="lineMessage.lineTitle" id="title" name="title" placeholder="产品标题" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">产品简介</label>
            <div class="col-sm-10">
              <el-input type="textarea"  style="width: 60%" name="description" v-model="lineMessage.lineDescription" placeholder="产品标题" required="required"></el-input>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">产品封面</label>
            <div class="col-sm-10" style="max-width: 300px;">
              <ul class="el-upload-list el-upload-list--picture-card" v-show="imageShow" >
                <li class="el-upload-list__item is-success"  >
                  <img style="width: 100%; height: 100%" :src="lineMessage.linePhoto" />
                  <span class="el-upload-list__item-actions" @click="delImg1()"><!----><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                </li>
              </ul>
              <el-upload style="margin-top: 2%" v-show="uploadShow"
                         :multiple="multiple"
                         action="uploadPics"
                         list-type="picture-card"
                         :auto-upload="true"
                         :class="{disabled:uploadDisabled }"
                         :limit="1"
                         :http-request="handleChange"
                         :file-list="fileList"
                         ref="uploadPic1"
              >
                <i class="el-icon-plus"><p style="font-size: 12px">添加封面图片</p></i>
              </el-upload>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">目的城市</label>

            <div class="col-sm-10">
              <div>
                省:<el-input type="text" v-model="provinceName" style="width:58%" placeholder="省份名称" required="required" v-on:focus="provinceName1" v-on:input="provinceName1"> </el-input>

                <div style="margin-top: 1%" v-show="isshow">
                  <div class="el-select-dropdown el-popper"
                       style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                       x-placement="bottom-start">
                    <div class="el-scrollbar" style="">
                      <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                        <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                          <li class="el-select-dropdown__item" v-for="item in selectProvince" @mousedown="setVal(item)">{{item.provinceName}}</li>
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
              </div>
              <div style="margin-top: 2%">
                市<el-input type="text" v-model="cityName" style="width:58%" placeholder="市名称" required="required" v-on:focus="cityName1" v-on:input="cityName1"></el-input>

                <div style="margin-top: 1%" v-show="cityShow">
                  <div class="el-select-dropdown el-popper"
                       style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                       x-placement="bottom-start">
                    <div class="el-scrollbar" style="">
                      <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                        <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                          <li class="el-select-dropdown__item" v-for="item in selectCitys" v-on:click="setCityVal(item)">{{item.cityName}}</li>
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
              </div>

            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">景点</label>
            <div class="col-sm-10">
              <div class="row">
                <el-select style="margin-left: 1%"  v-model="scenicName" >
                  <el-option  v-for="(item,index) in scenicList" :value="item.scenicName" :key="index" @click.native="addTypeNmme(item)">{{item.scenicName}}</el-option>

                </el-select>
              </div>
              <div class="row" style="margin-top:1%">
                <span style="height: 40px;margin-left: 1%;border: #85da98 1px solid;color: #5bc0de" v-for="(che,c_index) in checkGroup">{{che.scenicName}}<i class="el-icon-error" style="color: red" @click="delTypeName(c_index)"></i></span>
              </div>

            </div>
          </div>

            <div class="form-group">
            <label class="col-sm-2 control-label">旅游天数</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" id="activeDays" name="activeDays" v-model="lineMessage.lineTotalTime" required="required" ></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">主题类型</label>
            <div class="col-sm-10" >
              <el-select @change="changeTheme()" v-model="classId">
                <el-option v-for="(item2,index) in classList" :value="item2.className" :key="index" >{{item2.className}}</el-option>
              </el-select>
              <el-select @change="setTheme()" v-model="themeName"  >
                <el-option v-for="(item2,index) in themes" :value="item2.themeName" :key="index" >{{item2.themeName}}</el-option>
              </el-select>

            </div>

          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">是否包含酒店</label>
            <div class="col-sm-10" >
              <el-select @change="changehotel()" v-model="isIncloudHotel">
                <el-option value="是" >是</el-option>
                <el-option value="否" >否</el-option>
              </el-select>


            </div>

          </div>
          <div class="form-group" v-show="isIncloudHotel===1">
            <label class="col-sm-2 control-label">酒店：</label>
            <div class="col-sm-10" >
              <el-select @change="changeHotel2()" v-model="hotelName">
                <el-option v-for="(item2,index) in hotelList" :value="item2.hotelName" :key="index" >{{item2.hotelName}}</el-option>
              </el-select>
              <el-select @change="setRoom()" v-model="roomName"  >
                <el-option v-for="(item2,index) in hotelRoomList" :value="item2.hotelRoomName" :key="index" >{{item2.hotelRoomName}}</el-option>
              </el-select>

            </div>
          </div>
          <div class="form-group" >
            <label class="col-md-2 control-label">产品特色</label>
            <el-button class="el-icon-plus btn  btn-lg" style="color: #ffb611;size: 20px" data-toggle="modal"
                       data-target="#myModal"></el-button>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true" style="width: 800px;height: auto">
              <div class="modal-dialog" style="width: 658px;height: auto">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">添加图片</h4>
                  </div>
                  <div class="modal-body">
                    <div>
                      <ul class="el-upload-list el-upload-list--picture-card" >
                        <li class="el-upload-list__item is-success" v-for="(item,index) in ImageList" >
                          <img style="width: 100%; height: 100%" :src="item.filePath" />
                          <span class="el-upload-list__item-actions" @click="delImg(item,index)"><!----><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                        </li>
                        <li class="el-upload-list__item is-success">
                          <el-upload
                            :multiple="multiple"
                            action="123"
                            list-type="picture-card"
                            :auto-upload="false"
                            :http-request="uploadFile"

                            ref="uploadPic"
                          >
                            <i class="el-icon-plus"></i>
                          </el-upload>
                        </li>
                      </ul>

                    </div>
                    <div>
                      <center>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                <el-button type="primary"  @click="addSomePeoplePicsForm" class="btn btn-default" data-dismiss="modal">下一步</el-button>
            </span>
                      </center>
                    </div>
                  </div>

                </div><!-- /.modal-content -->
              </div><!-- /.modal -->
            </div>
          </div>
          <input type="hidden" name="scenicDesc" id="scenicDesc"/>
          <div class="form-group" >
            <label class="col-md-2 control-label">行程安排</label>
            <el-button class="el-icon-plus btn  btn-lg" style="color: #ffb611;size: 20px" data-toggle="modal"
                       data-target="#myModal2" @click="getTravel(lineMessage.lineId)"></el-button>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true" style="width: 900px;height: auto">
              <div class="modal-dialog" style="width:900px;height: auto">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModal2Label">添加行程</h4>
                  </div>
                  <div class="modal-body">

                    <div class="tableDate">
                      <div class="button" style="width:6%;float:right;">
                        <P>
                          <el-button class="el-icon-plus" @click.prevent="addRow()"></el-button>
                        </P>
                        <p>
                          <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>
                        </p>
                      </div>
                      <div class="table">
                        <el-table
                          :data="tableData"
                          ref="table"
                          tooltip-effect="dark"
                          border
                          stripe
                          style="width: 93%"
                          @selection-change='selectRow'>
                          <el-table-column type="selection" width="45" align="center"></el-table-column>
                          <el-table-column label="序号" prop="rowNum" type="index" width="60" align="center"></el-table-column>
                          <el-table-column label="时间" align="center">
                            <template slot-scope="scope">
                              <el-input prop="travelTimeTime" type="textarea" class="post_name"
                                        v-model="scope.row.travelTimeTime"></el-input>
                              <!--<el-input v-model="scope.row.post_id"></el-input>-->
                            </template>
                          </el-table-column>
                          <el-table-column label="餐饮">
                            <template slot-scope="scope">
                              <el-input prop="travelTimeFood" class="require_des" type="textarea" v-model="scope.row.travelTimeFood"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="活动">
                            <template slot-scope="scope">
                              <el-input prop="travelTimeActivity" type="textarea" class="remark"
                                        v-model="scope.row.travelTimeActivity"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="住宿">
                            <template slot-scope="scope">
                              <el-input prop="travelTimeHotel" type="textarea" class="remark" v-model="scope.row.travelTimeHotel"></el-input>
                            </template>
                          </el-table-column>


                        </el-table>

                        <div>
                          <div style="text-align: center;margin-top: 3%;">
            <span slot="footer" class="dialog-footer" style="margin-top: 2%">
               <el-button class="btn btn-primary" @click="setData()">保存数据</el-button>
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
            </span>
                          </div>
                        </div>
                      </div>

                    </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
                </div>
              </div>
            </div>

          </div>
          <input type="hidden" name="tripDesc" id="tripDesc"/>
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-10">
              <el-button  class="btn btn-primary" @click="sub()">保存</el-button>
            </div>
          </div>

        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";

  export default {
    name: "lineAdd",
    data() {
      return {
        isIncloudHotel:'',
        hotelName:'',
        roomName:'',
        hotelList:[],
        hotelRoomList:[],
        imageShow:true,
        uploadShow:false,
        fileList:[],
        uploadDisabled:false,
        multiple: true,
        formData: "",
        tableData: [],
        selectlistRow: [],
        rowNum:1,
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus: false,
        modalStatus2: false,
        m_title: "添加旅游行程",
        m_content: "我是首页的内容",
        themeName:'',
        scenicName:'',
        checkGroup:[],
        formData: "",
        scenic:[],
        isshow: false,
        cityShow: false,
        scenicShow:false,
        selectCitys: [],
        selectProvince: [],
        selectScenic: [],
        provinceName: '',
        provinceList: [],
        provinceId:'',
        classList:[],
        scenicList:[],
        cityList: [],
        cityName: '',
        cityList: [],
        lineMessage:[],
        ImageList:[],
        travelTimesList:[],
        travelTimes:[],
        line:[],
        classId:'',
        themes:[],
        scenic:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    watch:{

    },
    methods: {
      changeHotel2(){

        this.hotelList.forEach((item, index) => {
          if (item.hotelName.indexOf(this.hotelName) >= 0) {
            this.lineMessage.hotelId=item.hotelId;
          }
        })
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/hotel/room_list/?hotelId=" +  this.lineMessage.hotelId)
          .then(successReqponse => {
            if (successReqponse.Message === 'error') {
              alert(successReqponse.ERROR);

            } else {
              this.hotelRoomList = [];
              this.hotelRoomList = successReqponse.data.hotelRoomList;

            }
          })
          .catch(failRespose => {
            alert("数据加载错误！正在重新载入...");
            this.$router.push("/linesAdd");
          })

      },
      changehotel(){
        if(this.isIncloudHotel==='是'){
          this.lineMessage.isIncludeHotel=1;
          alert(this.lineMessage.isIncludeHotel)
        }else {
          this.lineMessage.isIncludeHotel=2;
        }
      },
      setRoom(){
        this.hotelRoomList.forEach((item, index) => {
          if (item.roomName.indexOf(this.roomName) >= 0) {
            this.lineMessage.roomId=item.roomId;
          }
        })

      },
      addTypeNmme(item){
        this.checkGroup.push(item.scenicId);
      },
      delTypeName(index){
        this.checkGroup.splice(index,1);
      },
      provinceName1 () {

        if (this.provinceName.length === 0) {
          this.isshow = false
        } else {
          this.isshow = true;
          var citys = []
          this.provinceList.forEach((item, index) => {
            if (item.provinceName.indexOf(this.provinceName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectProvince = citys;
        }
      },
      cityName1 () {
        if (this.cityName.length === 0) {
          this.cityShow = false
        } else {
          this.cityShow = true;
          var citys = [];
          this.cityList.forEach((item, index) => {
            if (item.cityName.indexOf(this.cityName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectCitys = citys;
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
      getTravel(lineId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getTimes?lineId=" + lineId)
          .then(successReqponse => {
            this.tableData = successReqponse.data.travel_times;
            this.rowNum=successReqponse.data.travel_times.length+1;
            this.oldNum=successReqponse.data.rowNum;
            console.log(this.rowNum)
            console.log(successReqponse.data.travel_times)
          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            this.getTravel(lineId)
          })
      },
      delImg1(){
        this.scenicMessage.scenicImg='';
        this.uploadShow=true;
        this.imageShow=false;
      },
      setTheme(){
        this.themes.forEach((item, index) => {
          if (item.themeName.indexOf(this.themeName) >= 0) {
            this.lineMessage.themeId=item.themeId;
          }
        })

      },

      handleChange(file){
        this.photo = file.file;
        if(file!==undefined){
          this.uploadDisabled=true;
        }
        else {
          this.uploadDisabled=false;
        }

      },
      hangdel(){
        this.uploadDisabled=false;
      },
      uploadFile(file) {
        this.formData.append('file', file.file);
      },
      addSomePeoplePicsForm: function () {
        let self = this;
        // this.formPicsData = new FormData();
        this.$refs.uploadPic.submit();
        this.modalStatus2=false;
        /*var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/scenic/upload", qs.stringify(self.formPicsData), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/scenicList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })
        //this.$ajax.post这个地方需要在main.js进行简单配置
        this.$ajax.post("/uploadPics", this.formPicsData, config).then(res => {
          //TODO：具体自己逻辑部分
        }).catch(res => {
          this.$message.info("服务器走丢了!");
        });*/
      },
      delImg(fileId,index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.$axios.post("line/delFile?fileId="+fileId,config)
          .then(successResponse=>{
            if(successResponse.data==="noLogin"){
              alert("没有登录")
              this.$router.replace({path:'/adminLogin'})
            }
            else {
              alert("删除成功")
              this.ImageList.splice(index,1);
            }
          })
          .catch(failResponse=>{
            alert("响应异常")
          })
      },
      changeCity: function () {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/getCityList?provinceId=" + this.provinceId)
          .then(successReqponse => {
            if (successReqponse.Message === 'error') {
              alert(successReqponse.ERROR);

            } else {
              this.cityList = [];
              this.cityList = successReqponse.data.cityList;

            }
          })
          .catch(failRespose => {
            alert("数据加载错误！正在重新载入...");
            this.$router.push("/scenicAdd");
          })
      },
      changeScenic: function () {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/getScenicCity?cityId=" + this.lineMessage.cityId)
          .then(successReqponse => {
            if (successReqponse.Message === 'error') {
              console.log(successReqponse.ERROR);

            } else {
              this.scenicList = [];
              this.scenicList = successReqponse.data.scenicList;

            }
          })
          .catch(failRespose => {
            console.log("数据加载错误！正在重新载入...");
            //this.$router.push("/scenicAdd");
          })
      },
      changeTheme: function () {
        var classId='';
        this.classList.forEach((item, index) => {
          if (item.className.indexOf(this.classId) >= 0) {
            classId=item.classId;
          }
        })
        alert(classId)
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/getThemClass?classId=" + classId)
          .then(successReqponse => {
            if (successReqponse.Message === 'error') {
              alert(successReqponse.ERROR);

            } else {
              this.themes = [];
              this.themes = successReqponse.data.themeList;

            }
          })
          .catch(failRespose => {
            alert("数据加载错误！正在重新载入...");
            this.$router.push("/scenicAdd");
          })
      },
      setVal(item) {
        this.provinceId=item.provinceId
        this.provinceName = item.provinceName;
        this.isshow = false;
        this.changeCity();
      },
      setCityVal(item) {
        this.lineMessage.cityId = item.cityId;
        this.cityName = item.cityName;
        this.cityShow = false
        this.changeScenic();
      },
      setScenicVal(item) {
        this.scenicName = item.scenicName;
        this.scenicShow = false
      },
      getThemes:function(){
        this.lineId=this.$route.query.lineId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getLines?lineId="+this.lineId)
          .then(successReqponse => {
            this.themes=successReqponse.data.themes;
           // this.line=successReqponse.data.line;
            this.ImageList=successReqponse.data.ImageList;
            this.lineMessage=successReqponse.data.line;
            this.scenicList=successReqponse.data.scenic;
            this.tableData = successReqponse.data.travelTimes;
            this.rowNum=successReqponse.data.travelTimes.length+1;
            this.classList=successReqponse.data.classList;
            this.provinceList=successReqponse.data.provinceList;
            this.classId=this.lineMessage.className;
            this.themeName=this.lineMessage.themeName;
            this.hotelList=successReqponse.data.hotelList;
            this.provinceName=this.lineMessage.provinceName;
            this.cityName=this.lineMessage.cityName;
            this.checkGroup=successReqponse.data.scenicList;
            if(this.lineMessage.isIncludeHotel===1){
              this.isIncloudHotel='是'
            }
            else {
              this.isIncloudHotel='否'
            }
            this.hotelName=successReqponse.data.hotel.hotelName;
            this.roomName=successReqponse.data.hotel_room.hotelRoomName;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
           // this.$router.push("/lineUpdate?lineId="+this.lineId);
          })

      },


      sub() {

        if (this.lineMessage.lineTitle === "") {
          alert("标题不能为空");
          return false;
        }


//			alert(editor.txt.html());


        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.formData.append("lineId",this.lineMessage.lineId);
        this.formData.append('lineTitle',this.lineMessage.lineTitle);
        this.formData.append('lineDescription',this.lineMessage.lineDescription);
        this.formData.append('lineScenic',this.lineMessage.lineScenic);
        this.formData.append('lineTotalTime',this.lineMessage.lineTotalTime);
        this.formData.append('themeId',this.lineMessage.themeId);
        this.formData.append('isIncludeHotel',this.lineMessage.isIncludeHotel);
        this.formData.append('lineCreatTime',this.lineMessage.lineCreatTime);
        this.formData.append('hotelId',this.lineMessage.hotelId);
        this.formData.append('roomId',this.lineMessage.roomId);
        this.formData.append('linePhoto',this.lineMessage.linePhoto);
        this.formData.append('headFile',this.photo);
        this.$axios.post("/line/update", this.formData, config)
          .then(successReqponse => {
            for(var i=0;i<this.travelTimesList.length;i++){
              alert(this.travelTimesList.length)
              console.log(JSON.stringify(this.travelTimesList[i]))
              this.$axios.post("/line/update_time", qs.stringify(this.travelTimesList[i]), config)
                .then(successReqponse => {

                })
                .catch(failRespose => {
                  alert("系统错误2");
                });

            }
            if (i === this.travelTimesList.length) {
              alert("保存成功");
              // this.$router.push("/lineList");
            }
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },

      checkNum() {
        var num=0;
        var themeList=this.lineMessage.themeId;
        for (var i = 0; i < themeList.length; i++)
          if (themeList[i].checked) num++;
        if (num < 1) {
          alert("至少要选择一个复选框");
          return false;
        }
      },
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
      // 增加行
      addRow () {
        var list = {
          rowNum:this.rowNum,
          travelTimeId:0,
          travelTimeLineId:this.lineMessage.lineId,
          travelTimeTime:'',
          travelTimeFood: '',
          travelTimeActivity:'',
          travelTimeHotel:''
        };
        this.tableData.push(list)
        this.rowNum += 1;
      },
      // 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          alert('111')
          let val = this.selectlistRow;
          console.log(val)
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引

                if(confirm("确实要删除吗？")){
                  if(val.travelTimeId===0){
                    this.tableData.splice(i, 1);
                  }
                  else {
                    var qs=require('querystring')
                    let config={
                      header:{'Content-type':'application/x-www-form-urlencoded'}
                    };
                    this.$axios.post("line/delTime?travelTimeId="+val.travelTimeId,config)
                      .then(successResponse=>{
                        if(successResponse.data==="OK") {
                          alert("删除成功")
                          this.tableData.splice(i, 1);
                        }
                        else {
                          alert(successResponse.data);
                        }
                      })
                      .catch(failResponse=>{
                        alert("响应异常")
                      })
                  }


                }else {
                  alert("已经取消了删除操作");
                }
                //删除的方法
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection()
      },
      setData () {
        this.tableData.forEach((v, i) => {
          this.travelTimesList.push({"rowNum":v.rowNum,"travelTimeId":v.travelTimeId,"travelTimeLineId":this.lineMessage.lineId,"travelTimeTime":v.travelTimeTime,"travelTimeFood":v.travelTimeFood,"travelTimeActivity":v.travelTimeActivity,"travelTimeHotel":v.travelTimeHotel});
          console.log(this.travelTimesList)})
        this.modalStatus2=false;
      },
    deleteImg(fileId){
      if(confirm("确实要删除吗？")){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        /*let delData=new  FormData();
        delData.append("fileId",fileId);
        delData.append("scenicId",this.scenicId);*/
        var delData={"fileId":fileId,"scenicId":this.scenicId}
        this.$axios.post("line/delFile",qs.stringify(delData),config)
          .then(successResponse=>{
            /* if(successResponse.data==="noLogin"){
               alert("没有登录")
               this.$router.replace({path:'/adminLogin'})
             }*/
            if(successResponse.data.message==="OK") {
              alert("删除成功")
              this.ImageList=successResponse.data.ImageList;
            }
            else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse=>{
            alert("响应异常")
          })
      }else {
        alert("已经取消了删除操作");
      }
    }
    },
    mounted:function(){
      this.getThemes();
      this.formData=new FormData();
    },
  }

</script>

<style lang="less">
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
  .disabled .el-upload--picture-card {
    display: none !important;
  }
</style>
