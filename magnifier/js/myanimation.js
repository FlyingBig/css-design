  /* ======================= Drawcard.Js ===========================*/
  var savedata = [1,2,3,4,5,6,7,8,98,9,90,1]; //储存后台共享数据容器。
  var spendtimedt = 1000; //默认执行完一次共享数据动画的花费的时间。
  function adddata(data){ //添加数组方法（后台只需要忘这里面添加值就能实现翻牌）
  	savedata.push(data);
   }
  //实现翻牌效果。
  function splitnum(num,name1,name2,time){ //time ==毫秒。
  	var numnum = num;
  	var strnum = numnum.toString();  //转换成字符串 。
  	var num = strnum.split(""); //拆分装入数组。
  	var num1 = []; // 这个数组以001452的样式存储数据
  	var delnum = []; // 这个数组装的是 下一次与现在 不一样的数字。
  	var index = 0; 
  	//得到新的数组（判定是否等于6位数，不足6位数的位置设置为0）
  	for(var len=0;len<6;len++){
  		if(len < num.length){
  			num1[len] = num[num.length-len-1];
  		}else{
  			num1[len] = 0;
  		}		
  	}
  	//数字赋值给span。
  	var hidespans = $(name2).find("span");
  	var showspans = $(name1).find("span");
  	for(var step=0;step<6;step++){      		
  		$(hidespans[5-step]).text( num1[step] ) ;
  	}
  	//判定翻牌。
  	for(var step=0;step<6;step++){   
  		if($(hidespans[step]).text()!=$(showspans[step]).text() ){
  			//不同牌位置移动。
  			//重新定义牌组。
  			delnum[index] = step;
  			index++;
  			$(hidespans[step]).stop(true, false).animate({
  				'top' : '-100%',
  			},time-100);      			
  			$(showspans[step]).stop(true, false).animate({
  				'top' : '-100%',
  			},time-120,function(){
  				$(showspans[step]).remove();
  				//删除被顶替的元素。
  				for(var i=0;i<delnum.length;i++){
	      			$(showspans[delnum[i]]).after("<span>"+$(hidespans[delnum[i]]).text()+"</span>");
	      			$(showspans[delnum[i]]).remove();
	      		}
	      		//清空隐藏div并添加上新的。
	      		$(name2).empty();
	      		for(var i=0;i<6;i++){      			
	      			$(name2).append("<span></span>")
	      		}		 	      		
  			});      			
  		}
  	}
  	if(savedata.length>0 && name1 == ".shownums"){
  		savedata.shift();
  	}     	
  }
  var stopdataanimate = setTimeout(function(){
  	//数据共享执行动画时间判断
  	setTimeout(function resetanimate(){
  		if(savedata.length<=0){
  			spendtimedt = 500;
      	}else if(savedata.length<10 && savedata.length>0){
      		spendtimedt = 2000;  //2000表示未来的翻牌动画的执行时间。
      	}else{
      		spendtimedt = 1000; // 同上。	
      	}      	
	  	if(spendtimedt == 500){
	  		/*console.log("over");*/		  		
	  	}else{	  	
	  		splitnum(savedata[0],".shownums",".hidenums",spendtimedt);//执行翻牌（settimeout代替setinterval，目的是能根据数组长度来改变每次执行函数的时间）
	  	}
  		stopdataanimate = setTimeout(resetanimate,spendtimedt);
  	},spendtimedt);
  },spendtimedt);
  /* =================== drag.Js ======================= */
  var move = document.getElementById("moveme");
  var bigdiv   = document.getElementById("drag");
  move.onmousedown = function(e){ 
  		var e = e || window.event;
  		e.stopPropagation();
  		var bigdivtop  = bigdiv.offsetTop;
  		var bigdivleft = bigdiv.offsetLeft;
  		var x = e.clientX-move.offsetLeft;
  		var y = e.clientY-move.offsetTop;
  		bigdiv.onmousemove = function(ev){
  			var ev = ev || window.event;
  			ev.stopPropagation();
  			var nowtop  = ev.clientY;
  			var nowleft = ev.clientX;
			move.style.marginLeft = nowleft-bigdivleft-x+"px";
			move.style.marginTop  = nowtop-y+"px";
			if(move.offsetTop<0){
				move.style.marginTop  = 0+"px";
			}else if(move.offsetTop+70>300){
				move.style.marginTop  = 230+"px";
			}
  		}
  }
  bigdiv.onmouseup = function(){
	this.onmousemove = null;
	bigdiv.onmousemove   = null;
  }
  /* =================== shoppingcar.Js ======================= */
$(".addcar").on("click",function(){
	var shoppinggoods = $(this).parents(".mycar").prev().find("img").clone(true);
	$(this).parents(".mycar").prev().append(shoppinggoods);
	shoppinggoods.stop(true,false).animate({
		'width'  :'0',
		'height' :'0',
		'top'    :'140%',
		'left'   :'70%',
		'opacity':'0',
		'z-index':'999'
	},800,
	function(){
	
	});
});
