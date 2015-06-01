// *********************************************************
// <T>操作数据集的管理类。</T>
//
// @tool
// @author maocy
// @version 1.0.1
// *********************************************************
function FFrameSpaceBox(){
   var o = this;
   // @attribute
   o.focusControl               = null;
   o.titleBar                   = null;
   o.historyBar                 = null;
   o.toolBar                    = null;
   o.spaces                     = new TList();
   // @listener
   o.lsnsFormShowBefore         = new TListeners();
   o.lsnsFormShow               = new TListeners();
   o.lsnsUpdateEnd              = new TListeners();
   o.lsnsTitleButtonClickBefore = new TListeners();
   o.lsnsTitleButtonClick       = new TListeners();
   // @html
   o.hTitlePanel                = null;
   o.hHistoryPanel              = null;
   o.hToolPanel                 = null;
   o.hFormPanel                 = null;
   // @event
   o.onTitleButtonClickBefore   = FFrameSpaceBox_onTitleButtonClickBefore
   o.onTitleButtonClick         = FFrameSpaceBox_onTitleButtonClick;
   o.onHistoryClick             = FFrameSpaceBox_onHistoryClick;
   o.onToolBarRefresh           = FFrameSpaceBox_onToolBarRefresh;
   o.onTableSelectRow           = FFrameSpaceBox_onTableSelectRow;
   o.onSpaceResize              = FFrameSpaceBox_onSpaceResize;
   o.onFormShow                 = FFrameSpaceBox_onFormShow;
   // @method
   o.doFetch                    = FFrameSpaceBox_doFetch;
   o.doSearch                   = FFrameSpaceBox_doSearch;
   o.doLov                      = FFrameSpaceBox_doLov;
   o.doCopy                     = FFrameSpaceBox_doCopy;
   o.doZoom                     = FFrameSpaceBox_doZoom;
   o.doPrepare                  = FFrameSpaceBox_doPrepare;
   o.doUpdate                   = FFrameSpaceBox_doUpdate;
   o.doDelete                   = FFrameSpaceBox_doDelete;
   o.doMovePage                 = FFrameSpaceBox_doMovePage;
   o.doDetail                   = FFrameSpaceBox_doDetail;
   o.doPrintPdf                 = FFrameSpaceBox_doPrintPdf;
   o.doOperateAction            = FFrameSpaceBox_doOperateAction;
   // @method
   o.initialize                 = FFrameSpaceBox_initialize;
   o.setFormPanel               = FFrameSpaceBox_setFormPanel;
   o.createSpace                = FFrameSpaceBox_createSpace;
   o.createTitleBar             = FFrameSpaceBox_createTitleBar;
   o.createHistoryBar           = FFrameSpaceBox_createHistoryBar;
   o.createToolBar              = FFrameSpaceBox_createToolBar;
   o.currentSpace               = FFrameSpaceBox_currentSpace;
   o.nextSpace                  = FFrameSpaceBox_nextSpace;
   o.popupSpace                 = FFrameSpaceBox_popupSpace;
   o.selectSpace                = FFrameSpaceBox_selectSpace;
   o.selectForm                 = FFrameSpaceBox_selectForm;
   o.release                    = FFrameSpaceBox_release;
   o.goPage                     = FFrameSpaceBox_goPage;
   // Construct
   RMemory.register('FFrameSpaceBox', o);
   return o;
}

function FFrameSpaceBox_onFormShow(){
   this.lsnsFormShow.process();
}

// *********************************************************
// <T>标题按键前处理。</T>
//
// @method
// @param s:source:FControl 事件发出者
// *********************************************************
function FFrameSpaceBox_onTitleButtonClickBefore(s){
   this.lsnsTitleButtonClickBefore.process(s);
}

// *********************************************************
// <T>标题按键处理。</T>
//
// @method
// @param s:source:FControl 事件发出者
// *********************************************************
function FFrameSpaceBox_onTitleButtonClick(s){
   this.lsnsTitleButtonClick.process(s);
}

// *********************************************************
// <T>点击历史导航按键时的事件。</T>
//
// @method
// @param b:button:THistoryButton 历史导航按键
// *********************************************************
function FFrameSpaceBox_onHistoryClick(b){
   var o = this;
   o.selectSpace(b.store.space);
   o.historyBar.historyIndex = o.historyBar.buttons.indexOf(b);
}

// *********************************************************
// <T>处理工作空间表单大小改变。</T>
//
// @method
// *********************************************************
function FFrameSpaceBox_onSpaceResize(s){
   var o = this;
   var ts = FFrameSpaceBox.currentSpace();
   var f = ts.form;
   if(f){
      f.psResize();
   }
}

