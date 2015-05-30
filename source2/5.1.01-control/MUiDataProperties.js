with(MO){
   //==========================================================
   // <T>数据属性集合接口。</T>
   //
   // @face
   // @author maocy
   // @version 150202
   //==========================================================
   MO.MUiDataProperties = function MUiDataProperties(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._dataProperties = null;
      //..........................................................
      // @method
      o.dataProperties  = MUiDataProperties_dataProperties;
      o.dataPropertyGet = MUiDataProperties_dataPropertyGet;
      o.dataPropertySet = MUiDataProperties_dataPropertySet;
      return o;
   }

   //==========================================================
   // <T>获得数据属性集合。</T>
   //
   // @param n:name:String 名称
   // @param c:class:TClass 类对象
   // @return String 样式名称
   //==========================================================
   MO.MUiDataProperties_dataProperties = function MUiDataProperties_dataProperties(n, c){
      var o = this;
      var d = o._dataProperties;
      if(d == null){
         d = o._dataProperties = new TDictionary();
      }
      return d;
   }

   //==========================================================
   // <T>获得数据属性。</T>
   //
   // @param n:name:String 名称
   // @return Object 内容
   //==========================================================
   MO.MUiDataProperties_dataPropertyGet = function MUiDataProperties_dataPropertyGet(n){
      var o = this;
      var d = o._dataProperties;
      return d ? d.get(n) : null;
   }

   //==========================================================
   // <T>设置数据属性。</T>
   //
   // @param n:name:String 名称
   // @param v:value:Object 内容
   //==========================================================
   MO.MUiDataProperties_dataPropertySet = function MUiDataProperties_dataPropertySet(n, v){
      this.dataProperties().set(n, v);
   }
}
