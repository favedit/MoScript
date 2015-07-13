//==========================================================
// <T>资源场景动画。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sMovie = function FE3sMovie(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._rotation   = MO.Class.register(o, new MO.AGetter('_rotation'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sMovie_construct;
   // @method
   o.unserialize = MO.FE3sMovie_unserialize;
   o.saveConfig  = MO.FE3sMovie_saveConfig;
   // @method
   o.dispose     = MO.FE3sMovie_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMovie_construct = function FE3sMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   // 设置属性
   o._rotation = new MO.SVector3();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sMovie_unserialize = function FE3sMovie_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._interval = input.readInt32();
   o._rotation.unserialize(input);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sMovie_saveConfig = function FE3sMovie_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('interval', o._interval);
   xconfig.set('rotation', o._rotation);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMovie_dispose = function FE3sMovie_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   // 父处理
   o.__base.FE3sObject.disposet.call(o);
}
