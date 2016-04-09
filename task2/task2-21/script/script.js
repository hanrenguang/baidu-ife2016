//用于处理物块的各种动作的对象
var slider = (function() {
	//定义私有变量
	//存储四个方向, t:向上  l:向左  r:向右  b:向下
	var dirc = ["t", "r", "b", "l"];
	//存储物块的头部方向, 默认为t
	var head = dirc[0];
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
	function judgeBoundary() {
		if(head == "t" && sliderY == 1) {
			//提示错误
			return 0;
		}
		else if(head == "l" && sliderX == 1) {
			//提示错误
			return 0;
		}
		else if(head == "r" && sliderX == 361) {
			//提示错误
			return 0;
		}
		else if(head == "b" && sliderY == 361) {
			//提示错误
			return 0;
		}
		else {
			return 1;
		}
	}

	//调转物块方向,左转n=3,右转n=1,翻转n=2,classN为设置好样式的类名数组
	function changeDirc(elem, classN, n) {
		var temp;
		for(var i = 0; i < 4; i++) {
			if(head == dirc[i]) {
				break;
			}
		}
		//设置调转后头部的朝向
		temp = (i+n) % 4;
		head = dirc[temp];

		elem.className = classN[temp];
	}

	//控制物块的前进
	function go(elem) {
		var isMove = judgeBoundary();
		if(isMove) {
			switch(head) {
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
	var commands = ["go", "tun lef", "tun rig", "tun bac"];
	//存储类名
	var classArr = ["head-top", "head-right", "head-bottom", "head-left"];

	//初始化物块的位置
	slider.init(move);

	//给按钮添加点击事件
	btn.onclick = function() {
		//取得文本框内的内容并转换为小写字母
		var textValue = (text.value).toLowerCase();
		//如果文本框中还没有内容则返回
		if(!textValue) {
			return;
		}
		//判断输入的命令并执行相应的操作
		for(var i = 0; i < 4; i++) {
			if(textValue === commands[i]) {
				break;
			}
		}
		if(i == 0) {
			slider.go(move);
		}
		else if(i == 1) {
			slider.changeDirc(move, classArr, 3);
		}
		else if(i == 2) {
			slider.changeDirc(move, classArr, 1);
		}
		else if(i == 3) {
			slider.changeDirc(move, classArr, 2);
		}
	};
};