<template>
  <div class="modal">
    <div class="header">{{title}}</div>
    <div class="content">{{content}}</div>
    <div class="footer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "model",
      data(){
        return {}
      },
      props:['title','content'],
    }
</script>

<style lang="scss">
  .modal {
    width:500px;
    height:400px;
    position: absolute;
    top:50%;
    left:50%;
    margin-toP:-250px;
    margin-left:-200px;
    border:1px solid #666;
  .header {
    height:60px;
    line-height:60px;
    text-align: center;
    background:#666;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
  }
  .content {
    background:orange;
    height:290px;

  }
  .footer {
    height:50px;
    line-height: 50px;
  button {
    vertical-align: middle;
    display: inline-block;
    width:80px;
    height:40px;
    line-height: 40px;
    color:#fff;
  &.danger{
     background:red;


   }
  &.default{
     background:#ddd;
   }

  }

  }
  }
</style>
