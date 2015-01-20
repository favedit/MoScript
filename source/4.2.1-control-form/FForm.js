//==========================================================
// <T>表单对象的类。</T>
//
// @class FLayout, MForm, MDisplayAble, MValue, MDataset, MAction
// @param o:object:Object 继承父对象
// @history 091012 MAOCY 创建
//==========================================================
function FForm(o){
   o = RClass.inherits(this, o, FLayout, MFocus, MForm, MDisplayAble, MValue, MDataset, MAction);
   //..........................................................
   o.__status           = ERowStatus.Update;
   o.__clearEvent       = null;
   o.__resetEvent       = null;
   o.__loadEvent        = null;
   o.__saveEvent        = null;
   o.__recordEvent      = null;
   o.__codeEvent        = null;
   /// @attribute TMap<String, FComponent> 按照数据名称存储的数据组件集合
   o.__dataComponents   = null;
   //..........................................................
   // Listener
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   //..........................................................
   // @event
   o.onMouseDown        = FForm_onMouseDown;
   o.onLoadDataset      = FForm_onLoadDataset;
   o.onLoadDatasetEnd   = FForm_onLoadDatasetEnd;
   //..........................................................
   // @method
   o.construct          = FForm_construct;
   o.isDataChanged      = FForm_isDataChanged;
   o.getFormLink        = FForm_getFormLink;
   o.allDataComponents  = FForm_allDataComponents;
   o.get                = FForm_get;
   o.reget              = FForm_reget;
   o.set                = FForm_set;
   o.getDataCodes       = FForm_getDataCodes;
   o.getCurrentRow      = FForm_getCurrentRow;
   o.getSelectedRows    = FForm_getSelectedRows;
   o.getCurrentRows     = FForm_getCurrentRows;
   o.getChangedRows     = FForm_getChangedRows;
   o.getRows            = FForm_getRows;
   o.clearValue         = FForm_clearValue;
   o.resetValue         = FForm_resetValue;
   o.loadValue          = FForm_loadValue;
   o.saveValue          = FForm_saveValue;
   o.recordValue        = FForm_recordValue;
   o.toAttributes       = FForm_toAttributes;
   o.focus              = FForm_focus;
   o.dsUpdate           = FForm_dsUpdate;
   o.doPrepare          = FForm_doPrepare;
   o.doUpdate           = FForm_doUpdate;
   o.doDelete           = FForm_doDelete;
   o.dispose            = FForm_dispose;






   /// @attribute TMap<String, FComponent> 按照控件名称存储的数据组件集合
   o._nameComponents    = null;
   //----------------------------------------------------------
   // Method
   o.allNameComponents  = FForm_allNameComponents;
   // Attribute
   o.isLoading          = false;
   // Event
   o.onLoaded           = FForm_onLoaded;
   o.onDsFetchEnd       = FForm_onDsFetchEnd;
   o.onDsUpdateBegin    = FForm_onDsUpdateBegin;
   o.onDsUpdateEnd      = FForm_onDsUpdateEnd;
   o.onLoadValue        = RMethod.empty;
   o.onSaveValue        = RMethod.empty;
   o.connect            = FForm_connect;
   o.loadDocument       = FForm_loadDocument;
   o.testStatus         = FForm_testStatus;
   o.hasAction          = FForm_hasAction;
   o.setEditable        = FForm_setEditable;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FForm_onMouseDown(e, he){
   var o = this;
   var fc = RConsole.find(FFocusConsole);
   fc.focusClass(MDataset, o);
   fc.focusHtml(he);
   if(!RConsole.find(FDesignConsole).isDesign()){
      he.cancelBubble = true;
   }
}

//==========================================================
// <T>加载数据集数据到自己内部。</T>
//
// @method
// @param ds:dataset:TDataset 数据集
//==========================================================
function FForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}

