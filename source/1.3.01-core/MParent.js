//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
MO.MParent = function MParent(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._parent    = MO.Class.register(o, new MO.AGetSet('_parent'));
   //..........................................................
   // @method
   o.isParent   = MO.MParent_isParent;
   o.findParent = MO.MParent_findParent;
   // @method
   o.dispose    = MO.MParent_dispose;
   return o;
}

//==========================================================
// <T>判断自己是否指定组件的父。</T>
//
// @method
// @param value:MParent 组件
// @return Boolean 是否指定组件的父
//==========================================================
MO.MParent_isParent = function MParent_isParent(value){
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
MO.MParent_findParent = function MParent_findParent(clazz){
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
MO.MParent_dispose = function MParent_dispose(){
   var o = this;
   // 释放属性
   o._parent = null;
}
