<template>
  <div >
    <VNav :currentNav="5" :currentStr="2"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增酒店</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">

          <div class="form-group">
            <label class="col-sm-2 control-label">酒店名称</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="hotel.hotelName" id="hotelName" name="hotelName" placeholder="酒店名称" required="required"></el-input>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">附近景点</label>
            <div class="col-sm-3">
              <el-input type="text"  v-model="scenicName" v-on:input="scenicName1" v-on:focus="scenicName1" placeholder="景点名称"></el-input>
              <div style="margin-top: 1%" v-show="scenicShow">
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
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">地址</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="hotel.hotelAddr" id="hotelAddr" name="hotelName" placeholder="酒店地址" required="required"></el-input>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">联系电话</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="hotel.hotelPhone" id="hotelPhone" name="hotelName" placeholder="联系电话" required="required"></el-input>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">酒店封面</label>
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
            <div class="col-sm-offset-2 col-sm-10">
              <el-button  class="btn btn-default" @click="reset()">重置</el-button>
              <el-button  class="btn btn-default" @click="sub()">保存</el-button>
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
    name: "hotelAdd",
    data() {
      return {
        fileList:[],
        uploadDisabled:false,
        multiple: true,
        formData: "",
        scenicName:'',
        scenic:[],
        scenicShow:false,
        selectScenic: [],
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        hotel:{
          hotelName:'',
          hotelScenic:'',
          hotelAddr:'',
          hotelPhone:'',
          hotelImg:''
        },
        provinceList:[],
        hotelList:[],
        travelTimes:{

        },
        hotels:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    mounted:function(){
      this.getThemes();
      this. formData=new FormData();
    },
    watch:{

    },
    methods: {
      reset(){
        this.hotel.hotelName='';
        this.hotel.hotelScenic='';
          this.hotel.hotelAddr='';
          this.hotel.hotelPhone='';
      },
      scenicName1(){
        this.scenicShow = true;
        if (this.scenicName.length === 0) {
          this.selectScenic =  this.scenic
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
      setScenicVal(item) {
        this.hotel.hotelScenic = item.scenicId;

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
            this.$router.push("/hotelAdd");
          })

      },
      sub() {

        if (this.hotel.hotelName === "") {
          alert("酒店名称不能为空");
          return false;
        }
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.formData.append("hotelName",this.hotel.hotelName);
        this.formData.append("hotelScenic",this.hotel.hotelScenic);
        this.formData.append("hotelAddr",this.hotel.hotelAddr);
        this.formData.append("hotelPhone",this.hotel.hotelPhone);
        this.formData.append("headImg",this.photo);
        this.$axios.post("/hotel/save", this.formData, config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.push("/hotelList");
          })
          .catch(failRespose => {
            alert("系统错误");
          })


      },

      checkIsIllegal() {
        var title;
        var price;
        var activeNum;
        var activeDays;
        var startareaName;
        var endAreaname;

      },

      clearNoNum(obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          obj.value = parseFloat(obj.value);
        }
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
