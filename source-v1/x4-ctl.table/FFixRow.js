//==========================================================
// <T>表格内非固定列的行对象。</T>
//
// @class FRowControl
// @history 091016 MAOCY 创建
//==========================================================
function FFixRow(o){
   o = RClass.inherits(this, o, FRowControl);
   // ---------------------------------------------------------
   // @method
   o.push  = FFixRow_push;
   return o;
}

//==========================================================
// <T>当前行控件内增加一个单元格控件。</T>
//
// @method
// @params c:cell:TCell 单元格
//==========================================================
function FFixRow_push(c){
   var o = this;
   o.base.FRowControl.push.call(o, c);
   // 增加单元格
   o.hPanel.appendChild(c.hPanel);
}
