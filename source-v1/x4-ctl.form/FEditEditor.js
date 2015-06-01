//==========================================================
// FEditEditor
//==========================================================
function FEditEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   // Constant
   o.MinWidth          = 120;
   o.MaxCount          = 20;
   /// @style
   o.stIconDropSelect  = RClass.register(o, new TStyleIcon('DropSelect'));
   o.stFlag            = RClass.register(o, new TStyle('Flag'));
   o.stRow             = RClass.register(o, new TStyle('Row'));
   o.stRowHover        = RClass.register(o, new TStyle('RowHover'));
   o.stRowSelect       = RClass.register(o, new TStyle('RowSelect'));
   o.stEditForm        = RClass.register(o, new TStyle('EditForm'));
   o.stItemsForm       = RClass.register(o, new TStyle('ItemsForm'));
   // Attribute
   o.pattern           = null;
   o.originItem        = null;
   o.selectItem        = null;
   o.items             = null;
   o.inSearch          = false;
   o.position          = null;
   o.itemClickListener = null;
   // Event
   o.onBuildDrop       = FEditEditor_onBuildDrop;
   o.onItemClick       = FEditEditor_onItemClick;
   o.invoke            = FEditEditor_invoke;
   o.onComplete        = FEditEditor_onComplete;
   o.onEditKeyDown     = FEditEditor_onEditKeyDown;
   // Method
   o.construct         = FEditEditor_construct;
   o.get               = RMethod.empty;
   o.set               = RMethod.empty;
   o.search            = FEditEditor_search;
   o.select            = FEditEditor_select;
   o.linkControl       = FEditEditor_linkControl;
   o.show              = FEditEditor_show;
   o.hide              = FEditEditor_hide;
   o.dispose           = FEditEditor_dispose;
   return o;
}
// ------------------------------------------------------------
function FEditEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = RBuilder.appendTable(o.hDropPanel, o.style('ItemsForm'));
   var hip = o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
   // 建立所有数据行
   for(var n=0; n<o.MaxCount; n++){
      // 创建控件间的分割线
      var hr = null;
      if(n > 0){
         hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         hr.style.display = 'none';
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24C2DB';
         RBuilder.appendEmpty(hd);
      }
      // 创建控件
      var c = RControl.create(FSelectItem);
      c.setPanel(hip);
      c.name = null;
      c.setVisible(false);
      c.hSplitRow = hr;
      c.lsnsClick.push(o.itemClickListener);
      o.push(c);
   }
}
// ------------------------------------------------------------
function FEditEditor_onItemClick(s){
   var o = this;
   var e = o.source;
   e.set(s.label);
   o.source = null;
   o.hide();
}
// ------------------------------------------------------------
function FEditEditor_invoke(g){
   var o = this;
   o.onComplete(g.resultConfig);
}
function FEditEditor_onComplete(xr){
   var o = this;
   o.inSearch = false;
   var nc = xr.nodes ? xr.nodes.count : 0;
   if(0 == nc){
      return o.hide();
   }
   var t = o.source.reget();
   o.position = 0;
   o.count = nc;
   for(var n=0; n<o.MaxCount; n++){
      var x = xr.nodes ? xr.nodes.get(n) : null;
      // 获得指定位置上的控件
      var c  = o.components.value(n);
      var hr = c.hSplitRow;
      if(n < nc){
         // 显示分割行和项目
         if(hr){
            hr.style.display = 'block';
         }
         var xd = x.get('data');
         if(t == xd){
            o.position = n;
         }
         c.set(null, xd, null, '[' + x.get('count') + ']');
         c.setChecked(t == xd);
      }else{
         // 隐藏分割行和项目
         if(hr){
            hr.style.display = 'none';
         }
      }
      c.setVisible(n < nc);
   }
   o.show();
}
// ------------------------------------------------------------
function FEditEditor_onEditKeyDown(s, e){
   var o = this;
   var kc = e.keyCode;
   if(EKey.Up == kc){
      o.select(o.position - 1);
   }else if(EKey.Down == kc){
      o.select(o.position + 1);
   }else if(EKey.Enter == kc){
      var c = o.components.value(o.position);
      if(c){
         o.source.set(c.label);
      }
      o.blur();
   }else if(EKey.Esc == kc){
      o.blur();
   }else if(EKey.Left == kc || EKey.Right == kc || EKey.Home == kc || EKey.End == kc){
      return;
   }else{
      o.search(o.source.reget());
   }
}
// ------------------------------------------------------------
function FEditEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
// ------------------------------------------------------------
function FEditEditor_search(t){
   var o = this;
   if(RString.isEmpty(t)){
      return o.hide();
   }
   if(!o.inSearch){
      o.formName = o.source.dsControl.name;
      o.controlName = o.source.name;
      o.controlValue = t;
      o.inSearch = true;
      //RConsole.find(FCompleteConsole).search(o);
      var arg = new TDatasetCompleteArg(o.formName, o.controlName, o.controlValue);
      arg.callback = o;
      var fdc = RConsole.find(FDatasetConsole);
      fdc.complete(arg);
   }
}
// ------------------------------------------------------------
function FEditEditor_select(p){
   var o = this;
   p = Math.min(Math.max(0, p), o.count-1)
   for(var n=0; n<o.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
// ------------------------------------------------------------
function FEditEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLogger.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
// ------------------------------------------------------------
function FEditEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   var hbf = o.border.hForm;
   if(hbf.offsetWidth < o.MinWidth){
      hbf.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
// ------------------------------------------------------------
function FEditEditor_hide(){
   var o = this;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
//------------------------------------------------------------
function FEditEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hItemsForm);
   RMemory.freeHtml(o.hEdit);
   o.hChgIic     = null;
   o.hEdit       = null;
}
//------------------------------------------------------------
