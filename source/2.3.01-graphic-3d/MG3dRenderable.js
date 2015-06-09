with(MO){
   //==========================================================
   // <T>渲染可绘制对象。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.MG3dRenderable = function MG3dRenderable(o){
      o = RClass.inherits(this, o, MGraphicRenderable);
      //..........................................................
      // @attribute
      o._optionMerge   = false;
      // @attribute
      o._currentMatrix = RClass.register(o, new AGetter('_currentMatrix'));
      o._matrix        = RClass.register(o, new AGetter('_matrix'));
      // @attribute
      o._material      = RClass.register(o, new AGetSet('_material'));
      // @attribute
      o._activeInfo    = RClass.register(o, new AGetter('_activeInfo'));
      o._infos         = null;
      //..........................................................
      // @method
      o.construct      = MG3dRenderable_construct;
      // @method
      o.activeEffect   = MG3dRenderable_activeEffect;
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
   MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
      var o = this;
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
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
   MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
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
   MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(p){
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
   MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
      var o = this;
      var infos = o._infos;
      if(infos){
         for(var i = infos.count() - 1; i >= 0; i--){
            infos.at(i).reset();
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
      o._currentMatrix = RObject.dispose(o._currentMatrix);
      o._matrix = RObject.dispose(o._matrix);
      o._material = RObject.dispose(o._material);
      o._activeInfo = null;
      o._infos = RObject.dispose(o._infos);
   }
}
