// *********************************************************
// <T>操作数据集的管理类。</T>
//
// @tool
// @author maocy
// @version 1.0.1
// *********************************************************
function FFrameSpace(){
   var o = this;
   // Attribute
   o.manager           = null;
   o.formName          = null;
   o.form              = null;
   o.historyButton     = null;
   // Event
   o.onHistoryClick    = FFrameSpace_onHistoryClick;
   o.onTableSelectRow  = FFrameSpace_onTableSelectRow;
   o.onUpdateEnd       = FFrameSpace_onUpdateEnd;
   o.onFormResize      = FFrameSpace_onFormResize;
   // Method
   o.doFetch           = FFrameSpace_doFetch;
   o.doSearch          = FFrameSpace_doSearch;
   o.doLov             = FFrameSpace_doLov;
   o.doCopy            = FFrameSpace_doCopy;
   o.doZoom            = FFrameSpace_doZoom;
   o.doUpdate          = FFrameSpace_doUpdate;
   o.doDelete          = FFrameSpace_doDelete;
   o.doMovePage        = FFrameSpace_doMovePage;
   o.doDetail          = FFrameSpace_doDetail;
   o.doPrintPdf        = FFrameSpace_doPrintPdf;
   // Method
   o.initialize        = FFrameSpace_initialize;
   o.findForm          = FFrameSpace_findForm;
   o.setHistoryCaption = FFrameSpace_setHistoryCaption;
   o.select            = FFrameSpace_select;
   o.refresh           = FFrameSpace_refresh;
   o.setHistoryIcon    = FFrameSpace_setHistoryIcon;
   return o;
}

function FFrameSpace_onFormResize(){
   var o = this;
   var f = o.form;
   var m = o.manager;
   m.lsnsFormShowBefore.process(o, f);
   m.lsnsFormShow.process(o, f);
}

// *********************************************************
// <T>点击历史导航按键时的事件。</T>
//
// @method
// @param b:button:THistoryButton 历史导航按键
// *********************************************************
function FFrameSpace_onHistoryClick(b){
   var o = this;
   o.manager.selectSpace(o);
}

// *********************************************************
// <T>点击表格中行记录时的事件。</T>
//
// @method
// @param r:row:FRow 行控件
// *********************************************************
function FFrameSpace_onTableSelectRow(r){
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
function FFrameSpace_onUpdateEnd(g){
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
   m.lsnsUpdateEnd.process(o);
}

//----------------------------------------------------------
function FFrameSpace_initialize(){
   var o = this;
   // 增加共同的监听器
   var lc = RConsole.find(FListenerConsole);
   lc.register(FTable, ETableAction.RowClick, o, o.onTableSelectRow);
   //lc.register(MDataset, EDataAction.EndUpdate, form, doBack);
   //lc.register(FTable, ETableAction.GoInsert, o, doInsert);
   RConsole.find(FEventEngineConsole).loadConfig(RXml.makeNode(xEvent));
}

// *********************************************************
// <T>创建题目导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
// *********************************************************
function FFrameSpace_createTitleBar(h){
   var o = this;
   var b = o.titleBar = RControl.create(FTitleBar, h);
   //b.lsnsButtonClick.register(o, o.onHistoryClick);
}

//----------------------------------------------------------
function FFrameSpace_findForm(n){
   var o = this;
   var m = o.manager;
   // 创建表单
   var f = o.form;
   if(f && f.name == n){
      return f;
   }
   o.formName = n;
   f = o.form = RConsole.find(FFormConsole).createFromName(n, o.manager.hFormPanel, RWindow.builder());
   f.setSize('100%', '100%');
   f.lsnsUpdateEnd.register(o, o.onUpdateEnd);
   f.lsnsResize.register(o, o.onFormResize);
   f.dsShow();
   o.setHistoryCaption();
   return f;
}

//----------------------------------------------------------
function FFrameSpace_select(v){
   var o = this;
   var f = o.form;
   var m = o.manager;
   if(f){
      // 设置工具栏信息
      m.toolBar.setVisible(f.dispToolbar);
      if(v){
         // 显示表单
         m.selectForm(f);
         m.lsnsFormShowBefore.process(o, f);
         f.setVisible(true);
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
function FFrameSpace_doFetch(){
   // 查询按钮用
   var f = RConsole.find(FFocusConsole).findClass(MDataset);
   f.dsSearchs.clear();
   f.dsOrders.clear();
   f.dsFetch(true);
}

//----------------------------------------------------------
function FFrameSpace_doSearch(){
   RConsole.find(FFocusConsole).findClass(MDataset).doSearch();
}

//----------------------------------------------------------
function FFrameSpace_doCopy(){
   var f= RConsole.find(FFocusConsole).findClass(MDataset);
   if(f){
      f.dsCopy();
   }
}

//----------------------------------------------------------
function FFrameSpace_doLov(){
   var fc = RConsole.find(FFocusConsole).findClass(MListView);
   if(fc){
      fc.doListView();
   }
}

//----------------------------------------------------------
function FFrameSpace_doZoom(){
   var fc = RConsole.find(FFocusConsole).findClass(MZoom);
   if(fc){
      fc.doZoom();
   }
}

//----------------------------------------------------------
function FFrameSpace_doUpdate(){
}

//----------------------------------------------------------
function FFrameSpace_doDelete(){
}

//----------------------------------------------------------
function FFrameSpace_doMovePage(a){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, FTable)){
      dc.dsMovePage(a);
   }
}

//----------------------------------------------------------
function FFrameSpace_doDetail(){
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
function FFrameSpace_doPrintPdf(){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, MForm)){
      var formName = dc.getFormLink(EFormLink.Form);
      var uri = top.RContext.context('/public.pdf.wv?do=build&form_name=' + formName);
      RHtml.popup(uri, 800, 600);
   }
}


//----------------------------------------------------------
function FFrameSpace_setHistoryIcon(c){
   var o = this;
   var f = o.form;
   if(RString.isEmpty(c)){
      if(RClass.isClass(f, FForm)){
         if(EMode.Insert == f.inMode){
            var c = '#tbr.formInsert';
         }else if(EMode.Update == f.inMode){
            var c = '#tbr.formEdit';
         }else if(EMode.Delete == f.inMode){
            var c = '#tbr.formDelete';
         }
      }else{
         var c = '#tbr.table';
      }
   }
   o.historyButton.setIcon(c);
}

// *********************************************************
// <T>关联一个表单信息。</T>
//
// @method
// @param f:form:MForm 表单对象
// @param l:label:String 附加显示内容
// *********************************************************
function FFrameSpace_setHistoryCaption(t){
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
function FFrameSpace_refresh(){
   var o = this;
   var f = o.form;
   if(f){
      f.dsFetch(true);
   }
}