// *********************************************************
// <T>点击表格中行记录时的事件。</T>
//
// @method
// @param r:row:FRow 行控件
// *********************************************************
function FFrameSpaceBox_onTableSelectRow(r){
   var o = this;
   top.RWindow.setEnable(false);
   var ds = r.table;
   // 忽略LOV的情况
   if(ds && ds.isLov){
      return;
   }
   // 隐藏当前工作台
   var sc = o.currentSpace();
   // 获得下个工作台
   var fn = ds.getFormLink(EFormLink.Form);
   if(!RString.isEmpty(fn)){
      // 隐藏当前表单空间
      sc.select(false);
      // 获得下一个表单空间
      var s = o.nextSpace();
      // 获得表单对象
      var f = s.findForm(fn);
      // 获得当前行关联的所有数据，包含父数据对象的
      f.dsValues.clear();
      r.toDeepAttributes(f.dsValues)
      // 开始表单的更新
//      o.formReferWhere = '${type_cd}=MealFee:logic.develop.project.finance.expense.manage.MealForm;${type_cd}=MealFeg:logic.develop.project.finance.expense.manage.MealForm';
//      if(o.formReferWhere){
//         var vs = RString.split(o.formReferWhere, ',');
//         for(var n = 0; n < vs.count; n++){
//            var ss = RString.split(vs[n], ':');
//            var whe = ss[0];
//            // type_cd
//            var w0 = RString.split(whe, '=')[0];
//            w0 = RString.removeChars(w0, '$');
//            w0 = RString.removeChars(w0, '{');
//            w0 = RString.removeChars(w0, '}');
//            // MealFee
//            var w1 = RString.split(whe, '=')[1];
//            // FormName
//            var frm = ss[1];
//            //debugger
//         }
//      }
      f.dsUpdate(r.ouid());
      s.setHistoryIcon();
      // 设置工具栏
      o.selectSpace(s);
      top.RWindow.setEnable(true);
   }
   top.RWindow.setEnable(true);
}

//----------------------------------------------------------
function FFrameSpaceBox_onToolBarRefresh(){
   var o = this;
   var bs = null;
   // 获得当前表单
   var f  = o.currentSpace().form;
   // 获得焦点控件
   var c = RConsole.find(FFocusConsole).focusControl;
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(dc){
//    f = dc;
   }
   // 设置焦点控件的有效性
   var bl = false;
   var bz = false;
   if(c && RClass.isClass(f, FForm)){
      bl = RClass.isClass(c, MListView) && c.canListView();
      bz = RClass.isClass(c, MZoom) && c.canZoom();
   }
   // 设置按键的有效性
   if(RClass.isClass(f, FForm)){
      switch(f.inMode){
         case EMode.Insert:
            bs = {
               'fetchButton':false, 'searchButton':false, 'lovButton':bl, 'zoomButton':bz,
               'insertButton':false, 'copyButton':false, 'updateButton':true, 'deleteButton':false,
               'splitButton2':false, 'firstButton':false, 'priorButton':false, 'nextButton':false, 'lastButton':false,
               'actionButton':f.editAction};
               bs["actionButton"] = f.hasAction();
            break;
         case EMode.Update:
               bs = {
               'fetchButton':f.editFetch, 'searchButton':f.editSearch, 'lovButton':bl, 'zoomButton':bz,
               'insertButton':false, 'copyButton':false, 'updateButton':f.editUpdate, 'deleteButton':false,
               'splitButton2':false, 'firstButton':false, 'priorButton':false, 'nextButton':false, 'lastButton':false,
               'actionButton':f.editAction};
               bs["actionButton"] = f.hasAction();
            break;
         case EMode.Delete:
            bs = {
               'fetchButton':false, 'searchButton':false, 'lovButton':bl, 'zoomButton':bz,
               'insertButton':false, 'copyButton':false, 'updateButton':true, 'deleteButton':false,
               'splitButton2':false, 'firstButton':false, 'priorButton':false, 'nextButton':false, 'lastButton':false,
               'actionButton':f.editAction};
               bs["actionButton"] = f.hasAction();
            break;
      }
   }else if(RClass.isClass(f, FTable)){
      bs = {
         'fetchButton':true, 'searchButton':true, 'lovButton':bl, 'zoomButton':bz,
         'insertButton':f.editInsert, 'copyButton':false, 'updateButton':f.editUpdate, 'deleteButton':f.editDelete,
         'splitButton2':true, 'firstButton':true, 'priorButton':true, 'nextButton':true, 'lastButton':true,
         'actionButton':f.editAction};
      var ft = f.editFetch ? f.editFetch : false;
      bs["fetchButton"] = bs["searchButton"] = ft ;
      ft = f.editInsert ? f.editInsert : false;
      bs["insertButton"] = ft ;
      bs["deleteButton"] = f.isDataSelected()&&f.editDelete;
      bs["actionButton"] = f.hasAction();
   }
   o.toolBar.setEnables(bs);
   o.focusControl = c;
}

