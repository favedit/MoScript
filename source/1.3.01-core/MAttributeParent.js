with(MO){
   //==========================================================
   // <T>组件对象。</T>
   //
   // @class
   // @author maocy
   // @history 150416
   //==========================================================
   MO.MAttributeParent = function MAttributeParent(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._parent    = RClass.register(o, new AGetSet('_parent'));
      //..........................................................
      // @method
      o.isParent   = MAttributeParent_isParent;
      o.findParent = MAttributeParent_findParent;
      // @method
      o.dispose    = MAttributeParent_dispose;
      return o;
   }

   //==========================================================
   // <T>判断自己是否指定组件的父。</T>
   //
   // @method
   // @param value:MAttributeParent 组件
   // @return Boolean 是否指定组件的父
   //==========================================================
   MO.MAttributeParent_isParent = function MAttributeParent_isParent(value){
      while(value){
         if(value == this){
            return true;
         }
         value = value.parent();
      }
   }

   //==========================================================
   // <T>查找符合指定类型的父对象。</T>
   // <P>如果没有指定类，则获得最顶层对象。</P>
   //
   // @method
   // @param clazz:Class 类对象
   // @return FObject 父对象
   //==========================================================
   MO.MAttributeParent_findParent = function MAttributeParent_findParent(clazz){
      var find = this;
      if(clazz){
         while(RClass.isClass(find._parent, clazz)){
            find = find.parent();
         }
      }else{
         while(find._parent){
            find = find.parent();
         }
      }
      return find;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.MAttributeParent_dispose = function MAttributeParent_dispose(){
      var o = this;
      // 释放属性
      o._parent = null;
   }
}
