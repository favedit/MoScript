//==========================================================
// <T>表格页面。</T>
//
// @class
// @author maocy
// @version 150901
//==========================================================
MO.FDuiPickerFrame = function FDuiPickerFrame(o) {
   o = MO.Class.inherits(this, o, MO.FDuiWindow, MO.MUiDataset);
   //..........................................................
   // @attribute
   o._table      = null;
   //..........................................................
   // @method
   o.onBuild     = MO.FDuiPickerFrame_onBuild;
   //..........................................................
   // @method
   o.construct   = MO.FDuiPickerFrame_construct;
   // @method
   o.createChild = MO.FDuiPickerFrame_createChild;
   // @method
   o.push        = MO.FDuiPickerFrame_push;
   return o;
}

//==========================================================
// 构建当前控件HTML元素的函数
//
// @method
// @param e:event:EEvent 构建事件
// @see FDuiLayout.oeBuild
// @see MWinBorder.oeBuild
//==========================================================
MO.FDuiPickerFrame_onBuild = function FDuiPickerFrame_onBuild(event){
   var o = this;
   o.__base.FDuiWindow.onBuild.call(o, event);
   // 设置面板
   var table = o._table;
   table.build(o);
   table._hPanel.style.width = '100%';
   table._hPanel.style.height = '100%';
   table._hDataPanel.style.backgound = '#CCCCCC';
   table.setPanel(o._hPanelForm);
   table.psRefresh();
}

//==========================================================
// 构建当前控件HTML元素的函数
//
// @method
// @param e:event:EEvent 构建事件
// @see FDuiLayout.oeBuild
// @see MWinBorder.oeBuild
//==========================================================
MO.FDuiPickerFrame_construct = function FDuiPickerFrame_construct(){
   var o = this;
   o.__base.FDuiWindow.construct.call(o);
   // 设置面板
   var table = o._table = MO.Class.create(MO.FDuiTable);
   table._displayTitle = false;
   table._optionColumnSelect = false;
}

//==========================================================
// <T>创建一个子控件。</T>
//
// @method
// @param xconfig:TXmlNode 节点
// @return FControl 控件
//==========================================================
MO.FDuiPickerFrame_createChild = function FDuiPickerFrame_createChild(xconfig){
   var o = this;
   var control = o._table.createChild(xconfig);
   return control;
}

//==========================================================
// <T>增加一个子控件。</T>
//
// @method
// @param control:FDuiControl 节点
//==========================================================
MO.FDuiPickerFrame_push = function FDuiPickerFrame_push(control){
   var o = this;
   o._table.push(control);
}
