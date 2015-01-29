//==========================================================
// <T>资源显示材质。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FNetRs3DisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._groupGuid = null;
   //..........................................................
   // @method
   o.groupGuid = FNetRs3DisplayMaterial_groupGuid;
   // @method
   o.unserialize = FNetRs3DisplayMaterial_unserialize;
   return o;
}

//==========================================================
// <T>获得材质组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FNetRs3DisplayMaterial_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3DisplayMaterial_unserialize(p){
   var o = this;
   // 读取属性
   o._groupGuid = p.readString();
   // 关联材质
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
