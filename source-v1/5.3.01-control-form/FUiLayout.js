//==========================================================
// <T>布局控件。</T>
//
//  hPanel/hPanelForm <TABLE>
// ┌----------------------------------------------------------┐
// │ hPanelTable<TABLE>                                       │hContainer<TD>
// │┌----------------┬--------------┬--------------------┐│
// ││Control-1       │Control-2     │Control-3           ││
// │└----------------┴--------------┴--------------------┘│
// ├----------------------------------------------------------┤
// │ hPanelTable<TABLE>                                       │
// │┌--------------┐                                        │
// ││Control-4     │                                        │
// │└--------------┘                                        │
// └----------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150122
//==========================================================
function FUiLayout(o){
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @style
   o._styleForm      = RClass.register(o, new AStyle('_styleForm', 'Form'));
   //..........................................................
   // @attribute
   o._lastSplit      = null;
   //..........................................................
   // @html
   o._hPanelForm     = null;
   o._hContainer     = null;
   // @html
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   //..........................................................
   // @event
   o.onBuildPanel    = FUiLayout_onBuildPanel;
   o.onDesignBegin   = FUiLayout_onDesignBegin;
   o.onDesignEnd     = FUiLayout_onDesignEnd;
   //..........................................................
   // @process
   o.oeDesign        = FUiLayout_oeDesign;
   o.oeResize        = FUiLayout_oeResize;
   o.oeRefresh       = FUiLayout_oeRefresh;
   //..........................................................
   // @method
   o.insertPosition  = FUiLayout_insertPosition;
   o.moveChild       = FUiLayout_moveChild;
   // @method
   o.innerAppendLine = FUiLayout_innerAppendLine;
   o.appendChild     = FUiLayout_appendChild;
   // @method
   o.resize          = FUiLayout_resize;
   // @method
   o.dispose         = FUiLayout_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return event:TProcessEvent 处理事件
//==========================================================
function FUiLayout_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
   // 设计模式
   if(o._layoutCd == EUiLayout.Design){
      var hr = RBuilder.appendTableRow(h);
      var hc = RBuilder.appendTableCell(hr);
      o._hContainer = hc;
   }
}

//==========================================================
// <T>设计开始处理。</T>
//
// @method
//==========================================================
function FUiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}

//==========================================================
// <T>设计结束处理。</T>
//
// @method
//==========================================================
function FUiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}

//==========================================================
// <T>设计处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiLayout_oeDesign(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o._hPanel.border = 1;
               o._hPanel.style.border = '1 solid red';
            }else{
               o._hPanel.border = 0;
               o._hPanel.style.border = null;
            }
            break;
      }
   }
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiLayout_oeResize(p){
   var o = this;
   o.__base.FUiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiLayout_oeRefresh(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o._components;
   var cs = o.controls;
   ms.removeValue(cf);
   cs.removeValue(cf);
   if(ct){
      var index = ms.indexOfValue(ct);
      ms.insert(index+idx, cf.name, cf);
      var index = cs.indexOfValue(ct);
      cs.insert(index+idx, cf.name, cf);
   }else{
      ms.set(cf.name, cf);
      cs.set(cf.name, cf);
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param cf:ControlFrom
// @param ct:ControlTarget
// @param pos:Position
// @param copy:copy
//==========================================================
function FUiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;   
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MUiHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MUiHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf._hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf._hPanel, 'TD');
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex + 1);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf._hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o._hContainer.insertBefore(cf._hPanel, ct._hPanel);
            }else{
               var hNewTab = o.innerAppendLine();
               o._hContainer.insertBefore(hNewTab, ct._hPanel);
               var hCell = RBuilder.appendTableCell(o._hPanelLine);
               hCell.appendChild(cf._hPanel);
               cf._hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o._hContainer.children.length;
            for(var n = 0; n < count; n++){
               if(o._hContainer.children[n] == hTable){
                  if(cfh){
                     o._hContainer.insertBefore(cf._hPanel, hTable);
                  }else{
                     var hNewTab = o.innerAppendLine();
                     o._hContainer.insertBefore(hNewTab, hTable);
                     var hCell = RBuilder.appendTableCell(o._hPanelLine);
                     hCell.appendChild(cf._hPanel);
                     cf._hPanelLine = hNewTab;
                     moved = true;
                  }
                  o.insertPosition(cf, ct, 0, copy);
                  cf.nowrap = false;
                  break;
               }
            }
         }
         break;
      case EPosition.LineAfter:
         if(cfh){
            o._hContainer.appendChild(cf._hPanel);
         }else{
            var hNewTab = o.innerAppendLine();
            var hCell = RBuilder.appendTableCell(o._hPanelLine);
            hCell.appendChild(cf._hPanel);
            hCell.appendChild(cf._hPanel);
            moved = true;
         }
         o.insertPosition(cf, null, 0, copy);
         ct.nowrap = false;
         cf.nowrap = false;
         break;
   }
   if(moved){
      hCfTd.removeNode(true);
      if(hCfTab.rows[0].cells.length == 0){
         hCfTab.removeNode(true);
      }
   }
}

