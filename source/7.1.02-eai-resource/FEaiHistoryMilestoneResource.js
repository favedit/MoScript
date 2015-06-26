with(MO){
   //==========================================================
   // <T>历史里程碑资源。</T>
   //
   // @class
   // @author maocy
   // @history 150626
   //==========================================================
   MO.FEaiHistoryMilestoneResource = function FEaiHistoryMilestoneResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._investmentTotal = RClass.register(o, new AGetSet('_investmentTotal'));
      o._dayCount        = RClass.register(o, new AGetSet('_dayCount'));
      o._companyCount    = RClass.register(o, new AGetSet('_companyCount'));
      o._staffCount      = RClass.register(o, new AGetSet('_staffCount'));
      //..........................................................
      // @method
      o.unserialize      = FEaiHistoryMilestoneResource_unserialize;
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
}
