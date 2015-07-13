//==========================================================
// <T>资源几何对象。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
MO.FE3sGeometry = function FE3sGeometry(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable, MO.ME3sGeometry);
   //..........................................................
   // @method
   o.construct   = MO.FE3sGeometry_construct;
   // @method
   o.unserialize = MO.FE3sGeometry_unserialize;
   // @method
   o.dispose     = MO.FE3sGeometry_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sGeometry_construct = function FE3sGeometry_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sGeometry_unserialize = function FE3sGeometry_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   // 读取属性
   var outline = o._outline;
   outline.unserialize(input);
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
   // 计算轮廓
   if(outline.isEmpty()){
      o.calculateOutline();
   }
   outline.update();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sGeometry_dispose = function FE3sGeometry_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sRenderable.dispose.call(o);
}
