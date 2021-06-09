//实现播放器部分
var playBtn = document.getElementsByClassName("control")[0];//播放暂停按钮
var myaudio = document.getElementById("mymusic");//音频
var mute = document.getElementById("play_mute"); //静音按钮
var processBtn = document.getElementById("play_processBtn");  //进度条上的小圆点
var processBar = document.getElementById("play_processBar");   //已听音乐进度条
var allWidth = document.getElementsByClassName("play_Bar")[0].offsetWidth; //音乐进度条总长度
var playTime = document.getElementById("playTime");   //时间显示
var con_img = document.getElementsByClassName("con_right_img")[0]  //播放器图片
var setIntervalID;  

//实现评论区内容
var comment_button = document.getElementsByClassName("comment_button")[0];//评论按钮
var texteraCon = document.getElementById("texteraCon");   //文本框区域
var imgPic = document.getElementById("imgPic");  //头像
con_img.style.animationPlayState = "paused";   //初始播放器图片不旋转
var footer_content = document.getElementsByClassName("footer_content")[0];
//点击播放暂停按钮
playBtn.onclick = function(){
    if(myaudio.paused){     //音乐处于暂停状态，切换为播放状态
        playBtn.style.backgroundPosition = "-205px 0px";
        myaudio.play();
        setIntervalID = setInterval(function(){
            var circle = myaudio.currentTime/myaudio.duration*allWidth + "px";  //圆点位置
            var schedule = myaudio.currentTime/myaudio.duration*allWidth + "px"; //进度条位置
            processBtn.style.left = circle;
            processBar.style.width = schedule;
            var minute = parseInt(myaudio.currentTime/60);
            var second = parseInt(myaudio.currentTime%60);
            minute = minute >= 10 ? minute : "0" + minute;
            second = second >= 10 ? second : "0" + second;
            playTime.innerHTML = minute + ":" + second;
        },1000)
        con_img.style.animationPlayState = "running";
    }
    else{   //音频处于播放状态，切换为暂停状态
        myaudio.pause();
        playBtn.style.backgroundPosition = "-160px 0px";
        clearInterval(setIntervalID);
        con_img.style.animationPlayState = "paused";
    }
}
//点击静音按钮
mute.onclick = function(){
    if(myaudio.muted){    //音频处于静音状态  切换为不静音
        myaudio.muted = false;
    }
    else{                 //音频处于未静音状态  切换为静音状态
        myaudio.muted = true;;
    }
}

//保存到本地
function saveCon(userName,imgSrc,texteraCon,timeNow){
    var content = localStorage['content'];
    if(content == null || content == "") {
        content = '[]';
    }
    content = JSON.parse(content);
    var contentObj = {
        name:userName,
        img:imgSrc,
        con:texteraCon,
        time:timeNow
    };
    content.push(contentObj);
    content = JSON.stringify(content);
    localStorage['content'] = content;
}
//从本地读取数据显示到页面上
function getCons(){
    footer_content.innerHTML = "";
    var content = JSON.parse(localStorage['content']);
    for(var i = 0; i < content.length; i++) {
        var divNode = document.createElement("div");
        var hrNode = document.createElement("hr");
        divNode.classList.add("person");
        hrNode.classList.add("person_hr");
        divNode.innerHTML = `<img src="${content[i]["img"]}" alt="">
        <div>
            <div class="person_left">
                <span>${content[i]["name"]}</span>
                <span>${content[i]["con"]}</span>
                <span>${content[i]["time"]}</span>
            </div>
            <div class="person_right">
                <span>分享</span>
                <span>回复</span>
       </div>`
        footer_content.insertBefore(hrNode,footer_content.firstElementChild);
        footer_content.insertBefore(divNode,footer_content.firstElementChild);
    }
}
comment_button.onclick = function(){
    if(texteraCon.value == ""){
        alert("文本框不能为空");
    }
    else{
        let userName = "郭子仪";
        let imgSrc =  imgPic.src;
        let date = new Date();
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		let D = date.getDate() + ' ';
		let h = (date.getHours()  < 10 ? '0' + (date.getHours()) : date.getHours())+':';
		let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())+":";
		let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        let timeNow = Y+M+D+h+m+s;
        console.log(userName,imgSrc,texteraCon.value,timeNow);
        saveCon(userName,imgSrc,texteraCon.value,timeNow);//保存到本地
        getCons();   //获取本地数据显示到页面上
    }
}
window.onload = function(){
    getCons();
}