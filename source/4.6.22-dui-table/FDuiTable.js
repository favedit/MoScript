//==========================================================
// <T>表格列表类。</T>
//
//  hDataPanel<TD>
// ┌------------------------------------------------------------------------------------------┐
// │ hFixPanel<DIV - Z2>         hHeadPanel<DIV - Z1>                                         │
// │┌------------------------┐┌----------------------------------------------------------┐│
// ││ hFixForm<TABLE>        ││ hHeadForm<TABLE>                                         ││
// ││┌--------------------┐││┌------------------------------------------------------┐││
// │││hFixHead<TR>        ││││hHead<TR>                                             │││
// ││├--------------------┤││├------------------------------------------------------┤││
// │││hFixSearchLine<TR>  ││││hSearch<TR>                                           │││
// ││└--------------------┘││└------------------------------------------------------┘││
// │└------------------------┘└----------------------------------------------------------┘│
// │ hColumnPanel<DIV - Z1>      hDataPanel<DIV - Z0>                                         │
// │┌------------------------┐┌----------------------------------------------------------┐│
// ││ hColumnForm<TABLE>     ││ hDataForm<TABLE>                                         ││
// ││┌--------------------┐││┌------------------------------------------------------┐││
// │││                    ││││                                                      │││
// ││└--------------------┘││└------------------------------------------------------┘││
// │└------------------------┘└----------------------------------------------------------┘│
// └------------------------------------------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.FDuiTable = function FDuiTable(o) {
   o = MO.Class.inherits(this, o, MO.FDuiGridControl);
   //..........................................................
   // @property
   o._detailFrameName  = MO.Class.register(o, new MO.APtyString('_detailFrameName'));
   //..........................................................
   // @style
   o._styleFixPanel    = MO.Class.register(o, new MO.AStyle('_styleFixPanel'));
   o._styleFixForm     = MO.Class.register(o, new MO.AStyle('_styleFixForm'));
   o._styleHeadPanel   = MO.Class.register(o, new MO.AStyle('_styleHeadPanel'));
   o._styleHeadForm    = MO.Class.register(o, new MO.AStyle('_styleHeadForm'));
   o._styleColumnPanel = MO.Class.register(o, new MO.AStyle('_styleColumnPanel'));
   o._styleColumnForm  = MO.Class.register(o, new MO.AStyle('_styleColumnForm'));
   o._styleDataPanel   = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm    = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   //..........................................................
   // @html
   o._hFixPanel        = null;
   o._hFixForm         = null;
   o._hHeadPanel       = null;
   o._hHeadForm        = null;
   o._hColumnPanel     = null;
   o._hColumnForm      = null;
   o._hDataPanel       = null;
   o._hDataForm        = null;
   //..........................................................
   // @event
   o.onBuildContent    = MO.FDuiTable_onBuildContent;
   //..........................................................
   // @process
   o.oeRefresh         = MO.FDuiTable_oeRefresh;
   o.oeResize          = MO.FDuiTable_oeResize;
   //..........................................................
   // @method
   o.appendColumn      = MO.FDuiTable_appendColumn;

   //..........................................................
   // @event
   //o.onResizeAfter = MO.FDuiTable_onResizeAfter;
   //..........................................................
   return o;
}

