//==========================================================
// <T>资源几何对象。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
function FE3sGeometry(o){
   o = RClass.inherits(this, o, FE3sDrawable, ME3sGeometry);
   //..........................................................
   // @method
   o.construct     = FE3sGeometry_construct;
   // @method
   o.unserialize   = FE3sGeometry_unserialize;
   // @method
   o.dispose       = FE3sGeometry_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sGeometry_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sGeometry_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
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
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sGeometry_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sDrawable.dispose.call(o);
}
