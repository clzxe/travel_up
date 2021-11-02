/**
 * head的“欢迎回来”+name
 */

$(function () {
    $.get("user/find",{},function (data) {
        if (data.name!= null){

            $("#head_name").html("欢迎回来，"+data.name);
            $("#login_login").text(" ");

            //我的收藏

            $("#collection").attr("href","myfavorite.html?uid="+data.uid+"&f_pid=1");

        }
        else {
            $("#head_name").html("请登陆~");
            $("#drop_out").text("  ");
        }
    });

});
