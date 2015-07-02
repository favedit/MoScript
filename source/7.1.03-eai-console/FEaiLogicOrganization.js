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
      o._pIdMIndexDict = RClass.register(o, new AGetter('_pIdMIndexDict'));
      o._cityIdNameDict = RClass.register(o, new AGetter('_cityIdNameDict'));
      o._provinceColors = RClass.register(o, new AGetter('_provinceColors'));
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
      var pmDict = o._pIdMIndexDict = new TDictionary();
      pmDict.set(11, 6);
      pmDict.set(12, 7);
      pmDict.set(13, 5);
      pmDict.set(14, 8);
      pmDict.set(15, 2);
      pmDict.set(21, 4);
      pmDict.set(22, 3);
      pmDict.set(23, 1);
      pmDict.set(31, -1);
      pmDict.set(32, 21);
      pmDict.set(33, 22);
      pmDict.set(34, 20);
      pmDict.set(35, 30);
      pmDict.set(36, 23);
      pmDict.set(37, 9);
      pmDict.set(41, 10);
      pmDict.set(42, 19);
      pmDict.set(43, 29);
      pmDict.set(44, 24);
      pmDict.set(45, 25);
      pmDict.set(46, 0);
      pmDict.set(50, 18);
      pmDict.set(51, 17);
      pmDict.set(52, 26);
      pmDict.set(53, 27);
      pmDict.set(54, 16);
      pmDict.set(61, 12);
      pmDict.set(62, 13);
      pmDict.set(63, 15);
      pmDict.set(64, 11);
      pmDict.set(65, 14);
      pmDict.set(71, 28);
      pmDict.set(81, -1);
      pmDict.set(82, -1);
      //身份证前四位到城市名字典
      var cinDict = o._cityIdNameDict = new TDictionary();

      //初始化省份颜色
      var colors = o._provinceColors = new TObjects();
      colors.push(new SColor4(0.25, 0.50, 0.60));
      colors.push(new SColor4(0.30, 0.60, 0.75));
      colors.push(new SColor4(0.35, 0.70, 0.80));
      colors.push(new SColor4(0.40, 0.75, 0.85));
      colors.push(new SColor4(0.45, 0.85, 1.00));
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
      return this.pIdMIndexDict().value(provinceId);
   }

   //==========================================================
   // <T>获取身份证前四位对应城市名</T>
   //
   // @method
   // @param provinceId:var 省份Id
   // @return var 城市名
   //==========================================================
   MO.FEaiLogicOrganization_getMeshIndex = function FEaiLogicOrganization_getCityName(cityId) {
      return this.cityIdNameDict().value(cityId);
   }
   
}
