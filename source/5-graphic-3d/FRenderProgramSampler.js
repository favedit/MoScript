//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgramSampler(o){
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
   o.name        = FRenderProgramSampler_name;
   o.linker      = FRenderProgramSampler_linker;
   o.loadConfig  = FRenderProgramSampler_loadConfig;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
function FRenderProgramSampler_name(){
   return this._name;
}

//==========================================================
// <T>获得关联名称。</T>
//
// @method
// @return String 关联名称
//==========================================================
function FRenderProgramSampler_linker(){
   return this._linker;
}

//==========================================================
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param p:config:TNode 配置节点
//==========================================================
function FRenderProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._source = p.get('source');
}
