//==========================================================
// <T>资源骨头信息。</T>
//
// @author maocy
// @history 150110
//==========================================================
function FE3sBone(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   //..........................................................
   // @method
   o.index       = FE3sBone_index;
   o.track       = FE3sBone_track;
   o.setTrack    = FE3sBone_setTrack;
   o.bones       = FE3sBone_bones;
   // @method
   o.unserialize = FE3sBone_unserialize;
   return o;
}

//==========================================================
// <T>获得索引。</T>
//
// @method
// @return Integer 索引
//==========================================================
function FE3sBone_index(){
   return this._index;
}

//==========================================================
// <T>获得跟踪信息。</T>
//
// @method
// @return FRsTrack 跟踪信息
//==========================================================
function FE3sBone_track(){
   return this._track;
}

//==========================================================
// <T>设置跟踪信息。</T>
//
// @method
// @return p:FRsTrack 跟踪信息
//==========================================================
function FE3sBone_setTrack(p){
   this._track = p;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3sBone_bones(){
   return this._bones;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sBone_unserialize(p){
   var o = this;
   // 读取属性
   o._index = p.readUint8();
   // 读取所有子骨头
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         s.push(b);
      }
   }
}
