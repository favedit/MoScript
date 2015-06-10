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
      o._dict   = RClass.register(o, new AGetter('_dict'));
      //..........................................................
      // @method
      o.doFetch = FEaiLogicOrganization_doFetch;
      o.getMeshIndex = FEaiLogicOrganization_getMeshIndex;
      o.construct = FEaiLogicOrganization_construct;
      return o;
   }
   
   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiLogicOrganization_construct = function FEaiLogicOrganization_construct(){
      var o = this;
      o.__base.FEaiLogic.construct.call(o);
      //省份Id到Renderable对象Index字典，详见省份对照表文档。
      var dict = o._dict = new TDictionary();
      dict.set(11, 6);
      dict.set(12, 7);
      dict.set(13, 5);
      dict.set(14, 8);
      dict.set(15, 2);
      dict.set(21, 4);
      dict.set(22, 3);
      dict.set(23, 1);
      dict.set(31, -1);
      dict.set(32, 21);
      dict.set(33, 22);
      dict.set(34, 20);
      dict.set(35, 30);
      dict.set(36, 23);
      dict.set(37, 9);
      dict.set(41, 10);
      dict.set(42, 19);
      dict.set(43, 29);
      dict.set(44, 24);
      dict.set(45, 25);
      dict.set(46, 0);
      dict.set(50, 18);
      dict.set(51, 17);
      dict.set(52, 26);
      dict.set(53, 27);
      dict.set(54, 16);
      dict.set(61, 12);
      dict.set(62, 13);
      dict.set(63, 15);
      dict.set(64, 11);
      dict.set(65, 14);
      dict.set(71, 28);
      dict.set(81, -1);
      dict.set(82, -1);
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
   
   //==========================================================
   // <T>获取省份Id对应的MeshIndex</T>
   //
   // @method
   // @param provinceId:var 省份Id
   // @return var MeshIndex
   //==========================================================
   MO.FEaiLogicOrganization_getMeshIndex = function FEaiLogicOrganization_getMeshIndex(provinceId){
      return this._dict.value(provinceId);
   }
   
}
