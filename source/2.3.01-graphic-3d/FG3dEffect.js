//==========================================================
// <T>渲染程序。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dEffect = function FG3dEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._ready              = null;
   o._code               = MO.Class.register(o, new MO.AGetter('_code'));
   // @attribute
   o._stateFillCd        = MO.EG3dFillMode.Face;
   o._stateCullCd        = MO.EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = MO.EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = MO.EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   // @attribute
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   // @attribute
   o._program            = MO.Class.register(o, new MO.AGetter('_program'));
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   //..........................................................
   // @method
   o.setup               = MO.Method.empty;
   o.testReady           = MO.FG3dEffect_testReady;
   o.setParameter        = MO.FG3dEffect_setParameter;
   o.setSampler          = MO.FG3dEffect_setSampler;
   o.drawRenderable      = MO.FG3dEffect_drawRenderable;
   o.drawRenderables     = MO.FG3dEffect_drawRenderables;
   o.drawGroup           = MO.FG3dEffect_drawGroup;
   o.drawRegion          = MO.FG3dEffect_drawRegion;
   o.buildInfo           = MO.FG3dEffect_buildInfo;
   o.loadConfig          = MO.FG3dEffect_loadConfig;
   o.load                = MO.FG3dEffect_load;
   o.build               = MO.FG3dEffect_build;
   return o;
}

//==========================================================
// <T>测试是否准备好x。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
   return this._ready;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param name:String 名称
// @param value:Object 数据
// @param count:Integer 个数
//==========================================================
MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(name, value, count){
   this._program.setParameter(name, value, count);
}

//==========================================================
// <T>设置取样器。</T>
//
// @method
// @param name:String 名称
// @param texture:FG3dTexture 纹理
//==========================================================
MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(name, texture){
   this._program.setSampler(name, texture);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param tagContext:FTagContext 模板环境
// @param effectInfo:SG3dEffectInfo 渲染信息
//==========================================================
MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(tagContext, effectInfo){
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:MG3dRegion 渲染区域
// @param renderable:MG3dRenderable 渲染对象
//==========================================================
MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   // 绑定所有属性流
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var attributeCount = attributes.count();
      for(var i = 0; i < attributeCount; i++){
         var attribute = attributes.value(i);
         if(attribute._statusUsed){
            var linker = attribute._linker;
            var vertexBuffer = renderable.findVertexBuffer(linker);
            if(!vertexBuffer){
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", linker);
            }
            program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
         }
      }
   }
   // 绘制处理
   var indexBuffer = renderable.indexBuffer();
   context.drawTriangles(indexBuffer, 0, indexBuffer.count());
}

//==========================================================
// <T>绘制渲染集合。</T>
//
// @method
// @param region:MG3dRegion 渲染区域
// @param renderables:TObjects 渲染集合
// @param offset:Integer 开始位置
// @param count:Integer 总数
//==========================================================
MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderables, offset, count){
   var o = this;
   // 选择技术
   o._graphicContext.setProgram(o._program);
   // 绘制所有对象
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(offset + i);
      o.drawRenderable(region, renderable);
   }
}

//==========================================================
// <T>绘制渲染集合。</T>
//
// @method
// @param region:MG3dRegion 渲染区域
// @param renderables:TObjects 渲染集合
// @param offset:Integer 开始位置
// @param count:Integer 总数
//==========================================================
MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, renderables, offset, count){
   this.drawRenderables(region, renderables, offset, count);
}

//==========================================================
// <T>绘制渲染集合。</T>
//
// @method
// @param region:MG3dRegion 渲染区域
// @param offset:Integer 开始位置
// @param count:Integer 总数
//==========================================================
MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
   var o = this;
   // 根据效果类型进行分组
   var renderabels = region.renderables();
   for(var n = 0; n < count; ){
      // 获得分组
      var groupBegin = n;
      var groupEnd = count;
      var groupRenderable = renderabels.at(offset + groupBegin);
      var groupMaterial = groupRenderable.materialReference();
      for(var i = n; i < count; i++){
         var renderable = renderabels.at(offset + i);
         var material = renderable.materialReference();
         if(groupMaterial != material){
            groupEnd = i;
            break;
         }
         n++;
      }
      // 绘制当前渲染组
      o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
   }
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(xconfig){
   var o = this;
   var context = o._graphicContext;
   var program = o._program = context.createProgram();
   // 加载配置
   var xnodes = xconfig.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.get(i);
      if(xnode.isName('State')){
         // 设置状态
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'fill_mode'){
            o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
         }else if(name == 'cull_mode'){
            o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
         }else if(name == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
         }else if(name == 'depth_write'){
            o._stateDepthWrite = MO.Lang.Boolean.parse(value);
         }else if(name == 'blend_mode'){
            o._stateBlend = MO.Lang.Boolean.parse(value);
            if(o._stateBlend){
               o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
               o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
            }
         }else if(name == 'alpha_test'){
            o._stateAlphaTest = MO.RBoolean.parse(value);
         }
      }else if(xnode.isName('Option')){
         // 设置配置
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'shadow'){
            o._optionShadow = MO.Lang.Boolean.parse(value);
         }else if(name == 'lightmap'){
            o._optionLightMap = MO.Lang.Boolean.parse(value);
         }else if(name == 'fog'){
            o._optionFog = MO.Lang.Boolean.parse(value);
         }
      }else if(xnode.isName('Parameter')){
         // 设置参数
         var parameter = MO.Class.create(MO.FG3dProgramParameter);
         parameter.loadConfig(xnode);
         program.parameters().set(parameter.name(), parameter);
      }else if(xnode.isName('Attribute')){
         // 设置属性
         var attribute = MO.Class.create(MO.FG3dProgramAttribute);
         attribute.loadConfig(xnode);
         program.attributes().set(attribute.name(), attribute);
      }else if(xnode.isName('Sampler')){
         // 设置取样
         var sampler = MO.Class.create(MO.FG3dProgramSampler);
         sampler.loadConfig(xnode);
         program.samplers().set(sampler.name(), sampler);
      }else if(xnode.isName('Source')){
         // 设置代码
         var name = xnode.get('name');
         if(name == 'vertex'){
            o._vertexSource = xnode.value();
         }else if(name == 'fragment'){
            o._fragmentSource = xnode.value();
         }else{
            throw new MO.TError(o, 'Unknown source type. (name={1})', name);
         }
      }else{
         throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
      }
   }
   // 建立代码模板
   var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   vertexTemplate.load(o._vertexSource);
   var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   fragmentTemplate.load(o._fragmentSource);
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:effectInfo:SG3dEffectInfo 效果信息
//==========================================================
MO.FG3dEffect_build = function FG3dEffect_build(p){
   var o = this;
   var program = o._program;
   var parameters = program.parameters();
   var parameterCount = parameters.count();
   // 设置环境
   var tagContext = MO.RInstance.get(MO.FTagContext);
   o.buildInfo(tagContext, p);
   // 生成顶点代码
   var source = o._vertexTemplate.parse(tagContext);
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Vertex, formatSource);
   // 生成像素代码
   var source = o._fragmentTemplate.parse(tagContext);
   for(var i = 0; i < parameterCount; i++){
      var parameter = parameters.at(i);
      var parameterName = parameter.name();
      var parameterDefine = parameter.define();
      if(parameterDefine){
         source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
      }
   }
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Fragment, formatSource);
   // 编译处理
   program.build();
   program.link();
}

//==========================================================
// <T>加载渲染器。</T>
//
// @method
//==========================================================
MO.FG3dEffect_load = function FG3dEffect_load(){
   var o = this;
   var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(xconfig);
}