//==========================================================
// <T>数据加载完成操作。</T>
//
// @method
//==========================================================
function FForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FForm_construct(){
   var o = this;
   o.base.FLayout.construct.call(o);
   o.base.MDataset.construct.call(o);
   // 建立监听器
   o.lsnsLoaded = new TListeners();
   o.lsnsClick = new TListeners();
   // 建立处理器
   o.__clearEvent = new TEventProcess(o, 'oeClearValue', MEditValue);
   o.__resetEvent = new TEventProcess(o, 'oeResetValue', MEditValue);
   o.__loadEvent = new TEventProcess(o, 'oeLoadValue', MEditValue);
   o.__saveEvent = new TEventProcess(o, 'oeSaveValue', MEditValue);
   o.__recordEvent = new TEventProcess(o, 'oeRecordValue', MEditValue);
   o.__codeEvent = new TEventProcess(o, 'oeSaveCode', MEditDescriptor);
   o.__dataComponents = new TMap();
}

//==========================================================
// <T>检查当前表内的所有数据是否变化过。</T>
//
// @method
// @return Boolean
//    <L value='true'>变化过</L>
//    <L value='false'>未变化</L>
//==========================================================
function FForm_isDataChanged(){
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
function FForm_getFormLink(t){
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
function FForm_allDataComponents(p, m){
   var o = this;
   // 检查数据参数
   if(!p){
      p = o;
   }
   if(!m){
      m = o.__dataComponents;
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
function FForm_get(n){
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
function FForm_reget(n){
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
function FForm_set(n, v){
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
function FForm_getDataCodes(){
   var o = this;
   var e = o.__codeEvent;
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
function FForm_getCurrentRow(){
   return this.saveValue();
}

//==========================================================
// <T>获得所有选中的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
function FForm_getSelectedRows(){
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
function FForm_getCurrentRows(){
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
function FForm_getChangedRows(){
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
function FForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}

//==========================================================
// <T>清空数据。</T>
//
// @event
//==========================================================
function FForm_clearValue(){
   this.process(this.__clearEvent);
}

//==========================================================
// <T>重置默认数据。</T>
//
// @event
//==========================================================
function FForm_resetValue(){
   this.process(this.__resetEvent);
}

//==========================================================
// <T>加载数据对象到到画面各个控件中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
function FForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o.__loadEvent;
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
function FForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   // 存储数据内容
   var e = o.__saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   // 设置数据状态
   r.set('_status', o.__status);
   return r;
}

//==========================================================
// <T>从画面各个控件存储数据到存储数据中。</T>
//
// @event
//==========================================================
function FForm_recordValue(){
   this.process(this.__recordEvent);
}

//==========================================================
// <T>从画面各个控件存储数据到属性对象中。</T>
//
// @event
// @param r:row:TRow 行对象
// @param m:mode:EStore 存储模式
//==========================================================
function FForm_toAttributes(r, m){
   return this.saveValue(r, m);
}

//==========================================================
// <T>设置当前表单的焦点。</T>
//
// @method
//==========================================================
function FForm_focus(){
   var o = this;
   o.base.MFocus.focus.call(o);
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
function FForm_dsUpdate(u, v){
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
   return o.base.MDataset.dsUpdate.call(o, u, v)
}

//==========================================================
//<T>切换到数据更新状态，获取数据信息。</T>
//
//@method
//@param u:ouid:String 唯一标识
//@param v:over:String 行记录的版本
//==========================================================
function FForm_setEditable(v){
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
function FForm_doPrepare(v){
   var o = this;
   // 设置数据状态
   o.__status = ERowStatus.Insert;
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
function FForm_doUpdate(v){
   var o = this;
   // 设置数据状态
   o.__status = ERowStatus.Update;
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
function FForm_doDelete(v){
   var o = this;
   // 设置数据状态
   o.__status = ERowStatus.Delete;
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
function FForm_dispose(){
   var o = this;
   o.base.FLayout.dispose.call(o);
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
function FForm_allNameComponents(f, p, m){
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
function FForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
// ------------------------------------------------------------
function FForm_onDsFetchEnd(){
   var o = this;
   // 从当前行记录读取数据内容
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
// ------------------------------------------------------------
function FForm_onDsUpdateBegin(){
   var o = this;
   // 将数据内容保存回当前行记录
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
// ------------------------------------------------------------
function FForm_onDsUpdateEnd(){
   var o = this;
   // 从当前行记录读取数据内容
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
// ------------------------------------------------------------
function FForm_connect(service, type, action, attrs){
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
function FForm_loadDocument(doc){
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
function FForm_testStatus(t){
   var o = this;
   var r = o.base.MDataset.testStatus.call(o, t);
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
function FForm_hasAction(){
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
