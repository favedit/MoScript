 //==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FE3dDisplay, MGraphicObject, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   // @attribute
   o._meshRenderables = null;
   o._skeletons       = null;
   o._animations      = null;
   // @attribute
   o._resource        = null;
   //..........................................................
   // @method
   o.construct        = FE3dTemplate_construct;
   // @method
   o.testReady        = FE3dTemplate_testReady;
   // @method
   o.meshRenderables  = FE3dTemplate_meshRenderables;
   o.skeletons        = FE3dTemplate_skeletons;
   o.pushSkeleton     = FE3dTemplate_pushSkeleton;
   o.findAnimation    = FE3dTemplate_findAnimation;
   o.animations       = FE3dTemplate_animations;
   o.pushAnimation    = FE3dTemplate_pushAnimation;
   // @method
   o.resource         = FE3dTemplate_resource;
   o.setResource      = FE3dTemplate_setResource;
   o.loadSkeletons    = FE3dTemplate_loadSkeletons;
   o.linkAnimation    = FE3dTemplate_linkAnimation;
   o.loadAnimations   = FE3dTemplate_loadAnimations;
   o.loadResource     = FE3dTemplate_loadResource;
   o.reloadResource   = FE3dTemplate_reloadResource;
   // @method
   o.processLoad      = FE3dTemplate_processLoad;
   o.process          = FE3dTemplate_process;
   // @method
   o.dispose          = FE3dTemplate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._meshRenderables = new TObjects();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3dTemplate_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>获得网格渲染集合。</T>
//
// @method
// @return TObjects 网格渲染集合
//==========================================================
function FE3dTemplate_meshRenderables(){
   return this._meshRenderables;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TDictionary 骨骼集合
//==========================================================
function FE3dTemplate_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>增加一个渲染骨骼。</T>
//
// @method
// @param p:skeleton:FE3rSkeleton 渲染骨骼
//==========================================================
function FE3dTemplate_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = p;
   }
   r.set(p._resource.guid(), p);
}

//==========================================================
// <T>根据唯一编号查找一个渲染动画。</T>
//
// @method
// @param p:guid:String 唯一编号
// @return FE3rAnimation 渲染动画
//==========================================================
function FE3dTemplate_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TDictionary 动画集合
//==========================================================
function FE3dTemplate_animations(){
   return this._animations;
}

//==========================================================
// <T>增加一个渲染动画。</T>
//
// @method
// @param p:animation:FE3rAnimation 渲染动画
//==========================================================
function FE3dTemplate_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TDictionary();
   }
   var pr = p.resource();
   r.set(pr.guid(), p);
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @param FE3sTemplate 资源
//==========================================================
function FE3dTemplate_resource(p){
   return this._resource;
}

//==========================================================
// <T>设置资源模板。</T>
//
// @method
// @param p:resource:FE3sTemplate 资源模板
//==========================================================
function FE3dTemplate_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载骨骼集合。</T>
//
// @method
// @param p:animations:TObjects 骨骼集合
//==========================================================
function FE3dTemplate_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         // 创建骨骼
         var s = RClass.create(FE3rSkeleton);
         s.loadResource(r);
         o.pushSkeleton(s);
      }
   }
}

//==========================================================
// <T>关联渲染动画。</T>
//
// @method
// @param p:animation:FE3rAnimation 渲染动画
//==========================================================
function FE3dTemplate_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      var r = o._renderables.get(i);
      r._activeTrack = t;
   }
}

//==========================================================
// <T>加载动画集合。</T>
//
// @method
// @param p:animations:TObjects 动画集合
//==========================================================
function FE3dTemplate_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         // 查找是否存在
         var a = o.findAnimation(r.guid());
         if(a){
            continue;
         }
         // 创建渲染动画
         var a = null;
         if(r.skeleton()){
            a = RClass.create(FE3rSkeletonAnimation);
         }else{
            a = RClass.create(FE3rMeshAnimation);
         }
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}

//==========================================================
// <T>加载资源模板。</T>
//
// @method
// @param p:resource:FE3sTemplate 资源模板
//==========================================================
function FE3dTemplate_loadResource(p){
   var o = this;
   // 加载资源渲染集合
   var ds = p.displays();
   var c = ds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var r = RClass.create(FE3dTemplateRenderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(d);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._meshRenderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).reloadResource();
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载资源
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   // 加载渲染对象
   var s = o._renderables;
   if(s){
      // 测试渲染对象
      var c = s.count();
      for(var i = 0; i < c; i++){
         if(!s.get(i).testReady()){
            return false;
         }
      }
      // 加载渲染对象
      for(var i = 0; i < c; i++){
         s.get(i).load();
      }
   }
   // 关联动画
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         var a = as.value(i);
         if(a.resource().skeleton() == null){
            o.linkAnimation(a);
         }
      }
   }
   // 加载完成
   o._ready = true;
   // 事件发送
   o.processLoadListener(o);
   return o._ready;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_process(){
   var o = this;
   // 处理动画集合
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).record();
      }
   }
   // 父处理
   o.__base.FE3dDisplay.process.call(o);
   // 处理动画集合
   var k = o._activeSkeleton;
   if(k && as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).process(k);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_dispose(){
   var o = this;
   o._meshRenderables = RObject.dispose(o._meshRenderables);
   o.__base.FE3dDisplay.dispose.call(o);
}
