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
   // @method
   o.material       = MG3dRenderable_material;
   o.setMaterial    = MG3dRenderable_setMaterial;
   // @method
   o.activeEffect   = MG3dRenderable_activeEffect;
   o.activeInfo     = MG3dRenderable_activeInfo;
   o.effectFind     = MG3dRenderable_effectFind;
   o.effectSet      = MG3dRenderable_effectSet;
   o.infos          = MG3dRenderable_infos;
   o.selectInfo     = MG3dRenderable_selectInfo;
   o.resetInfos     = MG3dRenderable_resetInfos;
   // @method
   o.testVisible    = RMethod.emptyTrue;
   // @method
   o.update         = RMethod.empty;
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
   var info = this._activeInfo;
   return info ? info.effect : null;
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
// @param code:String 代码
// @return FG3dEffect 效果器
//==========================================================
function MG3dRenderable_effectFind(code){
   var o = this;
   var infos = o._infos;
   if(infos){
      var info = infos.get(code);
      if(info){
         return info.effect;
      }
   }
   return null;
}

//==========================================================
// <T>设置一个效果器。</T>
//
// @method
// @param code:String 代码
// @param effect:FG3dEffect 效果器
//==========================================================
function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}

//==========================================================
// <T>获得信息字典。</T>
//
// @method
// @return TDictionary 信息字典
//==========================================================
function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new TDictionary();
   }
   return infos;
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
   var infos = o.infos();
   var info = infos.get(p);
   if(!info){
      info = new SG3dRenderableInfo();
      infos.set(p, info)
   }
   o._activeInfo = info;
   return info;
}

//==========================================================
// <T>重置所有信息。</T>
//
// @method
//==========================================================
function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      for(var i = infos.count() - 1; i >= 0; i--){
         infos.at(i).reset();
      }
   }
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function MG3dRenderable_material(){
   return this._material;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @param material:FG3dMaterial 材质
//==========================================================
function MG3dRenderable_setMaterial(material){
   this._material = material;
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
   o._activeInfo = null;
   o._infos = RObject.dispose(o._infos);
}
