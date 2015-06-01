//==========================================================
// <T>表格列表类。</T>
// 模板:
//  hPanel<TABLE>
// ┌------------------------------------------------------┐
// │ hTitleForm<TABLE>                                    │
// │┌-------------------------------┬-----------------┐│
// ││hCaption<TD>                   │(Buttons)        ││
// │└-------------------------------┴-----------------┘│
// ├------------------------------------------------------┤
// │ hBorderPanel<TD:TBorder.hPanel>                      │
// │ hDataForm<TABLE>                                     │
// │┌--------------------------------------------------┐│
// ││hHead<TR>                                         ││
// │├--------------------------------------------------┤│
// ││hSearch<TR>                                       ││
// │├--------------------------------------------------┤│
// ││...<TR>                                           ││
// │└--------------------------------------------------┘│
// ├------------------------------------------------------┤
// │ hHintForm<TABLE>                                     │
// │┌------------┬------------------------------------┐│
// ││hHint<TD>   │(Buttons)                           ││
// │└------------┴------------------------------------┘│
// └------------------------------------------------------┘
//
// @class FGridControl
// @history 091022 MAOCY 创建
//==========================================================
function FFixGrid(o) {
   o = RClass.inherits(this, o, FGridControl);
   //..........................................................
   // @Attribute
   o.__rowClass    = FFixRow;
   //..........................................................
   // @Attribute
   o._esize        = ESize.Horizontal;
   //..........................................................
   // @event
   o.onResizeAfter = RMethod.emptyCall;
   o.onBuildData   = FFixGrid_onBuildData;
   //..........................................................
   // @process
   o.oeResize      = RMethod.emptyCall;
   o.oeRefresh     = FFixGrid_oeRefresh;
   //..........................................................
   // @method
   o.pushColumn    = FFixGrid_pushColumn;
   return o;
}

// ------------------------------------------------------------
function FFixGrid_onBuildData(){
   var o = this;
   //建立数据表单
   var hdf = o.hDataForm = RBuilder.appendTable(o.hBorderPanel, null, 1);
   //hdf.width = '100%';
   hdf.frame = 'rhs';
   hdf.style.tableLayout = 'fixed';
   hdf.style.wordBreak = 'break-all';
   hdf.borderColorLight = '#D0D0D0';
   hdf.borderColorDark = '#EEEEEE';
   var hrs = o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hHeadLine = RBuilder.append(hrs, 'TR');
   o.hSearchLine = RBuilder.append(hrs, 'TR');
   // 不需要高度修正
   o.hFixHeight.style.display = 'none';
   // 不要建立浏览栏
   o.panelNavigator = false;
}
// ------------------------------------------------------------
function FFixGrid_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var ow = o.hBorderPanel.offsetWidth;
      // 显示的时候调整一次自动标题宽度
      var ca = null;
      var aw = ow;
      var cs = o.columns;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={0},name2={1})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c.hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 2, ca.width ? ca.width : 120));
    	 //ca.setWidth(aw - 2);
      }
      // 设置底板的可见性
      o.hTitleForm.style.display = o.panelTitle ? 'block' : 'none';
      o.hHeadLine.style.display = o.panelHead ? 'block' : 'none';
      o.hSearchLine.style.display = o.panelSearch ? 'block' : 'none';
      //o.hNavigator.style.display = o.panelNavigator ? 'block' : 'none';
   }
}
// ------------------------------------------------------------
function FFixGrid_pushColumn(c){
   var o = this;
   // 追加标题列
   o.hHeadLine.appendChild(c.hPanel);
   // 追加搜索列
   o.hSearchLine.appendChild(c.hSearchPanel);
   // 追加控件
   o.push(c);
}
