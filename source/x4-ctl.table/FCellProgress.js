/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellProgress
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellProgress(o){
   o = RClass.inherits(this, o, FCellEditControl);
   // Html
   o.hEdit        = null;
   // Method
   o.build        = FCellProgress_build;
   o.text         = FCellProgress_text;
   o.setText      = FCellProgress_setText;
   return o;
}

/**************************************************************
 * 创建单元格和内部的input 并添加页面相应函数
 *
 * @method
 * @return HTML td标签
 **************************************************************/
function FCellProgress_build(){
   var o = this;
   var c = o.column;
   var h = o.base.FCellEditControl.build.call(o);
   var he = o.hEdit = RBuilder.append(h, 'INPUT', o.style('Edit'));
   return h;
}
/**************************************************************
 * 得到input 内的值
 *
 * @method
 * @return String input内的值
 **************************************************************/
function FCellProgress_text(){
   return this.hEdit.value;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellProgress_setText(v){
   this.hEdit.value = v;
}
// ------------------------------------------------------------
