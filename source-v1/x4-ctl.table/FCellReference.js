/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellReferenceControl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellReference(o){
   o = RClass.inherits(this, o, FCell);
   // Method
   o.get       = FCellReference_get;
   o.reget     = FCellReference_reget;
   o.set       = FCellReference_set;
   o.validText = FCellReference_validText;
   return o;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellReference_get(){
   return this.dataValue;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellReference_reget(){
   return this.descriptor().formatValue(this.text());
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellReference_set(v){
   var o = this;
   var d = o.descriptor();
   var mvp = d.iconMap;
   if(mvp && mvp.get(v)){
      o.hImg.style.display = 'block';
      o.hImg.src = RRes.iconPath(mvp.get(v));
   }else{
      if(o.hImg){
         o.hImg.style.display = 'none';
      }
   }
   o.dataValue = RString.nvl(v);
   var t = d.formatText(v);
   o.setText(t);
}
// ------------------------------------------------------------
function FCellReference_validText(t){
   return true;
}
//------------------------------------------------------------
