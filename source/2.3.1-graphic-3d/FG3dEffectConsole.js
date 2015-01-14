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
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   //..........................................................
   // @method
   o.construct        = FG3dEffectConsole_construct;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   o.findByName       = FG3dEffectConsole_findByName;
   o.findByRenderable = FG3dEffectConsole_findByRenderable;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}

//==========================================================
// <T>建立效果器信息。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_buildEffectInfo(f, r){
   var o = this;
   // 设置顶点信息
   var vs = r.vertexBuffers();
   var c = vs.count();
   for(var i = 0; i < c; i++){
      var v = vs.get(i);
      f.attributes[v.name()] = true;
   }
   // 设置纹理信息
   var ts = r.textures();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var n = ts.name(i);
      var t = ts.value(i);
      f.samplers[n] = t;
   }
   // 设置材质信息
   var m = r.material();
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
      if(pn == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      // 构建处理
      e.linkContext(pc);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      // 存储效果器
      es.set(pn, e);
   }
   return e;
}

//==========================================================
// <T>根据类名称或对象获得效果器。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var e = o._effects.get(n);
   if(e == null){
      e = RClass.createByName(n);
      e.linkContext(c);
      e._path = o._path;
      e.load();
      o._effects.set(n, e);
   }
   return e;
}

//==========================================================
// <T>根据类名称或对象获得效果器。</T>
//
// @method
// @param c:context:FG3dContext 环境对象
// @param p:class:Object 类对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_findByName(c, p){
   var o = this;
   var es = o._effects;
   var e = es.get(p);
   if(e == null){
      if(p == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(c);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect. (name={1}, instance={2})', p, e);
      es.set(p, e);
   }
   return e;
}

//==========================================================
// <T>根据渲染对象获得效果器。</T>
//
// @method
// @param pc:context:FG3dContext 环境对象
// @param pr:renderable:FG3dRenderable 渲染对象
// @return FG3dEffect 效果器
//==========================================================
function FG3dEffectConsole_findByRenderable(pc, pr){
   var o = this;
   var en = pr.material().info().effectName;
   var et = o.findTemplate(pc, en);
   if(et){
      // 生成标志
      o.buildEffectInfo(o._effectInfo, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = en + '|' + o._tagContext.code;
      // 查找效果器
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         // 创建效果器
         if(en == 'skeleton'){
            e = RClass.create(FG3dSampleSkeletonEffect);
         }else{
            e = RClass.create(FG3dSampleAutomaticEffect);
         }
         e.linkContext(pc);
         e._path = o._path;
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      // 存储效果器
      es.set(ec, e);
   }
   return e;
}
