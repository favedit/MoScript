//==========================================================
// <T>资源骨头引用。</T>
//
// @author maocy
// @history 150205
//==========================================================
function FRs3BoneRefer(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._index      = null;
   o._bone       = null;
   o._track      = null;
   //..........................................................
   // @method
   o.index       = FRs3BoneRefer_index;
   o.bone        = FRs3BoneRefer_bone;
   o.setBone     = FRs3BoneRefer_setBone;
   o.track       = FRs3BoneRefer_track;
   o.setTrack    = FRs3BoneRefer_setTrack;
   // @method
   o.unserialize = FRs3BoneRefer_unserialize;
   return o;
}

//==========================================================
// <T>获得索引。</T>
//
// @method
// @return Integer 索引
//==========================================================
function FRs3BoneRefer_index(){
   return this._index;
}

//==========================================================
// <T>获得骨头。</T>
//
// @method
// @return FRs3Bone 骨头
//==========================================================
function FRs3BoneRefer_bone(){
   return this._bone;
}

//==========================================================
// <T>设置骨头。</T>
//
// @method
// @param p:bone:FRs3Bone 骨头
//==========================================================
function FRs3BoneRefer_setBone(p){
   this._bone = p;
}

//==========================================================
// <T>获得跟踪信息。</T>
//
// @method
// @return FRsTrack 跟踪信息
//==========================================================
function FRs3BoneRefer_track(){
   return this._track;
}

//==========================================================
// <T>设置跟踪信息。</T>
//
// @method
// @return p:FRsTrack 跟踪信息
//==========================================================
function FRs3BoneRefer_setTrack(p){
   this._track = p;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3BoneRefer_unserialize(p){
   var o = this;
   // 读取属性
   o._index = p.readUint8();
}
