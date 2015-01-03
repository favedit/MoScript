//==========================================================
// <T>���ѡȡ���ڡ�</T>
//
// @class FWindow
// @history 091106 MAOCY ����
//==========================================================
function FListWindow(o){
   o = RClass.inherits(this, o, FWindow);
   //..........................................................
   // @style
   o.stTablePanel   = RClass.register(o, new TStyle('TablePanel'));
   o.stButtonPanel  = RClass.register(o, new TStyle('ButtonPanel'));
   //..........................................................
   // @attribute
   o._windowCd      = EWindow.ListView;
   o._form          = null;
   o.lovControl     = null;
   //..........................................................
   // @process
   o.oeBuild        = FListWindow_oeBuild;
   //..........................................................
   // event
   o.onSelect       = FListWindow_onSelect;
   o.onClose        = FListWindow_onClose;
   o.onSearch       = FListWindow_onSearch;
   o.onBuildButtons = FListWindow_onBuildButtons;
   //..........................................................
   // @method
   o.linkLovControl = FListWindow_linkLovControl;
   o.fetch          = FListWindow_fetch;
   o.show           = FListWindow_show;
   o.hide           = FListWindow_hide;
   o.focus          = FListWindow_focus;
   o.dispose        = FListWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function  FListWindow_onSearch(){
   var o = this;
   var lov_searchBox = RControl.create(FSearchWindow);
   lov_searchBox.linkDsControl(o._form);
   lov_searchBox.show();
}
// ------------------------------------------------------------
function FListWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Picker');
      o.setCaption('List Of View');
      // Form (2colx1row)
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hBodyPanel.style.height = '500px';
      hTab.width = '100%';
      hTab.height = '100%';
      // Button Panel
      var h = o.hButtonPanel = hTab.insertRow().insertCell();
      h.height = 1;
      //h.className = o.style('ButtonPanel');
      h.style.borderBottomStyle = 'solid';
      h.style.borderBottomWidth  = 'thin';
      // Message Panel
      var h = o.hTablePanel = hTab.insertRow().insertCell();
      h.className = o.style('TablePanel');
      //o.onBuildButtons();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FListWindow_onBuildButtons(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   // Button - Search
   /*var b = o.btnSearch = RClass.create(FButton);
   b.icon = 'tool.search';
   b.label = RContext.get('FToolButton:search');
   b.width = '100%';
   b.lsnsClick.register(o, o.onSearch);
   b.psBuild(hRow.insertCell());*/
   // Button - Close
   var b = o.btnClose = RClass.create(FButton);
   b.icon = 'tool.exit';
   b.label = RContext.get('FToolButton:close');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClose);
   b.psBuild(hRow.insertCell());
}
// ------------------------------------------------------------
function FListWindow_onSelect(row){
   var o = this;
   var lov = o.lovControl;
   var ds = lov.topControl(MDataset);
   var lr = null;
   if(RClass.isClass(ds, FForm)){
      // ���ؼ��Ǳ?�����
      lr = ds;
   }else if(RClass.isClass(ds, FGridControl)){
      // ���ؼ��Ǳ��
      lr = ds.__focusCell.row;
   }
   if(lr){
      var v = null;
      var pack = RPack.split(lov.lovFields, ',', '=');
      for(var n=0; n<pack.count; n++){
         var fn = pack.name(n);
         var fv = pack.value(n);
         if(RString.startsWith(fv, '${') && RString.endsWith(fv, '}')){
            fv = row.get(fv.substr(2, fv.length-3));
         }
         lr.set(fn, fv);
         // ��ȡ��ǰ�ؼ�����ֵ
         if(RString.equals(fn, lov.dataName)){
            v = fv;
         }
      }
      lov.onListSelected(v);
   }
   // ����ѡ��󽹵�
   if(RClass.isClass(lov, MFocus)){
      RConsole.find(FFocusConsole).focusClass(MDataset, ds);
      RConsole.find(FEventConsole).add(lov, lov.focus);
   }
   // �ַ����ѡȡ���¼�
   var e = o._eventRowSelect;
   if(!e){
      e = o._eventRowSelect = new TEvent();
      e.source = lov;
   }
   e.row = row;
   e.handle = 'onListAfter';
   o.linkConsole.find(FFormConsole).processEvent(e);
   // ���ص�ǰ����
   o.hide();
}
// ------------------------------------------------------------
function FListWindow_onClose(){
   this.hide();
}
// ------------------------------------------------------------
function FListWindow_linkLovControl(lov){
   var o = this;
   o.lovControl = lov;
   var fc = RConsole.find(FFormConsole);
   // �ͷžɵı?
   if(o._form){
      fc.free(o._form);
   }
   // ��ȡ�µı?
   var f = o._form = fc.createFromName(lov.lovRefer, o.hTablePanel, null, EForm.Lov);
   o.setCaption(RContext.get('FListWindow:caption') + ' - ' + f.label);
   f._window = o;
   f.lsnsRowClick.push(new TListener(o, o.onSelect));
   f.setVisible(true);
   f.hPanel.width = '100%';
   f.hPanel.height = '100%';
}
// ------------------------------------------------------------
function FListWindow_fetch(cvs){
   var o = this;
   var t = o._form;
   t.dsGlobalSearchs.clear();
   var lov = o.lovControl;
   var ds = lov.topControl(MDataset);
   if(lov.lovWhere){
      var s = lov.lovWhere;
      var r = new TString();
      var f = '';
      var start = false;
      var cst = 0;
      var st = 0;
      var ed = 0;
      var count = 0;
      for(var n = 0; n < s.length; n++){
         var sst = s.charAt(n);
         if(sst == '$'){
            cst = n;
            start = true;
         }else if(sst == '{'){
            st = n;
            count++;
         }else if(sst == '}'){
            start = false;
            if(count != 0){
               ed = n;
               f = s.substring(st+1, ed);
               if(cvs){
             	  v = cvs.get(f);
             	  r.append(v);
               }else{
	               var cs = ds.components;
	               for(var m = 0; m < cs.count; m++){
	                  var c = cs.value(m);
	                  if(c && RClass.isClass(c, MValue)){
	                     if(c.dataName == f){
	                        var v = c.reget();
	                        r.append(v);
	                        break;
	                     }
	                  }
	               }
               }
               count--;
            }
            continue;
         }else{
            if(!start){
               r = r.append(sst);
            }
         }
      }
      var s = r.toString();
      var it = new TSearchItem('', s, ESearch.Source);
      t.dsGlobalSearchs.push(it);
   }
   // ��ʾ�?
   var f = o._form;
   f.psResize();
   f.psRefresh();
   f.focus();
   // ��ȡ���
   t.dsFetch(true, true);
}
// ------------------------------------------------------------
function FListWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   o.psVisible(true);
   RWindow.moveCenter(o.hPanel);
   RWindow.setEnable(false, true);
   o.focus();
}
// ------------------------------------------------------------
function FListWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FListWindow_focus(){
   var o = this;
   o.base.FWindow.focus.call(o);
   var t = o._form;
   if(t && t.hPage){
      t.hPage.focus();
   }
}
// ------------------------------------------------------------
function FListWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   o.hBodyPanel = null;
   o.hTablePanel = null;
   o.hButtonPanel = null;
}
