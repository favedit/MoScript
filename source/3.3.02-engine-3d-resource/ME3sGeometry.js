//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
MO.ME3sGeometry = function ME3sGeometry(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._outline         = MO.Class.register(o, new MO.AGetter('_outline'));
   o._streams         = MO.Class.register(o, new MO.AGetter('_streams'));
   //..........................................................
   // @method
   o.construct        = MO.ME3sGeometry_construct;
   // @method
   o.findStream       = MO.ME3sGeometry_findStream;
   // @method
   o.calculateOutline = MO.ME3sGeometry_calculateOutline;
   // @method
   o.dispose          = MO.ME3sGeometry_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
   var o = this;
   // 设置属性
   o._outline = new MO.SOutline3d();
}

//==========================================================
// <T>根据代码查找数据流。</T>
//
// @method
// @param code:String 代码
// @return FE3sStream 数据流
//==========================================================
MO.ME3sGeometry_findStream = function ME3sGeometry_findStream(code){
   var o = this;
   var streams = o._streams;
   var count = streams.count();
   for(n = 0; n < count; n++){
      var stream = streams.getAt(n);
      if(stream.code() == code){
         return stream;
      }
   }
   return null;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
MO.ME3sGeometry_calculateOutline = function ME3sGeometry_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var stream = o.findStream('position');
      var dataCount = stream.dataCount();
      var data = new Float32Array(stream.data())
      var index = 0;
      for(var i = 0; i < dataCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.ME3sGeometry_dispose = function ME3sGeometry_dispose(){
   var o = this;
   o._outline = MO.Lang.Object.dispose(o._outline);
   // 父处理
   o.__base.FE3sSpace.dispose.call(o);
}
