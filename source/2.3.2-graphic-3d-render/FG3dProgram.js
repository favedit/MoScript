//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   // @attribute
   o._vertexSource     = null;
   o._vertexShader     = null;
   o._fragmentSource   = null;
   o._fragmentShader   = null;
   //..........................................................
   // @method
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   // @method
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   // @method
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   // @method
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   // @method
   o.setAttribute      = FG3dProgram_setAttribute;
   o.setParameter      = FG3dProgram_setParameter;
   o.setParameter4     = FG3dProgram_setParameter4;
   o.setSampler        = FG3dProgram_setSampler;
   // @method
   o.upload            = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>判断是否含有属性。</T>
//
// @method
// @return 是否含有
//==========================================================
function FG3dProgram_hasAttribute(){
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
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
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
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}

//==========================================================
// <T>获得属性集合。</T>
//
// @method
// @return 属性集合
//==========================================================
function FG3dProgram_attributes(){
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
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}

//==========================================================
// <T>注册一个参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pf:formatCd:EG3dParameterFormat 格式
// @return 参数
//==========================================================
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
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
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}

//==========================================================
// <T>获得参数集合。</T>
//
// @method
// @return 参数集合
//==========================================================
function FG3dProgram_parameters(){
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
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}

//==========================================================
// <T>注册一个取样器。</T>
//
// @method
// @param pn:name:String 名称
// @return 参数
//==========================================================
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}

//==========================================================
// <T>根据名称查找一个取样器。</T>
//
// @method
// @param n:name:String 名称
// @return 参数
//==========================================================
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}

//==========================================================
// <T>获得取样集合。</T>
//
// @method
// @return 取样集合
//==========================================================
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}

//==========================================================
// <T>设置属性。</T>
//
// @method
// @param pn:name:String 名称
// @param pb:buffer:Object 数据
// @param pf:format:Integer 格式
//==========================================================
function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   // 获得定义
   var p = o.findAttribute(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   // 设置内容
   o._context.bindVertexBuffer(p._slot, pb, 0, pf);
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   // 获得定义
   var p = o.findParameter(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   // 转换数据
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == SColor4){
      d = RTypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == SPoint3) || (t == SVector3)){
      d = RTypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == SPoint4) || (t == SVector4)){
      d = RTypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   // 设置内容
   o._context.bindConst(null, p._slot, p._formatCd, d, pc);
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param px:Number X数据
// @param py:Number Y数据
// @param pz:Number Z数据
// @param pw:Number W数据
//==========================================================
function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}

//==========================================================
// <T>设置取样器。</T>
//
// @method
// @param pn:name:String 名称
// @param pt:texture:FG3dTexture 纹理
//==========================================================
function FG3dProgram_setSampler(pn, pt){
   var o = this;
   // 获得定义
   var p = o.findSampler(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   // 设置内容
   o._context.bindTexture(p._slot, p._index, pt);
}
