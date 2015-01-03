/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellRadioControl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellRadio(o){
   o = RClass.inherits(this, o, FCell);
   // Method
   o.get       = FCellRadio_get;
   o.reget     = FCellRadio_reget;
   o.set       = FCellRadio_set;
   o.validText = FCellRadio_validText;
   return o;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellRadio_get(){
   return this.dataValue;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellRadio_reget(){
   return this.descriptor().formatValue(this.text());
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellRadio_set(v){
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
function FCellRadio_validText(t){
   return true;
}
//------------------------------------------------------------
