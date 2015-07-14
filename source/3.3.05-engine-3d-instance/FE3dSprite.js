 //==========================================================
// <T>渲染精灵。</T>
//
// @author maocy
// @history 150417
//==========================================================
MO.FE3dSprite = function FE3dSprite(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplayContainer, MO.MGraphicObject, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._dataReady       = false;
   o._ready           = false;
   // @attribute
   o._shapes          = null;
   o._skeletons       = null;
   o._animations      = null;
   o._movies          = null;
   // @attribute
   o._resource        = null;
   //..........................................................
   // @method
   o.construct        = MO.FE3dSprite_construct;
   // @method
   o.testReady        = MO.FE3dSprite_testReady;
   // @method
   o.makeLabel        = MO.FE3dSprite_makeLabel;
   o.findMeshByCode   = MO.FE3dSprite_findMeshByCode;
   o.meshRenderables  = MO.FE3dSprite_shapes;
   o.skeletons        = MO.FE3dSprite_skeletons;
   o.pushSkeleton     = MO.FE3dSprite_pushSkeleton;
   o.findAnimation    = MO.FE3dSprite_findAnimation;
   o.animations       = MO.FE3dSprite_animations;
   o.pushAnimation    = MO.FE3dSprite_pushAnimation;
   o.movies           = MO.FE3dSprite_movies;
   o.pushMovie        = MO.FE3dSprite_pushMovie;
   // @method
   o.loadSkeletons    = MO.FE3dSprite_loadSkeletons;
   o.linkAnimation    = MO.FE3dSprite_linkAnimation;
   o.loadAnimations   = MO.FE3dSprite_loadAnimations;
   o.loadResource     = MO.FE3dSprite_loadResource;
   o.reloadResource   = MO.FE3dSprite_reloadResource;
   o.load             = MO.FE3dSprite_load;
   // @method
   o.updateMatrix     = MO.FE3dSprite_updateMatrix;
   o.selectClip       = MO.FE3dSprite_selectClip;
   o.process          = MO.FE3dSprite_process;
   // @method
   o.dispose          = MO.FE3dSprite_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSprite_construct = function FE3dSprite_construct(){
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   o._shapes = new TObjects();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FE3dSprite_testReady = function FE3dSprite_testReady(){
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
// <T>生成名称。</T>
//
// @method
// @return String 名称
//==========================================================
MO.FE3dSprite_makeLabel = function FE3dSprite_makeLabel(){
   var o = this;
   var resource = o.resource();
   var code = resource.code();
   var label = resource.label();
   if(label){
      return code + '[' + label + ']';
   }
   return code;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
MO.FE3dSprite_findMeshByCode = function FE3dSprite_findMeshByCode(p){
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
MO.FE3dSprite_shapes = function FE3dSprite_shapes(){
   return this._shapes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TDictionary 骨骼集合
//==========================================================
MO.FE3dSprite_skeletons = function FE3dSprite_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>增加一个渲染骨骼。</T>
//
// @method
// @param p:skeleton:FE3rSkeleton 渲染骨骼
//==========================================================
MO.FE3dSprite_pushSkeleton = function FE3dSprite_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new MO.TDictionary();
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
// @param guid:String 唯一编号
// @return FE3rAnimation 渲染动画
//==========================================================
MO.FE3dSprite_findAnimation = function FE3dSprite_findAnimation(guid){
   var animations = this._animations;
   return animations ? animations.get(guid) : null;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TDictionary 动画集合
//==========================================================
MO.FE3dSprite_animations = function FE3dSprite_animations(){
   return this._animations;
}

//==========================================================
// <T>增加一个渲染动画。</T>
//
// @method
// @param animation:FE3rAnimation 渲染动画
//==========================================================
MO.FE3dSprite_pushAnimation = function FE3dSprite_pushAnimation(animation){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new MO.TDictionary();
   }
   var animationResource = animation.resource();
   animations.set(animationResource.guid(), animation);
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @param TObjects 动画集合
//==========================================================
MO.FE3dSprite_movies = function FE3dSprite_movies(){
   return this._movies;
}

//==========================================================
// <T>增加一个动画。</T>
//
// @method
// @param movie:FE3dMovie 动画
//==========================================================
MO.FE3dSprite_pushMovie = function FE3dSprite_pushMovie(movie){
   var o = this;
   var movies = o._movies;
   if(!movies){
      movies = o._movies = new MO.TObjects();
   }
   movies.push(movie);
}

//==========================================================
// <T>加载骨骼集合。</T>
//
// @method
// @param p:animations:TObjects 骨骼集合
//==========================================================
MO.FE3dSprite_loadSkeletons = function FE3dSprite_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
         // 创建骨骼
         var s = MO.Class.create(MO.FE3rSkeleton);
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
MO.FE3dSprite_linkAnimation = function FE3dSprite_linkAnimation(p){
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
MO.FE3dSprite_loadAnimations = function FE3dSprite_loadAnimations(p){
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
            a = MO.Class.create(MO.FE3rSkeletonAnimation);
         }else{
            a = MO.Class.create(MO.FE3rMeshAnimation);
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
MO.FE3dSprite_loadResource = function FE3dSprite_loadResource(resource){
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
         var renderable = MO.Class.create(MO.FE3dTemplateRenderable);
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
MO.FE3dSprite_reloadResource = function FE3dSprite_reloadResource(){
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
MO.FE3dSprite_load = function FE3dSprite_load(){
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
// <T>构造处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FE3dSprite_updateMatrix = function FE3dSprite_updateMatrix(region){
   var o = this;
   // 加载动画集合
   var matrix = o._currentMatrix.identity();
   var movies = o._movies;
   if(movies){
      if(o._optionMovie){
         var c = movies.count();
         for(var i = 0; i < c; i++){
            var movie = movies.at(i);
            movie.process(o._movieMatrix);
         }
      }
      matrix.append(o._movieMatrix);
   }
   matrix.append(o._matrix);
   // 计算父矩阵
   var parent = o._parent;
   if(parent){
      o._currentMatrix.append(parent._currentMatrix);
   }
}

//==========================================================
// <T>选中一个剪辑对象。</T>
//
// @method
// @param code:String 代码
//==========================================================
MO.FE3dSprite_selectClip = function FE3dSprite_selectClip(code){
   var o = this;
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.selectClip(code);
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FE3dSprite_process = function FE3dSprite_process(region){
   var o = this;
   // 处理动画集合
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.record();
      }
   }
   // 父处理
   o.__base.FE3dDisplayContainer.process.call(o, region);
   // 处理动画集合
   var skeleton = o._activeSkeleton;
   if(skeleton && animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.process(skeleton);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dSprite_dispose = function FE3dSprite_dispose(){
   var o = this;
   o._shapes = MO.Lang.Object.dispose(o._shapes);
   o.__base.FE3dDisplayContainer.dispose.call(o);
}
