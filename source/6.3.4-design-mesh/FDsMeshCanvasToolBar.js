//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsMeshCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName       = 'design3d.mesh.CanvasToolBar';
   //..........................................................
   // @attribute
   o._canvasModeCd    = EDsCanvasMode.Drop;
   // @attribute
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   //..........................................................
   // @event
   o.onBuilded        = FDsMeshCanvasToolBar_onBuilded;
   // @event
   o.onModeClick      = FDsMeshCanvasToolBar_onModeClick;
   o.onSizeClick      = FDsMeshCanvasToolBar_onSizeClick;
   o.onRotationClick  = FDsMeshCanvasToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct        = FDsMeshCanvasToolBar_construct;
   // @method
   o.dispose          = FDsMeshCanvasToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMeshCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 建立拖拽按键
   var control = o._controlDrop;
   control._canvasModeCd = EDsCanvasMode.Drop;
   control.addClickListener(o, o.onModeClick);
   control.check(true);
   //..........................................................
   // 建立按键
   o._controlView.addClickListener(o, o.onRotationClick);
   //..........................................................
   o._controlSize1.addClickListener(o, o.onSizeClick);
   o._controlSize2.addClickListener(o, o.onSizeClick);
   o._controlSize3.addClickListener(o, o.onSizeClick);
   o._controlSize4.addClickListener(o, o.onSizeClick);
   o._controlSizeWidth.setText('*');
   o._controlSizeHeight.setText('*');
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshCanvasToolBar_onModeClick(p){
   var o = this;
   //o._canvasModeCd = p._canvasModeCd;
   //o._workspace._canvas.switchMode(p._canvasModeCd);
}

//==========================================================
// <T>尺寸选择。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMeshCanvasToolBar_onSizeClick(event){
   var o = this;
   var button = event.sender;
   // 解析尺寸
   var width = '*';
   var height = '*';
   var name = button.name();
   var label = button.label();
   if(name != 'sizeAuto'){
      var size = label.split('x');
      width = parseInt(size[0]);
      height = parseInt(size[1]);
   }
   o._controlSizeWidth.setText(width);
   o._controlSizeHeight.setText(height);
   // 设置大小
   o._frameSet._canvas.switchSize(width, height);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshCanvasToolBar_onRotationClick(p, v){
   //var o = this;
   //var c = o._workspace._canvas;
   //c.switchRotation(v);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMeshCanvasToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshCanvasToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
