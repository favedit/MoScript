//==========================================================
// <T>历史里程碑资源。</T>
//
// @class
// @author maocy
// @history 150626
//==========================================================
MO.FEaiHistoryMilestoneResource = function FEaiHistoryMilestoneResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code            = MO.Class.register(o, new MO.AGetSet('_code'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   o._dayCount        = MO.Class.register(o, new MO.AGetSet('_dayCount'));
   o._companyCount    = MO.Class.register(o, new MO.AGetSet('_companyCount'));
   o._staffCount      = MO.Class.register(o, new MO.AGetSet('_staffCount'));
   //..........................................................
   // @method
   o.unserialize      = MO.FEaiHistoryMilestoneResource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiHistoryMilestoneResource_unserialize = function FEaiHistoryMilestoneResource_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._investmentTotal = input.readFloat();
   o._dayCount = input.readUint16();
   o._companyCount = input.readUint16();
   o._staffCount = input.readUint16();
}
