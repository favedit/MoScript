//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dProgram = function FG3dProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   // @attribute
   o._vertexShader     = null;
   o._fragmentShader   = null;
   //..........................................................
   // @method
   o.hasAttribute      = MO.FG3dProgram_hasAttribute;
   o.registerAttribute = MO.FG3dProgram_registerAttribute;
   o.findAttribute     = MO.FG3dProgram_findAttribute;
   o.attributes        = MO.FG3dProgram_attributes;
   // @method
   o.hasParameter      = MO.FG3dProgram_hasParameter;
   o.registerParameter = MO.FG3dProgram_registerParameter;
   o.findParameter     = MO.FG3dProgram_findParameter;
   o.parameters        = MO.FG3dProgram_parameters;
   // @method
   o.hasSampler        = MO.FG3dProgram_hasSampler;
   o.registerSampler   = MO.FG3dProgram_registerSampler;
   o.findSampler       = MO.FG3dProgram_findSampler;
   o.samplers          = MO.FG3dProgram_samplers;
   // @method
   o.vertexShader      = MO.Method.virtual(o, 'vertexShader');
   o.fragmentShader    = MO.Method.virtual(o, 'fragmentShader');
   // @method
   o.setAttribute      = MO.FG3dProgram_setAttribute;
   o.setParameter      = MO.FG3dProgram_setParameter;
   o.setParameter4     = MO.FG3dProgram_setParameter4;
   o.setSampler        = MO.FG3dProgram_setSampler;
   // @method
   o.upload            = MO.Method.virtual(o, 'upload');
   // @method
   o.dispose           = MO.FG3dProgram_dispose;
   return o;
}

//==========================================================
// <T>判断是否含有属性。</T>
//
// @method
// @return 是否含有
//==========================================================
MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
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
MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramAttribute);
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
MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}

//==========================================================
// <T>获得属性集合。</T>
//
// @method
// @return 属性集合
//==========================================================
MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new MO.TDictionary();
   }
   return r;
}

//==========================================================
// <T>判断是否含有参数。</T>
//
// @method
// @return 是否含有
//==========================================================
MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
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
MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramParameter);
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
MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}

//==========================================================
// <T>获得参数集合。</T>
//
// @method
// @return 参数集合
//==========================================================
MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new MO.TDictionary();
   }
   return r;
}

//==========================================================
// <T>判断是否含有取样。</T>
//
// @method
// @return 是否含有
//==========================================================
MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
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
MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramSampler);
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
MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}

//==========================================================
// <T>获得取样集合。</T>
//
// @method
// @return 取样集合
//==========================================================
MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new MO.TDictionary();
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
MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   // 获得定义
   var p = o.findAttribute(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   // 设置内容
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   // 获得定义
   var p = o.findParameter(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   // 转换数据
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == MO.SMatrix3d) || (t == MO.SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == MO.SColor4){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == MO.SPoint3) || (t == MO.SVector3)){
      d = MO.Lang.TypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == MO.SPoint4) || (t == MO.SVector4)){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new MO.TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   // 检查数据变更
   if(p.attachData(d)){
      // 设置内容
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
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
MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = MO.Lang.TypeArray.float4();
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
// @param name:String 名称
// @param texture:FG3dTexture 纹理
//==========================================================
MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(name, texture){
   var o = this;
   // 获得定义
   var sampler = o.findSampler(name);
   if(!sampler){
      throw new MO.TError(o, 'Bind invalid sampler. (name={1})', name);
   }
   // 设置内容
   o._graphicContext.bindTexture(sampler._slot, sampler._index, texture);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
   var o = this;
   // 释放属性集合
   o._attributes = MO.Lang.Object.dispose(o._attributes, true);
   o._parameters = MO.Lang.Object.dispose(o._parameters, true);
   o._samplers = MO.Lang.Object.dispose(o._samplers, true);
   // 释放对象
   o._vertexShader = MO.Lang.Object.dispose(o._vertexShader);
   o._fragmentShader = MO.Lang.Object.dispose(o._fragmentShader);
   // 父处理
   o.__base.FG3dObject.dispose.call(o);
}
