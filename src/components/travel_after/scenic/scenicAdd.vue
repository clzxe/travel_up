<template>
  <div style="width:100%">
    <VNav :currentNav="1" :currentStr="2"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增景点</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div class="form-group">
            <label class="col-sm-2 control-label">景点名称</label>
            <div class="col-sm-10">
              <el-input type="text"  style="width: 60%" v-model="scenicMessage.scenicName"
                        id="scenicName" name="scenicName" placeholder="景点名称" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label"> 景点简介</label>
            <div class="col-sm-10">
              <el-input  type="textarea"  style="width: 60%" name="description"
                        v-model="scenicMessage.scenicDescription" placeholder="景点简介" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">景点封面</label>
            <div class="col-md-10" style="max-width: 600px;">
              <el-upload style="margin-top: 2%"
                         :multiple="multiple"
                         action="uploadPics"
                         list-type="picture-card"
                         :auto-upload="true"
                         :class="{disabled:uploadDisabled }"
                         :limit="1"
                         :http-request="handleChange"
                         :on-remove="delImg1"
                         :file-list="fileList"
                         ref="uploadPic1"
              >
                <i class="el-icon-plus"><p style="font-size: 12px">添加封面图片</p></i>
              </el-upload>

            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">开放时间</label>
            <div class="col-sm-10">
              <el-input type="textarea"  style="width: 60%" id="scenicOpenTime" name="scenicOpenTime"
                        v-model="scenicMessage.scenicOpenTime" placeholder="开放时间"
                        required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">建议游玩时间</label>
            <div class="col-sm-10">
              <el-input type="textarea" id="scenicCostTime" style="width: 60%"  name="scenicCostTime"
                        v-model="scenicMessage.scenicCostTime" placeholder="建议游玩时间" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">景点价格</label>
            <div class="col-sm-10">
              <el-input type="text" id="scenicPrice" style="width: 60%"  name="scenicCostTime"
                        v-model="scenicMessage.scenicPrice" placeholder="价格" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">适合游玩人群</label>
            <div class="col-sm-10">
              <el-input type="text" id="acceptPeople" style="width: 60%"  name="scenicCostTime"
                        v-model="scenicMessage.acceptPeople" placeholder="价格" required="required"></el-input>

            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">适合游玩季节</label>
            <div class="col-sm-10">
              <el-input type="text" id="acceptSeason" style="width: 60%"  name="scenicCostTime"
                        v-model="scenicMessage.acceptSeason" placeholder="价格" required="required"></el-input>

            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">景点类别：</label>
            <div class="col-sm-10">
              <div class="row">
                <el-select style="margin-left: 1%"  v-model="typeName" @change="addTypeNmme()">
                  <el-option  v-for="(item,index) in scenicTypeList" :value="item.typeName" :key="index">{{item.typeName}}</el-option>

                </el-select>
              </div>
              <div class="row" style="margin-top:1%">
                <span style="height: 40px;margin-left: 1%;border: #85da98 1px solid;color: #5bc0de" v-for="(che,c_index) in checkGroup">{{che}}<i class="el-icon-error" style="color: red" @click="delTypeName(c_index)"></i></span>
              </div>

            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">联系电话</label>
            <div class="col-sm-10">
              <el-input type="text" id="scenicTel" style="width: 60%" placeholder="联系电话" name="scenicTel" v-model="scenicMessage.scenicTel" required="required"
                        ></el-input>
            </div>
          </div>


          <div class="form-group">
            <label class="col-sm-2 control-label">所属省</label>
            <div class="col-sm-10">
              <el-input type="text" v-model="provinceName" style="width:60%" v-on:focus="provinceName1" placeholder="省份名称" v-on:input="provinceName1" required="required"> </el-input>
              <div style="margin-top: 1%" v-show="isshow">
                <div class="el-select-dropdown el-popper"
                     style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                     x-placement="bottom-start">
                  <div class="el-scrollbar" style="">
                    <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                      <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                        <li class="el-select-dropdown__item" v-for="item in selectProvince" v-on:click="setVal(item)">{{item.provinceName}}</li>
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
          <div class="form-group">
            <label class="col-sm-2 control-label">所属市</label>
            <div class="col-sm-10">
              <el-input type="text" v-model="cityName" style="width:60%" placeholder="市名称" v-on:focus="cityName1" v-on:input="cityName1" required="required" ></el-input>
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
          <div class="form-group">
            <label class="col-sm-2 control-label">地址</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" id="scenicAddr" name="scenicAddr" required="required"
                        v-model="scenicMessage.scenicAddr" placeholder="地址" ></el-input>
            </div>
          </div>
          <div class="form-group" >
            <label class="col-md-2 control-label">景点图片</label>
            <div class="col-sm-10">
              <el-button class="el-icon-plus btn  btn-lg" style="color: #ffb611;size: 20px" data-toggle="modal"
                         data-target="#myModal"></el-button>
            </div>

            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true" style="width: 800px;height: auto">
              <div class="modal-dialog" style="width: 658px;height: auto">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
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
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" @click="sub()">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <p>&nbsp;</p>
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
    name: "scenicAdd",
    data() {
      return {
        fileList:[],
        uploadDisabled:false,
        multiple: true,
        formData: "",
        isSelectFile: false,

        imgUrl: "",
        photo: "",
        modalStatus2: false,
        modalStatus: false,
        title: "添加景点图片",
        content: "我是首页的内容",
        scenicMessage: {
          scenicPrice:'',
          acceptPeople:'',
          acceptSeason:'',
          scenicName: '',
          scenicDescription: '',
          scenicOpenTime: '',
          scenicCostTime: '',
          scenicTel: '',
          scenicAddr: '',
          scenicProvince: '',
          scenicCity: '',
          linePrice: '',
          scenicType:'',
        },
        scenicTypeList:[],
        typeName:'',
        checkGroup:[],
        isshow: false,
        cityShow: false,
        selectCitys: [],
        selectProvince: [],
        provinceName: '',
        provinceList: [],
        cityList: [],
        cityName: '',
        travelTimes: {},
        themes: [],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav

    },
    watch: {

    },
    methods: {
      addTypeNmme(){
        this.checkGroup.push(this.typeName);
      },
      delTypeName(index){
        this.checkGroup.splice(index,1);
      },
      provinceName1 () {
        this.isshow = true;
        if (this.provinceName.length === 0) {
          this.selectProvince= this.provinceList;
        } else {

          var citys = [];
          this.provinceList.forEach((item, index) => {
            if (item.provinceName.indexOf(this.provinceName) >= 0) {
              citys.unshift(item)
            }
          });
          this.selectProvince = citys;
        }
      },
      cityName1() {
        this.cityShow = true;
        if (this.cityName.length === 0) {
          this.selectCitys =  this.cityList
        } else {
          var citys = []
          this.cityList.forEach((item, index) => {
            if (item.cityName.indexOf(this.cityName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectCitys = citys;
        }
      },
      delImg1(){
        this.uploadDisabled=false;
      },
      handleChange(file){
        this.photo = file.file;
       if(file!=undefined){
         this.uploadDisabled=true;
       }

      },
      hangdel(){
        alert(this.fileList.length)
        if(this.fileList.length>=1){
          this.uploadDisabled=true;
        }
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
      setVal(item) {
        this.scenicMessage.scenicProvince = item.provinceId;
        this.provinceName = item.provinceName;
        this.isshow = false;
        this.changeCity();
      },
      setCityVal(item) {
        this.scenicMessage.scenicCity = item.cityId;
        this.cityName = item.cityName;
        this.cityShow = false
      },
      getThemes: function () {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.$axios.get("/scenic/getThemes")
          .then(successReqponse => {
            this.provinceList = successReqponse.data.provinceList;
            this.scenicTypeList=successReqponse.data.scenicTypeList;
          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            this.$router.push("/scenicAdd");
          })

      },
      changeCity: function () {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/getCityList?provinceId=" + this.scenicMessage.scenicProvince)
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
      getFiles: function (event) {
        let file = event.target.files[0];
        this.photo = event.file;
        /*let url = "";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = function (e) {
          url = this.result.substring(this.result.indexOf(",") + 1);
          that.imgUrl = "data:image/png;base64," + url;
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };*/
      },
      openImg() {
        this.$refs.input.click();
      },
      openHomeModal() {
        this.modalStatus = true;
      },

      sub() {

        if (this.scenicMessage.scenicName === "") {
          alert("景点名称不能为空");
          return false;
        }
        if (this.scenicMessage.scenicDescription === "") {
          alert("景点简介不能为空");
          return false;
        }
        if (this.scenicMessage.scenicOpenTime === "") {
          alert("景点开放时间不能为空");
          return false;
        }
        if (this.scenicMessage.scenicCostTime === "") {
          alert("景点建议游玩时间不能为空");
          return false;
        }
        if (this.scenicMessage.scenicTel === "") {
          alert("景点联系电话不能为空");
          return false;
        }
        if (this.scenicMessage.scenicAddr === "") {
          alert("景点地址不能为空");
          return false;
        }
        if (this.scenicMessage.scenicCity === "") {
          alert("景点地址不能为空");
          return false;
        }
        if (this.scenicMessage.scenicProvince === "") {
          alert("景点地址不能为空");
          return false;
        }
        if (this.scenicMessage.scenicPrice === "") {
          alert("景点价格不能为空");
          return false;
        }


//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        for(var i=0;i<this.checkGroup.length;i++){
          this.formData.append("scenicType", this.checkGroup[i]);
        }
        alert(this.scenicMessage.scenicName);
        this.formData.append("scenicName", this.scenicMessage.scenicName);
        this.formData.append("scenicDescription", this.scenicMessage.scenicDescription);
        this.formData.append("scenicProvince", this.scenicMessage.scenicProvince);
        this.formData.append("scenicCity", this.scenicMessage.scenicCity);
        this.formData.append("scenicAddr", this.scenicMessage.scenicAddr);
        this.formData.append("scenicTel", this.scenicMessage.scenicTel);
        this.formData.append("scenicCostTime", this.scenicMessage.scenicCostTime);
        this.formData.append("scenicOpenTime", this.scenicMessage.scenicOpenTime);
        this.formData.append("scenicPrice", this.scenicMessage.scenicPrice);
        this.formData.append("acceptSeason", this.scenicMessage.acceptSeason);
        this.formData.append("acceptPeople", this.scenicMessage.acceptPeople);
        this.formData.append('headFile', this.photo);
        this.$axios.post("/scenic/save", this.formData, config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/scenicList");
          })
          .catch(failRespose => {
            this.formData=new FormData();
            console.log("系统错误");
          })


      },

      checkIsIllegal() {
        var title;
        var price;
        var activeNum;
        var activeDays;
        var startareaName;
        var endAreaname;

      }
    },
    computed:{

    },
    created: function () {
      this.getThemes();
      this.formData=new FormData();
    }
  }


</script>

<style  lang="less">

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
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
