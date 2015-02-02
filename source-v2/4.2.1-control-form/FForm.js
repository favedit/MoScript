//==========================================================
// <T>表单控件。</T>
//
// @class
// @author maocy
// @version 150122
//==========================================================
function FUiForm(o){
   //o = RClass.inherits(this, o, FUiLayout, MForm, MDisplayAble, MValue, MAction);
   //o = RClass.inherits(this, o, FUiLayout, MFocus, MDataset);
   o = RClass.inherits(this, o, FUiLayout, MDataset);
   //..........................................................
   // @event
   o.onMouseDown        = FUiForm_onMouseDown;
   //..........................................................
   // @method
   o.construct          = FUiForm_construct;
   // @method
   o.buildDefine        = FUiForm_buildDefine;





   //..........................................................
   // @attribute
   o._dataStatusCd      = ERowStatus.Update;
   o._clearEvent        = null;
   o._resetEvent        = null;
   o._loadEvent         = null;
   o._saveEvent         = null;
   o._recordEvent       = null;
   o._codeEvent         = null;
   /// @attribute TMap<String, FComponent> 按照数据名称存储的数据组件集合
   o._dataComponents    = null;
   //..........................................................
   // Listener
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   //..........................................................
   // @event
   o.onLoadDataset      = FUiForm_onLoadDataset;
   o.onLoadDatasetEnd   = FUiForm_onLoadDatasetEnd;
   //..........................................................
   // @method
   o.isDataChanged      = FUiForm_isDataChanged;
   o.getFormLink        = FUiForm_getFormLink;
   o.allDataComponents  = FUiForm_allDataComponents;
   o.get                = FUiForm_get;
   o.reget              = FUiForm_reget;
   o.set                = FUiForm_set;
   o.getDataCodes       = FUiForm_getDataCodes;
   o.getCurrentRow      = FUiForm_getCurrentRow;
   o.getSelectedRows    = FUiForm_getSelectedRows;
   o.getCurrentRows     = FUiForm_getCurrentRows;
   o.getChangedRows     = FUiForm_getChangedRows;
   o.getRows            = FUiForm_getRows;
   o.clearValue         = FUiForm_clearValue;
   o.resetValue         = FUiForm_resetValue;
   o.loadValue          = FUiForm_loadValue;
   o.saveValue          = FUiForm_saveValue;
   o.recordValue        = FUiForm_recordValue;
   o.toAttributes       = FUiForm_toAttributes;
   o.focus              = FUiForm_focus;
   o.dsUpdate           = FUiForm_dsUpdate;
   o.doPrepare          = FUiForm_doPrepare;
   o.doUpdate           = FUiForm_doUpdate;
   o.doDelete           = FUiForm_doDelete;
   o.dispose            = FUiForm_dispose;




   /// @attribute TMap<String, FComponent> 按照控件名称存储的数据组件集合
   //o._nameComponents    = null;
   //----------------------------------------------------------
   // Method
   //o.allNameComponents  = FUiForm_allNameComponents;
   // Attribute
   //o.isLoading          = false;
   // Event
   //o.onLoaded           = FUiForm_onLoaded;
   //o.onDsFetchEnd       = FUiForm_onDsFetchEnd;
   //o.onDsUpdateBegin    = FUiForm_onDsUpdateBegin;
   //o.onDsUpdateEnd      = FUiForm_onDsUpdateEnd;
   //o.onLoadValue        = RMethod.empty;
   //o.onSaveValue        = RMethod.empty;
   //o.connect            = FUiForm_connect;
   //o.loadDocument       = FUiForm_loadDocument;
   //o.testStatus         = FUiForm_testStatus;
   //o.hasAction          = FUiForm_hasAction;
   //o.setEditable        = FUiForm_setEditable;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
function FUiForm_onMouseDown(p){
   var o = this;
   //var fc = RConsole.find(FFocusConsole);
   //fc.focusClass(MDataset, o);
   //fc.focusHtml(he);
   //if(!RConsole.find(FDesignConsole).isDesign()){
   //   he.cancelBubble = true;
   //}
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FUiForm_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   //o.__base.MDataset.construct.call(o);
   // 建立监听器
   //o.lsnsLoaded = new TListeners();
   //o.lsnsClick = new TListeners();
   // 建立处理器
   //o._clearEvent = new TEventProcess(o, 'oeClearValue', MEditValue);
   //o._resetEvent = new TEventProcess(o, 'oeResetValue', MEditValue);
   //o._loadEvent = new TEventProcess(o, 'oeLoadValue', MEditValue);
   //o._saveEvent = new TEventProcess(o, 'oeSaveValue', MEditValue);
   //o._recordEvent = new TEventProcess(o, 'oeRecordValue', MEditValue);
   //o._codeEvent = new TEventProcess(o, 'oeSaveCode', MEditDescriptor);
   //o._dataComponents = new TMap();
}

//==========================================================
// <T>从配置信息中构建构造页面。</T>
//
// @method
// @param p:frameName:String 页面名称
// @param p:hDocument:HtmlTag 页面元素
//==========================================================
function FUiForm_buildDefine(n, p){
   var o = this;
   // 获取页面定义
   var x = RConsole.find(FDescribeFrameConsole).load(n);
   RControl.build(o, x, null, p);
}















//==========================================================
// <T>加载数据集数据到自己内部。</T>
//
// @method
// @param ds:dataset:TDataset 数据集
//==========================================================
function FUiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}

