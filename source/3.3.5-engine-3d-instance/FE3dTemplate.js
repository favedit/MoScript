 //==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FE3dSpace, MGraphicObject, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   // @attribute
   o._sprites         = null;
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
   o.sprite           = FE3dTemplate_sprite;
   // @method
   o.findMeshByCode   = FE3dTemplate_findMeshByCode;
   o.meshRenderables  = FE3dTemplate_sprites;
   o.skeletons        = FE3dTemplate_skeletons;
   o.pushSkeleton     = FE3dTemplate_pushSkeleton;
   o.findAnimation    = FE3dTemplate_findAnimation;
   o.animations       = FE3dTemplate_animations;
   o.pushAnimation    = FE3dTemplate_pushAnimation;
   // @method
   o.visible          = FE3dTemplate_visible;
   o.setVisible       = FE3dTemplate_setVisible;
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
   o.__base.FE3dSpace.construct.call(o);
   // 创建显示层
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', layer);
   // 创建精灵集合
   o._sprites = new TObjects();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3dTemplate_testReady(){
   return this._ready;
}

//==========================================================
// <T>获得精灵。</T>
//
// @method
// @return FE3dSprite 精灵
//==========================================================
function FE3dTemplate_sprite(){
   return this._sprites.first();
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
function FE3dTemplate_findMeshByCode(p){
   var s = this._sprites;
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
function FE3dTemplate_sprites(){
   return this._sprites;
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
// <T>获得可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FE3dTemplate_visible(){
   return this.sprite().visible();
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param visible:Boolean 可见性
//==========================================================
function FE3dTemplate_setVisible(visible){
   this.sprite().setVisible(visible);
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
function FE3dTemplate_linkAnimation(p){
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
function FE3dTemplate_loadAnimations(p){
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
// @param resource:FE3sTemplate 资源模板
//==========================================================
function FE3dTemplate_loadResource(resource){
   var o = this;
   // 加载技术
   var technique = o.selectTechnique(o, FE3dGeneralTechnique);
   technique.setResource(resource.technique());
   // 父处理
   o.__base.FE3dSpace.loadResource.call(o, resource);
   // 加载资源渲染集合
   var displayResources = resource.displays();
   var displayCount = displayResources.count();
   if(displayCount > 0){
      for(var i = 0; i < displayCount; i++){
         var displayResource = displayResources.at(i);
         var display = RClass.create(FE3dTemplateDisplay);
         display._parent = o;
         display.linkGraphicContext(o);
         display.loadResource(displayResource);
         o._sprites.push(display);
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
   var s = o._sprites;
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
function FE3dTemplate_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载资源
   if(!o._dataReady){
      var resource = o._resource;
      if(!resource.testReady()){
         return false;
      }
      o.loadResource(resource);
      o._dataReady = true;
   }
   // 加载渲染对象
   var sprites = o._sprites;
   if(sprites){
      var spriteCount = sprites.count();
      // 测试全部加载完成
      for(var i = 0; i < spriteCount; i++){
         var sprite = sprites.at(i);
         if(!sprite.testReady()){
            return false;
         }
      }
      // 加载全部渲染对象
      for(var i = 0; i < spriteCount; i++){
         var sprite = sprites.at(i);
         sprite.load();
         o._layer.pushDisplay(sprite);
      }
   }
   // 关联动画
   var animations = o._animations;
   if(animations){
      var animationCount = animations.count();
      for(var i = 0; i < animationCount; i++){
         var animation = animations.at(i);
         if(animation.resource().skeleton() == null){
            o.linkAnimation(animation);
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
function FE3dTemplate_process(event){
   var o = this;
   // 处理动画集合
   //var as = o._animations;
   //if(as){
   //   var c = as.count();
   //   for(var i = 0; i < c; i++){
   //      as.valueAt(i).record();
   //   }
   //}
   // 父处理
   o.__base.FE3dSpace.process.call(o);
   // 处理动画集合
   //var k = o._activeSkeleton;
   //if(k && as){
   //   var c = as.count();
   //   for(var i = 0; i < c; i++){
   //      as.valueAt(i).process(k);
   //   }
   //}
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dTemplate_dispose(){
   var o = this;
   o._sprites = RObject.dispose(o._sprites);
   o.__base.FE3dSpace.dispose.call(o);
}
