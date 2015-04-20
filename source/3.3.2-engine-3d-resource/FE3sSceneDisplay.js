//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sSprite);
   //..........................................................
   // @attribute 属性
   o._templateGuid        = null;
   // @attribute 集合
   o._animations          = null;
   o._movies              = null;
   o._renderables         = null;
   //..........................................................
   // @method
   o.construct            = FE3sSceneDisplay_construct;
   // @method
   o.templateGuid         = FE3sSceneDisplay_templateGuid;
   o.findAnimation        = FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
   o.animations           = FE3sSceneDisplay_animations;
   o.movies               = FE3sSceneDisplay_movies;
   o.renderables          = FE3sSceneDisplay_renderables;
   // @method
   o.unserialize          = FE3sSceneDisplay_unserialize;
   o.saveConfig           = FE3sSceneDisplay_saveConfig;
   o.clone                = FE3sSceneDisplay_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sSprite.construct.call(o);
}

//==========================================================
// <T>获得模板唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sSceneDisplay_templateGuid(){
   return this._templateGuid;
}

//==========================================================
// <T>根据唯一编号查找一个动画集合。</T>
//
// @method
// @param guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
function FE3sSceneDisplay_findAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(animations){
      return animations.get(guid);
   }
   return null;
}

//==========================================================
// <T>根据唯一编号同步一个动画集合。</T>
//
// @method
// @param guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
function FE3sSceneDisplay_syncAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new TDictionary();
   }
   var animation = animations.get(guid);
   if(!animation){
      animation = RClass.create(FE3sSceneAnimation);
      animation._guid = guid;
      animations.set(guid, animation);
   }
   return animation;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sSceneDisplay_animations(){
   return this._animations;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sSceneDisplay_movies(){
   return this._movies;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FE3sSceneDisplay_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sSprite.unserialize.call(o, input);
   // 读取配置
   o._templateGuid = input.readString();
   // 读取动画集合
   var animationCount = input.readUint16();
   if(animationCount > 0){
      var animations = o._animations = new TDictionary();
      for(var i = 0; i < animationCount; i++){
         var animation = RClass.create(FE3sSceneAnimation);
         animation.unserialize(input);
         animations.set(animation.guid(), animation);
      }
   }
   // 读取动画集合
   var movieCount = input.readUint16();
   if(movieCount > 0){
      var movies = o._movies = new TObjects();
      for(var i = 0; i < movieCount; i++){
         var movie = RClass.create(FE3sMovie);
         movie.unserialize(input);
         movies.push(movie);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sSceneDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSprite.saveConfig.call(o, xconfig);
   // 存储材质集合
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      var xanimations = xconfig.create('AnimationCollection');
      for(var i = 0; i < count; i++){
         animations.at(i).saveConfig(xanimations.create('Animation'));
      }
   }
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
function FE3sSceneDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sSprite.clone.call(o, instance);
   // 设置属性
   result._templateGuid = o._templateGuid;
   return result;
}
