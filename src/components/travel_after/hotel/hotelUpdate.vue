<template>
  <div >
    <VNav :currentNav="5" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">修改酒店</h2>

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
              <el-input type="text"  v-model="scenicName" v-on:input=""></el-input>
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
              <ul class="el-upload-list el-upload-list--picture-card" v-show="imageShow" >
                <li class="el-upload-list__item is-success"  >
                  <img style="width: 100%; height: 100%" :src="hotel.hotelImg" />
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
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" @click="sub()">
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
        imageShow:true,
        uploadShow:false,
        headFileStatus:0,
        fileStatus:0,
        fileList:[],
        uploadDisabled:false,
        multiple: true,
        formData: "",
        scenicName:'',
        scenic:[],
        scenicShow:false,
        selectScenic: [],
        isSelectFile: false,
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        hotel:[],
        travelTimes:[],
        provinceList:[],
        ImageList:[],
        hotelList:[],
        hotelId:'',
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    mounted:function(){
      this.gethotels();
      this.formData=new FormData();
    },

    methods: {
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
      delImg1(){
        this.hotel.hotelImg='';
        this.uploadShow=true;
        this.imageShow=false;
      },
      handleChange(file){
        this.photo = file.file;
        if(file!==undefined){
          this.uploadDisabled=true;
        }

      },
      setScenicVal(item) {
        this.hotel.hotelScenic = item.scenicId;

        this.scenicName = item.scenicName;
        this.scenicShow = false
      },
      gethotels:function(){
        this.hotelId=this.$route.query.hotelId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/hotel/gethotel?hotelId="+this.hotelId)
          .then(successReqponse => {
            this.hotel=successReqponse.data.hotel;
           this.scenicName=this.hotel.scenicName;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
           // this.$router.push("/hotelUpdate?hotelId="+this.hotelId);
          })

      },
      getFiles: function(event) {
        let file = event.target.files[0];
        this.photo = file;
        let url = "";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = function(e) {
          url = this.result.substring(this.result.indexOf(",") + 1);
          that.imgUrl = "data:image/png;base64," + url;
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };
      },
      openImg() {
        this.$refs.input.click();
      },
      openHomeModal() {
        this.modalStatus = true;
      },

      sub() {

        if (this.hotel.hotelName === "") {
          alert("酒店名称不能为空");
          return false;
        }


        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.formData.append("hotelId",this.hotel.hotelId);
        this.formData.append("hotelName",this.hotel.hotelName);
        this.formData.append("hotelScenic",this.hotel.hotelScenic);
        this.formData.append("hotelAddr",this.hotel.hotelAddr);
        this.formData.append("hotelPhone",this.hotel.hotelPhone);
        this.formData.append("hotelImg",this.hotel.hotelImg);
        this.formData.append("headImg",this.photo);
        this.$axios.post("/hotel/update", this.formData, config)
          .then(successResponse => {
            alert(successResponse.data.message);
            this.$router.push("/hotelList");
          })
          .catch(failRespose => {
            alert("系统错误");
          })


      }
    }
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
