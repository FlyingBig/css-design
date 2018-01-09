//这个是样式
var ys = {
	"dis":{"disabled":"disabled"},
	"notbj":{"background":"#F5F5F5"},
	"bj":{"background":"white"},
};
var calendar = {
	//得到某年某月的一号是星期几
	get_one_week   : function(year,month){
		var date = new Date();
		date.setFullYear(year);
		date.setMonth(month);
		date.setDate(1);
		var _num = date.getDay();  
		return _num;
	},
	//得到该月份的最大天数
	get_month_days : function(year,month){
		var _alldays = new Date(year,month,0).getDate();
		return _alldays;
	},
	//得到年月日
	getYMD : function(){
		var date = new Date();
		this._Year  = date.getFullYear(); //年份
		this._Mouth = date.getMonth()+1;  //月份
		this._Day   = date.getDate();
		this._week  = this.get_one_week(this._Year,this._Mouth-1);
		this._alldays = this.get_month_days(this._Year,this._Mouth);
		return this;
	},
	//点击事件---日期
	click_date : function(that){
		var num =$(that).text();
		var divs = document.getElementsByClassName("calendar_date");
		var memorandum = document.getElementsByClassName("memorandum")[0];
		$(divs).removeClass("click");
		$(that).addClass("click");
		var that_x = $(that).offset().left;
		var that_y = $(that).offset().top;
		$(memorandum).slideDown();
		console.log(memorandum)
		$(memorandum).css({
			"left": (that_x+72),
			"top" : (that_y-75),
		});
		
	},
	//点击月份向前移
	click_prov : function(){
		var showYM = document.getElementsByClassName("showYM")[0];
		this._Mouth = this._Mouth - 1;
		if(this._Mouth < 1){
			this._Year  = this._Year - 1;
			this._Mouth = 12;
		}
		$(showYM).text(this._Year+"年"+this._Mouth+'月');
		//重置最大天数和一号星期几
		this._week  = this.get_one_week(this._Year,this._Mouth-1);
		this._alldays = this.get_month_days(this._Year,this._Mouth);
		//重绘日期
		this.createCalendarHTML();
		//隐藏提示框
		$(".memorandum").hide();
	},
	//点击月份向后移
	click_next : function(){
		var showYM = document.getElementsByClassName("showYM")[0];
		this._Mouth = this._Mouth + 1;
		if(this._Mouth > 12){
			this._Year  = this._Year + 1;
			this._Mouth = 1;
		}
		//重置最大天数和一号星期几
		$(showYM).text(this._Year+"年"+this._Mouth+'月');
		this._week  = this.get_one_week(this._Year,this._Mouth-1);
		this._alldays = this.get_month_days(this._Year,this._Mouth);
		//重绘日期
		this.createCalendarHTML();
		//隐藏提示框
		$(".memorandum").hide();
	},
	//根据年月日来创建calendar的html代码
	createCalendarHTML : function(){
		var _datetime = 1; // 日期1~31
		var _flag     = 0;
		var _lastnum  = this.get_month_days(this._Year,this._Mouth-1); //上个月最后一天
		 _lastnum     = _lastnum - this._week+1; //(30 29 28 27) =>(27 28 29 30)
		var _nextnum  = 1; //下个月最后一天
		var _rowcount = Math.ceil((this._alldays+this._week) / 7); //控制有多少行
		
		var html = ''
			html += '<div class="calendar">';
			html += '<div class="calendar_header">';
			html += '<div class="YMBack" onclick="calendar.click_prov()"></div>';
			html += '<div class="showYM"><span class="year">'+this._Year+"</span>年<span class='month'>"+this._Mouth+'</span>月</div>';
			html += '<div class="YMForward" onclick="calendar.click_next()"></div>';
			html += '<div style="clear: both;"></div>';
			html += '</div>';
			html += '<div class="calendar_body">';
			html += '<div class="calendar_body_top">';
			html += '<div>日</div>';
			html += '<div>一</div>';
			html += '<div>二</div>';
			html += '<div>三</div>';
			html += '<div>四</div>';
			html += '<div>五</div>';
			html += '<div>六</div>';
			html += '</div>';
			html += '<div class="calendar_body_buttom">';
		/*生成ROW数*/
		for(let i=0;i<_rowcount;i++){
			html += '<div class="calendar_row">';
			/*生成日期数*/
			for(let k=0,step=7;k<step;k++){
				if(_flag < this._week){
					html += '<div><div class="calendar_date nomonth">'+_lastnum+'</div></div>';
					_lastnum++;
					_flag++;
				}
				else if(_datetime <= this._alldays){
					if(_datetime == this._Day){
						html += '<div><div class="calendar_date active" onclick="calendar.click_date(this)">'+(_datetime)+'</div></div>';
					}else{
						html += '<div><div class="calendar_date" onclick="calendar.click_date(this)">'+(_datetime)+'</div></div>';
					}
					_datetime++;
				}
				else{
					html += '<div><div class="calendar_date nomonth">'+_nextnum+'</div></div>';
					_nextnum++;
				}
			}
			html += '</div>';
		}
		html += '</div></div></div>';	
		$(".calendar").remove();
		$(".bigdiv").append(html);
		return this;
	},
	//创建备忘录的html
	createMemorandumHTML : function(){
		var html = ''
			html += '<div class="memorandum">';
			html += '<div class="content">';
			html += '<div class="arrow"></div>';
			html += '<div class="close" onclick="calendar.closeclick()"><img src="img/close.png"></div>';
			html += '<h4 class="title">备忘录</h4>';
			html += '<textarea disabled="disabled" class="content_write">命运就算颠沛流离,命运就算曲折离奇</textarea>';
			html += '<div class="hidescroll"></div>';
			html += '</div>';
			html += '<div class="do">';
			html += '<a class="bj" onclick="calendar.bjclick()">编辑</a>';
			html += '<a class="save" onclick="calendar.saveclick()">保存</a>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
		$(".bigdiv").append(html);
		return this;
	},
	//点击备忘录编辑按钮
	bjclick : function(){
		var content_memorandum = document.getElementsByClassName("content_write")[0]; //备忘录的内容
		var hidescroll = document.getElementsByClassName("hidescroll")[0];
		$(content_memorandum).removeAttr("disabled");
		$(content_memorandum).css(ys.bj);
		$(hidescroll).css(ys.bj); //隐藏
		//点击编辑以后使光标移动到文本域尾部
		content_memorandum.focus();
		var length = content_memorandum.value.length;
		if (document.selection) { 
			//兼容IE把光标放到最后
		var sel = content_memorandum.createTextRange(); 
			sel.moveStart('character',len); 
			sel.collapse(); 
			sel.select(); 
		} else if (typeof content_memorandum.selectionStart == 'number' && typeof content_memorandum.selectionEnd == 'number') { 
			content_memorandum.selectionStart = content_memorandum.selectionEnd = length; 
		} 
	},
	//点击备忘录的关闭按钮
	closeclick : function(){
		var memorandum = document.getElementsByClassName("memorandum")[0];
		var content_memorandum = document.getElementsByClassName("content_write")[0]; //备忘录的内容
		var hidescroll = document.getElementsByClassName("hidescroll")[0]; //遮住滚动条的
		$(memorandum).slideUp();
		$(content_memorandum).attr(ys.dis);
		$(content_memorandum).css(ys.notbj);
		$(hidescroll).css(ys.notbj);
	},
	//点击备忘录的保存按钮
	saveclick : function(){
		var content_memorandum = document.getElementsByClassName("content_write")[0]; //备忘录的内容
		var hidescroll = document.getElementsByClassName("hidescroll")[0]; //遮住滚动条的
		$(content_memorandum).attr(ys.dis);
		$(content_memorandum).css(ys.notbj);
		$(hidescroll).css(ys.notbj);
	}
}
