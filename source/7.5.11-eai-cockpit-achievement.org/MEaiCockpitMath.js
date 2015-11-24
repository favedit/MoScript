//==========================================================
// <T>数据处理接口。</T>
//
// @class
// @author suiming
// @history 15/11/20
//==========================================================
MO.MEaiCockpitMath = function FEaiCockpitDataNotice(o) {
   o = MO.Class.inherits(this, o, MO.RMath);
   //..........................................................
   // @method
   //取第二位5的倍数
   o.fetchRound = MO.MEaiCockpitMath_fetchRound ;
   //取出数据的位数
   o.fetchlength = MEaiCockpitMath_fetchlength ;
   return o;
}
//@method
//param 字符串 string
//取第二位5的倍数
MO.MEaiCockpitMath_fetchRound =  function  MEaiCockpitMath_fetchRound(MaxValue){
	var o = this ;
	var valueResult = 0 ;
	var MaxValue = MaxValue;
	var roundLength = o.fetchlength(MaxValue);
	var  roundFirst = parseInt(MaxValue.substr(0,1));
	if(roundLength>1){
		var roundSecond = parseInt(MaxValue.substr(1,1));
		if(roundSecond == 0){
			return roundFirst * Math.pow(10,roundLength-1);
		}else{
		var operation = roundSecond < 5 ? 5 : 0;
			if (operation == 5) {
				return (roundFirst + 0.5) * Math.pow(10,roundLength-1);
			}else{
				return (roundFirst + 1) * Math.pow(10,roundLength-1);
			}
		}
	}else{
		if (roundFirst>5) {
			return 10;
		}else{
			return 5;
		}
	}
}
//method
//param 字符串 string
MO.MEaiCockpitMath_fetchlength = function MEaiCockpitMath_fetchlength(value){
	var o = this ;
	var value = value;
	return value.length;
}




