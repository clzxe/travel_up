<template>
  <div>
    <VNav :currentNav="2" :currentStr="2"></VNav>
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
              <el-upload style="margin-top: 2%"
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
                  <el-option  v-for="(item,index) in scenicList" :value="item.scenicName" :key="index" @click.native="addTypeNmme(item)"><span >{{item.scenicName}}</span></el-option>

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
          <div class="form-group" v-show="lineMessage.isIncludeHotel===1">
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
                       data-target="#myModal2"></el-button>
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
                            <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                            <el-table-column label="时间" align="center">
                              <template slot-scope="scope">
                                <el-input prop="travelTimeTime" type="textarea" class="post_name"
                                          v-model="scope.row.travelTimeTime"></el-input>
                                <!--<el-input v-model="scope.row.post_id"></el-input>-->
                              </template>
                            </el-table-column>
                            <el-table-column label="餐饮">
                              <template slot-scope="scope">
                                <el-input class="require_des" type="textarea" v-model="scope.row.travelTimeFood"></el-input>
                              </template>
                            </el-table-column>
                            <el-table-column label="活动">
                              <template slot-scope="scope">
                                <el-input type="textarea" class="remark"
                                          v-model="scope.row.travelTimeActivity"></el-input>
                              </template>
                            </el-table-column>
                            <el-table-column label="住宿">
                              <template slot-scope="scope">
                                <el-input type="textarea" class="remark" v-model="scope.row.travelTimeHotel"></el-input>
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
        modalStatus2:false,
        m_title: "添加旅游行程",
        m_content: "我是首页的内容",
        lineMessage:{
          cityId:'',
          lineTitle:'',
          lineDescription:'',
          lineTotalTime:'',
          lineStartCity:'',
          themeId:'',
          linePrice:'',
          hotelId:'',
          isIncludeHotel:'',
          roomId:'',
        },
        checkGroup:[],
        themeName:'',
        scenicName:'',
        scenic:[],
        scenicShow:false,
        selectScenic: [],
        isIncloudHotel:'',
        hotelName:'',
        roomName:'',
        hotelList:[],
        hotelRoomList:[],
        hotelShow:false,
        selectHotel: [],
        provinceId:'',
        classList:[],
        isshow: false,
        cityShow: false,
        selectCitys: [],
        selectProvince: [],
        provinceName: '',
        provinceList: [],
        cityList: [],
        scenicList:[],
        cityName: '',
        travelTimes:{
          rowNum:'',
          travelTimeTime:'',
          travelTimeFood:'',
          travelTimeActivity:'',
          travelTimeHotel:'',
        },
        travelTimesList:[],
        classId:'',
        themes:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    mounted: function () {
      // alert('111');
      this.getThemes();
      this.formData = new FormData();
    },
    create: function () {

    },
    watch:{

    },
    methods: {
      addTypeNmme(item){
        console.log(8894);
        this.checkGroup.push(item);
      },
      delTypeName(index){
        this.checkGroup.splice(index,1);
      },
      provinceName1: function () {
        this.isshow = true;
        if (this.provinceName.length === 0) {
          this.selectProvince = this.provinceList
        } else {

          var citys = []
          this.provinceList.forEach((item, index) => {
            if (item.provinceName.indexOf(this.provinceName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectProvince = citys;
        }
      },
      cityName1: function () {
        this.cityShow = true;
        if (this.cityName.length === 0) {
          this.selectCitys =  this.cityList;
        } else {

          var citys = [];
          this.cityList.forEach((item, index) => {
            if (item.cityName.indexOf(this.cityName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectCitys = citys;
        }
      },
      scenicName1:function(){
        this.scenicShow = true;
        if (this.scenicName.length === 0) {
          this.selectScenic = this.scenic;
        } else {

          var citys = [];
          this.scenic.forEach((item, index) => {
            if (item.scenicName.indexOf(this.scenicName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectScenic = citys;
        }
      },
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
        }else {
          this.lineMessage.isIncludeHotel=2;
        }
      },

      setTheme(){
        this.themes.forEach((item, index) => {
          if (item.themeName.indexOf(this.themeName) >= 0) {
           this.lineMessage.themeId=item.themeId;
          }
        })

      },

      setRoom(){
        this.hotelRoomList.forEach((item, index) => {
          if (item.hotelRoomName.indexOf(this.roomName) >= 0) {

            this.lineMessage.roomId=item.hotelRoomId;
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
            console.log("数据加载错误！正在重新载入...");
           // this.$router.push("/scenicAdd");
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
        this.$axios.post("/theme/getThemClass?classId=" + classId)
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
            this.$router.push("/linesAdd");
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
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getThemes")
          .then(successReqponse => {
           this.classList=successReqponse.data.classList;
           this.scenicList=successReqponse.data.scenic;
           this.provinceList=successReqponse.data.provinceList;
           this.hotelList=successReqponse.data.hotelList;
          })
          .catch(failRespose => {
           alert("页面加载错误！正在重新载入...");
           // this.$router.push("/linesAdd");
          })

      },

      sub() {


        if (this.lineMessage.lineTitle === "") {
          alert("标题不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        for(var i=0;i<this.checkGroup.length;i++){
          this.formData.append("lineScenic", this.checkGroup[i]);
        }
        this.formData.append('lineTitle',this.lineMessage.lineTitle);
        this.formData.append('lineDescription',this.lineMessage.lineDescription);
        this.formData.append('lineTotalTime',this.lineMessage.lineTotalTime);
        this.formData.append('themeId',this.lineMessage.themeId);
        this.formData.append('isIncludeHotel',this.lineMessage.isIncludeHotel);
        this.formData.append('hotelId',this.lineMessage.hotelId);
        this.formData.append('roomId',this.lineMessage.roomId);
        this.formData.append('headFile',this.photo);
        //console.log(this.formData)
        var i=0;
        this.$axios.post("/line/save", this.formData, config)
          .then(successReqponse => {
            for(var i=0;i<this.travelTimesList.length;i++){
              alert(this.travelTimesList.length)
              console.log(JSON.stringify(this.travelTimesList[i]))
              this.$axios.post("/line/insert_time", qs.stringify(this.travelTimesList[i]), config)
                .then(successReqponse => {

                })
                .catch(failRespose => {
                  alert("系统错误2");
                });

            }
            if (i === this.travelTimesList.length) {
              alert("保存成功");
              this.$router.push("/linesList");
            }
          })
          .catch(failRespose => {
            alert("系统错误1");
          })


      },

   /*   checkNum() {
        var num=0;
        var themeList=this.lineMessage.themeId;
        for (var i = 0; i < themeList.length; i++)
          if (themeList[i].checked) num++;
        if (num < 1) {
          alert("至少要选择一个复选框");
          return false;
        }
      },*/

    /*  checkIsIllegal() {
        var title;
        var price;
        var activeNum;
        var activeDays;
        var startareaName;
        var endAreaname;

      },*/

      clearNoNum(obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          obj.value = parseFloat(obj.value);
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
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection()
      },
      setData () {
        console.log(this.tableData)
        this.tableData.forEach((v, i) => {
          alert(v.travelTimeTime);
          this.travelTimesList.push({"rowNum":v.rowNum,"travelTimeTime":v.travelTimeTime,"travelTimeFood":v.travelTimeFood,"travelTimeActivity":v.travelTimeActivity,"travelTimeHotel":v.travelTimeHotel});
        })
        this.modalStatus2=false;
      }
    }
  }


</script>

<style lang="less">
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
</style>
