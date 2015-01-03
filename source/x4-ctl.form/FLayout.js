// ============================================================
// FLayout
// ============================================================
function FLayout(o){
   o = RClass.inherits(this, o, FContainer);
   // Html
   o.hContainer     = null;
   o.hPanelTable    = null;
   o.hPanelLine     = null;
   // Process
   o.__lastSplit    = null;
   // Process
   o.oeDesign       = FLayout_oeDesign;
   o.oeRefresh      = FLayout_oeRefresh;
   o.oeResize       = FLayout_oeResize;
   // Event
   o.onDesignBegin  = FLayout_onDesignBegin;
   o.onDesignEnd    = FLayout_onDesignEnd;
   o.onBuildPanel   = FLayout_onBuildPanel;
   // Method
   o.doResize       = FLayout_doResize;
   // Method
   o.insertPosition = FLayout_insertPosition;
   o.appendLine     = FLayout_appendLine;
   o.appendChild    = FLayout_appendChild;
   o.moveChild      = FLayout_moveChild;
   o.moveChild      = FLayout_moveChild;
   o.panelExtend    = FLayout_panelExtend;
   o.dispose        = FLayout_dispose;
   return o;
}
// ------------------------------------------------------------
function FLayout_onDesignBegin(){
   var o = this;
   o.base.MDesign.onDesignBegin.call(o);
}
// ------------------------------------------------------------
function FLayout_onDesignEnd(){
   var o = this;
   o.base.MDesign.onDesignEnd.call(o);
}
// ------------------------------------------------------------
function FLayout_doResize(){
   var o = this;
   var cs = o.components;
   if(cs){
      // 如果含有表格或分页内嵌控件，则自动高度为100%
      var ha = false;
      var c = cs.count;
      for(var n=0; n<c; n++){
         var p = o.components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FPageControl)){
            ha = true;
            break;
         }
      }
      o.setSize('100%', ha ? '100%' : 1);
   }
}
// ------------------------------------------------------------
function FLayout_oeDesign(event){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(event.isAfter()){
      switch(event.mode){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o.hPanel.border = 1;
               o.hPanel.style.border = '1 solid red';
            }else{
               o.hPanel.border = 0;
               o.hPanel.style.border = null;
            }
            break;
      }
   }
}
// ------------------------------------------------------------
function FLayout_oeRefresh(e){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
// ------------------------------------------------------------
function FLayout_oeResize(e){
   var o = this;
   o.base.FContainer.oeResize.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
// ------------------------------------------------------------
function FLayout_onBuildPanel(){
   var o = this;
   var h = o.hPanel = o.hPanelForm = RBuilder.newTable();
   h.width = '100%';
   if(EMode.Design == o._emode){
      o.hContainer = h.insertRow().insertCell();
   }
}
// ------------------------------------------------------------
function FLayout_appendLine(){
   var o = this;
   var h = null;
   if(EMode.Design == o._emode){
      h = o.hPanelTable = RBuilder.appendTable(o.hContainer);
      h.style.paddingBottom = 6;
      o.hPanelLine = h.insertRow();
   }else{
      o.hPanelTable = null;
      o.hPanelLine = null;
   }
   return h;
}
// ------------------------------------------------------------
function FLayout_appendChild(ctl){
   var o = this;
   // 设计模式时
   if(EMode.Design == o._emode){
      // 追加第一行
      if(!o.hPanelLine){
         o.appendLine();
      }
      // Build Split
      if(RClass.isClass(ctl, MHorizontal)){
         if(o.hPanelTable.rows[0].cells.length == 0){
            o.hContainer.insertBefore(ctl.hPanel, o.hPanelTable);
         }else{
            o.hContainer.appendChild(ctl.hPanel);
            o.appendLine();
         }
         return;
      }
      // Add Control
      var hCell = o.hPanelLine.insertCell();
      if(!RClass.isClass(ctl, FLayout)){
         ctl.hPanelLine = o.hPanelTable;
      }
      hCell.appendChild(ctl.hPanel);
      ctl.hLayoutCell = hCell;
      // 追加下一行
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.appendLine();
      }
   }else{
      ctl.hPanel.style.paddingTop = 2;
      ctl.hPanel.style.paddingBottom = 2;
      // 追加横向对象
      if(RSet.contains(ctl._esize, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FSplit)){
            o.__lastSplit = ctl;
         }
         // 追加一个新行
         var hr = o.hPanelForm.insertRow();
         var hc = hr.insertCell();
         hc.vAlign = 'top';
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutRow = hr;
         o.hPanelLast = hc;
         // 设置行高
         if(!RSet.contains(ctl._esize, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o.hPanelLine = null;
      }else{
         // 增加普通对象
         if(!o.hPanelLine){
            var hr = o.hPanelForm.insertRow();
            hr.height = 1;
            if(o.__lastSplit){
               o.__lastSplit.pushLine(hr);
            }
            // 追加新的行表单
            var hc = hr.insertCell();
            hc.vAlign = 'top';
            var ht = o.hPanelTable = RBuilder.appendTable(hc);
            o.hPanelLine = ht.insertRow();
         }
         // 追加一个单元格
         var hc = o.hPanelLine.insertCell()
         // 追加一般控件
         ctl.hLayoutRow = o.hPanelLine;
         o.hPanelLast = hc;
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutCell = hc;
         // 追加下一行
         if(!ctl.nowrap){
            o.hPanelLine = null;
         }
      }
   }
}
// ------------------------------------------------------------
function FLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o.components;
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
// ------------------------------------------------------------
// ControlFrom, ControlTarget, Position
function FLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;   
   var hPanel = o.hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf.hPanel, 'TD');
   var hCfTab = RHtml.parent(cf.hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct.hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = hRow.insertCell(hTd.cellIndex);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf.hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf.hPanel, 'TD');
               var hCell = hRow.insertCell(hTd.cellIndex+1);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf.hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o.hContainer.insertBefore(cf.hPanel, ct.hPanel);
            }else{
               var hNewTab = o.appendLine();
               o.hContainer.insertBefore(hNewTab, ct.hPanel);
               var hCell = o.hPanelLine.insertCell();
               hCell.appendChild(cf.hPanel);
               cf.hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o.hContainer.children.length;
            for(var n=0; n<count; n++){
               if(o.hContainer.children[n] == hTable){
                  if(cfh){
                     o.hContainer.insertBefore(cf.hPanel, hTable);
                  }else{
                     var hNewTab = o.appendLine();
                     o.hContainer.insertBefore(hNewTab, hTable);
                     var hCell = o.hPanelLine.insertCell();
                     hCell.appendChild(cf.hPanel);
                     cf.hPanelLine = hNewTab;
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
            o.hContainer.appendChild(cf.hPanel);
         }else{
            var hNewTab = o.appendLine();
            var hCell = o.hPanelLine.insertCell();
            hCell.appendChild(cf.hPanel);
            hCell.appendChild(cf.hPanel);
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
// ------------------------------------------------------------
function FLayout_panelExtend(v){
   var o = this;
   if(o.hLastLine){
      o.hPanelLast.height = v ? '1' : '100%';
   }
}
// ------------------------------------------------------------
function FLayout_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hPanelCurrent = null;
   o.hPanelTable = null;
   o.hPanel = null;
   o.hContainer = null;
}
// ------------------------------------------------------------
