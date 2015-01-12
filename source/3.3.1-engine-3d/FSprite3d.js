//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FSprite3d(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context    = null;
   o._visible    = true;
   //..........................................................
   // @method
   o.linkContext = FSprite3d_linkContext;
   o.testVisible = FSprite3d_testVisible;
   return o;
}

//==========================================================
// <T>关联环境。</T>
//
// @param p:context:FRenderContext 环境
//==========================================================
function FSprite3d_linkContext(p){
   this._context = p;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @return Boolean 是否可见
//==========================================================
function FSprite3d_testVisible(p){
   return this._visible;
}
