//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   //..........................................................
   // @method
   o.construct   = FE3sMesh_construct;
   // @method
   o.outline     = FE3sMesh_outline;
   o.streams     = FE3sMesh_streams;
   o.tracks      = FE3sMesh_tracks;
   // @method
   o.unserialize = FE3sMesh_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._outline = new SOutline3();
}

//==========================================================
// <T>获得轮廓。</T>
//
// @method
// @return SOutline3 轮廓
//==========================================================
function FE3sMesh_outline(){
   return this._outline;
}

//==========================================================
// <T>获得数据流集合。</T>
//
// @method
// @return TObjects 数据流集合
//==========================================================
function FE3sMesh_streams(){
   return this._streams;
}

//==========================================================
// <T>获得跟踪集合。</T>
//
// @method
// @return TObjects 跟踪集合
//==========================================================
function FE3sMesh_tracks(){
   return this._tracks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sMesh_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._outline.unserialize(p);
   // 读取数据流集合
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sStream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
