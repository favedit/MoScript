
// JavaScript Document
$(document).ready(function(e) {
   $(".a_share").toggle(
   function(){
	  $("#share").slideDown(); },
  function(){
  	  $("#share").slideUp(); })
  $(".a_menu").toggle(
   function(){
	  $("#menu").slideDown(); },
  function(){
  	  $("#menu").slideUp(); }); 
});
function pageScroll(){
window.scrollBy(0,-100);
scrolldelay = setTimeout('pageScroll()',100);
var sTop=document.documentElement.scrollTop+document.body.scrollTop;
if(sTop==0) clearTimeout(scrolldelay);}

function swipeFn(ID,txtTag){
	var kvIndex=0;
	var W= $(ID).find(".ShowPicBoxCont").width();
	var kvLen=$(ID).find(".ShowPicBoxCont div img").length;
	$(ID).find(txtTag).addClass("hide").eq(kvIndex).removeClass("hide");
	function kvSwipe(event, phase, direction, distance) {
		if(phase=="end"){		
			if(direction=="left" && kvIndex<kvLen-1){
				kvIndex++;
			}
			else if(direction=="right" && kvIndex>0)
			{
				kvIndex--;
			}
			$(ID).find(".ShowPicBox ul li").removeClass("current").eq(kvIndex).addClass("current");
			$(ID).find(txtTag).addClass("hide").eq(kvIndex).removeClass("hide");
			TweenMax.to($(ID).find(".ShowPicBoxCont div"), 0.5, {left:-W*kvIndex, ease:Expo.easeOut});
			//kvMove(direction)
		}
		else
		{
			if(direction=="left")
			{
				$(ID).find(".ShowPicBoxCont div").css({left:-kvIndex*W-distance});
			}
			else if(direction=="right")
			{
				$(ID).find(".ShowPicBoxCont div").css({left:-kvIndex*W+distance});
			}
		}
	}	
	$(ID).find(".ShowPicBox").swipe( { swipeStatus:kvSwipe, allowPageScroll:"vertical" } );	
}

//加减号展开/收起通用功能函数  
  function SHfn(ID,EmClick,emSH,Icon,Class){
	  $(ID).find(emSH).not($(ID).find(emSH).eq(0)).hide();  
  $(ID).find(EmClick).click(function(){
	 $(this).closest(ID).find(EmClick).find("a").not($(this).find("a")).removeClass();
	 $(this).closest(ID).find(Icon).not($(this).find(Icon)).text("+");
	 $(this).closest(ID).find(emSH).not($(this).next(emSH)).hide();
	 $(this).next(emSH).toggle();
	 
	 if($(this).next(emSH).is(":hidden")){
		 $(this).find(Icon).text("+");
		 $(this).find("a").addClass(Class);
	}else{
		 $(this).find(Icon).text("-");
		 $(this).find("a").removeClass();			 
	}
	  })
	  }
	  
	