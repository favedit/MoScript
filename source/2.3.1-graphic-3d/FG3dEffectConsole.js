//==========================================================
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
// @param pc:context:FG3dContext 渲染环境
// @param pf:effectInfo:SG3dEffectInfo 效果环境
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_buildEffectInfo(pc, pf, pg, pr){
   var o = this;
   // 设置技术
   var t = pg.technique();
   pf.techniqueModeCode = t.activeMode().code();
   pf.optionMerge = pr._optionMerge;
   if(pf.optionMerge){
      pf.mergeCount = pr.mergeMaxCount();
   }
   // 设置材质
   var mi = pr.material().info();
   pf.optionNormalInvert = mi.optionNormalInvert;
   pf.optionColor = mi.optionColor;
   pf.optionAmbient = mi.optionAmbient;
   pf.optionDiffuse = mi.optionDiffuse;
   pf.optionSpecular = mi.optionSpecular;
   pf.optionReflect = mi.optionReflect;
   pf.optionRefract = mi.optionRefract;
   // 设置定点属性
   pf.vertexCount = pr.vertexCount();
   // 设置顶点信息
   var vs = pr.vertexBuffers();
   var c = vs.count();
   if(vs.constructor == TDictionary){
      for(var i = 0; i < c; i++){
         var v = vs.value(i);
         pf.attributes.push(v.name());
      }
   }else{
      for(var i = 0; i < c; i++){
         var v = vs.get(i);
         pf.attributes.push(v.name());
      }
   }
   // 设置纹理信息
   var ts = pr.textures();
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         pf.samplers.push(ts.name(i));
      }
   }
   // 设置骨头信息
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      pf.vertexBoneCount = bc;
      var cb = pc.capability().calculateBoneCount(pf.vertexBoneCount, pf.vertexCount);
      if(bc > cb){
         bc = cb;
      }
      pr._boneLimit = bc;
      pf.vertexBoneLimit = bc;
   }
}

//==========================================================
// <T>获得渲染器模板。</T>
//
// @method
// @param pc:context:FG3dContext 环境对象
// @param pn:name:String 名称
// @return FG3dEffect 渲染器模板
//==========================================================
function FG3dEffectConsole_findTemplate(pc, pn){
   var o = this;
   var es = o._templateEffects;
   var e = es.get(pn);
   if(e == null){
      // 创建效果器
      var e = o.create(pc, pn);
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      // 存储效果器
      es.set(pn, e);
   }
   return e;
}

//==========================================================
// <T>根据渲染对象获得效果器。</T>
//
// @method
// @param pc:context:FG3dContext 环境对象
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_find(pc, pg, pr){
   var o = this;
   // 获得效果名称
   var en = pr.material().info().effectCode;
   if(RString.isEmpty(en)){
      en = 'automatic'
   }
   var ef = pg.spaceName() + '.' + en;
   // 查找模板
   var et = o.findTemplate(pc, ef);
   if(et){
      // 生成标志
      o._effectInfo.reset();
      o.buildEffectInfo(pc, o._effectInfo, pg, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = ef + o._tagContext.code;
      // 查找效果器
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         // 创建效果器
         var e = o.create(pc, ef);
         e._flag = ec;
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      // 存储效果器
      es.set(ec, e);
   }
   return e;
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
