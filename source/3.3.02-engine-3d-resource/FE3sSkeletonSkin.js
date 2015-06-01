with(MO){
   //==========================================================
   // <T>资源帧信息。</T>
   //
   // @author maocy
   // @history 150109
   //==========================================================
   MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
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
   MO.FE3sSkeletonSkin_meshGuid = function FE3sSkeletonSkin_meshGuid(){
      return this._meshGuid;
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
   // <T>获得数据流集合。</T>
   //
   // @method
   // @return TDictionary 数据流集合
   //==========================================================
   MO.FE3sSkeletonSkin_streams = function FE3sSkeletonSkin_streams(){
      return this._streams;
   }

   //==========================================================
   // <T>获得根骨头引用集合。</T>
   //
   // @method
   // @return TObjects 骨头引用集合
   //==========================================================
   MO.FE3sSkeletonSkin_boneRefers = function FE3sSkeletonSkin_boneRefers(){
      return this._boneRefers;
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
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input);
            streams.push(stream);
         }
      }
      // 读取骨头引用集合
      var boneReferCount = input.readUint8();
      if(boneReferCount > 0){
         var boneRefers = o._boneRefers = new TObjects();
         for(var i = 0; i < boneReferCount; i++){
            var boneRefer = RClass.create(FE3sBoneRefer);
            boneRefer.unserialize(input);
            boneRefers.push(boneRefer);
         }
      }
   }
}
