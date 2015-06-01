//==========================================================
// <T>校验管理器。</T>
//
// @refencene
// @history 091126 MAOCY 创建
//==========================================================
var RValidator = new function(){
   var o = this;
   //..........................................................
   // @attribute
   o._date                = new TDate();
   //..........................................................
   // @method
   // 所有：数据必须
   o.validRequire         = RValidator_validRequire;
   // 日期：时间格式
   o.validDate            = RValidator_validDate;
   // 文本：长度
   o.validTextLength      = RValidator_validTextLength;
   // 数字：最大值
   o.validMinNumber       = RValidator_validMinNumber;
   // 数字：最小值
   o.validMaxNumber       = RValidator_validMaxNumber;
   //..........................................................
   RMemory.register('RValidator', o);
   return o;
}

//==========================================================
// <T>校验必须性。</T>
//
// @method
// @param v:validator:MValidator 校验器
// @param t:text:String 文本内容
// @return Boolean 校验是否通过
//==========================================================
function RValidator_validRequire(v, t){
   if(RString.isEmpty(t)){
      v._valid = false;
      v._validText = RContext.get('RValidator:empty');
      return false;
   }
   return true;
}

//==========================================================
// <T>校验时间格式。</T>
//
// @method
// @param v:validator:MValidator 校验器
// @param t:text:String 文本内容
// @return Boolean 校验是否通过
//==========================================================
function RValidator_validDate(v, t){
   var o = this;
   if(!RString.isEmpty(t)){
      if(null == RDate.autoParse(o._date, t)){
         v._valid = false;
         v._validText = RContext.get('RValidator:date.format');
         return false;
      }
   }
   return true;
}

//==========================================================
// <T>校验最小数据。</T>
//
// @method
// @param v:validator:MValidator 校验器
// @param t:text:String 文本内容
// @param min:min:Number 最小数字
// @param eq:equals:Boolean 是否可以相等
// @return Boolean 校验是否通过
//==========================================================
function RValidator_validMinNumber(v, t, min, eq){
   var o = this;
   if(!RString.isEmpty(t)){
      var tv = parseInt(t);
      if(eq && tv < min){
         v._valid = false;
         v._validText = RContext.get('RValidator:number.min.eq', min);
         return false;
      }else if(!eq && tv <= min){
         v._valid = false;
         v._validText = RContext.get('RValidator:number.min', min);
         return false;
      }
   }
   return true;
}

//==========================================================
//<T>校验数据长度。</T>
//
//@method
//@param v:validator:MValidator 校验器
//@param t:text:String 文本内容
//@param l:length:Number 最小数字
//@param eq:equals:Boolean 是否可以相等
//@return Boolean 校验是否通过
//==========================================================
function RValidator_validTextLength(v, t, l){
	var o = this;
	var cl = t.length;
	if(cl > l){
		v._valid = false;
        v._validText = RContext.get('RValidator:length.max', l);
	    return false;
	}
	return true;
}

//==========================================================
// <T>校验最大数据。</T>
//
// @method
// @param v:validator:MValidator 校验器
// @param t:text:String 文本内容
// @param min:min:Number 最小数字
// @param eq:equals:Boolean 是否可以相等
// @return Boolean 校验是否通过
//==========================================================
function RValidator_validMaxNumber(v, t, min, eq){
   var o = this;
   if(!RString.isEmpty(t)){
      var tv = parseInt(t);
      if(eq && tv > min){
         v._valid = false;
         v._validText = RContext.get('RValidator:number.max.eq', min);
         return false;
      }else if(!eq && tv >= min){
         v._valid = false;
         v._validText = RContext.get('RValidator:number.max', min);
         return false;
      }
   }
   return true;
}
