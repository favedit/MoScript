//==========================================================
// <T>资源主题对象。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._materials  = null;
   //..........................................................
   // @method
   o.unserialize = FRs3Theme_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Theme_unserialize(p){
   var c = p.readInt32();
   for(var n = 0; n < c; n++){
      var m = RClass.create(FRs3Material);
      m.unserialize(p);
      RDump.dump(m, _dump);
      break;
   }
}
