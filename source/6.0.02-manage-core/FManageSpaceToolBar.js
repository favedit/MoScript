//==========================================================
// <T>资源目录工具栏。</T>
//
// @class
// @author maocy
// @history 150409
//==========================================================
MO.FManageSpaceToolBar = function FManageSpaceToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   //..........................................................
   // @property
   o._frameName     = 'manage.logic.SpaceToolBar';
   //..........................................................
   // @event
   o.onInsertClick  = MO.FManageSpaceToolBar_onInsertClick;
   o.onUpdateClick  = MO.FManageSpaceToolBar_onUpdateClick;
   o.onDeleteClick  = MO.FManageSpaceToolBar_onDeleteClick;
   o.onSearchClick  = MO.FManageSpaceToolBar_onSearchClick;
   // @event
   o.onBuilded      = MO.FManageSpaceToolBar_onBuilded;
   //..........................................................
   // @method
   o.construct      = MO.FManageSpaceToolBar_construct;
   // @method
   o.dispose        = MO.FManageSpaceToolBar_dispose;
   return o;
}

//==========================================================
// <T>搜索按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageSpaceToolBar_onInsertClick = function FManageSpaceToolBar_onInsertClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      // 显示子项页面
      var itemFrameName = frame.itemFrameName();
      MO.Assert.debugNotEmpty(itemFrameName);
      var itemFrame = o._frameSet.selectSpaceFrame(itemFrameName);
      itemFrame.doPrepare();
   }
}

//==========================================================
// <T>刷新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageSpaceToolBar_onUpdateClick = function FManageSpaceToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   frame.doSave();
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageSpaceToolBar_onDeleteClick = function FManageSpaceToolBar_onDeleteClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   frame.doDelete();
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FManageSpaceToolBar_onBuilded = function FManageSpaceToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlInsert.addClickListener(o, o.onInsertClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageSpaceToolBar_construct = function FManageSpaceToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageSpaceToolBar_dispose = function FManageSpaceToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiToolBar.dispose.call(o);
}
