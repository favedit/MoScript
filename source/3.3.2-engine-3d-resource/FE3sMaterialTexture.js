//==========================================================
// <T>资源材质纹理。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sMaterialTexture(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._bitmapGuid = null;
   //..........................................................
   // @method
   o.bitmapGuid  = FE3sMaterialTexture_bitmapGuid;
   // @method
   o.unserialize = FE3sMaterialTexture_unserialize;
   return o;
}

//==========================================================
// <T>获得图片唯一代码。</T>
//
// @method
// @return String 唯一代码
//==========================================================
function FE3sMaterialTexture_bitmapGuid(){
   return this._bitmapGuid;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sMaterialTexture_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._bitmapGuid = p.readString();
}
