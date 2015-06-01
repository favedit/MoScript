//==========================================================
// <T>操作数据集的管理类。</T>
//
// @reference
// @history 091029 MAOCY 创建
//==========================================================
var RFormSpace = new function(){
   var o = this;
   //..........................................................
   // @attribute
   o.titleBar                   = null;
   o.historyBar                 = null;
   o.toolBar                    = null;
   o.spaces                     = new TList();
   // @html
   o.hTitlePanel                = null;
   o.hHistoryPanel              = null;
   o.hToolPanel                 = null;
   o.hFormPanel                 = null;
   //..........................................................
   // @listener
   o.lsnsTitleButtonClickBefore = new TListeners();
   o.lsnsTitleButtonClick       = new TListeners();
   o.lsnsFormShowBefore         = new TListeners();
   o.lsnsFormShow               = new TListeners();
   o.lsnsUpdateEnd              = new TListeners();
   //..........................................................
   // @event
   o.onFocusChanged             = RFormSpace_onFocusChanged;
   o.onTitleButtonClickBefore   = RFormSpace_onTitleButtonClickBefore
   o.onTitleButtonClick         = RFormSpace_onTitleButtonClick;
   o.onHistoryClick             = RFormSpace_onHistoryClick;
   o.onSpaceResize              = RFormSpace_onSpaceResize;
   o.onFormShow                 = RFormSpace_onFormShow;
   o.onFormResize               = RFormSpace_onFormResize;
   o.onTableSelectRow           = RFormSpace_onTableSelectRow;
   o.onUpdateEnd                = RFormSpace_onUpdateEnd;
   //..........................................................
   // @method
   o.initialize                 = RFormSpace_initialize;
   o.createTitleBar             = RFormSpace_createTitleBar;
   o.createHistoryBar           = RFormSpace_createHistoryBar;
   o.createToolBar              = RFormSpace_createToolBar;
   o.createSpace                = RFormSpace_createSpace;
   o.setFormPanel               = RFormSpace_setFormPanel;
   o.focusControl               = RFormSpace_focusControl;
   o.hasSpace                   = RFormSpace_hasSpace;
   o.firstSpace                 = RFormSpace_firstSpace;
   o.currentSpace               = RFormSpace_currentSpace;
   o.nextSpace                  = RFormSpace_nextSpace;
   o.lastSpace                  = RFormSpace_lastSpace;
   o.popupSpace                 = RFormSpace_popupSpace;
   o.selectSpace                = RFormSpace_selectSpace;
   o.nextForm                   = RFormSpace_nextForm;
   o.selectForm                 = RFormSpace_selectForm;
   // @method
   o.doFetch                    = RFormSpace_doFetch;
   o.doSearch                   = RFormSpace_doSearch;
   o.doLov                      = RFormSpace_doLov;
   o.doCopy                     = RFormSpace_doCopy;
   o.doZoom                     = RFormSpace_doZoom;
   o.doPrepare                  = RFormSpace_doPrepare;
   o.doUpdate                   = RFormSpace_doUpdate;
   o.doDelete                   = RFormSpace_doDelete;
   o.doMovePage                 = RFormSpace_doMovePage;
   o.doDetail                   = RFormSpace_doDetail;
   o.doPrintPdf                 = RFormSpace_doPrintPdf;
   o.doOperateAction            = RFormSpace_doOperateAction;
   // @method
   o.goPage                     = RFormSpace_goPage;
   o.goBlankPage                = RFormSpace_goBlankPage;
   o.refresh                    = RFormSpace_refresh;
   o.release                    = RFormSpace_release;
   //..........................................................
   // @construct
   RMemory.register('RFormSpace', o);
   return o;
}

//==========================================================
// <T>焦点变更事件。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_onFocusChanged(c){
   this.focusControl(c);
}

//==========================================================
// <T>标题按键前处理。</T>
//
// @method
// @param s:source:FControl 事件发出者
//==========================================================
function RFormSpace_onTitleButtonClickBefore(s){
   this.lsnsTitleButtonClickBefore.process(s);
}

