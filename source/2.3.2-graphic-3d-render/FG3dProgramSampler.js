//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.Graphic3d.FG3dProgramSampler = function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute 名称
   o._name       = null;
   // @attribute 关联名称
   o._linker     = null;
   // @attribute 使用标志
   o._statusUsed = false;
   // @attribute 插槽
   o._formatCd   = EG3dTexture.Flat2d;
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
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return String 名称
   //==========================================================
   function FG3dProgramSampler_name(){
      return this._name;
   }

   //==========================================================
   // <T>获得关联名称。</T>
   //
   // @method
   // @return String 关联名称
   //==========================================================
   function FG3dProgramSampler_linker(){
      return this._linker;
   }

   //==========================================================
   // <T>获得格式类型。</T>
   //
   // @method
   // @return EG3dTexture 格式类型
   //==========================================================
   function FG3dProgramSampler_formatCd(){
      return this._formatCd;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param p:config:TNode 配置节点
   //==========================================================
   function FG3dProgramSampler_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._bind = RBoolean.parse(p.get('bind', 'Y'));
      o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
   }
}