//==========================================================
// <T>数据加载完成操作。</T>
//
// @method
//==========================================================
function FUiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}

//==========================================================
// <T>检查当前表内的所有数据是否变化过。</T>
//
// @method
// @return Boolean
//    <L value='true'>变化过</L>
//    <L value='false'>未变化</L>
//==========================================================
function FUiForm_isDataChanged(){
   var o = this;
   var ps = o.allDataComponents();
   if(!ps.isEmpty()){
      var pc = ps.count;
      for(var n=0; n<pc; n++){
         var p = ps.value(n);
         if(p.isDataChanged()){
            return true;
         }
      }
   }
}

//==========================================================
// <T>获得表单关联表单的名称。</T>
//
// @event
// @param t:type:EFormLink 关联类型
//==========================================================
function FUiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}

//==========================================================
// <T>获得当前表单内所有数据对象的集合。</T>
//
// @event
// @param p:component:FComponent 当前组件
// @param m:map:TMap 要存储的数据集
//==========================================================
function FUiForm_allDataComponents(p, m){
   var o = this;
   // 检查数据参数
   if(!p){
      p = o;
   }
   if(!m){
      m = o._dataComponents;
   }
   // 递归处理所有子对象
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FUiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得最新数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FUiForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}

//==========================================================
// <T>根据字段名称，向单元格对象中设置数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @param v:value:String 数据内容
//==========================================================
function FUiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}

//==========================================================
// <T>获得当前操作的数据代码定义。</T>
//
// @method
// @return TRow 数据行
//==========================================================
function FUiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}

//==========================================================
// <T>获得当前操作的数据行。</T>
//
// @method
// @return TRow 数据行
//==========================================================
function FUiForm_getCurrentRow(){
   return this.saveValue();
}

//==========================================================
// <T>获得所有选中的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
function FUiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}

//==========================================================
// <T>获得所有的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
function FUiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}

//==========================================================
// <T>获得所有变更过的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
function FUiForm_getChangedRows(){
   var o = this;
   var ls = new TList();
   if(o.isDataChanged()){
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
   }
   return ls;
}

//==========================================================
// <T>获得修改过的数据集合。</T>
//
// @event
// @param d:dataset:TDataset 数据集
// @return TDataset 数据集
//==========================================================
function FUiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}

//==========================================================
// <T>清空数据。</T>
//
// @event
//==========================================================
function FUiForm_clearValue(){
   this.process(this._clearEvent);
}

//==========================================================
// <T>重置默认数据。</T>
//
// @event
//==========================================================
function FUiForm_resetValue(){
   this.process(this._resetEvent);
}

//==========================================================
// <T>加载数据对象到到画面各个控件中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
function FUiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}

//==========================================================
// <T>从画面各个控件存储数据到存储数据中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
function FUiForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   // 存储数据内容
   var e = o._saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   // 设置数据状态
   r.set('_status', o._dataStatusCd);
   return r;
}

//==========================================================
// <T>从画面各个控件存储数据到存储数据中。</T>
//
// @event
//==========================================================
function FUiForm_recordValue(){
   this.process(this._recordEvent);
}

//==========================================================
// <T>从画面各个控件存储数据到属性对象中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
function FUiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}

//==========================================================
// <T>设置当前表单的焦点。</T>
//
// @method
//==========================================================
function FUiForm_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}

//==========================================================
// <T>切换到数据更新状态，获取数据信息。</T>
//
// @method
// @param u:ouid:String 唯一标识
// @param v:over:String 行记录的版本
//==========================================================
function FUiForm_dsUpdate(u, v){
   var o = this;
   // 获取单条数据模式
   if(u){
      //var dc = r.table;
      // 设置加载中
      o.psProgress(true);
      //top.RWindow.setEnable(false);
      // 设置工作模式为新建记录
      o.psMode(EMode.Update);
      // 异步获得初始化数据
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0);
      g.form = o;
      g.reset = true;
      o.dsSearchs.clear();
      if(u){
         o.dsSearchs.push(new TSearchItem('OUID', u));
      }
      if(v){
         o.dsSearchs.push(new TSearchItem('OVER', v));
      }
      g.searchs = o.dsSearchs;
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsUpdate);
      // 更新处理
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }
   // 查询数据模式
   return o.__base.MDataset.dsUpdate.call(o, u, v)
}

