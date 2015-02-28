//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FRs3Mesh(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   //..........................................................
   // @method
   o.construct   = FRs3Mesh_construct;
   // @method
   o.outline     = FRs3Mesh_outline;
   o.streams     = FRs3Mesh_streams;
   o.tracks      = FRs3Mesh_tracks;
   // @method
   o.unserialize = FRs3Mesh_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Mesh_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._outline = new SOutline3();
}

//==========================================================
// <T>获得轮廓。</T>
//
// @method
// @return SOutline3 轮廓
//==========================================================
function FRs3Mesh_outline(){
   return this._outline;
}

//==========================================================
// <T>获得数据流集合。</T>
//
// @method
// @return TObjects 数据流集合
//==========================================================
function FRs3Mesh_streams(){
   return this._streams;
}

//==========================================================
// <T>获得跟踪集合。</T>
//
// @method
// @return TObjects 跟踪集合
//==========================================================
function FRs3Mesh_tracks(){
   return this._tracks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Mesh_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取属性
   o._outline.unserialize(p);
   // 读取数据流集合
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3Stream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
