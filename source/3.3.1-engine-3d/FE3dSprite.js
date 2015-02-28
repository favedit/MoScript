//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dSprite(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context    = null;
   o._visible    = true;
   //..........................................................
   // @method
   o.linkContext = FE3dSprite_linkContext;
   o.testVisible = FE3dSprite_testVisible;
   return o;
}

//==========================================================
// <T>关联环境。</T>
//
// @param p:context:FRenderContext 环境
//==========================================================
function FE3dSprite_linkContext(p){
   this._context = p;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @return Boolean 是否可见
//==========================================================
function FE3dSprite_testVisible(p){
   return this._visible;
}
