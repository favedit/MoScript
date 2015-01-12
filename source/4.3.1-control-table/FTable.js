//==========================================================
// <T>表格列表类。</T>
// 模板:
//  hPanel<TABLE>
// ┌--------------------------------------------------------┐
// │ hTitleForm<TABLE>                                      │
// │┌-------------------------------┬-------------------┐│
// ││hCaption<TD>                   │(Buttons)          ││
// │└-------------------------------┴-------------------┘│
// ├--------------------------------------------------------┤
// │ hBorderPanel<TD:TBorder.hPanel>                        │
// │┌----------------------------------------------------┐│
// ││ hFixPanel<DIV>            hHeadPanel<DIV>          ││
// ││┌----------------------┐┌----------------------┐││
// │││ hFixForm<TABLE>      ││ hHeadForm<TABLE>     │││
// │││┌------------------┐││┌------------------┐│││
// ││││hFixHead<TR>      ││││hHead<TR>         ││││
// │││├------------------┤││├------------------┤│││
// ││││hFixSearchLine<TR>││││hSearch<TR>       ││││
// │││└------------------┘││└------------------┘│││
// ││└----------------------┘└----------------------┘││
// ││ hColumnPanel<DIV>         hDataPanel<DIV>          ││
// ││┌----------------------┐┌----------------------┐││
// │││ hColumnForm<TABLE>   ││ hDataForm<TABLE>     │││
// │││┌------------------┐││┌------------------┐│││
// │││└------------------┘││└------------------┘│││
// ││└----------------------┘└----------------------┘││
// │└----------------------------------------------------┘│
// ├--------------------------------------------------------┤
// │ hHintForm<TABLE>                                       │
// │┌------------┬--------------------------------------┐│
// ││hHint<TD>   │(Buttons)                             ││
// │└------------┴--------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class FGridControl
// @history 091022 MAOCY 创建
//==========================================================
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   //..........................................................
   // @event
   o.onResizeAfter = FTable_onResizeAfter;
   o.onBuildData   = FTable_onBuildData;
   //..........................................................
   // @process
   o.oeResize      = FTable_oeResize;
   o.oeRefresh     = FTable_oeRefresh;
   //..........................................................
   // @method
   o.pushColumn    = FTable_pushColumn;
   return o;
}

// ------------------------------------------------------------
function FTable_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   // 获得滚动条宽度
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   // 调整标题列宽度
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   // 调整固定区高度
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}

//==========================================================
function FTable_onBuildData(){
   var o = this;
   var hbp = o.hBorderPanel;
   // 建立固定区(Layer:2)
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead =  RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   o.hFixTotal = RBuilder.append(hffb, 'TR');
   o.hFixTotal.style.display = 'none';
   // 建立列的标题区(Layer:1)
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   o.hTotal = hhf.insertRow();
   o.hTotal.style.display = 'none';
   // 建立列区(Layer:1)
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   // 建立数据区
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   // 关联事件对象
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   // 建立浏览栏
   o.panelNavigator = true;
   // 设置可见性
   //o.hHead.style.display = o.panelHead ? 'block' : 'none';
   //o.hFixHead.style.display = o.panelHead ? 'block' : 'none';
   //o.hSearch.style.display = o.panelSearch ? 'block' : 'none';
   //o.hFixSearch.style.display = o.panelSearch ? 'block' : 'none';
   //o.hTotal.style.display = o.panelTotal ? 'block' : 'none';
   //o.hFixTotal.style.display = o.panelTotal ? 'block' : 'none';
}
// ------------------------------------------------------------
function FTable_oeResize(e){
   var o = this;
   // 检查是否尺寸改变
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   // 获取对象定义
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hfp = o.hFixPanel;
   var hhp = o.hHeadPanel;
   var hcp = o.hColumnPanel;
   var hdp = o.hDataPanel;
   // 隐去数据列和数据区，计算无干扰得底板宽度和高度
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
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

// ------------------------------------------------------------
function FTable_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      // 计算初始化宽度
      var hcf = o.hTitleForm;
      var hfp = o.hFixPanel;
      var hhp = o.hHeadPanel;
      var hcp = o.hColumnPanel;
      var hdp = o.hDataPanel;
      // 获得初始数据
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      // 隐去数据列和数据区，计算无干扰得底板宽度
      hcp.style.display = hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      // 计算固定区的位置和大小
      hfp.style.pixelTop = hcfh;
      // 计算标题区的位置和大小
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = hfpw;
      hhp.style.pixelWidth = ow - hfpw;
      hhp.style.pixelHeight = hfph;
      o.hHead.style.pixelHeight = o.hFixHead.offsetHeight;
      o.hSearch.style.pixelHeight = o.hFixSearch.offsetHeight;
      // 计算列区的位置和大小
      hcp.style.pixelTop = hcfh + hfph;
      hcp.style.pixelHeight = oh - hcfh - hfph;
      // 计算数据区起始位置和宽度
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
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
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}
// ------------------------------------------------------------
function FTable_pushColumn(c){
   var o = this;
   // 为固定列的情况
   if(c.dispFixed){
      // 追加标题列
      o.hFixHead.appendChild(c.hPanel);
      // 追加搜索列
      o.hFixSearch.appendChild(c.hSearchPanel);
      // 追加统计列
      o.hFixTotal.appendChild(c.hTotalPanel);
      // 在数据区追加修正行
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      // 追加标题列
      o.hHead.appendChild(c.hPanel);
      // 追加搜索列
      o.hSearch.appendChild(c.hSearchPanel);
      // 追加统计列
      o.hTotal.appendChild(c.hTotalPanel);
      // 在数据区追加修正行
      o.hRowLine.appendChild(c.hFixPanel);
   }
   // 追加控件
   o.push(c);
}
