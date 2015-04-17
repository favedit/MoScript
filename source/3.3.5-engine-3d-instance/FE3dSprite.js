 //==========================================================
// <T>渲染精灵。</T>
//
// @author maocy
// @history 150417
//==========================================================
function FE3dSprite(o){
   o = RClass.inherits(this, o, FE3dDisplay, MGraphicObject);
   //..........................................................
   // @attribute
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   // @attribute
   o._shapes          = null;
   o._skeletons       = null;
   o._animations      = null;
   // @attribute
   o._resource        = null;
   //..........................................................
   // @method
   o.construct        = FE3dSprite_construct;
   // @method
   o.testReady        = FE3dSprite_testReady;
   // @method
   o.findMeshByCode   = FE3dSprite_findMeshByCode;
   o.meshRenderables  = FE3dSprite_shapes;
   o.skeletons        = FE3dSprite_skeletons;
   o.pushSkeleton     = FE3dSprite_pushSkeleton;
   o.findAnimation    = FE3dSprite_findAnimation;
   o.animations       = FE3dSprite_animations;
   o.pushAnimation    = FE3dSprite_pushAnimation;
   // @method
   o.resource         = FE3dSprite_resource;
   o.setResource      = FE3dSprite_setResource;
   o.loadSkeletons    = FE3dSprite_loadSkeletons;
   o.linkAnimation    = FE3dSprite_linkAnimation;
   o.loadAnimations   = FE3dSprite_loadAnimations;
   o.loadResource     = FE3dSprite_loadResource;
   o.reloadResource   = FE3dSprite_reloadResource;
   // @method
   o.load             = FE3dSprite_load;
   o.process          = FE3dSprite_process;
   // @method
   o.dispose          = FE3dSprite_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSprite_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._shapes = new TObjects();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3dSprite_testReady(){
   var o = this;
   // 加载渲染对象
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      // 测试全部加载完成
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         if(!shape.testReady()){
            return false;
         }
      }
   }
   return true;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
function FE3dSprite_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>获得网格渲染集合。</T>
//
// @method
// @return TObjects 网格渲染集合
//==========================================================
function FE3dSprite_shapes(){
   return this._shapes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TDictionary 骨骼集合
//==========================================================
function FE3dSprite_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>增加一个渲染骨骼。</T>
//
// @method
// @param p:skeleton:FE3rSkeleton 渲染骨骼
//==========================================================
function FE3dSprite_pushSkeleton(p){
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
function FE3dSprite_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TDictionary 动画集合
//==========================================================
function FE3dSprite_animations(){
   return this._animations;
}

//==========================================================
// <T>增加一个渲染动画。</T>
//
// @method
// @param p:animation:FE3rAnimation 渲染动画
//==========================================================
function FE3dSprite_pushAnimation(p){
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
function FE3dSprite_resource(p){
   return this._resource;
}

//==========================================================
// <T>设置资源模板。</T>
//
// @method
// @param p:resource:FE3sTemplate 资源模板
//==========================================================
function FE3dSprite_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载骨骼集合。</T>
//
// @method
// @param p:animations:TObjects 骨骼集合
//==========================================================
function FE3dSprite_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
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
function FE3dSprite_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.getAt(i);
      var mc = t._resource._meshCode;
      if(mc){
         var m = o.findMeshByCode(mc);
         m._activeTrack = t;
      }
   }
}

//==========================================================
// <T>加载动画集合。</T>
//
// @method
// @param p:animations:TObjects 动画集合
//==========================================================
function FE3dSprite_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
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
         a._display = o;
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}

//==========================================================
// <T>加载资源模板。</T>
//
// @method
// @param resource:FE3sSprite 资源模板
//==========================================================
function FE3dSprite_loadResource(resource){
   var o = this;
   o._resource = resource;
   // 设置矩阵
   o._matrix.assign(resource.matrix());
   // 加载资源渲染集合
   var renderableResources = resource.renderables();
   var renderableCount = renderableResources.count();
   if(renderableCount > 0){
      var shapes = o._shapes;
      for(var i = 0; i < renderableCount; i++){
         var renderableResource = renderableResources.at(i);
         var renderable = RClass.create(FE3dTemplateRenderable);
         renderable._display = o;
         renderable.linkGraphicContext(o);
         renderable.loadResource(renderableResource);
         shapes.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSprite_reloadResource(){
   var o = this;
   var s = o._shapes;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dSprite_load(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         shapes.at(i).load();
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dSprite_process(p){
   var o = this;
   // 处理动画集合
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.valueAt(i).record();
      }
   }
   // 父处理
   o.__base.FE3dDisplay.process.call(o);
   // 处理动画集合
   var k = o._activeSkeleton;
   if(k && as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.valueAt(i).process(k);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dSprite_dispose(){
   var o = this;
   o._shapes = RObject.dispose(o._shapes);
   o.__base.FE3dDisplay.dispose.call(o);
}
