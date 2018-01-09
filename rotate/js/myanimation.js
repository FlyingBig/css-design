$(".card-first").on("click",function(){
		var disappear = {
				opacity : "0",
				top : "40px"
		}
		var appear    = {
			  opacity : "1",
				top : "0"
		}
		var firstcard = $(this).children(".card").first();
				firstcard.css(disappear);				
		var settime   = setTimeout(function(){
				firstcard.css(appear);
/*			  $(".card-first").children(".card").first().remove();*/
			 	$(".card-first").append(firstcard);
		},200);
})

$(".card-second").on("click",function(){
		var disappear = {
				opacity : "0",
				left : "-40px"
		}
		var appear    = {
			  opacity : "1",
				left : "0"
		}
		var firstcard = $(this).children(".card").first();
				firstcard.css(disappear);				
		var settime   = setTimeout(function(){
				firstcard.css(appear);
/*			  $(".card-first").children(".card").first().remove();*/
			 	$(".card-second").append(firstcard);
		},200);
})

$(".card-third").on("click",function(){
		var disappear = {
			opacity : "0",
		}
		var appear    = {
			opacity : "1",
		}
		var firstcard = $(this).children(".card").first();
				firstcard.css(disappear);				
		var settime   = setTimeout(function(){
				firstcard.css(appear);
/*			  $(".card-first").children(".card").first().remove();*/
			 	$(".card-third").append(firstcard);
		},200);
})

function createpoint(){
	var degs = 0; 
	for(var step=1; step<=60; step++){
		var point = "<div class='divpoint' style='transform: rotate("+degs+"deg);'><div class='showpoint'></div></div>";
		$(".clockall").append(point);
		degs += 6;
	}
}
function createnum(){
	var degs = -60; 
	for(var step=1; step<=12; step++){
		var point = "<div class='divnum' style='transform: rotate("+degs+"deg);'><div class='shownum' style='transform: rotate("+(-degs)+"deg);' >"+step+"</div></div>";
		$(".num").append(point);
		degs += 30;
	}
}
var setint  = setInterval(function(){
	var data = new Date();
	var miao = data.getSeconds();
	var fen  = data.getMinutes();
	var onehour = miao + fen*60;
	onehour++;		
	if(onehour > 3600){
		onehour = 0;
	}else{
		onehour = onehour / 3600;
	}
	var shi  = data.getHours();
	$(".shi").css({"transform":"rotate("+((shi+onehour)*30-90)+"deg)"});
	$(".fen").css({"transform":"rotate("+(fen*6-90)+"deg)"});
	$(".miao").css({"transform":"rotate("+(miao*6-90)+"deg)"});
},1001)
createnum();
createpoint();

/*############  ALERT  ##############*/
function tosplit(){
	var positions = [
		position1 = {
			"top"  : "0",
			"left" : "45%",
			"-webkit-transform" : "rotate(720deg)"
		},
		position2 = {
			"top"  : "20%",
			"left" : "30%",
			"-webkit-transform" : "rotate(720deg)"
		},
		position3 = {
			"top"  : "55%",
			"left" : "25%",
			"-webkit-transform" : "rotate(720deg)"
		},
		position4 = {
			"top"  : "85%",
			"left" : "35%",
			"-webkit-transform" : "rotate(720deg)"
		}
	]
	var menu = $(".more").siblings();
	menu.each(function(i){
		$(this).css(positions[i]);
	})
}
function totogether(){
	var positions = {
		"top"  : "50%",
		"left" : "50%",
		"-webkit-transform" : "rotate(0deg)"
	};
	var menu = $(".more").siblings();
	menu.each(function(i){
		$(this).css(positions);
	})
}
$(".more").click(function(){
	var flag = $(this).attr("alt");
	console.log(flag)
	if(flag == "false"){
		tosplit();
		$(this).attr("alt","true");
	}else{
		totogether();
		$(this).attr("alt","false");
	}
	
})
