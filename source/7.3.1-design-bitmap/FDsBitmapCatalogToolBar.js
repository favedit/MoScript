//==========================================================
// <T>网格画板工具栏。</T>
//
// @class
// @author maocy
// @history 150404
//==========================================================
function FDsBitmapCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName                 = 'resource.bitmap.CatalogToolBar';
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
   o._controlRotationVisible = null;
   o._controlRotationWidth   = null;
   o._controlRotationHeight  = null;
   o._controlRotationAuto    = null;
   o._controlRotationFlipX   = null;
   o._controlRotationFlipY   = null;
   o._controlRotationFlipZ   = null;
   o._controlRotationX       = null;
   o._controlRotationY       = null;
   o._controlRotationZ       = null;
   // @attribute
   o._controlRotation           = null;
   //..........................................................
   // @event
   o.onBuilded                  = FDsBitmapCatalogToolBar_onBuilded;
   // @event
   o.onModeClick                = FDsBitmapCatalogToolBar_onModeClick;
   o.onSizeClick                = FDsBitmapCatalogToolBar_onSizeClick;
   o.onRotationChange           = FDsBitmapCatalogToolBar_onRotationChange;
   o.onRotationAutoClick        = FDsBitmapCatalogToolBar_onRotationAutoClick;
   o.onRotationClick            = FDsBitmapCatalogToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct                  = FDsBitmapCatalogToolBar_construct;
   // @method
   o.dispose                    = FDsBitmapCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsBitmapCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 关联拖拽事件
   //var control = o._controlDrop;
   //control._canvasModeCd = EDsCanvasMode.Drop;
   //control.addClickListener(o, o.onModeClick);
   //control.check(true);
   //..........................................................
   // 关联按键事件
   //o._controlSize1.addClickListener(o, o.onSizeClick);
   //o._controlSize2.addClickListener(o, o.onSizeClick);
   //o._controlSize3.addClickListener(o, o.onSizeClick);
   //o._controlSize4.addClickListener(o, o.onSizeClick);
   //o._controlSizeWidth.setText('*');
   //o._controlSizeHeight.setText('*');
   //..........................................................
   // 关联按键事件
   //o._controlRotationVisible.addClickListener(o, o.onRotationChange);
   //o._controlRotationVisible.check(true);
   //o._controlRotationWidth.addDataChangedListener(o, o.onRotationChange);
   //o._controlRotationWidth.setText(1);
   //o._controlRotationHeight.addDataChangedListener(o, o.onRotationChange);
   //o._controlRotationHeight.setText(1);
   //o._controlRotationAuto.addClickListener(o, o.onRotationAutoClick);
   //o._controlRotationFlipX.addClickListener(o, o.onRotationAutoClick);
   //o._controlRotationFlipY.addClickListener(o, o.onRotationAutoClick);
   //o._controlRotationX.addClickListener(o, o.onRotationAutoClick);
   //o._controlRotationY.addClickListener(o, o.onRotationAutoClick);
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsBitmapCatalogToolBar_onModeClick(p){
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
function FDsBitmapCatalogToolBar_onSizeClick(event){
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
// <T>坐标系可见性处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsBitmapCatalogToolBar_onRotationChange(event){
   var o = this;
   var canvas = o._frameSet._canvas;
   var visible = o._controlRotationVisible.isCheck();
   var width = RInteger.parse(o._controlRotationWidth.text());
   var height = RInteger.parse(o._controlRotationHeight.text());
   canvas.switchRotation(visible, width, height);
}

//==========================================================
// <T>坐标系自动调整处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsBitmapCatalogToolBar_onRotationAutoClick(event){
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
   o._frameSet._canvas.viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsBitmapCatalogToolBar_onRotationClick(event, v){
   var o = this;
   var button = event.sender;
   var canvas = o._frameSet._canvas;
   canvas.switchRotation(button.isCheck());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsBitmapCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsBitmapCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
