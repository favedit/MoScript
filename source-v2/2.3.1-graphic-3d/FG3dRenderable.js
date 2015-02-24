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
   o._effectCode     = null;
   o._materialName   = null;
   o._material       = null;
   // @attribute
   o._activeInfo     = null;
   o._infos          = null;
   //..........................................................
   // @method
   o.construct       = FG3dRenderable_construct;
   // @method
   o.currentMatrix   = FG3dRenderable_currentMatrix;
   o.matrix          = FG3dRenderable_matrix;
   o.effectCode      = FG3dRenderable_effectCode;
   o.material        = FG3dRenderable_material;
   // @method
   o.activeEffect    = FG3dRenderable_activeEffect;
   o.activeInfo      = FG3dRenderable_activeInfo;
   o.effectFind      = FG3dRenderable_effectFind;
   o.effectSet       = FG3dRenderable_effectSet;
   o.infos           = FG3dRenderable_infos;
   o.selectInfo      = FG3dRenderable_selectInfo;
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
function FG3dRenderable_effectCode(){
   return this._effectCode;
}

//==========================================================
// <T>获得激活效果器。</T>
//
// @method
// @return FG3dEffect 效果器
//==========================================================
function FG3dRenderable_activeEffect(){
   var i = this._activeInfo;
   return i ? i.effect : null;
}

//==========================================================
// <T>获得激活信息。</T>
//
// @method
// @return SG3dRenderableInfo 信息
//==========================================================
function FG3dRenderable_activeInfo(){
   return this._activeInfo;
}

//==========================================================
// <T>根据名称查找效果器。</T>
//
// @method
// @param p:name:String 名称
// @return SG3dRenderableInfo 效果器
//==========================================================
function FG3dRenderable_effectFind(p){
   var o = this;
   var s = o._infos;
   if(s){
      var i = s.get(p);
      if(i){
         return i.effect;
      }
   }
   return null;
}

//==========================================================
// <T>设置一个效果器。</T>
//
// @method
// @param n:name:String 名称
// @param e:effect:FG3dEffect 效果器
//==========================================================
function FG3dRenderable_effectSet(n, e){
   var o = this;
   var s = o.infos();
   var i = s.get(n);
   if(!i){
      i = new SG3dRenderableInfo();
      es.set(n, i)
   }
   i.effect = e;
}

//==========================================================
// <T>获得信息字典。</T>
//
// @method
// @return TDictionary 信息字典
//==========================================================
function FG3dRenderable_infos(){
   var o = this;
   var r = o._infos;
   if(!r){
      r = o._infos = new TDictionary();
   }
   return r;
}

//==========================================================
// <T>选中一个信息。</T>
//
// @method
// @param p:name:String 名称
// @return SG3dRenderableInfo 信息
//==========================================================
function FG3dRenderable_selectInfo(p){
   var o = this;
   var s = o.infos();
   var i = s.get(p);
   if(!i){
      i = new SG3dRenderableInfo();
      s.set(p, i)
   }
   o._activeInfo = i;
   return i;
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
   o._infos = RObject.dispose(o._infos);
   // 父处理
   o.__base.FGraphicRenderable.dispose.call(o);
}
