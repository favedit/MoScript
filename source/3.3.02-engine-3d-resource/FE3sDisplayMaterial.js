//==========================================================
// <T>资源显示材质。</T>
//
// @author maocy
// @history 150129
//==========================================================
MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._groupGuid  = MO.Class.register(o, new MO.AGetter('_groupGuid'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   //..........................................................
   // @method
   o.unserialize = MO.FE3sDisplayMaterial_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   // 读取属性
   o._groupGuid = p.readString();
   // 关联材质
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
