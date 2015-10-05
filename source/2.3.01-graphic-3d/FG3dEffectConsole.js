//==========================================================
// <T>效果器管理器。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FG3dEffectConsole = function FG3dEffectConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = MO.EScope.Local;
   // @attribute
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = MO.Class.register(o, MO.AGetter('_path'), "/ars/shader/");
   o._effectInfo      = null;
   o._tagContext      = null;
   // @attribute
   o._thread          = null;
   o._interval        = 300;
   //..........................................................
   // @event
   o.onProcess        = MO.FG3dEffectConsole_onProcess;
   //..........................................................
   // @method
   o.construct        = MO.FG3dEffectConsole_construct;
   // @method
   o.register         = MO.FG3dEffectConsole_register;
   o.unregister       = MO.FG3dEffectConsole_unregister;
   // @method
   o.create           = MO.FG3dEffectConsole_create;
   o.buildEffectInfo  = MO.FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = MO.FG3dEffectConsole_findTemplate;
   o.find             = MO.FG3dEffectConsole_find;
   o.loadConfig       = MO.FG3dEffectConsole_loadConfig;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
   var o = this;
   var effects = o._loadEffects;
   effects.record();
   while(effects.next()){
      var effect = effects.current();
      if(effect.processLoad()){
         effects.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new MO.TDictionary();
   o._loadEffects = new MO.TLooper();
   o._registerEffects = new MO.TDictionary();
   o._templateEffects = new MO.TDictionary();
   o._effects = new MO.TDictionary();
   o._effectInfo = new MO.SG3dEffectInfo();
   o._tagContext = MO.Class.create(MO.FTagContext);
}

//==========================================================
// <T>注册一个效果器。</T>
//
// @method
// @param name:String 名称
// @param effect:FG3dEffect 效果器
//==========================================================
MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(name, effect){
   MO.Assert.debugNotEmpty(name);
   MO.Assert.debugNotNull(effect);
   this._registerEffects.set(name, effect);
}

//==========================================================
// <T>注销一个效果器。</T>
//
// @method
// @param name:String 名称
//==========================================================
MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(name){
   MO.Assert.debugNotEmpty(name);
   this._registerEffects.set(name, null);
}

//==========================================================
// <T>创建效果器。</T>
//
// @method
// @param context:FG3dContext 环境
// @param name:String 名称
//==========================================================
MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(context, name){
   var o = this;
   var clazz = o._registerEffects.get(name);
   if(!clazz){
      throw new MO.TError(this, 'Unknown effect type name. (type={1})', clazz);
   }
   var effect = MO.Class.create(clazz);
   effect.linkGraphicContext(context);
   effect.setup();
   return effect;
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
MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   // 设置技术
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
      effectInfo.mergeStride = renderable.mergeStride();
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
      if(MO.Lang.String.isEmpty(vertexCode)){
         throw new MO.TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   // 设置纹理信息
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(MO.Lang.String.isEmpty(textureCode)){
            throw new MO.TError(o, 'Texture code is empty.');
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
MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      // 创建效果器
      var effect = o.create(context, code);
      effect.load();
      MO.Logger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
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
MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   // 获得环境
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   // 获得效果名称
   var effectCode = renderable.material().info().effectCode;
   if(MO.Lang.String.isEmpty(effectCode)){
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
         MO.Logger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
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
MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
   var o = this;
   // 查找配置
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   // 生成地址
   var u = MO.RBrowser.contentPath(o._path + p + ".xml");
   if(MO.Runtime.isDebug()){
      u += '?' + MO.Lang.Date.format();
   }
   // 获得网络数据
   x = MO.Class.create(MO.FXmlConnection).send(u);
   // 加载配置信息
   o._configs.set(p, x);
   return x;
}
