var slide = (function(win,doc){
		/*创建html样式*/
		var createHtml = function(){
			var str = '';
				str +=  '<div class="stage">'
					+	'<div class="arrow_left" id="slide_left"><img src="img/arrow-left.png"></div>'
					+	'<div class="arrow_right" id="slide_right"><img src="img/arrow-right.png"></div>'
					+	'<div class="content">'
					+	'<div class="imgs"><img src="img/01.jpg" /></div>'
					+	'<div class="imgs"><img src="img/02.jpg" /></div>'
					+	'<div class="imgs"><img src="img/03.jpg" /></div>'
					+	'<div class="imgs"><img src="img/04.jpg" /></div>'
					+	'<div class="imgs"><img src="img/05.jpg" /></div>'
					+	'<div class="imgs"><img src="img/01.jpg" /></div>'
					+	'</div>'
					+	'</div>';
			$("body").append(str);
		}
		var gomove = function(){
			var clickobj; //最外面的大盒子
			var imgs; //装图片的集合
			var content; //装图片的直接父级元素
		};
		/*实列化*/
		gomove.prototype.init   = function(){
			createHtml();
			this.clickobj = doc.getElementsByClassName("stage")[0];
			this.imgs     = doc.getElementsByClassName("imgs");
			this.content  = doc.getElementsByClassName("content")[0];
			return this;
		}
		/*向左移动*/
		gomove.prototype.goleft = function(){
			var that = this;
			$(this.clickobj).on("click","#slide_left",function(){
				$(this).attr("id","fff");
				var isme = $(this);
				var firstimg = that.imgs[0].cloneNode(true);
				$(that.imgs[0]).animate({"margin-left" : "-294px"},500,function(){
					that.content.removeChild(that.imgs[0]);
					that.content.appendChild(firstimg);
					isme.attr("id","slide_left");
				});
			});
			return this;
		}
		/*向右移动*/
		gomove.prototype.goright= function(){
			var that = this;
			$(this.clickobj).on("click","#slide_right",function(){
				var firstimg = that.imgs[0].cloneNode(true);
				var lastimg  = that.imgs[that.imgs.length-1].cloneNode(true);
				$(this).attr("id","fff");
				var isme = $(this);
				$(that.imgs[0]).animate({"margin-left" : "294px"},500,function(){
					$(that.imgs[0]).before(lastimg);
					$(that.imgs[1]).replaceWith(firstimg);
					that.content.removeChild(that.imgs[that.imgs.length-1]);
					isme.attr("id","slide_right");
				});
			});
			return this;
		}
		return gomove;
})(window,document)
