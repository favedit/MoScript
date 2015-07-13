//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._streams    = MO.Class.register(o, new MO.AGetter('_streams'));
   o._boneRefers = MO.Class.register(o, new MO.AGetter('_boneRefers'));
   //..........................................................
   // @method
   o.find        = MO.FE3sSkeletonSkin_find;
   // @method
   o.unserialize = MO.FE3sSkeletonSkin_unserialize;
   return o;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   // 读取属性
   o._meshGuid = input.readString();
   // 读取数据流集合
   var streamCount = input.readUint8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input);
         streams.push(stream);
      }
   }
   // 读取骨头引用集合
   var boneReferCount = input.readUint8();
   if(boneReferCount > 0){
      var boneRefers = o._boneRefers = new MO.TObjects();
      for(var i = 0; i < boneReferCount; i++){
         var boneRefer = MO.Class.create(MO.FE3sBoneRefer);
         boneRefer.unserialize(input);
         boneRefers.push(boneRefer);
      }
   }
}