//==========================================================
// <T>追加一个布局行。</T>
//
// @method
// @return HtmlTag 布局行
//==========================================================
function FUiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == EUiLayout.Design){
      h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = RBuilder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}

//==========================================================
// <T>追加一个控件容器。</T>
//
// @method
// @return control:FControl 控件
//==========================================================
function FUiLayout_appendChild(control){
   var o = this;
   // 设计模式时
   if(o._layoutCd == EUiLayout.Design){
      // 追加第一行
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      // 建立分割符
      if(RClass.isClass(control, MUiHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(control._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      // 增加控件
      var hCell = RBuilder.appendTableCell(o._hPanelLine);
      if(!RClass.isClass(control, FUiLayout)){
         control._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(control._hPanel);
      control._hLayoutCell = hCell;
      // 追加下一行
      if((control.wrapCd() == EUiWrap.NextLine) && (o.controls.last() != control)){
         o.innerAppendLine();
      }
   }else{
      control._hPanel.style.paddingTop = 2;
      control._hPanel.style.paddingBottom = 2;
      // 追加横向对象
      if(control.dockCd() == EUiDock.Fill){
         var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(control._sizeCd == EUiSize.Fill){
         var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(RSet.contains(control._sizeCd, EUiSize.Horizontal) || '100%' == control.width){
         if(RClass.isClass(control, FUiSplit)){
            o._lastSplit = control;
         }
         // 追加一个新行
         var hr = RBuilder.appendTableRow(o._hPanelForm);
         var hc = RBuilder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(control._hPanel);
         control._hLayoutRow = hr;
         o._hPanelLast = hc;
         // 设置行高
         if(!RSet.contains(control._sizeCd, EUiSize.Vertical)){
            hc.height = 1;
         }else if(control.height){
            hc.height = control.height;
         }
         o._hPanelLine = null;
      }else{
         // 增加普通对象
         if(!o._hPanelLine){
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            // 追加新的行表单
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            var ht = o._hPanelTable = RBuilder.appendTable(hc);
            o._hPanelLine = RBuilder.appendTableRow(ht);
         }
         // 追加一个单元格
         var hc = RBuilder.appendTableCell(o._hPanelLine)
         // 追加一般控件
         control._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(control._hPanel);
         control._hLayoutCell = hc;
         // 追加下一行
         if(control.wrapCd() == EUiWrap.NextLine){
            o._hPanelLine = null;
         }
      }
   }
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
//==========================================================
function FUiLayout_resize(){
   var o = this;
   var cs = o._components;
   if(cs){
      // 如果含有表格或分页内嵌控件，则自动高度为100%
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.at(n);
         if(RClass.isClass(p, FUiTable) || RClass.isClass(p, FUiPageControl)){
            ha = true;
            break;
         }
      }
      //o.setSize('100%', ha ? '100%' : 1);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FUiContainer.dispose.call(o);
}
