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
// @class FGridControl
// @history 091022 MAOCY 创建
//==========================================================
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   //..........................................................
   // @style
   o._styleFixPanel    = RClass.register(o, new AStyle('_styleFixPanel'));
   o._styleFixForm     = RClass.register(o, new AStyle('_styleFixForm'));
   o._styleHeadPanel   = RClass.register(o, new AStyle('_styleHeadPanel'));
   o._styleHeadForm    = RClass.register(o, new AStyle('_styleHeadForm'));
   o._styleColumnPanel = RClass.register(o, new AStyle('_styleColumnPanel'));
   o._styleColumnForm  = RClass.register(o, new AStyle('_styleColumnForm'));
   o._styleDataPanel   = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm    = RClass.register(o, new AStyle('_styleDataForm'));
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
   o.onBuildData       = FTable_onBuildData;
   //..........................................................
   // @process
   o.oeRefresh         = FTable_oeRefresh;
   //..........................................................
   // @method
   o.pushColumn        = FTable_pushColumn;

   //..........................................................
   // @event
   //o.onResizeAfter = FTable_onResizeAfter;
   //..........................................................
   // @process
   //o.oeResize      = FTable_oeResize;
   return o;
}

//==========================================================
// <T>构建数据视图处理。</T>
//
// @method
// @param p:event:TEventProcess 构建事件
//==========================================================
function FTable_onBuildData(p){
   var o = this;
   var hbp = o._hContentPanel;
   // 建立固定区(Layer:2)
   var hfp = o._hFixPanel = RBuilder.appendDiv(hbp, o.styleName('FixPanel'));
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o._hFixForm = RBuilder.appendTable(hfp, o.styleName('FixForm'), 0, 0, 1);
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o._hFixHead =  RBuilder.appendTableRow(hff);
   o._hFixSearch = RBuilder.appendTableRow(hff);
   o._hFixTotal = RBuilder.appendTableRow(hff);
   o._hFixTotal.style.display = 'none';
   // 建立列的标题区(Layer:1)
   var hhp = o._hHeadPanel = RBuilder.appendDiv(hbp, o.styleName('HeadPanel'));
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o._hHeadForm = RBuilder.appendTable(hhp, o.styleName('HeadForm'), 0, 0, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o._hHead = hhf.insertRow();
   o._hSearch = hhf.insertRow();
   o._hTotal = hhf.insertRow();
   o._hTotal.style.display = 'none';
   // 建立列区(Layer:1)
   var hcp = o._hColumnPanel = RBuilder.appendDiv(hbp, o.styleName('ColumnPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o._hColumnForm = RBuilder.appendTable(hcp, o.styleName('ColumnForm'), 0, 0, 1);
   o._hFixRows = RBuilder.append(hcf, 'TBODY');
   o._hFixRowLine = RBuilder.append(o._hFixRows, 'TR');
   // 建立数据区
   var hdp = o._hDataPanel = RBuilder.appendDiv(hbp, o.styleName('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o._hDataForm = RBuilder.appendTable(hdp, o.styleName('DataForm'), 0, 0, 1);
   o._hRows = RBuilder.append(hdf, 'TBODY');
   o._hRowLine = RBuilder.append(o._hRows, 'TR');
   // 关联事件对象
   o.attachEvent('onHeadMouseDown', o._hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o._hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o._hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o._hDataPanel, o.onDataScroll);
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
// @param p:event:TEventProcess 构建事件
//==========================================================
function FTable_oeRefresh(e){
   var o = this;
   o.__base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      // 计算初始化宽度
      var hcf = o._hTitleForm;
      var hfp = o._hFixPanel;
      var hhp = o._hHeadPanel;
      var hcp = o._hColumnPanel;
      var hdp = o._hDataPanel;
      // 获得初始数据
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      // 隐去数据列和数据区，计算无干扰得底板宽度
      //hcp.style.display = hdp.style.display = 'none';
      var ow = o._hContentPanel.offsetWidth;
      var oh = o._hContentPanel.offsetHeight;
      //hcp.style.display = hdp.style.display = 'block';
      // 计算固定区的位置和大小
      //hfp.style.top = hcfh + 'px';
      // 计算标题区的位置和大小
      //hhp.style.top = hcfh + 'px';
      hhp.style.left = hfpw + 'px';
      hhp.style.width = (ow - hfpw) + 'px';
      hhp.style.height = hfph + 'px';
      o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
      o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
      // 计算列区的位置和大小
      //hcp.style.top = (hcfh + hfph) + 'px';
      hcp.style.top = hfph + 'px';
      hcp.style.width = hfpw + 'px';
      hcp.style.height = (oh - hfph) + 'px';
      // 计算数据区起始位置和宽度
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      hdp.style.width = ow;
      hdp.style.height = (oh - hcfh) + 'px';
      // 显示的时候调整一次自动标题宽度
      var ca = null;
      var aw = ow;
      var cs = o._columns;
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={1},name2={2})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c._hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}


//==========================================================
// <T>增加一个表格列。</T>
//
// @method
// @param p:event:TEventProcess 构建事件
//==========================================================
function FTable_pushColumn(p){
   var o = this;
   // 为固定列的情况
   if(p._optionFixed){
      // 追加标题列
      o._hFixHead.appendChild(p._hPanel);
      // 追加搜索列
      o._hFixSearch.appendChild(p._hSearchPanel);
      // 追加统计列
      o._hFixTotal.appendChild(p._hTotalPanel);
      // 在数据区追加修正行
      o._hFixRowLine.appendChild(p._hFixPanel);
   }else{
      // 追加标题列
      o._hHead.appendChild(p._hPanel);
      // 追加搜索列
      o._hSearch.appendChild(p._hSearchPanel);
      // 追加统计列
      o._hTotal.appendChild(p._hTotalPanel);
      // 在数据区追加修正行
      o._hRowLine.appendChild(p._hFixPanel);
   }
   // 追加控件
   o.push(p);
}





// ------------------------------------------------------------
function FTable_onResizeAfter(){
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

// ------------------------------------------------------------
function FTable_oeResize(e){
   var o = this;
   // 检查是否尺寸改变
   var h = o._hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   // 获取对象定义
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
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      o.rows.get(n).refreshSize();
   }
   // 调整初始滚动
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   // 使用异步事件计算滚动条宽度
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}