//==========================================================
// <T>标题按键处理。</T>
//
// @method
// @param s:source:FControl 事件发出者
//==========================================================
function RFormSpace_onTitleButtonClick(s){
   this.lsnsTitleButtonClick.process(s);
}

//==========================================================
// <T>点击历史导航按键时的事件。</T>
//
// @method
// @param b:button:THistoryButton 历史导航按键
//==========================================================
function RFormSpace_onHistoryClick(b){
   var o = this;
   o.selectSpace(b.store.space);
   o.historyBar.historyIndex = o.historyBar.buttons.indexOf(b);
}

//==========================================================
// <T>处理工作空间表单大小改变事件。</T>
//
// @method
//==========================================================
function RFormSpace_onSpaceResize(s){
   var o = this;
   if(!o.hasSpace()){
      return;
   }
   var ts = o.currentSpace();
   var f = ts.form;
   if(f){
      f.psResize();
   }
}

//==========================================================
// <T>画面显示事件。</T>
//
// @method
//==========================================================
function RFormSpace_onFormShow(){
   this.lsnsFormShow.process(this, f);
}

function RFormSpace_onFormResize(){
   var f = RFormSpace.currentSpace().form;
   f.psResize();
   this.lsnsFormShow.process(this, f);
}

//==========================================================
// <T>点击表格中行记录时的事件。</T>
//
// @method
// @param r:row:FRow 行控件
//==========================================================
function RFormSpace_onTableSelectRow(r){
   var o = this;
   if(!o.hasSpace()){
      return;
   }
   var dc = r.table;
   if(RClass.isClass(r, FBrowserNode)){
      dc = r.browser;
   }
   // 忽略LOV的情况
   if(!dc){
      return;
   }else if(dc.isLov){
      return;
   }
   // 隐藏当前工作台
   var sc = o.currentSpace();
   // 获得下个工作台
   var fn = dc.getFormLink(EFormLink.Form);
   if(!RString.isEmpty(fn)){
      // 隐藏当前表单空间
      sc.select(false);
      // 获得下一个表单空间
      var s = o.nextSpace();
      // 获得表单对象
      var f = s.findForm(fn);
      // 获得当前行关联的所有数据，包含父数据对象的
      f.dsValues.clear();
      if(RClass.isClass(r, FBrowserNode)){
         f.dsValues.append(r.attributes);
      }else{
         r.toDeepAttributes(f.dsValues)
      }
      // 设置工具栏
      o.selectSpace(s);
      // 数据开始加载
      f.dsUpdate(r.getId());
      //f.dsUpdate(r);
      s.setHistoryIcon();
   }
}

//==========================================================
// <T>处理更新完成事件。</T>
//
// @method
//==========================================================
function RFormSpace_onUpdateEnd(g){
   this.lsnsUpdateEnd.process(g);
}

//==========================================================
// <T>初始化工作空间。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_initialize(){
   var o = this;
   // 监听焦点变更信息
   var fc = RConsole.find(FFocusConsole);
   fc.lsnsFocus.register(o, o.onFocusChanged);
   fc.lsnsFocusClass.register(o, o.onFocusChanged);
   // 监听数据变更信息
   var lc = RConsole.find(FListenerConsole);
   lc.register(FGridControl, EGridAction.RowClick, o, o.onTableSelectRow);
   lc.register(FGridControl, EGridAction.RowDblClick, o, o.onTableSelectRow);
   lc.register(MTop, ETopAction.Resize, o, o.onFormResize);
   //RConsole.find(FIdleConsole).register(o, o.onToolBarRefresh);
   RWindow.lsnsResize.register(o, o.onSpaceResize);
   RFlash.start();
}

//==========================================================
// <T>创建题目导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
//==========================================================
function RFormSpace_createTitleBar(h, hx){
   var o = this;
   var t = null;
   if(hx){
      t = RControl.fromXml(hx, h)
   }else{
      t = RControl.create(FTitleBar, h);
   }
   t.lsnsNavButtonClickBefore.register(o, o.onTitleButtonClickBefore);
   t.lsnsNavButtonClick.register(o, o.onTitleButtonClick);
   o.titleBar = t;
}

