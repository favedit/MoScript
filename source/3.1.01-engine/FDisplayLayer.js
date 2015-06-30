//==========================================================
// <T>显示对象层。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FDisplayLayer = function FDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   //..........................................................
   // @attribute
   o._optionClearDepth   = MO.Class.register(o, new MO.AGetSet('_optionClearDepth'), false);
   o._statusActive       = false;
   o._technique          = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._visibleRenderables = MO.Class.register(o, new MO.AGetter('_visibleRenderables'));
   //..........................................................
   // @method
   o.construct           = MO.FDisplayLayer_construct;
   // @method
   o.selectTechnique     = MO.FDisplayLayer_selectTechnique;
   // @method
   o.filterRenderables   = MO.FDisplayLayer_filterRenderables;
   // @method
   o.active              = MO.FDisplayLayer_active;
   o.deactive            = MO.FDisplayLayer_deactive;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
MO.FDisplayLayer_construct = function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   // 设置参数
   o._visibleRenderables = new MO.TObjects();
}

//==========================================================
// <T>选择渲染技术。</T>
//
// @method
// @param context:FG3dContext 渲染环境
// @param name:String 名称
//==========================================================
MO.FDisplayLayer_selectTechnique = function FDisplayLayer_selectTechnique(context, name){
   var technique = MO.Console.find(MO.FG3dTechniqueConsole).find(context, name);
   this.selectTechnique(technique);
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param p:region:FRegion 渲染区域
//==========================================================
MO.FDisplayLayer_filterRenderables = function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   // 复制可见列表
   o._visibleRenderables.assign(p.renderables());
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FDisplayLayer_active = function FDisplayLayer_active(){
   this._statusActive = true;
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FDisplayLayer_deactive = function FDisplayLayer_deactive(){
   this._statusActive = false;
}
