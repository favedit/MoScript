with(MO){
   //==========================================================
   // <T>渲染程序属性。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute 名称
      o._name       = null;
      // @attribute 关联名称
      o._linker     = null;
      // @attribute 使用标志
      o._statusUsed = false;
      // @attribute 插槽
      o._slot       = null;
      // @attribute 索引
      o._index      = -1;
      // @attribute 格式
      o._formatCd   = EG3dAttributeFormat.Unknown;
      //..........................................................
      // @method
      o.name        = FG3dProgramAttribute_name;
      o.linker      = FG3dProgramAttribute_linker;
      o.loadConfig  = FG3dProgramAttribute_loadConfig;
      o.dispose     = FG3dProgramAttribute_dispose;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return String 名称
   //==========================================================
   MO.FG3dProgramAttribute_name = function FG3dProgramAttribute_name(){
      return this._name;
   }

   //==========================================================
   // <T>获得关联名称。</T>
   //
   // @method
   // @return String 关联名称
   //==========================================================
   MO.FG3dProgramAttribute_linker = function FG3dProgramAttribute_linker(){
      return this._linker;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param p:config:TNode 配置节点
   //==========================================================
   MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
      var o = this;
      o._slot = null;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
