<template>
  <div id="app">
    <VNav></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增城市</h2>

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
  import VNav from "@/components/travel_after/common/nav";
  import upload from "@/components/travel_after/common/upload";
  export default {
    name: "cityAdd",
    data() {
      return {
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modal1Status2: false,
        modal1Status: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        isshow:true,
        selectCitys:[],
        city:{
          cityName:'',
          provinceId:''
        },
        provinceName:'',
        provinceList:[],
        cityList:[],
        travelTimes:{

        },
        themes:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav,
      "v-upload1": upload,
    },
    watch:{
      provinceName:function(val, oldVal){
        if(val.length==0){
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
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };

        this.$axios.get("/city/getProvince")
          .then(successResponse => {

           this.provinceList=successResponse.data.provinceList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/cityAdd");
          })

      },
      getFiles: function(event) {
        let file = event.target.files[0];
        this.city.cityPhoto = file;
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
      openHomemodal1() {
        this.modal1Status = true;
      },

      sub() {

        if (this.city.cityName === "") {
          alert("城市名称不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        console.log(this.city);
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/city/save", qs.stringify(this.city), config)
          .then(successResponse => {
            if(successResponse.data.message==='OK'){
              alert("保存成功");
              this.$router.push("/cityList");
            }
            else{
              alert(successResponse.data.message);
            }


          })
          .catch(failResponse => {
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
  ul{
    border:1px solid #fafffb;
  }
  li{
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
  }
  .bindingbtn input{
    border:1px solid #333;
    height:44px;
    line-height:44px;
  }
</style>