//==========================================================
// <T>构建数据视图处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiTable_onBuildContent = function FDuiTable_onBuildContent(event){
   var o = this;
   var hContentPanel = o._hContentPanel;
   // 建立固定区(Layer:2)
   var hFixPanel = o._hFixPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('FixPanel'));
   var hFixForm = o._hFixForm = MO.Window.Builder.appendTable(hFixPanel, o.styleName('FixForm'), 0, 0, 1);
   //hFixForm.frame = 'rhs';
   hFixForm.borderColorLight = '#D0D0D0';
   hFixForm.borderColorDark = '#EEEEEE';
   o._hFixHead =  MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixSearch = MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixTotal = MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixTotal.style.display = 'none';
   // 建立列的标题区(Layer:1)
   var hHeadPanel = o._hHeadPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('HeadPanel'));
   var hHeadForm = o._hHeadForm = MO.Window.Builder.appendTable(hHeadPanel, o.styleName('HeadForm'), 0, 0, 1);
   //hHeadForm.frame = 'rhs';
   hHeadForm.borderColorLight = '#D0D0D0';
   hHeadForm.borderColorDark = '#EEEEEE';
   o._hHead = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hSearch = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hTotal = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hTotal.style.display = 'none';
   // 建立列区(Layer:1)
   var hColumnPanel = o._hColumnPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('ColumnPanel'));
   var hColumnForm = o._hColumnForm = MO.Window.Builder.appendTable(hColumnPanel, o.styleName('ColumnForm'), 0, 0, 1);
   o._hFixRows = MO.Window.Builder.append(hColumnForm, 'TBODY');
   o._hFixRowLine = MO.Window.Builder.append(o._hFixRows, 'TR');
   // 建立数据区
   var hDataPanel = o._hDataPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('DataPanel'));
   var hDataForm = o._hDataForm = MO.Window.Builder.appendTable(hDataPanel, o.styleName('DataForm'), 0, 0, 1);
   o._hRows = MO.Window.Builder.append(hDataForm, 'TBODY');
   o._hRowLine = MO.Window.Builder.append(o._hRows, 'TR');
   // 关联事件对象
   //o.attachEvent('onHeadMouseDown', o._hHeadForm, o.onHeadMouseDown);
   //o.attachEvent('onHeadMouseMove', o._hHeadForm, o.onHeadMouseMove);
   //o.attachEvent('onHeadMouseUp', o._hHeadForm, o.onHeadMouseUp);
   //o.attachEvent('onDataScroll', o._hDataPanel, o.onDataScroll);
   // 建立浏览栏
   o.panelNavigator = true;
   // 设置可见性
   //o._hHead.style.display = o.panelHead ? 'block' : 'none';
   //o._hFixHead.style.display = o.panelHead ? 'block' : 'none';
   //o._hSearch.style.display = o.panelSearch ? 'block' : 'none';
   //o._hFixSearch.style.display = o.panelSearch ? 'block' : 'none';
   //o._hTotal.style.display = o.panelTotal ? 'block' : 'none';
   //o._hFixTotal.style.display = o.panelTotal ? 'block' : 'none';
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiTable_oeRefresh = function FDuiTable_oeRefresh(event){
   var o = this;
   o.__base.FDuiGridControl.oeRefresh.call(o, event);
   if(event.isAfter()){
      // 计算初始化宽度
      var hFixPanel = o._hFixPanel;
      var hHeadPanel = o._hHeadPanel;
      var hColumnPanel = o._hColumnPanel;
      var hDataPanel = o._hDataPanel;
      // 获得初始数据
      var fixWidth = hFixPanel.offsetWidth;
      var fixHeight = hFixPanel.offsetHeight;
      // 隐去数据列和数据区，计算无干扰得底板宽度
      hColumnPanel.style.display = hDataPanel.style.display = 'none';
      var contentWidth = o._hContentPanel.offsetWidth;
      var contentHeight = o._hContentPanel.offsetHeight;
      hColumnPanel.style.display = hDataPanel.style.display = 'block';
      // 计算固定区的位置和大小
      var hFixStyle = hFixPanel.style;
      hFixStyle.left = '0px';
      hFixStyle.top = '0px';
      // 计算标题区的位置和大小
      var hHeadStyle = hHeadPanel.style;
      hHeadStyle.left = fixWidth + 'px';
      hHeadStyle.top = '0px';
      hHeadStyle.width = (contentWidth - fixWidth) + 'px';
      o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
      o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
      // 计算列区的位置和大小
      var hColumnStyle = hColumnPanel.style;
      hColumnStyle.top = fixHeight + 'px';
      hColumnStyle.width = fixWidth + 'px';
      hColumnStyle.height = (contentHeight - fixHeight) + 'px';
      // 计算数据区起始位置和宽度
      var hDataStyle = hDataPanel.style;
      hDataStyle.left = '0px';
      hDataStyle.top = '0px';
      hDataStyle.width = (contentWidth - fixWidth) + 'px';
      hDataStyle.height = (contentHeight - fixHeight) + 'px';
      hDataStyle.paddingLeft = fixWidth + 'px';
      hDataStyle.paddingTop = fixHeight + 'px';
      // 显示的时候调整一次自动标题宽度
      var columnAuto = null;
      var dataWidth = contentWidth;
      var columns = o._columns;
      var columnCount = columns.count();
      for(var i = 0; i < columnCount; i++){
         var column = columns.at(i);
         var columnVisible = column.visible();
         if(columnVisible){
            // 刷新宽度
            column.refreshWidth();
            // 计算是否自动调整宽度
            if(column.dispAuto){
               if(columnAuto){
                  return MO.Message.fatal(o, 'Too many autosize column. (name1={1}, name2={2})', columnAuto.name, column.name);
               }
               columnAuto = column;
            }else{
               dataWidth -= column._hPanel.offsetWidth;
            }
         }
      }
      if(columnAuto){
         columnAuto.setWidth(Math.max(dataWidth - 1, columnAuto.width ? columnAuto.width : 120));
      }
   }
}