//----------------------------------------------------------
function FFrameSpaceBox_initialize(){
   var o = this;
   // 增加共同的监听器
   var lc = RConsole.find(FListenerConsole);
   lc.register(FTable, ETableAction.RowClick, o, o.onTableSelectRow);
   lc.register(FTable, ETableAction.RowDblClick, o, o.onTableSelectRow);
   //lc.register(MDataset, EDataAction.EndUpdate, form, doBack);
   //lc.register(FTable, ETableAction.GoInsert, o, doInsert);
   //RConsole.find(FEventEngineConsole).loadConfig(RXml.makeNode(xEvent));
   RConsole.find(FIdleConsole).register(o, o.onToolBarRefresh);
   RWindow.lsnsResize.register(o, o.onSpaceResize);
   RFlash.start();
}

//----------------------------------------------------------
function FFrameSpaceBox_setFormPanel(h){
   var o = this;
   o.hFormPanel = h;
   RWindow.hContainer = h;
}

// *********************************************************
//<T>创建一个新的工作空间。</T>
//
//@method
//@param b:button:<HTML> 
// *********************************************************
function FFrameSpaceBox_createSpace(b){
   var o = this;
   var s = new TFormSpace();
   s.manager = o;
   s.historyButton = b ? b : o.historyBar.nextButton();
   s.setHistoryIcon();
   s.historyButton.store.space = s;
   o.spaces.push(s);
   return s;
}

// *********************************************************
// <T>创建题目导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
// *********************************************************
function FFrameSpaceBox_createTitleBar(h, hx){
   var o = this;
   if(hx){
      o.titleBar = RControl.fromXml(hx, h)
   }else{
      o.titleBar = RControl.create(FTitleBar, h);
   }
   o.titleBar.lsnsNavButtonClickBefore.register(o, o.onTitleButtonClickBefore);
   o.titleBar.lsnsNavButtonClick.register(o, o.onTitleButtonClick);
   //b.lsnsButtonClick.register(o, o.onHistoryClick);
}

// *********************************************************
// <T>创建历史导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
// *********************************************************
function FFrameSpaceBox_createHistoryBar(h){
   var o = this;
   var b = o.historyBar = RControl.create(FHistoryBar, h);
   b.lsnsButtonClick.register(o, o.onHistoryClick);
}

// *********************************************************
// <T>创建工具栏。</T>
//
// @method
// @param hx:xml:<XML> 工具栏定义
// @param h:hPanel:<HTML> 父页面容器
// *********************************************************
function FFrameSpaceBox_createToolBar(h, hx){
   var o = this;
   var xtoolbar = RXml.makeNode(hx);
   o.hToolPanel = h;
   o.toolBar = RControl.fromNode(xtoolbar, h);
}

//----------------------------------------------------------
function FFrameSpaceBox_currentSpace(){
   var o = this;
   var b = o.historyBar.currentButton();
   return b.store.space;
}

//----------------------------------------------------------
function FFrameSpaceBox_nextSpace(c){
   var o = this;
   var b = o.historyBar.nextButton(c);
   if(b.store.space){
      return b.store.space;
   }
   return o.createSpace(b);
}

//----------------------------------------------------------
function FFrameSpaceBox_popupSpace(n){
   var o = this;
   var b = o.historyBar.popup(n);
   var s = b.store.space;
   if(s){
      o.selectSpace(s);
      // 画面显示
      //o.lsnsFormShow.process(s);
   }
   return s;
}

//----------------------------------------------------------
function FFrameSpaceBox_doFetch(){
   this.currentSpace().doFetch();
}

//----------------------------------------------------------
function FFrameSpaceBox_doSearch(){
   this.currentSpace().doSearch();
}

//----------------------------------------------------------
function FFrameSpaceBox_doCopy(){
   var o = this;
   var ds = RConsole.find(FFocusConsole).findClass(MDataset);
   if( RClass.isClass(ds, FTable) ){
      var frows = ds.findSelectRows();
      if(frows && frows.count == 1){
         var sc = o.currentSpace();
         var sf = sc.form;
         // 获取数据表单
         var s = o.nextSpace();
         var fn = ds.getFormLink(EFormLink.Form);
         var f = s.findForm(fn);
         f.dsCopy(frows.get(0));
         f.setVisible(true);
         f.focus();
         // 设置标题信息
         s.setHistoryIcon();
         o.selectSpace(s);
      }
   }
}

//----------------------------------------------------------
function FFrameSpaceBox_doLov(){
   this.currentSpace().doLov();
}

