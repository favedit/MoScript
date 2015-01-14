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
   o.setAttribute      = RMethod.virtual(o, 'setAttribute');
   o.setParameter      = RMethod.virtual(o, 'setParameter');
   o.setSampler        = RMethod.virtual(o, 'setSampler');
   o.upload            = RMethod.virtual(o, 'upload');
   // @method
   o.loadConfig        = FG3dProgram_loadConfig;
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
// <T>从配置节点钟加载信息。</T>
//
// @method
// @param p:config:TNode 配置节点
//==========================================================
function FG3dProgram_loadConfig(p){
   var o = this;
   var ns = p.nodes();
   var nc = ns.count();
   for(var i = 0; i < nc; i++){
      var n = ns.get(i);
      if(n.isName('State')){
      }else if(n.isName('Specular')){
      }else if(n.isName('Parameter')){
         // 设置参数
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(n);
         o.parameters().set(pp.name(), pp);
         var s = pp.toString();
      }else if(n.isName('Attribute')){
         // 设置属性
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(n);
         o.attributes().set(pa.name(), pa);
      }else if(n.isName('Sampler')){
         // 设置取样
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(n);
         o.samplers().set(ps.name(), ps);
      }else if(n.isName('Source')){
         // 设置代码
         var st = n.get('name');
         var sv = n.value();
         if(st == 'vertex'){
            o._vertexSource = sv;
            //o.upload(EG3dShader.Vertex, sv);
         }else if(st == 'fragment'){
            o._fragmentSource = sv;
            //o.upload(EG3dShader.Fragment, sv);
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', n.name());
      }
   }
}
