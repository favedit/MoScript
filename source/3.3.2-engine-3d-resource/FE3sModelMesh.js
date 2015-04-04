//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sModelMesh(o){
   o = RClass.inherits(this, o, FE3sResource, ME3sGeometry);
   //..........................................................
   // @attribute
   o._dataCompress = true;
   //..........................................................
   // @method
   o.construct     = FE3sModelMesh_construct;
   // @method
   o.unserialize   = FE3sModelMesh_unserialize;
   // @method
   o.dispose       = FE3sModelMesh_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sModelMesh_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sModelMesh_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   // 读取属性
   o._outline.unserialize(input);
   o._outline.update();
   // 读取数据流集合
   var streamCount = p.readInt8();
   if(c > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(p)
         streams.push(stream);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sModelMesh_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sResource.dispose.call(o);
}