//==========================================================
// <T>创建历史导航栏。</T>
//
// @method
// @param h:hPanel:<HTML> 父页面容器
//==========================================================
function RFormSpace_createHistoryBar(h){
   var o = this;
   var b = o.historyBar = RControl.create(FHistoryBar, h);
   b.lsnsButtonClick.register(o, o.onHistoryClick);
}

//==========================================================
// <T>创建工具栏。</T>
//
// @method
// @param hx:xml:<XML> 工具栏定义
// @param h:hPanel:<HTML> 父页面容器
//==========================================================
function RFormSpace_createToolBar(h, hx){
   var o = this;
   o.hToolPanel = h;
   o.toolBar = RControl.fromNode(RXml.makeNode(hx), h);
   o.focusControl();
}

//==========================================================
//<T>创建一个新的工作空间。</T>
//
//@method
//@param b:button:<HTML> 
//==========================================================
function RFormSpace_createSpace(b){
   var o = this;
   var s = new TFormSpace();
   s.manager = s.parent = o;
   s.historyButton = b ? b : o.historyBar.nextButton();
   s.setHistoryIcon();
   s.historyButton.store.space = s;
   o.spaces.push(s);
   return s;
}

//==========================================================
// <T>设置表单容器。</T>
//
// @method
// @param h:html:HtmlObject 容器对象
//==========================================================
function RFormSpace_setFormPanel(h){
   var o = this;
   o.hFormPanel = h;
   //RWindow.hContainer = h;
}

//==========================================================
// <T>设置焦点控件。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_focusControl(){
   var o = this;
   // 处理编辑器情况，获得关联的编辑源
   var fc = RConsole.find(FFocusConsole);
   var c = fc.activeControl;
   var dc = fc.findClass(MDataset);
   // 如果不存在数据集
   var bs = null;
   if(!dc){
      bs = {
         'fetchButton' : false,
         'searchButton': false,
         'lovButton'   : false,
         'zoomButton'  : false,
         'insertButton': false,
         'copyButton'  : false,
         'updateButton': false,
         'deleteButton': false,
         'splitButton2': false,
         'firstButton' : false,
         'priorButton' : false,
         'nextButton'  : false,
         'lastButton'  : false,
         'actionButton': false};
   }
   // 处理表单的情况
   if(RClass.isClass(dc, FForm)){
      var bl = RClass.isClass(c, MListView) && c.canListView();
      var bz = RClass.isClass(c, MZoom) && c.canZoom();
      // 设置表单信息
      switch(dc._emode){
         case EMode.Insert:
            bs = {
               'fetchButton' : false,
               'searchButton': false,
               'lovButton'   : bl,
               'zoomButton'  : bz,
               'insertButton': false,
               'copyButton'  : false,
               'updateButton': true,
               'deleteButton': false,
               'splitButton2': false,
               'firstButton' : false,
               'priorButton' : false,
               'nextButton'  : false,
               'lastButton'  : false,
               'actionButton': dc.hasAction()};
            break;
         case EMode.Update:
            bs = {
               'fetchButton' : dc.editFetch,
               'searchButton': dc.editSearch,
               'lovButton'   : bl,
               'zoomButton'  : bz,
               'insertButton': false,
               'copyButton'  : false,
               'updateButton': dc.editUpdate,
               'deleteButton': false,
               'splitButton2': false,
               'firstButton' : false,
               'priorButton' : false,
               'nextButton'  : false,
               'lastButton'  : false,
               'actionButton': dc.hasAction()};
            break;
         case EMode.Delete:
            bs = {
               'fetchButton' : false,
               'searchButton': false,
               'lovButton'   : bl,
               'zoomButton'  : bz,
               'insertButton': false,
               'copyButton'  : false,
               'updateButton': true,
               'deleteButton': false,
               'splitButton2': false,
               'firstButton' : false,
               'priorButton' : false,
               'nextButton'  : false,
               'lastButton'  : false,
               'actionButton': dc.hasAction()};
            break;
         default:
        	 bs = {
                 'fetchButton' : false,
                 'searchButton': false,
                 'lovButton'   : bl,
                 'zoomButton'  : bz,
                 'insertButton': false,
                 'copyButton'  : false,
                 'updateButton': true,
                 'deleteButton': false,
                 'splitButton2': false,
                 'firstButton' : false,
                 'priorButton' : false,
                 'nextButton'  : false,
                 'lastButton'  : false,
                 'actionButton': dc.hasAction()};
      }
   }
   // 处理表格的情况
   if(RClass.isClass(dc, FGridControl)){
      // 设置表格信息
      var s = dc.isDataSelected();
      bs = {
         'fetchButton' : true,
         'searchButton': true,
         'lovButton'   : bl,
         'zoomButton'  : bz,
         'splitButton1': true,
         'insertButton': dc.editInsert,
         'copyButton'  : false,
         'updateButton': dc.editUpdate,
         'deleteButton': dc.editDelete && s,
         'splitButton2': true,
         'firstButton' : true,
         'priorButton' : true,
         'nextButton'  : true,
         'lastButton'  : true,
         'actionButton': dc.hasAction()};
   }
   // 设置工具栏状态
   o.toolBar.setEnables(bs);
}

