//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Resource(o){
   o = RClass.inherits(this, o, FResource);
   //..........................................................
   // @attribute
   o._contentLength = 0;
   //..........................................................
   // @method
   o.unserialize    = FRs3Resource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Resource_unserialize(p){
   this._name = p.readString();
}
