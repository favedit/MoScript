//==========================================================
// <T>渲染程序属性。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o._name       = null;
   // @attribute 关联名称
   o._linker     = null;
   // @attribute 使用标志
   o._statusUsed = false;
   // @attribute 插槽
   o._slot       = -1;
   // @attribute 索引
   o._index      = -1;
   // @attribute 格式
   o._formatCd   = ERenderAttributeFormat.Unknown;
   //..........................................................
   // @method
   o.name        = FRenderProgramAttribute_name;
   o.linker      = FRenderProgramAttribute_linker;
   o.loadConfig  = FRenderProgramAttribute_loadConfig;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
function FRenderProgramAttribute_name(){
   return this._name;
}

//==========================================================
// <T>获得关联名称。</T>
//
// @method
// @return String 关联名称
//==========================================================
function FRenderProgramAttribute_linker(){
   return this._linker;
}

//==========================================================
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param p:config:TNode 配置节点
//==========================================================
function FRenderProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(ERenderAttributeFormat, p.get('format'));
}
