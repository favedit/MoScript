//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3SkeletonSkin(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   //..........................................................
   // @method
   o.meshGuid    = FRs3SkeletonSkin_meshGuid;
   o.find        = FRs3SkeletonSkin_find;
   o.streams     = FRs3SkeletonSkin_streams;
   o.boneRefers  = FRs3SkeletonSkin_boneRefers;
   // @method
   o.unserialize = FRs3SkeletonSkin_unserialize;
   return o;
}

//==========================================================
// <T>获得网格唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FRs3SkeletonSkin_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
function FRs3SkeletonSkin_find(p){
   return this._streams.get(p);
}

//==========================================================
// <T>获得数据流集合。</T>
//
// @method
// @return TDictionary 数据流集合
//==========================================================
function FRs3SkeletonSkin_streams(){
   return this._streams;
}

//==========================================================
// <T>获得根骨头引用集合。</T>
//
// @method
// @return TObjects 骨头引用集合
//==========================================================
function FRs3SkeletonSkin_boneRefers(){
   return this._boneRefers;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3SkeletonSkin_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
   // 读取属性
   o._meshGuid = p.readString();
   // 读取数据流集合
   var c = p.readUint8();
   if(c > 0){
      //var s = o._streams = new TDictionary();
      var s = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Stream);
         t.unserialize(p);
         s.push(t);
      }
   }
   // 读取骨头引用集合
   var c = p.readUint8();
   if(c > 0){
      var s = o._boneRefers = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3BoneRefer);
         b.unserialize(p);
         s.push(b);
      }
   }
}
