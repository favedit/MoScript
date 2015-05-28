//==========================================================
// <T>操作数据集的管理类。</T>
//
// @tool
// @history 091029 MAOCY 创建
//==========================================================
function TFormSpace(){
   var o = this;
   //..........................................................
   // @attribute
   o.manager           = null;
   //..........................................................
   // @event
   o.onUpdateEnd       = TFormSpace_onUpdateEnd;
   //..........................................................
   // @method
   o.findForm          = TFormSpace_findForm;




   o.formName          = null;
   o.form              = null;
   o.historyButton     = null;
   // Event
   o.onHistoryClick    = TFormSpace_onHistoryClick;
   o.onTableSelectRow  = TFormSpace_onTableSelectRow;
   o.onFormResize      = TFormSpace_onFormResize;
   // Method
   o.doFetch           = TFormSpace_doFetch;
   o.doSearch          = TFormSpace_doSearch;
   o.doLov             = TFormSpace_doLov;
   o.doCopy            = TFormSpace_doCopy;
   o.doZoom            = TFormSpace_doZoom;
   o.doDelete          = TFormSpace_doDelete;
   o.doMovePage        = TFormSpace_doMovePage;
   o.doDetail          = TFormSpace_doDetail;
   o.doPrintPdf        = TFormSpace_doPrintPdf;
   // Method
   o.initialize        = TFormSpace_initialize;
   o.setHistoryCaption = TFormSpace_setHistoryCaption;
   o.select            = TFormSpace_select;
   o.refresh           = TFormSpace_refresh;
   o.setHistoryIcon    = TFormSpace_setHistoryIcon;
   return o;
}

//==========================================================
// <T>处理更新后事件。</T>
//
// @method
// @param g:argument:Object 参数
//==========================================================
function TFormSpace_onUpdateEnd(g){
   var o = this;
   var f = g.form;
   var hb = o.historyBar;
   var m = o.manager;
   var b = m.historyBar.popup();
   if(b){
      var s = b.store.space;
      if(s){
         s.refresh();
         s.form.focus();
      }
   }else{
     if(RClass.isClass(o.form, FTable)){
         o.refresh();
     }
      f.focus();
   }
   m.onUpdateEnd(g);
}

//==========================================================
// <T>查找一个表单，如果不存在则创建。</T>
//
// @method
// @param n:formName:String 表单名称
//==========================================================
function TFormSpace_findForm(n){
   var o = this;
   var m = o.manager;
   // 创建表单
   var f = o.form;
   if(f){
      if(f.name == n){
         return f;
      }else{
         RConsole.find(FFormConsole).free(f);
      }
   }
   o.formName = n;
   f = o.form = RConsole.find(FFormConsole).createFromName(n, o.manager.hFormPanel, RWindow.builder());
   f.setSize('100%', '100%');
   f.lsnsUpdateEnd.register(o, o.onUpdateEnd);
   f.dsShow();
   o.setHistoryCaption();
   return f;
}



















function TFormSpace_onFormResize(){
   var o = this;
   var f = o.form;
   var m = o.manager;
   m.lsnsFormShowBefore.process(o, f);
   m.lsnsFormShow.process(o, f);
}

//==========================================================
// <T>点击历史导航按键时的事件。</T>
//
// @method
// @param b:button:THistoryButton 历史导航按键
//==========================================================
function TFormSpace_onHistoryClick(b){
   var o = this;
   o.manager.selectSpace(o);
}

//==========================================================
// <T>点击表格中行记录时的事件。</T>
//
// @method
// @param r:row:FRow 行控件
//==========================================================
function TFormSpace_onTableSelectRow(r){
   var o = this;
   var ds = r.table;
   // 忽略LOV的情况
   if(ds && ds.isLov){
      return;
   }
   // 隐藏当前表单
   o.form.setVisible(false);
   var formName = ds.getFormLink(EFormLink.Form);
   // 获得
   var form = o.findForm(formName);
   form.dsUpdate(r.ouid(), r.over());
   form.setVisible(true);
   // 设置新对象的焦点
   RConsole.find(FFocusConsole).focusClass(MDataset, form)
   // 设置标题信息
   o.titleBar.setCaption(form.label);
   o.historyBar.nextButton().linkForm(form);
}


//----------------------------------------------------------
function TFormSpace_initialize(){
   var o = this;
   // 增加共同的监听器
   var lc = RConsole.find(FListenerConsole);
   lc.register(FTable, ETableAction.RowClick, o, o.onTableSelectRow);
   //lc.register(MDataset, EDataAction.EndUpdate, form, doBack);
   //lc.register(FTable, ETableAction.GoInsert, o, doInsert);
   RConsole.find(FEventEngineConsole).loadConfig(RXml.makeNode(xEvent));
}

