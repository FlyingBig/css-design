  /* ======================= Drawcard.Js ===========================*/
	var savedata = [1,2,3,4,5,6,7,8,98,9,90,1]; //储存后台共享数据容器。
  var spendtimedt = 1000; //默认执行完一次共享数据动画的花费的时间。
  
	var flopcard = {
		 adddata : function(data){ //添加数组方法（后台只需要忘这里面添加值就能实现翻牌）
		 	savedata.push(data);
		 },
		 splitnum : function(num,name1,name2,time){ //num=存放数组 ——name1=显示牌 ——name2=隐藏牌——time ==毫秒。
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
	};
  var stopdataanimate = setTimeout(function(){
  	//数据共享执行动画时间判断
  	setTimeout(function resetanimate(){
  		if(savedata.length<=0){
  			spendtimedt = 500;
      	}else{
      		var alpha = (savedata.length / 5);
      		alpha > 11 ? 10 : alpha;
      		spendtimedt = 1500 / alpha * 2;
      	}
	  	if(spendtimedt == 500){
	  			  		
	  	}else{	  	
	  		flopcard.splitnum(savedata[0],".shownums",".hidenums",spendtimedt);//执行翻牌（settimeout代替setinterval，目的是能根据数组长度来改变每次执行函数的时间）
	  	}
  		stopdataanimate = setTimeout(resetanimate,spendtimedt);
  	},spendtimedt);
  },spendtimedt);
