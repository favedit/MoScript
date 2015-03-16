//==========================================================
// <T>场景动画属性页面。</T>
//
// @class
// @author maocy
// @history 150316
//==========================================================
function FDsSceneAnimationPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible       = false;
   // @attribute
   o._workspace     = null;
   o._animation         = null;
   o._animationResource = null;
   // @attribute
   o._controlGuid   = null;
   o._controlCode   = null;
   o._controlLabel  = null;
   // @event
   //..........................................................
   o.onBuilded      = FDsSceneAnimationPropertyFrame_onBuilded;
   o.onDataChanged  = FDsSceneAnimationPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct      = FDsSceneAnimationPropertyFrame_construct;
   // @method
   o.loadObject     = FDsSceneAnimationPropertyFrame_loadObject;
   // @method
   o.dispose        = FDsSceneAnimationPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneAnimationPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneAnimationPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   // 关联对象
   o._controlPlayRate.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
// <P>不改变渲染器代码。</P>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneAnimationPropertyFrame_onDataChanged(p){
   var o = this;
   var a = o._animation;
   var r = a.resource();
   var g = r.guid();
   // 获得场景动画资源
   var d = a._display;
   var rd = d.resourceScene();
   var ra = rd.findAnimation(g);
   if(!ra){
      ra = rd.syncAnimation(g);
      ra.setCode(r.code());
      ra.setLabel(r.label());
   }
   // 设置参数
   r.setCode(o._controlCode.get());
   r.setLabel(o._controlLabel.get());
   // 设置参数
   var pr = o._controlPlayRate.get();
   ra.setPlayRate(pr);
   a._playRate = pr;
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param a:animation:FE3rAnimation 动画对象
//==========================================================
function FDsSceneAnimationPropertyFrame_loadObject(s, a){
   var o = this;
   var r = a.resource();
   // 设置属性
   o._animation = a;
   // 获得场景动画资源
   var d = a._display;
   var rd = d.resourceScene();
   var ra = rd.findAnimation(r.guid());
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   // 设置参数
   if(ra){
      o._controlPlayRate.set(ra.playRate());
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneAnimationPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
