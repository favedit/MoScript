//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsResourcePreviewToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName             = 'design3d.resource.PreviewToolBar';
   //..........................................................
   // @attribute
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   //..........................................................
   // @event
   o.onBuilded              = FDsResourcePreviewToolBar_onBuilded;
   // @event
   o.onInsertClick          = FDsResourcePreviewToolBar_onInsertClick;
   o.onUpdateClick          = FDsResourcePreviewToolBar_onUpdateClick;
   o.onDeleteClick          = FDsResourcePreviewToolBar_onDeleteClick;
   o.onRotationClick        = FDsResourcePreviewToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct              = FDsResourcePreviewToolBar_construct;
   // @method
   o.dispose                = FDsResourcePreviewToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourcePreviewToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 按键事件关联
   o._controlInsertButton.addClickListener(o, o.onInsertClick);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}

//==========================================================
// <T>新建按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourcePreviewToolBar_onInsertClick(event){
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourcePreviewToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._workspace._previewContent;
   var item = frame._activeItem;
   var url = '/script/design/mesh.html?guid=' + item._guid;
   window.open(url, '_blank', '');
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourcePreviewToolBar_onDeleteClick(event){
}

//==========================================================
// <T>旋转按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsResourcePreviewToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourcePreviewToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourcePreviewToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
