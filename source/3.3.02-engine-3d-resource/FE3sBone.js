//==========================================================
// <T>资源骨头信息。</T>
//
// @author maocy
// @history 150110
//==========================================================
MO.FE3sBone = function FE3sBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   o._bones      = MO.Class.register(o, new MO.AGetter('_bones'));
   //..........................................................
   // @method
   o.unserialize = MO.FE3sBone_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sBone_unserialize = function FE3sBone_unserialize(input){
   var o = this;
   // 读取属性
   o._index = input.readUint8();
   // 读取所有子骨头
   var count = input.readUint8();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var bone = MO.Class.create(MO.FE3sBone);
         bone.unserialize(input);
         bones.push(bone);
      }
   }
}
