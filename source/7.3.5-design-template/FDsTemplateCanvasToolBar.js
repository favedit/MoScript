//==========================================================
// <T>画板菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @attribute
   o._refreshButton  = null;
   o._saveButton     = null;
   o._canvasModeCd   = EDsCanvasMode.Drop;
   //..........................................................
   // @event
   o.onBuild         = FDsTemplateCanvasToolBar_onBuild;
   // @event
   o.onModeClick     = FDsTemplateCanvasToolBar_onModeClick;
   o.onLookClick     = FDsTemplateCanvasToolBar_onLookClick;
   o.onRotationClick = FDsTemplateCanvasToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct       = FDsTemplateCanvasToolBar_construct;
   // @method
   o.dispose         = FDsTemplateCanvasToolBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateCanvasToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   //..........................................................
   // 建立拖拽按键
   var b = o._dropButton = RClass.create(FUiToolButtonCheck);
   b.setName('dropButton');
   b.setIcon('design3d.canvas.hand');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Drop;
   b.addClickListener(o, o.onModeClick);
   b.check(true);
   o.push(b);
   // 建立选择按键
   var b = o._selectButton = RClass.create(FUiToolButtonCheck);
   b.setName('selectButton');
   b.setIcon('design3d.canvas.pointer');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Select;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   // 建立分割
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   //..........................................................
   // 建立按键
   var b = o._translateButton  = RClass.create(FUiToolButtonCheck);
   b.setName('translateButton');
   b.setIcon('design3d.canvas.translate');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Translate;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   // 建立按键
   var b = o._rotationButton  = RClass.create(FUiToolButtonCheck);
   b.setName('rotationButton');
   b.setIcon('design3d.canvas.rotation');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Rotation;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   // 建立按键
   var b = o._scaleButton  = RClass.create(FUiToolButtonCheck);
   b.setName('scaleButton');
   b.setIcon('design3d.canvas.scale');
   b.setGroupName('mode');
   b.setGroupDefault('dropButton');
   b.build(p);
   b._canvasModeCd = EDsCanvasMode.Scale;
   b.addClickListener(o, o.onModeClick);
   o.push(b);
   // 建立分割
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   //..........................................................
   // 建立按键
   var b = o._lookFrontButton = RClass.create(FUiToolButton);
   b.setName('lookFrontButton');
   b.setLabel('前');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   // 建立按键
   var b = o._lookUpButton = RClass.create(FUiToolButton);
   b.setName('lookUpButton');
   b.setLabel('上');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   // 建立按键
   var b = o._lookLeftButton = RClass.create(FUiToolButton);
   b.setName('lookLeftButton');
   b.setLabel('左');
   b.build(p);
   b.addClickListener(o, o.onLookClick);
   o.push(b);
   // 建立分割
   var b = RClass.create(FUiToolButtonSplit);
   b.build(p);
   o.push(b);
   //..........................................................
   // 建立按键
   var b = o._playButton  = RClass.create(FUiToolButtonCheck);
   b.setName('_playButton');
   b.setLabel('播放');
   b.setIcon('design3d.tools.play');
   b.build(p);
   b.addClickListener(o, o.onRotationClick);
   o.push(b);
   // 建立按键
   var b = o._viewButton  = RClass.create(FUiToolButtonCheck);
   b.setName('_viewButton');
   b.setLabel('旋转');
   b.setIcon('design3d.tools.rotation');
   b.build(p);
   b.addClickListener(o, o.onRotationClick);
   o.push(b);
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._frameSet._canvas;
   c._rotationAble = v;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvasToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvasToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
