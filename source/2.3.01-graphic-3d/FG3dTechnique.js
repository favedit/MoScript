with(MO){
   //==========================================================
   // <T>渲染技术。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dTechnique = function FG3dTechnique(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._code           = RClass.register(o, new AGetter('_code'));
      o._activeMode     = RClass.register(o, new AGetter('_activeMode'));
      o._modes          = RClass.register(o, new AGetter('_modes'));
      o._passes         = RClass.register(o, new AGetter('_passes'));
      //..........................................................
      // @method
      o.construct       = FG3dTechnique_construct;
      // @method
      o.registerMode    = FG3dTechnique_registerMode;
      o.selectMode      = FG3dTechnique_selectMode;
      // @method
      o.updateRegion    = RMethod.empty;
      o.clear           = FG3dTechnique_clear;
      o.clearDepth      = FG3dTechnique_clearDepth;
      o.sortRenderables = FG3dTechnique_sortRenderables;
      o.drawRegion      = FG3dTechnique_drawRegion;
      o.present         = FG3dTechnique_present;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
      o._modes = new TObjects();
      o._passes = new TObjects();
   }

   //==========================================================
   // <T>注册技术模式。</T>
   //
   // @method
   // @param p:code:String 代码
   // @return FG3dTechniqueMode 技术模式
   //==========================================================
   MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
      var o = this;
      var m = RClass.create(FG3dTechniqueMode);
      m.setCode(p);
      o._modes.push(m);
      o._activeMode = m;
      return m;
   }

   //==========================================================
   // <T>选择技术模式。</T>
   //
   // @method
   // @param p:code:String 代码
   // @return FG3dTechniqueMode 技术模式
   //==========================================================
   MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
      var o = this;
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param color:SColor4 颜色
   //==========================================================
   MO.FG3dTechnique_clear = function FG3dTechnique_clear(color){
      var o = this;
      var context = o._graphicContext;
      // 设置渲染目标
      context.setRenderTarget(null);
      // 清除颜色
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
   }

   //==========================================================
   // <T>清除绘制区。</T>
   //
   // @method
   // @param depth:Number 深度
   //==========================================================
   MO.FG3dTechnique_clearDepth = function FG3dTechnique_clearDepth(depth){
      var o = this;
      if(depth == null){
         depth = 1;
      }
      var context = o._graphicContext;
      context.clearDepth(depth);
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(region){
      var o = this;
      // 设置区域属性
      region.setTechnique(o);
      // 绘制所有过程
      var passes = o._passes;
      var count = passes.count();
      for(var i = 0; i < count; i++){
         var pass = passes.at(i);
         region.setTechniquePass(pass, (i == count - 1));
         pass.drawRegion(region);
      }
   }

   //==========================================================
   // <T>绘制完成处理。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   MO.FG3dTechnique_present = function FG3dTechnique_present(p){
      this._graphicContext.present();
   }
}
