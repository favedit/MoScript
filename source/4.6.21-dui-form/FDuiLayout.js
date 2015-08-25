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
MO.FDuiLayout = function FDuiLayout(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @style
   o._styleForm         = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleControlPanel = MO.Class.register(o, new MO.AStyle('_styleControlPanel'));
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
   o.onBuildPanel    = MO.FDuiLayout_onBuildPanel;
   o.onDesignBegin   = MO.FDuiLayout_onDesignBegin;
   o.onDesignEnd     = MO.FDuiLayout_onDesignEnd;
   //..........................................................
   // @process
   o.oeDesign        = MO.FDuiLayout_oeDesign;
   o.oeResize        = MO.FDuiLayout_oeResize;
   o.oeRefresh       = MO.FDuiLayout_oeRefresh;
   //..........................................................
   // @method
   o.insertPosition  = MO.FDuiLayout_insertPosition;
   o.moveChild       = MO.FDuiLayout_moveChild;
   // @method
   o.innerAppendLine = MO.FDuiLayout_innerAppendLine;
   o.appendChild     = MO.FDuiLayout_appendChild;
   // @method
   o.resize          = MO.FDuiLayout_resize;
   // @method
   o.dispose         = MO.FDuiLayout_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return event:TProcessEvent 处理事件
//==========================================================
MO.FDuiLayout_onBuildPanel = function FDuiLayout_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   // 设计模式
   if(o._layoutCd == MO.EUiLayout.Design){
      var hr = MO.Window.Builder.appendTableRow(h);
      var hc = MO.Window.Builder.appendTableCell(hr);
      o._hContainer = hc;
   }
}

//==========================================================
// <T>设计开始处理。</T>
//
// @method
//==========================================================
MO.FDuiLayout_onDesignBegin = function FDuiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}

//==========================================================
// <T>设计结束处理。</T>
//
// @method
//==========================================================
MO.FDuiLayout_onDesignEnd = function FDuiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}

//==========================================================
// <T>设计处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
MO.FDuiLayout_oeDesign = function FDuiLayout_oeDesign(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case MO.EDesign.Move:
            break;
         case MO.EDesign.Border:
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
MO.FDuiLayout_oeResize = function FDuiLayout_oeResize(p){
   var o = this;
   o.__base.FDuiContainer.oeResize.call(o, p);
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
MO.FDuiLayout_oeRefresh = function FDuiLayout_oeRefresh(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param controlSource:MUiControl 来源控件
// @param controlTarget:MUiControl 目标控件
// @param index:Integer 索引位置
// @param copy:Boolean 是否复制
// @return HtmlTag 页面元素
//==========================================================
MO.FDuiLayout_insertPosition = function FDuiLayout_insertPosition(controlSource, controlTarget, index, copy){
   var o = this;
   var components = o._components;
   var controls = o._controls;
   components.removeValue(controlSource);
   controls.removeValue(controlSource);
   if(controlTarget){
      var index = components.indexOfValue(controlTarget);
      components.insert(index + index, controlSource.name, controlSource);
      var index = controls.indexOfValue(controlTarget);
      controls.insert(index + index, controlSource.name, controlSource);
   }else{
      components.set(controlSource.name, controlSource);
      controls.set(controlSource.name, controlSource);
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
MO.FDuiLayout_moveChild = function FDuiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;   
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = MO.Class.isClass(cf, MO.MDuiHorizontal);
   var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
   var hCfTab = MO.Window.Html.parent(cf._hPanel, 'TABLE');
   var cth = MO.Class.isClass(ct, MO.MDuiHorizontal);
   var hTd = MO.Window.Html.parent(ct._hPanel, 'TD');
   var hTable = MO.Window.Html.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex);
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
               var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex + 1);
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
               var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
                     var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
            var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
MO.FDuiLayout_innerAppendLine = function FDuiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == EUiLayout.Design){
      h = o._hPanelTable = MO.Window.Builder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = MO.Window.Builder.appendTableRow(h);
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
MO.FDuiLayout_appendChild = function FDuiLayout_appendChild(control){
   var o = this;
   // 设计模式时
   if(o._layoutCd == MO.EUiLayout.Design){
      // 追加第一行
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      // 建立分割符
      if(MO.Class.isClass(control, MO.MDuiHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(control._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      // 增加控件
      var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine, o.styleName('ControlPanel'));
      if(!MO.Class.isClass(control, MO.FDuiLayout)){
         control._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(control._hPanel);
      control._hLayoutCell = hCell;
      // 追加下一行
      if(!control.nowrap() && (o.controls.last() != control)){
         o.innerAppendLine();
      }
   }else{
      control._hPanel.style.paddingTop = 2;
      control._hPanel.style.paddingBottom = 2;
      // 追加横向对象
      if(control.dockCd() == MO.EUiDock.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm, o.styleName('ControlPanel'));
         hCell.appendChild(control._hPanel);
      }else if(control._sizeCd == MO.EUiSize.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm, o.styleName('ControlPanel'));
         hCell.appendChild(control._hPanel);
      }else if(MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Horizontal) || '100%' == control.width){
         if(MO.Class.isClass(control, MO.FDuiSplit)){
            o._lastSplit = control;
         }
         // 追加一个新行
         var hLine = MO.Window.Builder.appendTableRow(o._hPanelForm);
         var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ControlPanel'));
         hCell.vAlign = 'top';
         hCell.appendChild(control._hPanel);
         control._hLayoutRow = hLine;
         o._hPanelLast = hCell;
         // 设置行高
         if(!MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Vertical)){
            hCell.height = 1;
         }else if(control.height){
            hCell.height = control.height;
         }
         o._hPanelLine = null;
      }else{
         // 增加普通对象
         if(!o._hPanelLine){
            var hLine = MO.Window.Builder.appendTableRow(o._hPanelForm);
            hLine.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hLine);
            }
            // 追加新的行表单
            var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ControlPanel'));
            hCell.vAlign = 'top';
            var ht = o._hPanelTable = MO.Window.Builder.appendTable(hCell);
            o._hPanelLine = MO.Window.Builder.appendTableRow(ht);
         }
         // 追加一个单元格
         var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine, o.styleName('ControlPanel'))
         // 追加一般控件
         control._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hCell;
         hCell.appendChild(control._hPanel);
         control._hLayoutCell = hCell;
         // 追加下一行
         if(!control.nowrap()){
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
MO.FDuiLayout_resize = function FDuiLayout_resize(){
   var o = this;
   var components = o._components;
   if(components){
      // 如果含有表格或分页内嵌控件，则自动高度为100%
      var ha = false;
      var count = components.count();
      for(var n = 0; n < count; n++){
         var component = components.at(n);
         if(MO.Class.isClass(component, MO.FDuiTable) || MO.Class.isClass(component, MO.FDuiPageControl)){
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
MO.FDuiLayout_dispose = function FDuiLayout_dispose(){
   var o = this;
   // 释放属性
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   // 父处理
   o.__base.FDuiContainer.dispose.call(o);
}
