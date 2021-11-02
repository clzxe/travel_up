<template>
  <div class="tinymce-editor">
    <editor v-model = "myValue" :init="init" :disabled="disabled" ></editor>
  </div>
</template>
<script>
  // import axios from "axios";
  import tinymce from "tinymce/tinymce";
  import Editor from "@tinymce/tinymce-vue";
  import "tinymce/themes/silver";
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import "tinymce/plugins/image"; // 插入上传图片插件
  // import 'tinymce/plugins/media'// 插入视频插件
  import "tinymce/plugins/table"; // 插入表格插件
  import "tinymce/plugins/lists"; // 列表插件
  import "tinymce/plugins/wordcount"; // 字数统计插件
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/contextmenu';
  import 'tinymce/plugins/colorpicker';
  import 'tinymce/plugins/textcolor'
  export default {
    components: {
      Editor
    },
    props:['reset'],
    data() {
      return {
        init: {
          language_url:'/static/tinymce/zh_CN.js', // 语言包路径
          language: "zh_CN",  //语言
          skin_url: '/static/tinymce/skins/ui/oxide', //skin路径
          content_css: '/static/tinymce/skins/content/default/content.css',
          // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
          // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
          height: 300,  //编辑器高度
          plugins: 'lists image media table textcolor wordcount contextmenu',
          toolbar:   'undo redo | styleselect | fontselect| bold italic  backcolor forecolor | \
               underline strikethrough  | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | link image| \
              advlist autolink lists charmap print preview|\
              searchreplace visualblocks code fullscreen|insertdatetime media table paste | wordcount help ',
          branding: false,  //是否禁用“Powered by TinyMCE”
          menubar: 'file edit insert view format table image', //顶部菜单栏显示
          // 图片读取前缀路径
          images_upload_base_path: this.picUrl,
          // 图片本地上传方法  点击上传后执行的事件
          images_upload_handler: (blobInfo, success, failure) => {
            this.handleImgUpload(blobInfo, success, failure)
          },
        },
        myValue: this.value
      };
    },
    mounted() {
      tinymce.init({});
    },
    methods: {
      handleImgUpload(blobInfo, success, failure) {
        let formdata = new FormData()
        formdata.set('file', blobInfo.blob())
        this.$axios.post('strategy/upload_img', formdata).then(res => {
          //success(res.data.data)
          success(res.data.message);
        }).catch(res => {
          failure('error')

        })


      }

    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
      },
      myValue(newValue) {
        let data={
          value:newValue
        };
        this.$emit("strategy_content", data);
      },
      reset(){
        this.myValue=this.reset;
      }
    }
  };
</script>
