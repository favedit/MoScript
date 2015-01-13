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
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   //..........................................................
   // @method
   o.construct        = FG3dEffectConsole_construct;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
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
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
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
      f.textures[n] = t;
   }
   // 设置材质信息
   var m = r.material();
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
   var es = o._effects;
   var e = es.get(en);
   if(e == null){
      o.buildEffectInfo(o._effectInfo, pr);
      if(en == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(pc);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      es.set(en, e);
   }
   return e;
}
