<template>
  <div >
    <VHeader :currentHeader="5"></VHeader>
   <div :style="{background:bg}">
      <p style="padding-left: 10%;font-size: 15px;height:50px;padding-top: 2%">
          猪猪旅行社>攻略>添加攻略</p>
     <el-main style="width: 70%;margin-left: 15%;background-color: white;margin-top: 2%" >
       <form >
         <el-input type="text"  placeholder="关联景点" style="margin-top: 2%" v-model="scenicName" v-on:input="scenicName1" v-on:focus="scenicName1" ></el-input>
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
         <el-input type="text" placeholder="攻略标题" v-model="strategy.strategyName" style="margin-top: 2%"></el-input>
         <el-date-picker type="date"  v-model="strategy.strategyDay" placeholder="选择出发时间" value-format="yyyy-MM-dd"    style="margin-top: 2%"></el-date-picker>
         <el-input type="text" placeholder="用时" v-model="strategy.strategyTravelDay" style="margin-top: 2%"></el-input>
         <el-input type="text" placeholder="人均花费" v-model="strategy.strategyCostMoney" style="margin-top: 2%"></el-input>
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

         <div class="navone">
           <div v-loading="quillUpdateImg" element-loading-text="请稍等，图片上传中">
             <!-- 图片上传组件辅助-->
             <el-upload
               class="avatar-uploader"
               :action="serverUrl"
               name="Img"
               :headers="header"
               :show-file-list="false"
               :data="uploadData"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :before-upload="beforeUpload">
             </el-upload>
             <quill-editor
               class="editor"
               v-model="content"
               ref="myQuillEditor"
               :options="editorOption"
               @blur="onEditorBlur($event)"
               @focus="onEditorFocus($event)"
               @change="onEditorChange($event)">
             </quill-editor>
           </div>
         </div>


       </form>
       <p>&nbsp;</p>
       <p>&nbsp;</p>
       <p>&nbsp;</p>
       <p class="collect" style="margin-left: 40%;margin-top: 2%">
         <a class="btn" id="shoucang" style="background-color: #b9ea43" @click="sub()" data-toggle="modal"
            data-target="#myModal" ><i class="iconfont travel-iconfabu"></i>发布</a>
         <a class="btn" @click="rinput()" data-toggle="modal"
            data-target="#myModal"><i class="iconfont travel-iconzhongzhi" ></i>重置</a>
       </p>

     </el-main>

   </div>

    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header';
  import tinymceEditor from "./common/tinymce.vue";
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor';
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
    ["blockquote", "code-block"], // 引用  代码块
    [{ header: 1 }, { header: 2 }], // 1、2 级标题
    [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
    [{ script: "sub" }, { script: "super" }], // 上标/下标
    [{ indent: "-1" }, { indent: "+1" }], // 缩进
    // [{'direction': 'rtl'}],                         // 文本方向
    [{ size: ["small", false, "large", "huge"] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    [{ font: [] }], // 字体种类
    [{ align: [] }], // 对齐方式
    ["clean"], // 清除文本格式
    ["link", "image", "video"] // 链接、图片、视频
  ];
  export default {
    name: "add_strategy",
    components:{
      VFooter,
      VHeader,
      tinymceEditor,
      quillEditor
    },
    data(){
      return{
        uploadData: {},      // 图片文件
        serverUrl: "/travel/strategy/upload_img", // 这里写你要上传的图片服务器地址
        header: {   // 有的图片服务器要求请求头需要有token，有的可以加上
          Authorization: 'Bearer '
        } ,
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        content: '',        // 内容
        editorOption: {          // 配置项
          placeholder: "",
          theme: "snow", // or 'bubble'
          placeholder: "请输入文章内容",
          modules: {
            toolbar: {
              container: toolbarOptions,
              // container: "#toolbar",
              handlers: {
                image: function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
                link: function (value) {
                  if (value) {
                    var href = prompt('注意！只支持公众号图文链接');
                    this.quill.format("link", href);
                  } else {
                    this.quill.format("link", false);
                  }
                },
              }
            }
          }
        },
        fileList:[],
        uploadDisabled:false,
        bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
        multiple: true,
        value: "",
        strategy:{
          userId:'',
          scenicId:'',
          strategyName:'',
          strategyContent:'',
          strategyCostMoney:'',
          strategyTravelDay:'',
          strategyDay:'',
        },
        isActive:1,
        photo:'',
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        formData:'',
        scenicList:[],
        scenicShow:false,
        selectScenic: [],
        scenicName:'',
      }
    },
    mounted:function(){
      this.strategy.scenicId=this.$route.query.scenicId;
      this.scenicName=this.$route.query.scenicName;
      this.initScenic();
      setTimeout(() => {

        this.initUser();
        this.init();
      }, 3000);

    },
    methods:{
      scenicName1(){
        this.scenicShow = true;
        if (this.scenicName.length === 0) {
          this.selectScenic =  this.scenicList
        } else {

          var citys = [];
          this.scenicList.forEach((item, index) => {
            if (item.scenicName.indexOf(this.scenicName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectScenic = citys;
        }
      },
      setScenicVal(item) {
        this.strategy.scenicId = item.scenicId;

        this.scenicName = item.scenicName;
        this.scenicShow = false
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
      setVal(data){
        this.strategy.strategyContent=data.value;
        console.log(this.strategy.strategyContent);
      },
      uploadFile(file) {
        this.formData.append('file', file.file);
      },
      toInformation(){
        this.isActive=1;
        document.querySelector("#information").scrollIntoView(true)
      },
      toStrategy(){
        this.isActive=2;
        document.querySelector("#strategy").scrollIntoView(true)
      },
      rinput(){
        this.strategy.strategyNam='';
        this.strategy.content='';
        this.strategy.strategyCostMoney='';
        this.strategy.strategyTravelDay='';
        this.strategy.strategyDay='';
      },
      sub(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.formData=new FormData();
        this.formData.append("strategyName",this.strategy.strategyName);
        this.formData.append("scenicId",this.strategy.scenicId);
        this.formData.append("strategyCostMoney",this.strategy.strategyCostMoney);
        this.formData.append("strategyTravelDay",this.strategy.strategyTravelDay);
        this.formData.append("strategyDay",this.strategy.strategyDay);
        this.formData.append("strategyContent",this.content);
        this.formData.append("userId",this.strategy.userId);
        this.formData.append("headImg",this.photo);
        this.$axios.post("/strategy/save", this.formData, config)
          .then(successReqponse => {
            alert("保存成功");

            this.$router.push({path:'strategy',query:{strategyId:successReqponse.data.strategyId}});
          })
          .catch(failRespose => {
            alert("系统错误");
          })
      },
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/strategy/getScenic")
          .then(successReqponse => {
            var data = successReqponse.data;
            this.scenicList = data.scenicList;

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      initScenic() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/getScenic?scenicId="+this.strategy.scenicId)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.scenicName=data.scenic.scenicName;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      initUser() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        if(sessionStorage.getItem("isLogin") !== '1'){
         alert('您还没有登录');
         this.$router.push('login');
        }
        else {
          this.$axios.get("/user/get_user")
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.user==null){
                alert('您还没有登录');
                this.$router.push('login');
              }
              else{
                this.strategy.userId = data.user.userId;
              }



            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        }
      },
      onEditorBlur(editor) {
        //失去焦点事件
        console.log(this.content)
      },
      onEditorFocus(editor) {
        //获得焦点事件
      },
      onEditorChange(editor) {
        //内容改变事件
      },
      // 富文本图片上传前
      beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true
      },
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if(res.link){
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.link)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false;
      },
      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error("图片插入失败");
      }



    },
    computed: {
//分页
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
    }
  }
</script>

<style lang="less">
  .disabled .el-upload--picture-card {
    display: none !important;
  }
  .scenic_header{
    background: rgba(250,255,251,0.96);
    margin-top: 2%;
    margin-bottom: 1%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    border-top-color: #cecece;
    border-top-style: solid;
    border-top-width: thin;
    width: 80%;
    margin-left: 10%;
  }
  .scenic_des{
    background: rgba(250,255,251,0.96);
    margin-top: 2%;
    margin-bottom: 1%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    width: 80%;
    margin-left: 10%;
  }
  .scenic_time1{
    background: rgba(250,255,251,0.96);
    margin-top: 2%;
    margin-bottom: 2%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    width: 80%;
    margin-left: 10%;
    height:200px;
  }
  .scenic_button{
    height: 100%;
    width: 100px;
    border: none;
  }
  .scenic-active {
    color: #ffd800;
    height: 100%;
    border-bottom-color: #ffd800;
    border-bottom-style: solid;
    border-bottom-width: medium;
  }

  #information:active{
    color: #ffd800;
    height: 100%;
    border-bottom-color: #ffd800;
    border-bottom-style: solid;
    border-bottom-width: medium;
  }
  #strategy:active{
    color: #ffd800;
    height: 100%;
    border-bottom-color: #ffd800;
    border-bottom-style: solid;
    border-bottom-width: medium;
  }
  /*分页样式*/
  .pageNum1 {
    width: 100%;
    overflow: hidden;
    margin-left: 10%;
  }


  .pageNum1 ul li {
    width: 20px;
    height: 20px;
    float: left;
    border: 1px solid #fafffb;
    margin-right: 5px;
    text-align: center;
    line-height: 18px;
  }
  .pageNum1 ul li.curPage {
    background-color: #ffb611;
  }
  .pageNum1 ul li a {
    width: 100%;
    height: 100%;
    color: #020102;
    font-size: 12px;
  }
  .pageNum1 ul .threeword {
    width: 45px;
  }
  .disabled .el-upload--picture-card {
    display: none !important;
  }
  .target_txt{ display: inline-block; padding:2px 8px; font-size: 12px; background-color: #EAA24E; color: #fff;border-radius:10px; position: relative;}
  .editor {
    line-height: normal !important;
    height: 400px;
    margin: 20px auto;
  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }

</style>
