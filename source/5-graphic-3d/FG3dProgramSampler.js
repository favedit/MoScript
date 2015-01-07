//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dProgramSampler(o){
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
   o._index      = 0;
   // @attribute 来源
   o._source     = null;
   //..........................................................
   // @method
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}

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
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param p:config:TNode 配置节点
//==========================================================
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._source = p.get('source');
}
