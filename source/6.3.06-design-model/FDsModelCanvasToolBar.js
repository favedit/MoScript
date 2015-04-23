//==========================================================
// <T>网格画板工具栏。</T>
//
// @class
// @author maocy
// @history 150404
//==========================================================
function FDsModelCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName                 = 'resource.model.CanvasToolBar';
   //..........................................................
   // @attribute
   o._canvasModeCd              = EDsCanvasMode.Drop;
   // @attribute
   o._controlDrop               = null;
   // @attribute
   o._controlSize1              = null;
   o._controlSize2              = null;
   o._controlSize3              = null;
   o._controlSize4              = null;
   o._controlSizeWidth          = null;
   o._controlSizeHeight         = null;
   // @attribute
   o._controlDimensionalVisible = null;
   o._controlDimensionalWidth   = null;
   o._controlDimensionalHeight  = null;
   o._controlDimensionalAuto    = null;
   o._controlDimensionalFlipX   = null;
   o._controlDimensionalFlipY   = null;
   o._controlDimensionalFlipZ   = null;
   o._controlDimensionalX       = null;
   o._controlDimensionalY       = null;
   o._controlDimensionalZ       = null;
   // @attribute
   o._controlRotation           = null;
   //..........................................................
   // @event
   o.onBuilded                  = FDsModelCanvasToolBar_onBuilded;
   // @event
   o.onModeClick                = FDsModelCanvasToolBar_onModeClick;
   o.onSizeClick                = FDsModelCanvasToolBar_onSizeClick;
   o.onDimensionalChange        = FDsModelCanvasToolBar_onDimensionalChange;
   o.onDimensionalAutoClick     = FDsModelCanvasToolBar_onDimensionalAutoClick;
   o.onRotationClick            = FDsModelCanvasToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct                  = FDsModelCanvasToolBar_construct;
   // @method
   o.dispose                    = FDsModelCanvasToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsModelCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 关联拖拽事件
   var control = o._controlDrop;
   control._canvasModeCd = EDsCanvasMode.Drop;
   control.addClickListener(o, o.onModeClick);
   control.check(true);
   //..........................................................
   // 关联按键事件
   o._controlSize1.addClickListener(o, o.onSizeClick);
   o._controlSize2.addClickListener(o, o.onSizeClick);
   o._controlSize3.addClickListener(o, o.onSizeClick);
   o._controlSize4.addClickListener(o, o.onSizeClick);
   o._controlSizeWidth.setText('*');
   o._controlSizeHeight.setText('*');
   //..........................................................
   // 关联按键事件
   o._controlDimensionalVisible.addClickListener(o, o.onDimensionalChange);
   o._controlDimensionalVisible.check(true);
   o._controlDimensionalWidth.addDataChangedListener(o, o.onDimensionalChange);
   o._controlDimensionalWidth.setText(1);
   o._controlDimensionalHeight.addDataChangedListener(o, o.onDimensionalChange);
   o._controlDimensionalHeight.setText(1);
   o._controlDimensionalAuto.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalFlipX.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalFlipY.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalFlipZ.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalX.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalY.addClickListener(o, o.onDimensionalAutoClick);
   o._controlDimensionalZ.addClickListener(o, o.onDimensionalAutoClick);
   //..........................................................
   // 关联按键事件
   o._controlRotation.addClickListener(o, o.onRotationClick);
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsModelCanvasToolBar_onModeClick(p){
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
function FDsModelCanvasToolBar_onSizeClick(event){
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
   o._frameSet._canvasContent.switchSize(width, height);
}

//==========================================================
// <T>坐标系可见性处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsModelCanvasToolBar_onDimensionalChange(event){
   var o = this;
   var canvas = o._frameSet._canvasContent;
   var visible = o._controlDimensionalVisible.isCheck();
   var width = RInteger.parse(o._controlDimensionalWidth.text());
   var height = RInteger.parse(o._controlDimensionalHeight.text());
   canvas.switchDimensional(visible, width, height);
}

//==========================================================
// <T>坐标系自动调整处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsModelCanvasToolBar_onDimensionalAutoClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var flipX = false;
   var flipY = false;
   var flipZ = false;
   var rotationX = false;
   var rotationY = false;
   var rotationZ = false;
   switch(name){
      case 'dimensionalAuto':
         break;
      case 'dimensionalFlipX':
         flipX = true;
         break;
      case 'dimensionalFlipY':
         flipY = true;
         break;
      case 'dimensionalFlipZ':
         flipZ = true;
         break;
      case 'dimensionalX':
         rotationX = true;
         break;
      case 'dimensionalY':
         rotationY = true;
         break;
      case 'dimensionalZ':
         rotationZ = true;
         break;
      default:
         throw new TError(o, 'Unknown command.');
   }
   o._frameSet._canvasContent.viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsModelCanvasToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvasContent;
   canvas.switchRotation(button.isCheck());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsModelCanvasToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsModelCanvasToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
