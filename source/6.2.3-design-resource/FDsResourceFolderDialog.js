//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceFolderDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'design3d.resource.FolderDialog';
   //..........................................................
   // @attribute
   o._controlParentLabel   = null;
   o._controlLabel         = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsResourceFolderDialog_onBuilded;
   // @event
   o.onConfirmLoad         = FDsResourceFolderDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceFolderDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceFolderDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsResourceFolderDialog_construct;
   // @method
   o.setNodeParentLabel    = FDsResourceFolderDialog_setNodeParentLabel;
   o.setNodeLabel          = FDsResourceFolderDialog_setNodeLabel;
   // @method
   o.dispose               = FDsResourceFolderDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceFolderDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceFolderDialog_onConfirmLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 隐藏窗口
   o.hide();
   // 刷新目录
   var catalog = o._frameSet._catalogContent;
   if(o._parentGuid){
      var node = catalog.findByGuid(o._parentGuid);
      catalog.loadNode(node);
   }else{
      catalog.loadService();
   }
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceFolderDialog_onConfirmClick(event){
   var o = this;
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 加载文件数据
   var label = o._controlLabel.get();
   var connection = RConsole.find(FDrResourceConsole).doFolderCreate(o._parentGuid, null, label);
   connection.addLoadListener(o, o.onConfirmLoad);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceFolderDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceFolderDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>设置父节点标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
function FDsResourceFolderDialog_setNodeParentLabel(label){
   this._controlParentLabel.set(label);
}

//==========================================================
// <T>设置节点标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
function FDsResourceFolderDialog_setNodeLabel(label){
   this._controlLabel.set(label);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceFolderDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
