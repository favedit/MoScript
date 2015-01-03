//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgram(o){
   o = RClass.inherits(this, o, FRenderObject);
   //..........................................................
   // @attribute
   o._attributes     = null;
   o._parameters     = null;
   o._samplers       = null;
   // @attribute
   o._vertexShader   = null;
   o._fragmentShader = null;
   //..........................................................
   // @method
   o.hasAttribute      = FRenderProgram_hasAttribute;
   o.attributeRegister = FRenderProgram_attributeRegister;
   o.attributeFind     = FRenderProgram_attributeFind;
   o.attributes        = FRenderProgram_attributes;
   // @method
   o.hasParameter      = FRenderProgram_hasParameter;
   o.parameterRegister = FRenderProgram_parameterRegister;
   o.parameterFind     = FRenderProgram_parameterFind;
   o.parameters        = FRenderProgram_parameters;
   // @method
   o.hasSampler        = FRenderProgram_hasSampler;
   o.samplers          = FRenderProgram_samplers;
   // @method
   o.vertexShader    = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader  = RMethod.virtual(o, 'fragmentShader');
   return o;
}

//==========================================================
// <T>判断是否含有属性。</T>
//
// @method
// @return 是否含有
//==========================================================
function FRenderProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}

//==========================================================
// <T>注册一个属性。</T>
//
// @method
// @param n:name:String 名称
// @return 属性
//==========================================================
function FRenderProgram_attributeRegister(n){
   var o = this;
   var r = RClass.create(FRenderProgramAttribute);
   r.name = n;
   o.attributes().set(n, r);
   return r;
}

//==========================================================
// <T>根据名称查找一个属性。</T>
//
// @method
// @param n:name:String 名称
// @return 属性
//==========================================================
function FRenderProgram_attributeFind(n){
   return this._attributes ? this._attributes.get(n) : null;
}

//==========================================================
// <T>获得属性集合。</T>
//
// @method
// @return 属性集合
//==========================================================
function FRenderProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}

//==========================================================
// <T>判断是否含有参数。</T>
//
// @method
// @return 是否含有
//==========================================================
function FRenderProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}

//==========================================================
// <T>注册一个参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pf:formatCd:ERenderParameterFormat 格式
// @return 参数
//==========================================================
function FRenderProgram_parameterRegister(pn, pf){
   var o = this;
   var r = RClass.create(FRenderProgramParameter);
   r.name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}

//==========================================================
// <T>根据名称查找一个参数。</T>
//
// @method
// @param n:name:String 名称
// @return 参数
//==========================================================
function FRenderProgram_parameterFind(n){
   return this._parameters ? this._parameters.get(n) : null;
}

//==========================================================
// <T>获得参数集合。</T>
//
// @method
// @return 参数集合
//==========================================================
function FRenderProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}

//==========================================================
// <T>判断是否含有取样。</T>
//
// @method
// @return 是否含有
//==========================================================
function FRenderProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}

//==========================================================
// <T>获得取样集合。</T>
//
// @method
// @return 取样集合
//==========================================================
function FRenderProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
