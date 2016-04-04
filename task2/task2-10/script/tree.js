var stack = []; //用于存储按前序顺序排列的结点

window.onload = function() {
	//获取按钮
	var btn = document.getElementsByTagName("input");

	addHandler(btn[0], "click", show); //给按钮添加点击事件
}

//给元素element添加event事件,事件触发时调用回调函数func
function addHandler(element, event, func) {
	if(element.addEventListener) {
		element.addEventListener(event, func, false);
	}
	else if(element.attachEvent) { //IE
		element.attachEvent("on"+event, func);
	}
	else {
		element["on"+event] = func;
	}
}

function show() {
	//获取根结点
	var bitree = document.getElementsByTagName("div")[0];
	var i = 0;
	dlr(bitree);
	var len = stack.length;
	//按前序改变结点背景颜色
	setTimeout(function cb(){
		if(i < len){
			recover();
			stack[i].className = "changeBg";
			i++;
			setTimeout(cb,1000);
		}
		else{
			recover();
		}
	}, 1000);
}

//前序遍历二叉树
function dlr(node) {
	if(!!node) {  //如果存在结点node
		//按前序将结点存在数组stack中
		stack.push(node);
		//遍历左子树
		var lchild = getChild(node, 1);
		dlr(lchild);
		//遍历右子树
		var rchild = getChild(node, 2);
		dlr(rchild);
	}
	else {
		return;
	}
}

//获取当前元素的第num个子元素
function getChild(elem, num) {
	var childNds = elem.childNodes; //获取当前元素的所有子元素
	var len = childNds.length;

	for(var i = 0; i < len; i++) {
		if(childNds[i].nodeType == 1) {
			num--;
			if(!num) {
				return childNds[i];
			}
		}
	}

	return;
}

//将所有结点的背景色复原
function recover() {
	var tree = document.getElementsByTagName("div");
	var len = tree.length;
	for(var i = 0; i < len; i++) {
		tree[i].className = "nativeBg";
	}
}