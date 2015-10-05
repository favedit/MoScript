//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.MG3dRenderable = function MG3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.MGraphicRenderable);
   //..........................................................
   // @attribute
   o._optionMerge   = MO.Class.register(o, new MO.AGetSet('_optionMerge'), false);
   o._optionSelect  = MO.Class.register(o, new MO.AGetSet('_optionSelect'), true);
   // @attribute
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix        = MO.Class.register(o, new MO.AGetter('_matrix'));
   // @attribute
   o._material      = MO.Class.register(o, new MO.AGetSet('_material'));
   // @attribute
   o._activeInfo    = MO.Class.register(o, new MO.AGetter('_activeInfo'));
   o._infos         = null;
   //..........................................................
   // @method
   o.construct      = MO.MG3dRenderable_construct;
   // @method
   o.activeEffect   = MO.MG3dRenderable_activeEffect;
   o.effectFind     = MO.MG3dRenderable_effectFind;
   o.effectSet      = MO.MG3dRenderable_effectSet;
   o.infos          = MO.MG3dRenderable_infos;
   o.selectInfo     = MO.MG3dRenderable_selectInfo;
   o.resetInfos     = MO.MG3dRenderable_resetInfos;
   // @method
   o.testVisible    = MO.Method.emptyTrue;
   // @method
   o.update         = MO.Method.empty;
   // @method
   o.dispose        = MO.MG3dRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>获得激活效果器。</T>
//
// @method
// @return FG3dEffect 效果器
//==========================================================
MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
   var info = this._activeInfo;
   return info ? info.effect : null;
}

//==========================================================
// <T>根据名称查找效果器。</T>
//
// @method
// @param code:String 代码
// @return FG3dEffect 效果器
//==========================================================
MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
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
MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
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
MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new MO.TDictionary();
   }
   return infos;
}

//==========================================================
// <T>选中一个信息。</T>
//
// @method
// @param code:String 名称
// @return SG3dRenderableInfo 信息
//==========================================================
MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   o._activeInfo = info;
   return info;
}

//==========================================================
// <T>重置所有信息。</T>
//
// @method
//==========================================================
MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var info = infos.at(i);
         info.reset();
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
   var o = this;
   // 释放属性
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._material = MO.Lang.Object.dispose(o._material);
   o._activeInfo = null;
   o._infos = MO.Lang.Object.dispose(o._infos);
}
