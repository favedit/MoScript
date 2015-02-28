//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FE3sSkeletonSkin(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   //..........................................................
   // @method
   o.meshGuid    = FE3sSkeletonSkin_meshGuid;
   o.find        = FE3sSkeletonSkin_find;
   o.streams     = FE3sSkeletonSkin_streams;
   o.boneRefers  = FE3sSkeletonSkin_boneRefers;
   // @method
   o.unserialize = FE3sSkeletonSkin_unserialize;
   return o;
}

//==========================================================
// <T>获得网格唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sSkeletonSkin_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}

//==========================================================
// <T>获得数据流集合。</T>
//
// @method
// @return TDictionary 数据流集合
//==========================================================
function FE3sSkeletonSkin_streams(){
   return this._streams;
}

//==========================================================
// <T>获得根骨头引用集合。</T>
//
// @method
// @return TObjects 骨头引用集合
//==========================================================
function FE3sSkeletonSkin_boneRefers(){
   return this._boneRefers;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sSkeletonSkin_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   // 读取属性
   o._meshGuid = p.readString();
   // 读取数据流集合
   var c = p.readUint8();
   if(c > 0){
      //var s = o._streams = new TDictionary();
      var s = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sStream);
         t.unserialize(p);
         s.push(t);
      }
   }
   // 读取骨头引用集合
   var c = p.readUint8();
   if(c > 0){
      var s = o._boneRefers = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBoneRefer);
         b.unserialize(p);
         s.push(b);
      }
   }
}
