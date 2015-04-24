//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
function MAttributeParent(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._parent    = null;
   //..........................................................
   // @method
   o.parent     = MAttributeParent_parent;
   o.findParent = MAttributeParent_findParent;
   o.setParent  = MAttributeParent_setParent;
   // @method
   o.dispose    = MAttributeParent_dispose;
   return o;
}

//==========================================================
// <T>获得父对象。</T>
//
// @method
// @return FObject 父对象
//==========================================================
function MAttributeParent_parent(){
   return this._parent;
}

//==========================================================
// <T>查找符合指定类型的父对象。</T>
// <P>如果没有指定类，则获得最顶层对象。</P>
//
// @method
// @param clazz:Class 类对象
// @return FObject 父对象
//==========================================================
function MAttributeParent_findParent(clazz){
   var find = this;
   if(clazz){
      while(RClass.isClass(find._parent, clazz)){
         find = find._parent;
      }
   }else{
      while(find._parent){
         find = find._parent;
      }
   }
   return find;
}

//==========================================================
// <T>设置父对象。</T>
//
// @method
// @param parent:FObject 父对象
//==========================================================
function MAttributeParent_setParent(parent){
   this._parent = parent;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MAttributeParent_dispose(){
   var o = this;
   // 释放属性
   o._parent = null;
}
