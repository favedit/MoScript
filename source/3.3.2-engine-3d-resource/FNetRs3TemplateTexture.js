//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FNetRs3TemplateTexture(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._typeCode   = null;
   o._bitmapGuid = null;
   //..........................................................
   // @method
   o.renderables = FNetRs3TemplateTexture_renderables;
   o.unserialize = FNetRs3TemplateTexture_unserialize;
   return o;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return 
//==========================================================
function FNetRs3TemplateTexture_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3TemplateTexture_unserialize(p){
   var o = this;
   // 读取属性
   o._typeCode = p.readString();
   o._bitmapGuid = p.readString();
}
