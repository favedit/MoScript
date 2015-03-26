//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceSearchItem(o){
   o = RClass.inherits(this, o, FUiListItem);
   //..........................................................
   // @property
   o._frameName     = 'design3d.resource.TabBar';
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsResourceSearchItem_onBuilded;
   // @event
   o.onSaveClick    = FDsResourceSearchItem_onSaveClick;
   //..........................................................
   // @method
   o.construct      = FDsResourceSearchItem_construct;
   // @method
   o.dispose        = FDsResourceSearchItem_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceSearchItem_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   //o._saveButton.addClickListener(o, o.onSaveClick);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceSearchItem_onSaveClick(p){
   var o = this;
   var space = o._workspace._activeSpace;
   var resource = space.resource();
   // 存储配置
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   // 更新处理
   RConsole.find(FE3sMeshConsole).update(xconfig);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchItem_construct(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchItem_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.dispose.call(o);
}
