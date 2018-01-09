/* =================== shoppingcar.Js ======================= */
$(".addcar").click(function(){

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
})
