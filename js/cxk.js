/*思路：
 * 鲲鲲随机出现或消失
 * 点击图片时 判断图片 是否是鲲 若是鲲 加分 图片变回草坪   若不是鲲 gameover 若是炸弹 扣分 图片变回草坪
 * 音效设置 默认播放bgm  打中鲲 播放得分声音 打中草坪 bgm暂停  播放游戏结束声音  
 */
var box = document.getElementById('box');
var img = box.children; /*找到盒子内所有子节点 返回一个数组 赋值给变量*/
var bigNum = img.length - 1; /*随机数最大值*/
var num = 0; /*分数*/
var fs = document.getElementById('fs');
/*击打音效*/
var yx = document.getElementById('yx');
/*BGM*/
var bgm = document.getElementById('bgm');

/*结束界面盒子*/
var overBox = document.getElementById('overBox');

/*获取地址 url*/
var lsrc=location.href.charAt(location.href.length-6);
console.log(lsrc);

if(lsrc==1){
	play(1000)
}else if(lsrc==2){
	play1(500)
}else{
	box.style.width='840px';
	play1(100)
}

function play(sj){
	setInterval(function() {
		var x = Math.round(Math.random() * bigNum);
		img[x].src = '../img/cxk.gif';
		x = Math.round(Math.random() * bigNum);
		img[x].src = '../img/cp.jpg';
	}, sj)
}

function play1(sj){
	setInterval(function() {
		var x = Math.round(Math.random() * bigNum);
		img[x].src = '../img/cxk.gif';
		x = Math.round(Math.random() * bigNum);
		img[x].src = '../img/cp.jpg';
		x = Math.round(Math.random() * bigNum);
		img[x].src = '../img/boom.jpg';
	}, sj)
}
/*循环遍历数组 给每个图片绑定点击事件*/
for(var i = 0; i <= bigNum; i++) {
	img[i].onclick = function() {
		var src = this.src;
		console.log(src.charAt(src.length - 5));
		if(src.charAt(src.length - 5) == 'k') {
			yx.src = '../music/ding.mp3';
			this.src = '../img/cp.jpg';
			num += 2;
			if(num==10&&lsrc==1){
				location.href='暴打鲲鲲2.html';
			}else if(num==6&&lsrc==2){
				location.href='暴打鲲鲲3.html';
			}else if(num==4&&lsrc==3){
				alert('游戏通关！！！')
				location.href='暴打鲲鲲1.html';
			}
			fs.innerText = '得分：' + num;
		} else {
			if(src.charAt(src.length - 5) == 'm'){
				this.src='../img/cp.jpg';
				num-=2;
				fs.innerText = '得分：' + num;
			}else{
				bgm.pause();/*BGM暂停*/
				overBox.style.display='block';/*结束界面显示*/
				yx.src='../music/over.mp3';/*死亡声音播放*/
				/*点击结束界面 重新开始游戏*/
				overBox.onclick=function(){
					location.reload();
					
				}
				/*5秒后重新开始游戏*/
				setTimeout(()=>{
					location.reload();
				},5000)
			}
		}
	}
}