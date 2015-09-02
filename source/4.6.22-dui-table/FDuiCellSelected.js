//==========================================================
// <T>表格选择单元格。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiCellSelected = function FDuiCellSelected(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   //..........................................................
   // @property
   o._dataName  = '_select';
   //..........................................................
   // @style
   o._styleEdit = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   //..........................................................
   // @html
   o._hSelected = null;
   //..........................................................
   // @event
   o.onBuild    = MO.FDuiCellSelected_onBuild;
   // @event
   o.onSelected = MO.FDuiCellSelected_onSelected;


   // @method
   //o.buildForm     = FDuiCellSelected_buildForm;
   //o.refreshStyle  = FDuiCellSelected_refreshStyle;
   //o.isDataChanged = RMethod.emptyFalse;
   //o.get           = RMethod.empty;
   //o.reget         = RMethod.empty;
   //o.set           = RMethod.empty;
   //o.dispose       = FDuiCellSelected_dispose;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiCellSelected_onBuild = function FDuiCellSelected_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   // 创建底板
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   var hs = o._hSelected = MO.Window.Builder.appendCheck(h, o.styleName('Edit'));
   hs.parent = o;
   hs.onclick = o.onSelected;
}

//==========================================================
//<T>选中事件处理。</T>
//
//@method
//==========================================================
MO.FDuiCellSelected_onSelected = function FDuiCellSelected_onSelected(p){
   var o = this;
   //var r = o.parent.row;
   //var t = o.parent.table;
   //if(o.checked){
      //t.selectRow(r, false, true);
   //}else{
     //t.clearSelectRow(r);
   //}
}








//==========================================================
//<T>ˢ�µ�Ԫ����ʽ��</T>
//
//@method
//==========================================================
MO.FDuiCellSelected_refreshStyle = function FDuiCellSelected_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(t.dispSelected){
      o.hPanel.style.display = 'block';
      if(r.isSelect){
         o._hSelected.checked = true;
         o.hPanel.style.backgroundColor = '#CEE7FF';
      }else{
         o._hSelected.checked = false;
         o.hPanel.style.backgroundColor = '#FFFFFF';
      }
   }else{
      o.hPanel.style.display = 'none';
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FDuiCellSelected_dispose = function FDuiCellSelected_dispose(){
   var o = this;
   o.base.FDuiCellEditControl.dispose.call(o);
   o._hSelected = null;
}
