//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FNetRs3ModelMesh(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._guid       = null;
   o._matrix     = null;
   o._outline    = null;
   o._streams    = null;
   //..........................................................
   // @method
   o.construct   = FNetRs3ModelMesh_construct;
   // @method
   o.guid        = FNetRs3ModelMesh_guid;
   o.streams     = FNetRs3ModelMesh_streams;
   // @method
   o.unserialize = FNetRs3ModelMesh_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FNetRs3ModelMesh_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FNetRs3ModelMesh_guid(){
   return this._guid;
}

//==========================================================
// <T>获得数据流集合</T>
//
// @method
// @return TObjects 数据流集合
//==========================================================
function FNetRs3ModelMesh_streams(){
   return this._streams;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3ModelMesh_unserialize(p){
   var o = this;
   // 读取属性
   o._guid = p.readString();
   // 读取数据流集合
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FNetRs3ModelStream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
