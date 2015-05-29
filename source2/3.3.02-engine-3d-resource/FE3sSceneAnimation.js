with(MO){
   //==========================================================
   // <T>资源场景动画。</T>
   //
   // @class
   // @author maocy
   // @history 150316
   //==========================================================
   MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      //..........................................................
      // @attribute
      o._playRate   = 1;
      //..........................................................
      // @method
      o.construct   = FE3sSceneAnimation_construct;
      // @method
      o.playRate    = FE3sSceneAnimation_playRate;
      o.setPlayRate = FE3sSceneAnimation_setPlayRate;
      // @method
      o.unserialize = FE3sSceneAnimation_unserialize;
      o.saveConfig  = FE3sSceneAnimation_saveConfig;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
   }

   //==========================================================
   // <T>获得播放速率。</T>
   //
   // @method
   // @return Number 播放速率
   //==========================================================
   MO.FE3sSceneAnimation_playRate = function FE3sSceneAnimation_playRate(){
      return this._playRate;
   }

   //==========================================================
   // <T>设置播放速率。</T>
   //
   // @method
   // @param playRate:Number 播放速率
   //==========================================================
   MO.FE3sSceneAnimation_setPlayRate = function FE3sSceneAnimation_setPlayRate(playRate){
      this._playRate = playRate;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.FE3sSceneAnimation_unserialize = function FE3sSceneAnimation_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      // 读取属性
      o._playRate = p.readFloat();
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   MO.FE3sSceneAnimation_saveConfig = function FE3sSceneAnimation_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      // 存储属性
      p.set('play_rate', o._playRate);
   }
}
