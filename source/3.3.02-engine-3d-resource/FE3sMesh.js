//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
MO.FE3sMesh = function FE3sMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace, MO.ME3sGeometry);
   //..........................................................
   // @attribute
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   // @attribute
   o._display      = null;
   o._renderable   = null;
   //..........................................................
   // @method
   o.construct     = MO.FE3sMesh_construct;
   // @method
   o.unserialize   = MO.FE3sMesh_unserialize;
   o.saveConfig    = MO.FE3sMesh_saveConfig;
   // @method
   o.dispose       = MO.FE3sMesh_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMesh_construct = function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   // 设置属性
   o._display = MO.Class.create(MO.FE3sMeshDisplay);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   // 读取属性
   o._outline.unserialize(input);
   o._outline.update();
   // 读取数据流集合
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   // 读取渲染信息
   o._display.unserialize(input);
   o._renderable = o._display._renderable;
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param config:TXmlNode 配置节点
//==========================================================
MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, config);
   // 存储属性
   o._display.saveConfig(config.create('Display'));
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMesh_dispose = function FE3sMesh_dispose(){
   var o = this;
   o._outline = MO.Lang.Object.dispose(o._outline);
   o._display = MO.Lang.Object.dispose(o._display);
   // 父处理
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
