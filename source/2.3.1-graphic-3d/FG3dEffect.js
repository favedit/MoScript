//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._code               = null;
   // @attribute
   o._stateFillCd        = EG3dFillMode.Face;
   o._stateCullCd        = EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   // @attribute
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   // @attribute
   o._program            = null;
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   //..........................................................
   // @method
   o.setup               = RMethod.empty;
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.loadUrl             = FG3dEffect_loadUrl;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FG3dEffect_code(){
   return this._code;
}

//==========================================================
// <T>获得渲染程序。</T>
//
// @method
// @return FG3dProgram 渲染程序
//==========================================================
function FG3dEffect_program(){
   return this._program;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}

//==========================================================
// <T>设置取样器。</T>
//
// @method
// @param pn:name:String 名称
// @param pt:texture:FG3dTexture 纹理
//==========================================================
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pt:tagContext:FTagContext 模板环境
// @param pc:effectInfo:SG3dEffectInfo 渲染信息
//==========================================================
function FG3dEffect_buildInfo(f, r){
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param p:renderable:FG3dable 渲染对象
//==========================================================
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 绑定程序
   c.setProgram(p);
   // 绑定所有属性流
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(!vb){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   // 绘制处理
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param p:node:TXmlNode 配置节点
//==========================================================
function FG3dEffect_loadConfig(p){
   var o = this;
   var c = o._graphicContext;
   var g = o._program = c.createProgram();
   // 加载配置
   var xs = p.nodes();
   var c = xs.count();
   for(var i = 0; i < c; i++){
      var x = xs.get(i);
      if(x.isName('State')){
         // 设置状态
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'fill_mode'){
            o._stateFillCd = REnum.parse(EG3dFillMode, v);
         }else if(n == 'cull_mode'){
            o._stateCullCd = REnum.parse(EG3dCullMode, v);
         }else if(n == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
         }else if(n == 'depth_write'){
            o._stateDepthWrite = RBoolean.parse(v);
         }else if(n == 'blend_mode'){
            o._stateBlend = RBoolean.parse(v);
            if(o._stateBlend){
               o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
               o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
            }
         }else if(n == 'alpha_test'){
            o._stateAlphaTest = RBoolean.parse(v);
         }
      }else if(x.isName('Option')){
         // 设置配置
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'shadow'){
            o._optionShadow = RBoolean.parse(v);
         }else if(n == 'lightmap'){
            o._optionLightMap = RBoolean.parse(v);
         }else if(n == 'fog'){
            o._optionFog = RBoolean.parse(v);
         }
      }else if(x.isName('Parameter')){
         // 设置参数
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(x);
         g.parameters().set(pp.name(), pp);
      }else if(x.isName('Attribute')){
         // 设置属性
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(x);
         g.attributes().set(pa.name(), pa);
      }else if(x.isName('Sampler')){
         // 设置取样
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(x);
         g.samplers().set(ps.name(), ps);
      }else if(x.isName('Source')){
         // 设置代码
         var st = x.get('name');
         if(st == 'vertex'){
            o._vertexSource = x.value();
         }else if(st == 'fragment'){
            o._fragmentSource = x.value();
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', x.name());
      }
   }
   // 建立代码模板
   var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
   vt.load(o._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
   ft.load(o._fragmentSource);
}

//==========================================================
// <T>从网络地址加载渲染器。</T>
//
// @method
// @param u:url:String 网络地址
//==========================================================
function FG3dEffect_loadUrl(u){
   var o = this;
   // 获得网络数据
   var x = RClass.create(FXmlConnection);
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   var r = x.send(u);
   // 加载配置信息
   o.loadConfig(r);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:effectInfo:SG3dEffectInfo 效果信息
//==========================================================
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   // 设置环境
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   // 生成顶点代码
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   // 生成像素代码
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   // 编译处理
   g.build();
   g.link();
}

//==========================================================
// <T>加载渲染器。</T>
//
// @method
//==========================================================
function FG3dEffect_load(){
   var o = this;
   var cp = RBrowser.contentPath();
   var ec = RConsole.find(FG3dEffectConsole);
   var u = cp + ec.path() + o._code + ".xml";
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   o.loadUrl(u);
}
