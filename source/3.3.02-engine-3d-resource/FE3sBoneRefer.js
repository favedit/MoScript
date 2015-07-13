//==========================================================
// <T>资源骨头引用。</T>
//
// @author maocy
// @history 150205
//==========================================================
MO.FE3sBoneRefer = function FE3sBoneRefer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._bone       = MO.Class.register(o, new MO.AGetSet('_bone'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   //..........................................................
   // @method
   o.unserialize = MO.FE3sBoneRefer_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(input){
   var o = this;
   // 读取属性
   o._index = input.readUint8();
}
