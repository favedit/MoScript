//==========================================================
// <T>表格列表类。</T>
// 模板:
//  hPanel<TABLE>
// ┌------------------------------------------------------┐
// │ hTitleForm<TABLE>                                  │
// │┌-------------------------------┬-----------------┐│
// ││hCaption<TD>                   │(Buttons)        ││
// │└-------------------------------┴-----------------┘│
// ├------------------------------------------------------┤
// │ hBorderPanel<TD:TBorder.hPanel>                      │
// │┌--------------------------------------------------┐│
// ││hHeadPanel<DIV>                                   ││
// ││┌----------------------------------------------┐││
// │││ hHeadForm<TABLE>                             │││
// │││┌------------------------------------------┐│││
// ││││hHead<TR>                                 ││││
// │││├------------------------------------------┤│││
// ││││hSearch<TR>                               ││││
// │││└------------------------------------------┘│││
// ││└----------------------------------------------┘││
// ││hDataPanel<DIV>                                   ││
// ││┌----------------------------------------------┐││
// │││ hDataForm<TABLE>                             │││
// │││┌------------------------------------------┐│││
// │││└------------------------------------------┘│││
// ││└----------------------------------------------┘││
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
function FFixTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   //..........................................................
   // @Attribute
   o.__rowClass     = FFixRow;
   //..........................................................
   // @event
   o.onResizeAfter = FFixTable_onResizeAfter;
   o.onBuildData   = FFixTable_onBuildData;
   //..........................................................
   // @process
   o.oeResize      = FFixTable_oeResize;
   o.oeRefresh     = FFixTable_oeRefresh;
   //..........................................................
   // @method
   o.pushColumn    = FFixTable_pushColumn;
   return o;
}
// ------------------------------------------------------------
function FFixTable_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   // 调整标题列宽度
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - RHtml.scrollWidth(hdp);
}
//==========================================================
function FFixTable_onBuildData(){
   // 建立列的标题区(Layer:1)
   var o = this;
   var hhp = o.hHeadPanel = RBuilder.appendDiv(o.hDataPanel);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#29BAD5';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   // 建立数据区
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   // 关联事件对象
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
}

// ------------------------------------------------------------
function FFixTable_oeResize(e){
   var o = this;
   // 检查是否尺寸改变
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   // 获取对象定义
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hhp = o.hHeadPanel;
   var hdp = o.hDataPanel;
   // 隐去数据列和数据区，计算无干扰得底板宽度和高度
   hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
   hdp.style.display = 'block';
   // 修正标题区的宽度
   hhp.style.pixelWidth = ow;
   // 计算数据区起始位置和宽度
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   // 调整初始滚动
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   // 使用异步事件计算滚动条宽度
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}

// ------------------------------------------------------------
function FFixTable_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      o.refreshStatus();
      // 计算初始化宽度
      var hcf = o.hTitleForm;
      var hhp = o.hHeadPanel;
      var hdp = o.hDataPanel;
      // 获得初始数据
      var hcfh = hcf.offsetHeight;
      var hhph = hhp.offsetHeight;
      // 隐去数据列和数据区，计算无干扰得底板宽度
      hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hdp.style.display = 'block';
      // 计算标题区的位置和大小
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = 0;
      hhp.style.pixelWidth = ow;
      // 计算数据区起始位置和宽度
      hdp.style.paddingLeft = 0;
      hdp.style.paddingTop = hhph;
      hdp.style.pixelWidth = ow;
      hdp.style.pixelHeight = oh - hcfh;
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
      }
   }
}
// ------------------------------------------------------------
function FFixTable_pushColumn(c){
   var o = this;
   // 追加标题列
   o.hHead.appendChild(c.hPanel);
   // 追加搜索列
   o.hSearch.appendChild(c.hSearchPanel);
   // 在数据区追加修正行
   o.hRowLine.appendChild(c.hFixPanel);
   // 追加控件
   o.push(c);
}
