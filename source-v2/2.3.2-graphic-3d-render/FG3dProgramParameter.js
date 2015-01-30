//==========================================================
// <T>渲染程序参数。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o._name       = null;
   // @attribute 关联名称
   o._linker     = null;
   // @attribute 使用标志
   o._statusUsed = false;
   // @attribute 渲染器类型
   o._shaderCd   = -1;
   // @attribute 格式
   o._formatCd   = EG3dParameterFormat.Unknown;
   // @attribute 插槽
   o._slot       = -1;
   // @attribute 大小
   o._size       = 0;
   // @attribute 缓冲
   o._buffer     = null;
   //..........................................................
   // @method
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
function FG3dProgramParameter_name(){
   return this._name;
}

//==========================================================
// <T>获得关联名称。</T>
//
// @method
// @return String 关联名称
//==========================================================
function FG3dProgramParameter_linker(){
   return this._linker;
}

//==========================================================
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param p:config:TNode 配置节点
//==========================================================
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