//==========================================================
// <T>大小变更处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiTable_oeResize = function FDuiTable_oeResize(e){
   var o = this;
   // 检查是否尺寸改变
   var hPanel = o._hPanel;
   if(!hPanel.offsetWidth || !hPanel.offsetHeight){
      return;
   }
   // 获取对象定义
   return;
   var hp = o.border.hPanel;
   var hcf = o._hTitleForm;
   var hfp = o._hFixPanel;
   var hhp = o._hHeadPanel;
   var hcp = o._hColumnPanel;
   var hdp = o._hDataPanel;
   // 隐去数据列和数据区，计算无干扰得底板宽度和高度
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o._hBorderPanel.offsetWidth;
   var oh = o._hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   // 修正标题区的宽度
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   // 计算数据固定列区的起始位置和高度
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   // 计算数据区起始位置和宽度
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   // 调整所有行高
   var rowCount = o._rows.count();
   for(var n = 0; n < rowCount; n++){
      var row = o._rows.at(n);
      row.refreshSize();
   }
   // 调整初始滚动
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   // 使用异步事件计算滚动条宽度
   MO.Console.find(MO.FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}

//==========================================================
// <T>增加一个表格列。</T>
//
// @method
// @param column:FDuiColumn 列控件
//==========================================================
MO.FDuiTable_appendColumn = function FDuiTable_appendColumn(column){
   var o = this;
   // 为固定列的情况
   if(column._optionFixed){
      // 追加标题列
      o._hFixHead.appendChild(column._hPanel);
      // 追加搜索列
      o._hFixSearch.appendChild(column._hSearchPanel);
      // 追加统计列
      o._hFixTotal.appendChild(column._hTotalPanel);
      // 在数据区追加修正行
      o._hFixRowLine.appendChild(column._hFixPanel);
   }else{
      // 追加标题列
      o._hHead.appendChild(column._hPanel);
      // 追加搜索列
      o._hSearch.appendChild(column._hSearchPanel);
      // 追加统计列
      o._hTotal.appendChild(column._hTotalPanel);
      // 在数据区追加修正行
      o._hRowLine.appendChild(column._hFixPanel);
   }
}







// ------------------------------------------------------------
MO.FDuiTable_onResizeAfter = function FDuiTable_onResizeAfter(){
   var o = this;
   var hdp = o._hDataPanel;
   var hfp = o._hFixPanel;
   // 获得滚动条宽度
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   // 调整标题列宽度
   o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   // 调整固定区高度
   o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}