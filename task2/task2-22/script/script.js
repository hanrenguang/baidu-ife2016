//用于处理物块的各种动作的对象
var slider = (function() {
	//定义私有变量
	//存储四个方向, t:向上  l:向左  r:向右  b:向下
	var dirc = ["t", "r", "b", "l"];
	//存储物块的角度
	var deg = 0;
	//存储物块的头部方向, 默认为t
	var head = dirc[0];
	//不按头部方向的移动, tt:上移, tr:右移, tb:下移, tl:左移
	var tra = ["tt", "tr", "tb", "tl"];
	//存储物块的位置信息,1是最外层的边框的宽度
	var sliderX = 1;
	var sliderY = 1;

	//初始化物块的位置,参数elem为所要操作的DOM元素
	function init(elem) {
		var x = Math.floor( (Math.random())*10 );
		var y = Math.floor( (Math.random())*10 );
		sliderX += x * 40;
		sliderY += y * 40;

		setLocat(elem, 0, 0);
	}

	//私有方法,移动元素到新位置,传入位置变化量
	function setLocat(elem, x, y) {
		sliderX += x;
		sliderY += y;
		elem.style.left = sliderX + "px";
		elem.style.top = sliderY + "px";
	}

	//私有方法,判断是否越界
	function judgeBoundary(direction) {
		if(direction == "t" && sliderY == 1) {
			//提示错误
			return 0;
		}
		else if(direction == "l" && sliderX == 1) {
			//提示错误
			return 0;
		}
		else if(direction == "r" && sliderX == 361) {
			//提示错误
			return 0;
		}
		else if(direction == "b" && sliderY == 361) {
			//提示错误
			return 0;
		}
		else {
			return 1;
		}
	}

	//调转物块方向,当mov=false时:左转n=3,右转n=1,翻转n=2.
	//当mov=true时:n为物块旋转后的角度
	//mov用于判断是否是mov命令
	function changeDirc(elem, n, direction, mov = false) {
		var temp;
		var k;
		if(!mov) {
			for(var i = 0; i < 4; i++) {
				if(head == dirc[i]) {
					break;
				}
			}
			//设置旋转后的角度
			switch(n) {
				case 1:
					deg += 90;
					break;
				case 2:
					deg += 180;
					break;
				case 3:
					deg = deg - 90;
			}

			//设置调转后头部的朝向
			temp = (i+n) % 4;
			head = dirc[temp];
		}
		else {
			//设置旋转后的角度
			temp = deg % 360;
			deg -= temp;
			deg += n;
			if(head === direction) {
				k = 1;
			}
			else {
				head = direction;
				k = 0;
			}
		}
		//控制物块旋转
		elem.style.transform = "rotate(" + deg + "deg)";
		return k;
	}

	//控制物块的前进
	function go(elem, traDirc, norm = false) {
		var isMove = 0;
		var direction = "";
		if(norm) {
			direction = dirc[traDirc];
		}
		else {
			direction = head;
		}

		isMove = judgeBoundary(direction);
		if(isMove) {
			switch(direction) {
				case "t":
					setLocat(elem, 0, -40);
					break;
				case "l":
					setLocat(elem, -40, 0);
					break;
				case "r":
					setLocat(elem, 40, 0);
					break;
				case "b":
					setLocat(elem, 0, 40);
					break;
			}
		}
	}

	return {
		init: init,
		changeDirc: changeDirc,
		go: go
	};

})();


window.onload = function() {
	//获取物块
	var move = document.getElementById("move");
	//获取文本框
	var text = document.querySelector(".command");
	//获取按钮
	var btn = document.querySelector(".do");
	//存储输入的命令信息
	var commands = ["go", "tun lef", "tun rig", "tun bac", "tra top", "tra rig", "tra bot", "tra lef", "mov top", "mov rig", "mov bot", "mov lef"];

	//初始化物块的位置
	slider.init(move);

	function mov(isDirc) {
		if(isDirc) {
			slider.go(move);
		}
		else {
			setTimeout(function() {
				slider.go(move)
			}, 1000); //1s后前进
		}
	}

	//给按钮添加点击事件
	btn.onclick = function() {
		//取得文本框内的内容并转换为小写字母
		var textValue = (text.value).toLowerCase();
		var isDirc;
		//如果文本框中还没有内容则返回
		if(!textValue) {
			return;
		}
		var len = commands.length;
		//判断输入的命令并执行相应的操作
		for(var i = 0; i < len; i++) {
			if(textValue === commands[i]) {
				break;
			}
		}
		switch(i) {
			case 0:
				slider.go(move);
				break;
			case 1:
				slider.changeDirc(move, 3);
				break;
			case 2:
				slider.changeDirc(move, 1);
				break;
			case 3:
				slider.changeDirc(move, 2);
				break;
			case 4:
				slider.go(move, 0, true);
				break;
			case 5:
				slider.go(move, 1, true);
				break;
			case 6:
				slider.go(move, 2, true);
				break;
			case 7:
				slider.go(move, 3, true);
				break;
			case 8:
				isDirc = slider.changeDirc(move, 0, "t", true);
				mov(isDirc);
				break;
			case 9:
				isDirc = slider.changeDirc(move, 90, "r", true);
				mov(isDirc);
				break;
			case 10:
				isDirc = slider.changeDirc(move, 180, "b", true);
				mov(isDirc);
				break;
			case 11:
				isDirc = slider.changeDirc(move, -90, "l", true);
				mov(isDirc);
				break;
		}
	};
};