//==========================================================
// <T>判断是否含有有效的表单空间。</T>
//
// @method
//==========================================================
function RFormSpace_hasSpace(){
   return this.historyBar && (null != this.historyBar.currentButton());
}

//==========================================================
// <T>获得首个有效的表单空间。</T>
//
// @method
// @param f:flag:Boolean 强制清空
//==========================================================
function RFormSpace_firstSpace(f){
   var o = this;
   var hb = o.historyBar;
   // 隐藏多余的工作空间
   if(f){
      var c = hb.buttons.count;
      for(var n=0; n<c; n++){
         var b = hb.buttons.get(n);
         if(b.store.space){
            b.store.space.select(false);
            b.setVisible(false);
         }
      }
   }
   // 获得第一个工作空间
   var b = hb.buttons.get(0);
   if(b){
      hb.selectButton(b);
      return b.store.space;
   }
   // 创建第一个工作空间
   return o.createSpace();
}

//==========================================================
//<T>获得上个有效的表单空间。</T>
//
//@method
//@param f:flag:Boolean 强制清空
//==========================================================
function RFormSpace_lastSpace(n){
   var o = this;
   var hb = o.historyBar;
   n = n ? n : 1;
   var b = hb.buttons.get(Math.max((hb.historyIndex - 1 - n),0));
   return b.store.space;
}

//==========================================================
// <T>获得当前的表单空间。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_currentSpace(){
   var o = this;
   var b = o.historyBar.currentButton();
   return b.store.space;
}

//==========================================================
// <T>获得下一个表单空间。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_nextSpace(c){
   var o = this;
   var b = o.historyBar.nextButton(c);
   if(b.store.space){
      return b.store.space;
   }
   return o.createSpace(b);
}

//==========================================================
// <T>返回上一个表单空间。</T>
//
// @method
// @param n:count:Number 返回层数
//==========================================================
function RFormSpace_popupSpace(n){
   var o = this;
   var b = o.historyBar.popup(n);
   var s = b.store.space;
   if(s){
      o.selectSpace(s);
      // 画面显示
      o.lsnsFormShow.process(s);
   }
   return s;
}

//==========================================================
// <T>选择一个表单空间。</T>
//
// @method
// @param s:space:TFormSpace 表单空间对象
//==========================================================
function RFormSpace_selectSpace(s){
   var o = this;
   var ss = o.spaces;
   for(var n=0; n<ss.count; n++){
      var c = ss.get(n);
      if(c != s){
         c.select(false);
      }
   }
   s.select(true);
   // 表单控件的表单获得焦点
   //if(s.form){
   //   o.focusControl(s.form);
   //}
}

