<template>
  <div id="app">
    <VNav></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增产品</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div class="form-group">
            <label class="col-sm-2 control-label">所属省份</label>
            <div class="col-sm-10">
              <el-input type="text" v-model="provinceName"  style="width:60%" placeholder="省份名称" ></el-input>
              <div v-show="isshow">
                <ul>
                  <li v-for="item in selectCitys"  @mousedown="setVal(item)">{{item.provinceName}}</li>
                </ul>
              </div>
            </div>


          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">城市名称</label>
            <div class="col-sm-10">
              <el-input type="text"  v-model="city.cityName" style="width:60%" id="cityName" name="cityName" placeholder="城市名称" required="required"></el-input>
            </div>
          </div>
          <!--<div class="form-group">
            <label class="col-sm-2 control-label">城市封面</label>
            <div class="col-sm-10" style="max-width: 300px;">
              <input v-show="false" type="file" accept="image/*" @change="getFiles($event)" ref="input" ></input>
              <div style="width:200px;height:200px;border: 1px solid #cecece;text-align: center;" @click="openImg">
                <span style="margin-top: 25px" v-if="imgUrl==''">点击上传</span>
                <el-image style="height:100%;width:100%;" v-if="imgUrl!=''" :src="imgUrl" @click="openImg" ></el-image>
              </div>

            </div>
          </div>-->

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <el-button class="btn btn-default" style="margin-left: 25%" @click="sub()">保存</el-button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'

  import upload from "@/components/travel_after/common/upload.vue";
  import Modal from '@/components/travel_after/common/model.vue';
  import VNav from "@/components/travel_after/common/nav";

  export default {
    name: "cityAdd",
    data() {

      return {
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        cityMessage:[],
        isshow:true,
        selectCitys:[],
        city:[],
        provinceName:'',
        provinceList:[],
        cityList:[],
        travelTimes:[],
        ImageList:[],
        cityList:[],
        cityId:'',
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
  components: {
    "v-modal": Modal,
      "v-upload1": upload,
      VNav
  },
    watch:{

      provinceName:function(val, oldVal){
        if(val.length===0||val.length>=3){
          this.isshow = false
        }else{
          this.isshow = true;
          var citys = []
          this.provinceList.forEach((item,index) => {
            if(item.provinceName.indexOf(this.provinceName)>=0){
              citys.unshift(item)
            }
          })
          this.selectCitys = citys;
        }
      }
    },
    methods: {
      setVal(item){
        this.city.provinceId=item.provinceId;
        this.provinceName=item.provinceName;
        this.isshow = false
      },
      getThemes(){

        this.cityId=this.$route.query.cityId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.get("/city/getcity?cityId="+this.cityId)
          .then(successResponse => {
            this.city=successResponse.data.city;
            this.provinceList=successResponse.data.provinceList;
            this.provinceName=successResponse.data.city.provinceName;
          })
          .catch(failResponse => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.push("/cityUpdate?cityId="+this.cityId);
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

        if (this.city.cityName === "") {
          alert("名称不能为空");
          return false;
        }
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/city/update", qs.stringify(this.city), config)
          .then(successResponse => {
            if(successResponse.data.message==='OK'){
              alert("保存成功");
              this.$router.replace("/cityList");
            }
            else{
              alert(successResponse.data.message);
            }

          })
          .catch(failRespose => {
            alert("系统错误");
          })


      }
    },
   created:function () {
      this.getThemes();
   }
  }

</script>

<style scoped>
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
</style>
