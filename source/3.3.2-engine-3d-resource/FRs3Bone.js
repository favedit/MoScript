//==========================================================
// <T>资源骨头信息。</T>
//
// @author maocy
// @history 150110
//==========================================================
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._id         = 0;
   o._bones      = null;
   o._track      = null;
   //..........................................................
   // @method
   o.id          = FRs3Bone_id;
   o.bones       = FRs3Bone_bones;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   // @method
   o.unserialize = FRs3Bone_unserialize;
   return o;
}

//==========================================================
// <T>获得编号。</T>
//
// @method
// @return Integer 编号
//==========================================================
function FRs3Bone_id(){
   return this._id;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FRs3Bone_bones(){
   return this._bones;
}

//==========================================================
// <T>获得跟踪信息。</T>
//
// @method
// @return FRsTrack 跟踪信息
//==========================================================
function FRs3Bone_track(){
   return this._track;
}

//==========================================================
// <T>设置跟踪信息。</T>
//
// @method
// @return p:FRsTrack 跟踪信息
//==========================================================
function FRs3Bone_setTrack(p){
   this._track = p;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Bone_unserialize(p){
   var o = this;
   // 读取属性
   o._id = p.readUint8();
   // 读取所有子骨头
   var c = p.readUint8();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         bs.push(b);
      }
   }
}