//----------------------------------------------------------
function FFrameSpaceBox_doZoom(){
   var o = this;
   var focusControl = o.focusControl;
   var ouid = focusControl.reget();
   var sc = o.currentSpace();
   var sf = sc.form;
   // 获取数据表单
   var c = '#tbr.formZoom';
   var s = o.nextSpace();
   s.setHistoryIcon(c);
   var fn = focusControl.zoomRefer;
   var f = s.findForm(fn);
   f.dsValues.clear();
   f.dsUpdate(ouid);
   f.setVisible(true);
   f.focus();
   // 设置标题信息
   o.selectSpace(s);
}

//----------------------------------------------------------
function FFrameSpaceBox_doPrepare(sf){
   var o = this;
   if(sf){
      // 获取数据表单
      var s = o.nextSpace();
      var fn = sf.getFormLink(EFormLink.Form);
      var f = s.findForm(fn);
   }else{
      var sc = o.currentSpace();
      sf = sc.form;
      // 获取数据表单
      var s = o.nextSpace();
      var ds = RConsole.find(FFocusConsole).findClass(MDataset);
      var fn = ds.getFormLink(EFormLink.Form);
      var f = s.findForm(fn);
   }
   // 显示新的表单
   f.dsValues.clear();
   if(sf){
      sf.toDeepAttributes(s.form.dsValues);
      f.dsValues.append(sf.dsValues);
   }
   f.dsPrepare();
   f.setVisible(true);
   f.focus();
   // 设置标题信息
   s.setHistoryIcon();
   o.selectSpace(s);
}

//----------------------------------------------------------
function FFrameSpaceBox_doUpdate(){
   var o = this;
   var ds = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(ds, MForm)){
      //if(ds.dsIsChanged()){
         ds.dsDoUpdate();
      //}else{
         //o.doSelectRow();
      //}
   }
}

//----------------------------------------------------------
function FFrameSpaceBox_doDelete(){
   var o = this;
   var sc = o.currentSpace();
   // 更新新的表单
   var s = o.nextSpace();
   var ds = RConsole.find(FFocusConsole).findClass(MDataset);
   var r = ds.dsViewer.current();
   // 获得操作记录的标识和版本
   var ouid = null;
   if(RClass.isClass(ds, FForm)){
      ouid = r.ouid();
   }else if(RClass.isClass(ds, FTable)){
      var rs = ds.findSelectRows();
      if(rs.isEmpty()){
         return RMessage.fatal(this, null, 'Please select row.');
      }
      var r = rs.get(0);
      ouid = r.ouid();
   }
   // 获得
   var fn = ds.getFormLink(EFormLink.Form);
   var f = s.findForm(fn);
   f.dsDelete(ouid);
   f.setVisible(true);
   f.focus();
   // 追加导航
   s.setHistoryIcon();
   o.selectSpace(s);
}

//----------------------------------------------------------
function FFrameSpaceBox_doMovePage(a){
   this.currentSpace().doMovePage(a);
}

//----------------------------------------------------------
function FFrameSpaceBox_doDetail(){
   this.currentSpace().doDetail();
}

//----------------------------------------------------------
function FFrameSpaceBox_doPrintPdf(){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, MForm)){
      var formName = dc.getFormLink(EFormLink.Form);
      var uri = top.RContext.context('/public.pdf.wv?do=build&form_name=' + formName);
      RHtml.popup(uri, 800, 600);
   }
}

//----------------------------------------------------------
function FFrameSpaceBox_selectSpace(s){
   var o = this;
   var ss = o.spaces;
   for(var n=0; n<ss.count; n++){
      var c = ss.get(n);
      if(c != s){
         c.select(false);
      }
   }
   s.select(true);
}
//----------------------------------------------------------
function FFrameSpaceBox_selectForm(f){
   var o = this;
   var t = o.titleBar;
   if(RClass.isClass(f, FForm)){
      t.setIcon('#com.form');
   }else if(RClass.isClass(f, FTable)){
      t.setIcon('#com.table');
   }
   if(RClass.isMode(ERun.Debug)){
      t.setCaption(f.label + " <FONT color='green'>( form=" + f.name + ", mode=" + REnum.tryDecode(EMode, f.inMode) + " )</FONT>");
   }else{
      t.setCaption(f.label);
   }
}
//----------------------------------------------------------
function FFrameSpaceBox_release(){
   var o = this;
   var cl = RConsole.find(FFormConsole);
   cl.dispose();
}
//----------------------------------------------------------
function FFrameSpaceBox_doOperateAction(){
   var o = this;
   var w = RConsole.find(FActionConsole).find();
   var ds = FFrameSpaceBox.currentSpace().form;
   w.linkForm(ds);
   w.show();
}
//----------------------------------------------------------
// EResultPage
function FFrameSpaceBox_goPage(rp){
   fmMain.action = top.RContext.context(rp);
   fmMain.submit();
}