//==========================================================
// <T>获得下一个表单空间内的表单。</T>
//
// @method
// @param c:control:FControl 焦点对象
//==========================================================
function RFormSpace_nextForm(fn, m){
   var o = this;
   // 获得当前表单数据
   var r = null;
   var cs = o.currentSpace();
   if(cs.form){
      r = cs.form.getCurrentRow();
   }
   // 获得下个表单
   var s = o.nextSpace();
   var f = s.findForm(fn);
   o.selectSpace(s);
   // 设置基础
   if(!m){
      f.dsValues.append(r);
   }
   return f;
}

//==========================================================
// <T>设置选中表单信息。</T>
//
// @method
//==========================================================
function RFormSpace_selectForm(f){
   var o = this;
   // 设置标题栏
   var t = o.titleBar;
   if(t){
	   if(RClass.isClass(f, FForm)){
	      t.setIcon('logic.common.form');
	   }else if(RClass.isClass(f, FTable)){
	      t.setIcon('logic.common.table');
	   }
	   if(RClass.isMode(ERun.Debug)){
	      t.setCaption(f.label + " <FONT color='green'>( form=" + f.name + ", mode=" + REnum.tryDecode(EMode, f.inMode) + " )</FONT>");
	   }else{
	      t.setCaption(f.label);
	   }
   }
   // 设置焦点
   o.focusControl(f);
   // 发布监听
   o.lsnsFormShow.process(o, f);
}

//==========================================================
// <T>选取当前表单中的数据。</T>
//
// @method
//==========================================================
function RFormSpace_doFetch(){
   if(!this.hasSpace()){
      return;
   }
   this.currentSpace().doFetch();
}

//==========================================================
// <T>搜索当前表单中的数据。</T>
//
// @method
//==========================================================
function RFormSpace_doSearch(){
   if(!this.hasSpace()){
      return;
   }
   this.currentSpace().doSearch();
}

//==========================================================
// <T>复制当前表单中的数据。</T>
//
// @method
//==========================================================
function RFormSpace_doCopy(){
   var o = this;
   if(!this.hasSpace()){
      return;
   }
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

//==========================================================
// <T>弹出当前控件的选取表单。</T>
//
// @method
//==========================================================
function RFormSpace_doLov(){
   if(!this.hasSpace()){
      return;
   }
   this.currentSpace().doLov();
}

//==========================================================
// <T>放大当前控件中的察看表单。</T>
//
// @method
//==========================================================
function RFormSpace_doZoom(z, v){
   var o = this;
   if(!o.hasSpace()){
      return;
   }
   // 隐藏当前工作台
   var sc = o.currentSpace();
   // 获得下个工作台
   if(RClass.dump(z, MZoom) && z.canZoom()){
      // 隐藏当前表单空间
      sc.select(false);
      // 获得下一个表单空间
      var s = o.nextSpace();
      // 获得表单对象
      var f = s.findForm(z.zoomRefer);
      // 获得当前行关联的所有数据，包含父数据对象的
      f.dsValues.clear();
      // 选择空间
      o.selectSpace(s);
      s.setHistoryIcon();
      // 数据开始加载
      f.dsUpdate(v);
   }
}

//==========================================================
// <T>当前表单准备插入数据。</T>
//
// @method
//==========================================================
function RFormSpace_doPrepare(sf){
   var o = this;
   if(!this.hasSpace()){
      return;
   }
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
      if(RClass.isClass(sf.parent, MDataset)){
         sf.parent.toDeepAttributes(s.form.dsValues);
      }
      f.dsValues.append(sf.dsValues);
   }
   f.setVisible(true);
   f.focus();
   // 设置标题信息
   s.setHistoryIcon();
   o.selectSpace(s);
   // 获取数据
   f.dsPrepare();
}

//==========================================================
// <T>当前表单更新数据。</T>
//
// @method
//==========================================================
function RFormSpace_doUpdate(){
   var o = this;
   // 检查参数
   if(!o.hasSpace()){
      return;
   }
   // 获得激活的
   var ds = RConsole.find(FFocusConsole).findClass(MDataset);
   if(ds){
      ds.dsDoUpdate();
   }else{
      RMessage.fatal("Cant't find focus dataset control.");
   }
}

