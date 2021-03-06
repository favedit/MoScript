﻿//==========================================================
// <T>效果器管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/ars/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   // @attribute
   o._thread          = null;
   o._interval        = 300;
   //..........................................................
   // @event
   o.onProcess        = FG3dEffectConsole_onProcess;
   //..........................................................
   // @method
   o.construct        = FG3dEffectConsole_construct;
   // @method
   o.path             = FG3dEffectConsole_path;
   // @method
   o.register         = FG3dEffectConsole_register;
   o.unregister       = FG3dEffectConsole_unregister;
   // @method
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   o.loadConfig       = FG3dEffectConsole_loadConfig;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FG3dEffectConsole_onProcess(){
   var o = this;
   var s = o._loadEffects;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new TDictionary();
   o._loadEffects = new TLooper();
   o._registerEffects = new TDictionary();
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}

//==========================================================
// <T>获得路径。</T>
//
// @method
// @return String 路径
//==========================================================
function FG3dEffectConsole_path(){
   return this._path;
}

//==========================================================
// <T>注册一个效果器。</T>
//
// @method
// @param n:name:String 名称
// @param e:effect:FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}

//==========================================================
// <T>注销一个效果器。</T>
//
// @method
// @param n:name:String 名称
//==========================================================
function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}

//==========================================================
// <T>创建效果器。</T>
//
// @method
// @param c:context:FG3dContext 环境
// @param p:name:String 名称
//==========================================================
function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = RClass.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}

//==========================================================
// <T>建立效果器信息。</T>
//
// @method
// @param context:FG3dContext 渲染环境
// @param effectInfo:SG3dEffectInfo 效果环境
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   // 设置技术
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
   }
   // 设置材质
   var mi = renderable.material().info();
   effectInfo.optionNormalInvert = mi.optionNormalInvert;
   effectInfo.optionColor = mi.optionColor;
   effectInfo.optionAmbient = mi.optionAmbient;
   effectInfo.optionDiffuse = mi.optionDiffuse;
   effectInfo.optionSpecular = mi.optionSpecular;
   effectInfo.optionReflect = mi.optionReflect;
   effectInfo.optionRefract = mi.optionRefract;
   // 设置定点属性
   effectInfo.vertexCount = renderable.vertexCount();
   // 设置顶点信息
   var vertexBuffers = renderable.vertexBuffers();
   var count = vertexBuffers.count();
   for(var i = 0; i < count; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexCode = vertexBuffer.code();
      // 法线压缩判定（临时处理）
      if(vertexCode == 'normal'){
         var stride = vertexBuffer.stride();
         if(stride == 4){
            effectInfo.optionNormalCompress = true;
         }else{
            effectInfo.optionNormalCompress = false;
         }
      }
      if(RString.isEmpty(vertexCode)){
         throw new TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   // 设置纹理信息
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(RString.isEmpty(textureCode)){
            throw new TError(o, 'Texture code is empty.');
         }
         effectInfo.samplers.push(textureCode);
      }
   }
   // 设置骨头信息
   var bones = renderable.bones();
   if(bones){
      var boneCount = bones.count();
      effectInfo.vertexBoneCount = boneCount;
      var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
      if(boneCount > boneLimit){
         boneCount = boneLimit;
      }
      renderable._boneLimit = boneCount;
      effectInfo.vertexBoneLimit = boneCount;
   }
}

//==========================================================
// <T>获得渲染器模板。</T>
//
// @method
// @param context:FG3dContext 环境对象
// @param code:String 代码
// @return FG3dEffect 渲染器模板
//==========================================================
function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      // 创建效果器
      var effect = o.create(context, code);
      effect.load();
      RLogger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
      // 存储效果器
      effects.set(code, effect);
   }
   return effect;
}

//==========================================================
// <T>根据渲染对象获得效果器。</T>
//
// @method
// @param context:FG3dContext 环境对象
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   // 获得环境
   if(!RClass.isClass(context, FGraphicContext)){
      context = context.graphicContext();
   }
   if(!RClass.isClass(context, FGraphicContext)){
      throw new TError(o, 'Unknown context.');
   }
   // 获得效果名称
   var effectCode = renderable.material().info().effectCode;
   if(RString.isEmpty(effectCode)){
      effectCode = 'automatic'
   }
   if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
      if(renderable.bones() == null){
         effectCode = 'automatic'
      }
   }
   var effectFlag = region.spaceName() + '.' + effectCode;
   // 查找模板
   var effectTemplate = o.findTemplate(context, effectFlag);
   if(effectTemplate){
      // 生成标志
      var effectInfo = o._effectInfo;
      effectInfo.reset();
      o.buildEffectInfo(context, effectInfo, region, renderable);
      effectTemplate.buildInfo(o._tagContext, effectInfo);
      var flag = effectFlag + o._tagContext.code;
      // 查找效果器
      var effects = o._effects;
      var effect = effects.get(flag);
      if(!effect){
         // 创建效果器
         effect = o.create(context, effectFlag);
         effect._flag = flag;
         effect.load();
         effect.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
      }
      // 存储效果器
      effects.set(flag, effect);
   }
   return effect;
}

//==========================================================
// <T>加载配置文件。</T>
//
// @method
// @param p:url:String 路径
// @return TXmlNode 节点
//==========================================================
function FG3dEffectConsole_loadConfig(p){
   var o = this;
   // 查找配置
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   // 生成地址
   var u = RBrowser.contentPath(o._path + p + ".xml");
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   // 获得网络数据
   x = RClass.create(FXmlConnection).send(u);
   // 加载配置信息
   o._configs.set(p, x);
   return x;
}
