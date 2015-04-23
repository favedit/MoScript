//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sSpace, ME3sGeometry);
   //..........................................................
   // @attribute
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   // @attribute
   o._display      = null;
   o._renderable   = null;
   //..........................................................
   // @method
   o.construct     = FE3sMesh_construct;
   // @method
   o.unserialize   = FE3sMesh_unserialize;
   o.saveConfig    = FE3sMesh_saveConfig;
   // @method
   o.dispose       = FE3sMesh_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   // 设置属性
   o._display = RClass.create(FE3sMeshDisplay);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   // 读取属性
   o._outline.unserialize(input);
   o._outline.update();
   // 读取数据流集合
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
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
function FE3sMesh_saveConfig(config){
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
function FE3sMesh_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   o._display = RObject.dispose(o._display);
   // 父处理
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
