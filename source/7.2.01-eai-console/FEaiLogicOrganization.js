with(MO){
   //==========================================================
   // <T>组织逻辑。</T>
   //
   // @class
   // @author maocy
   // @version 150606
   //==========================================================
   MO.FEaiLogicOrganization = function FEaiLogicOrganization(o){
      o = RClass.inherits(this, o, FEaiLogic);
      //..........................................................
      // @attribute
      o._code   = 'organization';
      //..........................................................
      // @method
      o.doFetch = FEaiLogicOrganization_doFetch;
      return o;
   }

   //==========================================================
   // <T>获取组织列表处理。</T>
   //
   // @method
   // @param callback:Function 回调函数
   // @param owner:Object 拥有者
   // @return FHttpConnection 处理链接
   //==========================================================
   MO.FEaiLogicOrganization_doFetch = function FEaiLogicOrganization_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
}
