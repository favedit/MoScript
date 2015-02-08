//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dRenderable(o){
   o = RClass.inherits(this, o, FGraphicRenderable);
   //..........................................................
   // @attribute
   o._currentMatrix  = null;
   o._matrix         = null;
   // @attribute
   o._effectName     = null;
   o._materialName   = null;
   o._material       = null;
   // @attribute
   o._activeEffect   = null;
   o._effects        = null;
   //..........................................................
   // @method
   o.construct       = FG3dRenderable_construct;
   // @method
   o.currentMatrix   = FG3dRenderable_currentMatrix;
   o.matrix          = FG3dRenderable_matrix;
   o.effectName      = FG3dRenderable_effectName;
   o.material        = FG3dRenderable_material;
   // @method
   o.activeEffect    = FG3dRenderable_activeEffect;
   o.setActiveEffect = FG3dRenderable_setActiveEffect;
   o.effects         = FG3dRenderable_effects;
   // @method
   o.testVisible     = RMethod.virtual(o, 'testVisible');
   // @method
   o.update          = FG3dRenderable_update;
   // @method
   o.dispose         = FG3dRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dRenderable_construct(){
   var o = this;
   o.__base.FGraphicRenderable.construct.call(o);
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}

//==========================================================
// <T>获得当前矩阵。</T>
//
// @method
// @return 当前矩阵
//==========================================================
function FG3dRenderable_currentMatrix(){
   return this._currentMatrix;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return 矩阵
//==========================================================
function FG3dRenderable_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得效果器名称。</T>
//
// @method
// @return String 效果器名称
//==========================================================
function FG3dRenderable_effectName(){
   return this._effectName;
}

//==========================================================
// <T>获得激活效果器。</T>
//
// @method
// @return FG3dEffect 效果器
//==========================================================
function FG3dRenderable_activeEffect(){
   return this._activeEffect;
}

//==========================================================
// <T>设置激活效果器。</T>
//
// @method
// @param p:effect:FG3dEffect 效果器
//==========================================================
function FG3dRenderable_setActiveEffect(p){
   this._activeEffect = p;
}

//==========================================================
// <T>获得效果器字典。</T>
//
// @method
// @return TDictionary 效果器字典
//==========================================================
function FG3dRenderable_effects(){
   var o = this;
   var r = o._effects;
   if(!r){
      r = o._effects = new TDictionary();
   }
   return r;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return 材质
//==========================================================
function FG3dRenderable_material(){
   return this._material;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FG3dRenderable_update(p){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dRenderable_dispose(){
   var o = this;
   // 释放属性
   o._currentMatrix = RObject.dispose(o._currentMatrix);
   o._matrix = RObject.dispose(o._matrix);
   o._material = RObject.dispose(o._material);
   o._effects = RObject.dispose(o._effects);
   // 父处理
   o.__base.FGraphicRenderable.dispose.call(o);
}
