//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sSprite);
   //..........................................................
   // @attribute 属性
   o._templateGuid        = MO.Class.register(o, new MO.AGetter('_templateGuid'));
   // @attribute 集合
   o._animations          = MO.Class.register(o, new MO.AGetter('_animations'));
   o._movies              = MO.Class.register(o, new MO.AGetter('_movies'));
   o._renderables         = MO.Class.register(o, new MO.AGetter('_renderables'));
   //..........................................................
   // @method
   o.construct            = MO.FE3sSceneDisplay_construct;
   // @method
   o.findAnimation        = MO.FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = MO.FE3sSceneDisplay_syncAnimation;
   // @method
   o.unserialize          = MO.FE3sSceneDisplay_unserialize;
   o.saveConfig           = MO.FE3sSceneDisplay_saveConfig;
   o.clone                = MO.FE3sSceneDisplay_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sSprite.construct.call(o);
}

//==========================================================
// <T>根据唯一编号查找一个动画集合。</T>
//
// @method
// @param guid:String 唯一编号
// @return FE3sAnimation 动画
//==========================================================
MO.FE3sSceneDisplay_findAnimation = function FE3sSceneDisplay_findAnimation(guid){
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
MO.FE3sSceneDisplay_syncAnimation = function FE3sSceneDisplay_syncAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new MO.TDictionary();
   }
   var animation = animations.get(guid);
   if(!animation){
      animation = MO.Class.create(MO.FE3sSceneAnimation);
      animation._guid = guid;
      animations.set(guid, animation);
   }
   return animation;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sSprite.unserialize.call(o, input);
   // 读取配置
   o._templateGuid = input.readString();
   // 读取动画集合
   var animationCount = input.readUint16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TDictionary();
      for(var i = 0; i < animationCount; i++){
         var animation = MO.Class.create(MO.FE3sSceneAnimation);
         animation.unserialize(input);
         animations.set(animation.guid(), animation);
      }
   }
   // 读取动画集合
   var movieCount = input.readUint16();
   if(movieCount > 0){
      var movies = o._movies = new MO.TObjects();
      for(var i = 0; i < movieCount; i++){
         var movie = MO.Class.create(MO.FE3sMovie);
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
MO.FE3sSceneDisplay_saveConfig = function FE3sSceneDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSprite.saveConfig.call(o, xconfig);
   // 设置属性
   xconfig.set('template_guid', o._templateGuid);
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
MO.FE3sSceneDisplay_clone = function FE3sSceneDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sSprite.clone.call(o, instance);
   // 设置属性
   result._templateGuid = o._templateGuid;
   return result;
}