//==========================================================
//<T>切换到数据更新状态，获取数据信息。</T>
//
//@method
//@param u:ouid:String 唯一标识
//@param v:over:String 行记录的版本
//==========================================================
function FUiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}

//==========================================================
// <T>切换当前状态为新建状态，加载初始化数据。</T>
//
// @method
// @param v:values:TAttributes 属性对象
//==========================================================
function FUiForm_doPrepare(v){
   var o = this;
   // 设置数据状态
   o._dataStatusCd = ERowStatus.Insert;
   // 使用默认值重置数据
   o.resetValue();
   // 加载数据
   o.loadValue(v);
   // 记录为原始数据
   o.recordValue();
   // 响应加载事件
   o.dsLoaded();
}

//==========================================================
// <T>切换当前状态为更新状态，加载初始化数据。</T>
//
// @method
// @param v:values:TAttributes 属性对象
//==========================================================
function FUiForm_doUpdate(v){
   var o = this;
   // 设置数据状态
   o._dataStatusCd = ERowStatus.Update;
   // 清空数据
   o.clearValue();
   // 加载数据
   o.loadValue(v);
   // 记录为原始数据
   o.recordValue();
   // 响应加载事件
   o.dsLoaded();
}

//==========================================================
// <T>切换当前状态为删除状态，加载初始化数据。</T>
//
// @method
// @param v:values:TAttributes 属性对象
//==========================================================
function FUiForm_doDelete(v){
   var o = this;
   // 设置数据状态
   o._dataStatusCd = ERowStatus.Delete;
   // 清空数据
   o.clearValue();
   // 加载数据
   o.loadValue(v);
   // 记录为原始数据
   o.recordValue();
   // 响应加载事件
   o.dsLoaded();
}

//==========================================================
// <T>释放所有对象。</T>
//
// @method
//==========================================================
function FUiForm_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}




























//==========================================================
// <T>获得当前表单内所有数据对象的集合。</T>
//
// @event
// @param f:force:Boolean
//    <L value='true'>强制重取</L>
//    <L value='false'>可利用缓冲</L>
// @param p:component:FComponent 当前组件
// @param m:map:TMap 要存储的数据集
//==========================================================
function FUiForm_allNameComponents(f, p, m){
   var o = this;
   var vs = o._nameComponents;
   // 使用缓冲的集合
   if(!f && vs){
      return vs;
   }
   // 检查缓冲集合
   if(!vs){
      vs = o._nameComponents = new TMap();
   }
   // 如果强制获取数据时
   if(f){
      vs.clear();
   }
   // 设置缓冲集合
   if(!p){
      p = this;
   }
   // 设置缓冲集合
   if(!m){
      m = vs;
   }
   // 递归处理所有子对象
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
// ------------------------------------------------------------
function FUiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
// ------------------------------------------------------------
function FUiForm_onDsFetchEnd(){
   var o = this;
   // 从当前行记录读取数据内容
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
// ------------------------------------------------------------
function FUiForm_onDsUpdateBegin(){
   var o = this;
   // 将数据内容保存回当前行记录
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
// ------------------------------------------------------------
function FUiForm_onDsUpdateEnd(){
   var o = this;
   // 从当前行记录读取数据内容
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
// ------------------------------------------------------------
function FUiForm_connect(service, type, action, attrs){
   // Build send info
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('name', this.name);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   // Build xml connection
   var event = new TEvent(this, EXmlEvent.Send);
   event.url = service;
   event.document = doc;
   event.form = this;
   event.onLoad = this.onLoaded;
   RConsole.find(FXmlConsole).process(event);
}
// ------------------------------------------------------------
function FUiForm_loadDocument(doc){
   if(doc){
      var root = doc.root();
      if(root.isName('Table')){
         var o = this;
         o.loadConfig(root);
         o.buildColumns(root);
         o.buildRows(root);
      }
   }
}
// ------------------------------------------------------------
function FUiForm_testStatus(t){
   var o = this;
   var r = o.__base.MDataset.testStatus.call(o, t);
   if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Search== t){
      return true;
   }else if(EDataAction.First == t){
      return false;
   }else if(EDataAction.Prior == t){
      return false;
   }else if(EDataAction.Next == t){
      return false;
   }else if(EDataAction.Last == t){
      return false;
   }else if(EDataAction.Action == t){
      return true;
   }
   return r;
}
// ------------------------------------------------------------
function FUiForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
// ------------------------------------------------------------
