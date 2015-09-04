//==========================================================
// <T>文本单元格控件。</T>
//
// @class
// @author maocy
// @version 150904
//==========================================================
MO.FDuiCellText = function FDuiCellText(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   //..........................................................
   // @event
   o.onBuildEdit = MO.FDuiCellText_onBuildEdit;
   //..........................................................
   // @method
   o.get         = MO.FDuiCellText_get;
   o.set         = MO.FDuiCellText_set;
   return o;
}

//==========================================================
// <T>在单元格内编辑区创建编辑控件。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiCellText_onBuildEdit = function FDuiCellText_onBuildEdit(p){
   var o = this;
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiCellText_get = function FDuiCellText_get(){
   var o = this;
   var value = o._hPanel.innerHTML;
   return value;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.FDuiCellText_set = function FDuiCellText_set(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   o._hPanel.innerHTML = text;
}
