with(MO){
   //==========================================================
   // <T>渲染程序取样。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dProgramSampler = function FG3dProgramSampler(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute 名称
      o._name       = RClass.register(o, new AGetter('_name'));
      // @attribute 关联名称
      o._linker     = RClass.register(o, new AGetter('_linker'));
      // @attribute 使用标志
      o._statusUsed = false;
      // @attribute 插槽
      o._formatCd   = RClass.register(o, new AGetter('_formatCd'), EG3dTexture.Flat2d);
      // @attribute 插槽
      o._bind       = true;
      // @attribute 插槽
      o._slot       = -1;
      // @attribute 索引
      o._index      = 0;
      // @attribute 来源
      o._source     = null;
      //..........................................................
      // @method
      o.loadConfig  = FG3dProgramSampler_loadConfig;
      // @method
      o.dispose     = FG3dProgramSampler_dispose;
      return o;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._bind = RBoolean.parse(xconfig.get('bind', 'Y'));
      o._formatCd = REnum.encode(EG3dTexture, xconfig.get('format', 'Flat2d'));
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
      var o = this;
      o._slot = null;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
