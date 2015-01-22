//==========================================================
// <T>布局控件。</T>
//
//  hParent<TAG>
// ┌-------------------┐
// │ hContainer<DIV>   │
// │┌---------------┐│
// ││Control        ││
// │└---------------┘│
// └-------------------┘
//
// @class
// @author maocy
// @version 150122
//==========================================================
function FLayout(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @attribute
   o._lastSplit    = null;
   //..........................................................
   // @html
   o._hContainer     = null;
   o._hPanelForm     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   //..........................................................
   // @event
   o.onBuildPanel   = FLayout_onBuildPanel;
   o.onDesignBegin  = FLayout_onDesignBegin;
   o.onDesignEnd    = FLayout_onDesignEnd;
   //..........................................................
   // @process
   o.oeDesign       = FLayout_oeDesign;
   o.oeResize       = FLayout_oeResize;
   o.oeRefresh      = FLayout_oeRefresh;
   //..........................................................
   // @method
   o.insertPosition = FLayout_insertPosition;
   o.moveChild      = FLayout_moveChild;
   // @method
   o.appendLine     = FLayout_appendLine;
   o.appendChild    = FLayout_appendChild;
   // @method
   o.doResize       = FLayout_doResize;
   o.dispose        = FLayout_dispose;

   //o.panelExtend    = FLayout_panelExtend;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FLayout_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = o._hPanelForm = RBuilder.createTable(p.hDocument);
   h.width = '100%';
   //if(EMode.Design == o._emode){
   //   o._hContainer = h.insertRow().insertCell();
   //}
}

//==========================================================
// <T>设计开始处理。</T>
//
// @method
//==========================================================
function FLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}

//==========================================================
// <T>设计结束处理。</T>
//
// @method
//==========================================================
function FLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}

//==========================================================
// <T>设计处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FLayout_oeDesign(event){
   var o = this;
   o.__base.FContainer.oeDesign.call(o, event);
   if(event.isAfter()){
      switch(event.mode){
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
function FLayout_oeResize(e){
   var o = this;
   o.__base.FContainer.oeResize.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FLayout_oeRefresh(e){
   var o = this;
   o.__base.FContainer.oeDesign.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FLayout_insertPosition(cf, ct, idx, copy){
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
function FLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;   
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = hRow.insertCell(hTd.cellIndex);
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
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf._hPanel, 'TD');
               var hCell = hRow.insertCell(hTd.cellIndex+1);
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
               var hNewTab = o.appendLine();
               o._hContainer.insertBefore(hNewTab, ct._hPanel);
               var hCell = o._hPanelLine.insertCell();
               hCell.appendChild(cf._hPanel);
               cf._hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o._hContainer.children.length;
            for(var n=0; n<count; n++){
               if(o._hContainer.children[n] == hTable){
                  if(cfh){
                     o._hContainer.insertBefore(cf._hPanel, hTable);
                  }else{
                     var hNewTab = o.appendLine();
                     o._hContainer.insertBefore(hNewTab, hTable);
                     var hCell = o._hPanelLine.insertCell();
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
            var hNewTab = o.appendLine();
            var hCell = o._hPanelLine.insertCell();
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
function FLayout_appendLine(){
   var o = this;
   var h = null;
   if(EMode.Design == o._emode){
      h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
      h.style.paddingBottom = 6;
      o._hPanelLine = h.insertRow();
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
// @return ctl:control:FControl 控件
//==========================================================
function FLayout_appendChild(ctl){
   var o = this;
   // 设计模式时
   if(EMode.Design == o._emode){
      // 追加第一行
      if(!o._hPanelLine){
         o.appendLine();
      }
      // Build Split
      if(RClass.isClass(ctl, MHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(ctl._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(ctl._hPanel);
            o.appendLine();
         }
         return;
      }
      // Add Control
      var hCell = o._hPanelLine.insertCell();
      if(!RClass.isClass(ctl, FLayout)){
         ctl._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(ctl._hPanel);
      ctl.hLayoutCell = hCell;
      // 追加下一行
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.appendLine();
      }
   }else{
      ctl._hPanel.style.paddingTop = 2;
      ctl._hPanel.style.paddingBottom = 2;
      // 追加横向对象
      if(RSet.contains(ctl._esize, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FSplit)){
            o._lastSplit = ctl;
         }
         // 追加一个新行
         var hr = o._hPanelForm.insertRow();
         var hc = hr.insertCell();
         hc.vAlign = 'top';
         hc.appendChild(ctl._hPanel);
         ctl.hLayoutRow = hr;
         o._hPanelLast = hc;
         // 设置行高
         if(!RSet.contains(ctl._esize, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o._hPanelLine = null;
      }else{
         // 增加普通对象
         if(!o._hPanelLine){
            var hr = o._hPanelForm.insertRow();
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            // 追加新的行表单
            var hc = hr.insertCell();
            hc.vAlign = 'top';
            var ht = o._hPanelTable = RBuilder.appendTable(hc);
            o._hPanelLine = ht.insertRow();
         }
         // 追加一个单元格
         var hc = o._hPanelLine.insertCell()
         // 追加一般控件
         ctl.hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(ctl._hPanel);
         ctl.hLayoutCell = hc;
         // 追加下一行
         if(!ctl.nowrap){
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
function FLayout_doResize(){
   var o = this;
   var cs = o._components;
   if(cs){
      // 如果含有表格或分页内嵌控件，则自动高度为100%
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FPageControl)){
            ha = true;
            break;
         }
      }
      o.setSize('100%', ha ? '100%' : 1);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FContainer.dispose.call(o);
}












// ------------------------------------------------------------
//function FLayout_panelExtend(v){
//   var o = this;
//   if(o.hLastLine){
//      o._hPanelLast.height = v ? '1' : '100%';
//   }
//}
// ------------------------------------------------------------