//==========================================================
// <T>创建题目导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
//==========================================================
function TFormSpace_createTitleBar(h){
   var o = this;
   var b = o.titleBar = RControl.create(FTitleBar, h);
   //b.lsnsButtonClick.register(o, o.onHistoryClick);
}

//----------------------------------------------------------
function TFormSpace_select(v){
   var o = this;
   var f = o.form;
   var m = o.manager;
   if(f){
      // 设置工具栏信息
      m.toolBar.setVisible(f.dispToolbar);
      if(v){
         // 显示表单
         m.selectForm(f);
         f.setVisible(true);
         m.lsnsFormShowBefore.process(o, f);
         f.psRefreshFirst();
         f.psResize();
         m.lsnsFormShow.process(o, f);
         // 刷新表单
         f.dsShow();
         f.focus();
      }else{
         // 隐藏表单
         f.setVisible(false);
      }
   }
}

//----------------------------------------------------------
function TFormSpace_doFetch(){
   // 查询按钮用
   var f = RConsole.find(FFocusConsole).findClass(MDataset);
   f.dsSearchs.clear();
   f.dsOrders.clear();
   f.dsFetch(true, true);
}

//----------------------------------------------------------
function TFormSpace_doSearch(){
   RConsole.find(FFocusConsole).findClass(MDataset).doSearch();
}

//----------------------------------------------------------
function TFormSpace_doCopy(){
   var f= RConsole.find(FFocusConsole).findClass(MDataset);
   if(f){
      f.dsCopy();
   }
}

//----------------------------------------------------------
function TFormSpace_doLov(){
   var fc = RConsole.find(FFocusConsole).findClass(MListView);
   if(fc){
      fc.doListView();
   }
}

//----------------------------------------------------------
function TFormSpace_doZoom(){
   var fc = RConsole.find(FFocusConsole).findClass(MZoom);
   if(fc){
      fc.doZoom();
   }
}

//----------------------------------------------------------
function TFormSpace_doDelete(){
}

//----------------------------------------------------------
function TFormSpace_doMovePage(a){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, FTable)){
      dc.dsMovePage(a);
   }
}

//----------------------------------------------------------
function TFormSpace_doDetail(){
   var ouid = null;
   var over = null;
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, FForm)){
      ouid = dc.dsGet('ouid');
      over = dc.dsGet('over');
   }else if(RClass.isClass(dc, FTable)){
      var rs = dc.findSelectRows();
      if(!rs.isEmpty()){
         var r = rs.get(0);
         ouid = r.ouid();
         over = r.over();
      }
   }
   if(ouid && over){
      var uri = top.RContext.context('/apl/logic/resource/WebResource.wa?form_name={0}&ouid={1}&over={2}');
      uri = RString.format(uri, dc.name, ouid, over);
      RHtml.popup(uri, 900, 600);
   }
}

//----------------------------------------------------------
function TFormSpace_doPrintPdf(){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, MForm)){
      var formName = dc.getFormLink(EFormLink.Form);
      var uri = top.RContext.context('/public.pdf.wv?do=build&form_name=' + formName);
      RHtml.popup(uri, 800, 600);
   }
}

//----------------------------------------------------------
function TFormSpace_setHistoryIcon(c){
   var o = this;
   var f = o.form;
   if(RString.isEmpty(c)){
      if(RClass.isClass(f, FForm)){
         switch(f._emode){
            case EMode.Insert:
               c = '#tbr.formInsert';
               break;
            case EMode.Update:
               c = '#tbr.formUpdate';
               break;
            case EMode.Delete:
               c = '#tbr.formDelete';
               break;
         }
      }else{
         c = '#tbr.table';
      }
   }
   o.historyButton.setIcon(c);
}

//==========================================================
// <T>关联一个表单信息。</T>
//
// @method
// @param f:form:MForm 表单对象
// @param l:label:String 附加显示内容
//==========================================================
function TFormSpace_setHistoryCaption(t){
   var o = this;
   var f = o.form;
   var r = f.label;
   if(t){
      r += ' (' + t + ')';
   }
   o.historyButton.setText(' ' + r);
   //
   //var s = new TString();
   //s.append('Name: ' + f.name + ' ');
   //s.append('Note: ' + f.note);
   //window.status = s.toString();
   //o.historyButton.setHint(s.toString());
}

//----------------------------------------------------------
function TFormSpace_refresh(){
   var o = this;
   var f = o.form;
   if(f){
      f.dsFetch(true, true);
   }
}
