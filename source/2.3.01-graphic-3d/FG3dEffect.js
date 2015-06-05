with(MO){
   //==========================================================
   // <T>渲染程序。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dEffect = function FG3dEffect(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._ready              = null;
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
      o.testReady           = FG3dEffect_testReady;
      o.code                = FG3dEffect_code;
      o.program             = FG3dEffect_program;
      o.setParameter        = FG3dEffect_setParameter;
      o.setSampler          = FG3dEffect_setSampler;
      o.drawRenderable      = FG3dEffect_drawRenderable;
      o.drawRenderables     = FG3dEffect_drawRenderables;
      o.drawGroup           = FG3dEffect_drawGroup;
      o.drawRegion          = FG3dEffect_drawRegion;
      o.buildInfo           = FG3dEffect_buildInfo;
      o.loadConfig          = FG3dEffect_loadConfig;
      o.load                = FG3dEffect_load;
      o.build               = FG3dEffect_build;
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
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FG3dEffect_code = function FG3dEffect_code(){
      return this._code;
   }

   //==========================================================
   // <T>获得渲染程序。</T>
   //
   // @method
   // @return FG3dProgram 渲染程序
   //==========================================================
   MO.FG3dEffect_program = function FG3dEffect_program(){
      return this._program;
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
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", linker);
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
   MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderable, offset, count){
      var o = this;
      // 选择技术
      o._graphicContext.setProgram(o._program);
      // 绘制所有对象
      for(var i = 0; i < count; i++){
         var renderable = renderable.at(offset + i);
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
               o._stateFillCd = REnum.parse(EG3dFillMode, value);
            }else if(name == 'cull_mode'){
               o._stateCullCd = REnum.parse(EG3dCullMode, value);
            }else if(name == 'depth_mode'){
               o._stateDepth = true;
               o._stateDepthCd = REnum.parse(EG3dDepthMode, value);
            }else if(name == 'depth_write'){
               o._stateDepthWrite = RBoolean.parse(value);
            }else if(name == 'blend_mode'){
               o._stateBlend = RBoolean.parse(value);
               if(o._stateBlend){
                  o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, xnode.get('source'));
                  o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, xnode.get('target'));
               }
            }else if(name == 'alpha_test'){
               o._stateAlphaTest = RBoolean.parse(value);
            }
         }else if(xnode.isName('Option')){
            // 设置配置
            var name = xnode.get('name');
            var value = xnode.get('value');
            if(name == 'shadow'){
               o._optionShadow = RBoolean.parse(value);
            }else if(name == 'lightmap'){
               o._optionLightMap = RBoolean.parse(value);
            }else if(name == 'fog'){
               o._optionFog = RBoolean.parse(value);
            }
         }else if(xnode.isName('Parameter')){
            // 设置参数
            var parameter = RClass.create(FG3dProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name(), parameter);
         }else if(xnode.isName('Attribute')){
            // 设置属性
            var attribute = RClass.create(FG3dProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name(), attribute);
         }else if(xnode.isName('Sampler')){
            // 设置取样
            var sampler = RClass.create(FG3dProgramSampler);
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
               throw new TError(o, 'Unknown source type. (name={1})', name);
            }
         }else{
            throw new TError(o, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      // 建立代码模板
      var vertexTemplate = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
      vertexTemplate.load(o._vertexSource);
      var fragmentTemplate = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
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
      var tagContext = RInstance.get(FTagContext);
      o.buildInfo(tagContext, p);
      // 生成顶点代码
      var source = o._vertexTemplate.parse(tagContext);
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Vertex, formatSource);
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
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Fragment, formatSource);
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
      var xconfig = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
      o.loadConfig(xconfig);
   }
}
