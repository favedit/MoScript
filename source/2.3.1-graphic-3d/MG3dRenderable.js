//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function MG3dRenderable(o){
   o = RClass.inherits(this, o, MGraphicRenderable);
   //..........................................................
   // @attribute
   o._optionMerge   = false;
   // @attribute
   o._currentMatrix = null;
   o._matrix        = null;
   // @attribute
   o._materialName  = null;
   o._material      = null;
   // @attribute
   o._activeInfo    = null;
   o._infos         = null;
   //..........................................................
   // @method
   o.construct      = MG3dRenderable_construct;
   // @method
   o.currentMatrix  = MG3dRenderable_currentMatrix;
   o.matrix         = MG3dRenderable_matrix;
   o.material       = MG3dRenderable_material;
   // @method
   o.activeEffect   = MG3dRenderable_activeEffect;
   o.activeInfo     = MG3dRenderable_activeInfo;
   o.effectFind     = MG3dRenderable_effectFind;
   o.effectSet      = MG3dRenderable_effectSet;
   o.infos          = MG3dRenderable_infos;
   o.selectInfo     = MG3dRenderable_selectInfo;
   o.resetInfos     = MG3dRenderable_resetInfos;
   // @method
   o.testVisible    = RMethod.virtual(o, 'testVisible');
   // @method
   o.update         = MG3dRenderable_update;
   // @method
   o.dispose        = MG3dRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MG3dRenderable_construct(){
   var o = this;
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
function MG3dRenderable_currentMatrix(){
   return this._currentMatrix;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return 矩阵
//==========================================================
function MG3dRenderable_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得激活效果器。</T>
//
// @method
// @return FG3dEffect 效果器
//==========================================================
function MG3dRenderable_activeEffect(){
   var i = this._activeInfo;
   return i ? i.effect : null;
}

//==========================================================
// <T>获得激活信息。</T>
//
// @method
// @return SG3dRenderableInfo 信息
//==========================================================
function MG3dRenderable_activeInfo(){
   return this._activeInfo;
}

//==========================================================
// <T>根据名称查找效果器。</T>
//
// @method
// @param p:name:String 名称
// @return SG3dRenderableInfo 效果器
//==========================================================
function MG3dRenderable_effectFind(p){
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
function MG3dRenderable_effectSet(n, e){
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
function MG3dRenderable_infos(){
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
function MG3dRenderable_selectInfo(p){
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
// <T>重置所有信息。</T>
//
// @method
//==========================================================
function MG3dRenderable_resetInfos(){
   var o = this;
   var s = o._infos;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         s.valueAt(i).reset();
      }
   }
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return 材质
//==========================================================
function MG3dRenderable_material(){
   return this._material;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function MG3dRenderable_update(p){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MG3dRenderable_dispose(){
   var o = this;
   // 释放属性
   o._currentMatrix = RObject.dispose(o._currentMatrix);
   o._matrix = RObject.dispose(o._matrix);
   o._material = RObject.dispose(o._material);
   o._infos = RObject.dispose(o._infos);
}
