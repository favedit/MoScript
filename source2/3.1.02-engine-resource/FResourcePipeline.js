with(MO){
   //==========================================================
   // <T>资源处理管道。</T>
   //
   // @class
   // @author maocy
   // @version 150317
   //==========================================================
   MO.FResourcePipeline = function FResourcePipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      //..........................................................
      // @attribute
      o._console    = null;
      o._compressCd = null;
      o._resource   = null;
      //..........................................................
      // @method
      o.console     = FResourcePipeline_console;
      o.setConsole  = FResourcePipeline_setConsole;
      o.compressCd  = FResourcePipeline_compressCd;
      o.resource    = FResourcePipeline_resource;
      o.setResource = FResourcePipeline_setResource;
      // @method
      o.dispose     = FResourcePipeline_dispose;
      return o;
   }

   //==========================================================
   // <T>获得控制台。</T>
   //
   // @method
   // @return FConsole 控制台
   //==========================================================
   MO.FResourcePipeline_console = function FResourcePipeline_console(){
      return this._console;
   }

   //==========================================================
   // <T>设置控制台。</T>
   //
   // @method
   // @param p:console:FConsole 控制台
   //==========================================================
   MO.FResourcePipeline_setConsole = function FResourcePipeline_setConsole(p){
      this._console = p;
   }

   //==========================================================
   // <T>获得压缩类型。</T>
   //
   // @method
   // @return EResourceCompress 压缩类型
   //==========================================================
   MO.FResourcePipeline_compressCd = function FResourcePipeline_compressCd(){
      return this._compressCd;
   }

   //==========================================================
   // <T>获得资源。</T>
   //
   // @method
   // @return FResource 资源
   //==========================================================
   MO.FResourcePipeline_resource = function FResourcePipeline_resource(){
      return this._resource;
   }

   //==========================================================
   // <T>设置资源。</T>
   //
   // @method
   // @param p:resource:FResource 资源
   //==========================================================
   MO.FResourcePipeline_setResource = function FResourcePipeline_setResource(p){
      this._resource = p;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
      var o = this;
      o._console = null;
      o._resource = null;
      // 父处理
      o.__base.FPipeline.dispose.call(o);
   }
}
