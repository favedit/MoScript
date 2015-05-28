/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellColorPicker
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellColorPicker(o){
   o = RClass.inherits(this, o, FCellEditControl);
   // Css
   o.styleForm        = RClass.register(o, new TStyle('Form'));
   o.styleEditForm    = RClass.register(o, new TStyle('EditForm'));
   o.styleDropForm    = RClass.register(o, new TStyle('DropForm'));
   o.styleDrop        = RClass.register(o, new TStyle('Drop'));
   // Html
   o.hForm        = null;
   o.hEditForm    = null;
   o.hDropForm    = null;
   o.hEdit        = null;
   o.hDrop        = null;
   // Method
   o.build        = FCellColorPicker_build;
   o.text         = FCellColorPicker_text;
   o.setText      = FCellColorPicker_setText;
   return o;
}

/**************************************************************
 * 创建单元格和内部的input 并添加页面相应函数
 *
 * @method
 * @return HTML td标签
 **************************************************************/
function FCellColorPicker_build(){
   var o = this;
   var c = o.column;
   var h = o.base.FCellEditControl.build.call(o);
   //var he = o.hEdit = RBuilder.append(h, 'INPUT', o.style('Edit'));
   //应该也继承一个MColumnDrop
   // hTb:table
   var hTb = o.hForm = RBuilder.appendTable(h, o.style('Form'));
   var hR  = hTb.insertRow();
   // 可编辑区域
   var hE  = o.hEditForm  = hR.insertCell();
   hE.className = o.style('EditForm');
   o.hEdit = RBuilder.appendEdit(hE,o.style('Edit'));
   //下拉选择区域
   var hD = hR.insertCell();
   var hT = o.hDropForm = RBuilder.appendTable(hD,o.style('DropForm'));
   var hDtd = hT.insertRow().insertCell();
   o.hDrop = RBuilder.appendIcon(hDtd,'#colorpicker',o.style('Drop'),13,13);
   return h;
}
/**************************************************************
 * 得到input 内的值
 *
 * @method
 * @return String input内的值
 **************************************************************/
function FCellColorPicker_text(){
   return this.hEdit.value;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellColorPicker_setText(v){
   this.hEdit.value = v;
}
// ------------------------------------------------------------
