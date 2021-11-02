<template>
  <div >
    <VNav :currentNav="3" :currentStr="2"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增主题</h2>
        </div>

        <form class="form-horizontal" role="form" onsubmit="return false;" v-show="table1">
          <div class="form-group">
            <label class="col-sm-2 control-label">主题名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="classes.className" id="className" name="className" placeholder="主题名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" @click="sub()">
            </div>
          </div>
        </form>
        <form class="form-horizontal" role="form" onsubmit="return false;" v-show="table2">
          <div class="form-group">
            <label class="col-sm-2 control-label">所属主题名称</label>
            <div class="col-sm-10">
              <el-select class="form-control" v-model="theme.classId" >
                <el-option v-for="(item,index) in classList" :value="item.classId" :key="index">{{item.className}}</el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">主题名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="theme.themeName" id="themeName" name="themeName" placeholder="主题名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" onclick="sub()">
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import  VNav from "@/components/travel_after/common/nav";

  export default {
    name: "themeAdd",
    data() {
      return {
        navList: ['所有订单', '待付款','待确认','待评价'],
        move: 0,
        current:0,
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        classes:{
          className:''
        },
        theme:{
          themeName:'',
          classId:'',
          themePhoto:''
        },
        classList:[],
        provinceList:[],
        themeList:[],
        table1:true,
        table2:false,
        travelTimes:{

        },
        themes:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    create:function(){
    },
    methods: {
      changeTable(index){
        if(index===1){
          this.table1=false;
          this.table2=true;
          this.current=1
        }
        else {
          this.table1=true;
          this.table2=false;
          this.current=0
        }
      },
      init(){
        this.themeId=this.$route.query.themeId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/gettheme?themeId="+this.themeId)
          .then(successReqponse => {
            this.themeMessage=successReqponse.data.theme;
            this.classList=successReqponse.data.classList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/themeUpdate?themeId="+this.themeId);
          })
      },
      getFiles: function(event) {
        let file = event.target.files[0];
        this.theme.themePhoto = file;
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

        if (this.theme.themeName === "") {
          alert("主题名称不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        console.log(data);
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };

        this.formData=new FormData();
        this.formData.append("themeName",this.theme.themeName);
        this.formData.append("themePhoto",this.theme.themePhoto);
        this.$axios.post("/theme/save", this.formData, config)
          .then(successReqponse => {
            if(successReqponse.data.message==='OK'){
              alert("保存成功！");
              this.$router.replace("/themeList");
            }else {
              alert(successReqponse.data.message);
            }


          })
          .catch(failRespose => {
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
    opatheme: 0;
  }
</style>