//==========================================================
// <T>当前表单删除数据。</T>
//
// @method
//==========================================================
function RFormSpace_doDelete(){
   var o = this;
   if(!this.hasSpace()){
      return;
   }
   var sc = o.currentSpace();
   // 更新新的表单
   var s = o.nextSpace();
   var ds = RConsole.find(FFocusConsole).findClass(MDataset);
   // 获得操作记录的标识和版本
   var r = ds.getCurrentRow();
   if(!r && RClass.isClass(ds, FTable)){
      return RMessage.fatal(this, null, 'Please select row first.');
   }
   // 获得
   var fn = ds.getFormLink(EFormLink.Form);
   var f = s.findForm(fn);
   f.dsDelete(r.get('ouid'));
   f.setVisible(true);
   f.focus();
   // 追加导航
   s.setHistoryIcon();
   o.selectSpace(s);
}

//==========================================================
// <T>当前表单移动数据位置。</T>
//
// @method
//==========================================================
function RFormSpace_doMovePage(a){
   if(!this.hasSpace()){
      return;
   }
   this.currentSpace().doMovePage(a);
}

//==========================================================
// <T>察看表单详细信息。</T>
//
// @method
//==========================================================
function RFormSpace_doDetail(){
   if(!this.hasSpace()){
      return;
   }
   this.currentSpace().doDetail();
}

//==========================================================
// <T>打印表单数据。</T>
//
// @method
//==========================================================
function RFormSpace_doPrintPdf(){
   var dc = RConsole.find(FFocusConsole).findClass(MDataset);
   if(RClass.isClass(dc, MForm)){
      var formName = dc.getFormLink(EFormLink.Form);
      var uri = top.RContext.context('/public.pdf.wv?do=build&form_name=' + formName);
      RHtml.popup(uri, 800, 600);
   }
}

//==========================================================
// <T>处理操作事件。</T>
//
// @method
//==========================================================
function RFormSpace_doOperateAction(){
   var o = this;
   if(!this.hasSpace()){
      return;
   }
   var w = RConsole.find(FActionConsole).find();
   var ds = RFormSpace.currentSpace().form;
   w.linkForm(ds);
   w.show();
}

//==========================================================
//<T>处理操作事件。</T>
//
//@method
//==========================================================
function   ForceWindow   ()   
{   
    this.r   =   document.documentElement;   
    this.f   =   document.createElement("FORM");   
    this.f.target   =   "_blank";   
    this.f.method   =   "post";   
    this.r.insertBefore(this.f,   this.r.childNodes[0]);   
}     

//==========================================================
//<T>处理操作事件。</T>
//
//@method
//==========================================================
ForceWindow.prototype.pop   =   function   (sUrl)   
{   
    this.f.action   =   sUrl;   
    this.f.submit();   
}

//==========================================================
// <T>迁移页面。</T>
//
// @method
// @param p:page:EResultPage 迁移页面
//==========================================================
function RFormSpace_goPage(rp){
   fmMain.action = top.RContext.context(rp);
   fmMain.submit();
}

//==========================================================
//<T>迁移页面。</T>
//
//@method
//@param p:page:EResultPage 迁移页面
//==========================================================
function RFormSpace_goBlankPage(rp){
   fmMain.target = '_blank';
   fmMain.action = top.RContext.context(rp);
   fmMain.submit();
   //window.force = new ForceWindow(); 
   //window.force.pop(top.RContext.context(rp));
}

//==========================================================
// <T>刷新工作空间。</T>
//
// @method
//==========================================================
function RFormSpace_refresh(){
   this.lsnsFormShow.process();
}

//==========================================================
// <T>释放所有对象。</T>
//
// @method
//==========================================================
function RFormSpace_release(){
   var o = this;
   RConsole.find(FFormConsole).dispose();
}
