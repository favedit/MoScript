with(MO){
   //==========================================================
   // <T>组件对象。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiComponent = function FGuiComponent(o){
      o = RClass.inherits(this, o, FComponent, MProperty);
      //..........................................................
      // @property String 名称
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      // @property String 标签
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      //..........................................................
      // @attribute TDictionary 组件字典
      o._components   = null;
      // @attribute Object 附加数据
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      //..........................................................
      // @method
      o.isParent      = FGuiComponent_isParent;
      o.topComponent  = FGuiComponent_topComponent;
      o.hasComponent  = FGuiComponent_hasComponent;
      o.findComponent = FGuiComponent_findComponent;
      o.components    = FGuiComponent_components;
      o.push          = FGuiComponent_push;
      o.remove        = FGuiComponent_remove;
      o.clear         = FGuiComponent_clear;
      // @method
      o.dispose       = FGuiComponent_dispose;
      return o;
   }

   //==========================================================
   // <T>判断自己是否指定组件的父。</T>
   //
   // @method
   // @param component:FGuiComponent 组件
   // @return Boolean 是否指定组件的父
   //==========================================================
   MO.FGuiComponent_isParent = function FGuiComponent_isParent(component){
      while(component){
         if(component == this){
            return true;
         }
         component = component._parent;
      }
   }

   //==========================================================
   // <T>得到符合指定类的父组件。</T>
   // <P>如果没有指定类，则获得最顶层组件。</P>
   //
   // @method
   // @param clazz:Function 类函数
   // @return FGuiComponent 组件
   //==========================================================
   MO.FGuiComponent_topComponent = function FGuiComponent_topComponent(clazz){
      var component = this;
      if(component){
         while(RClass.isClass(component._parent, clazz)){
            component = component._parent;
         }
      }else{
         while(component._parent){
            component = component._parent;
         }
      }
      return component;
   }

   //==========================================================
   // <T>判断是否含有子组件。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   MO.FGuiComponent_hasComponent = function FGuiComponent_hasComponent(){
      var components = this._components;
      return components ? !components.isEmpty() : false;
   }

   //==========================================================
   // <T>根据名称查找子组件。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 子组件
   //==========================================================
   MO.FGuiComponent_findComponent = function FGuiComponent_findComponent(name){
      var components = this._components;
      return components ? components.get(name) : null;
   }

   //==========================================================
   // <T>获得组件集合。</T>
   //
   // @method
   // @return TDictionary 组件集合
   //==========================================================
   MO.FGuiComponent_components = function FGuiComponent_components(){
      var o = this;
      var components = o._components;
      if(components == null){
         components = new TDictionary();
         o._components = components;
      }
      return components;
   }

   //==========================================================
   // <T>将子组件放入自己的哈希表中。</T>
   // <P>如果子组件的名称为空，则给当前子组件创建一个数字的索引名。</P>
   // <P>保证子组件不会被其他未命名的子组件所覆盖。</P>
   // 
   // @method
   // @param component:FGuiComponent 组件
   //==========================================================
   MO.FGuiComponent_push = function FGuiComponent_push(component){
      var o = this;
      // 增加组件
      if(RClass.isClass(component, FGuiComponent)){
         var components = o.components();
         // 设置子组件名称
         component._parent = o;
         if(component._name == null){
            component._name = component.count();
         }
         // 存储子组件
         components.set(component._name, component);
      }
   }

   //==========================================================
   // <T>移除指定子组件。</T>
   // 
   // @method
   // @param component:FGuiComponent 组件
   //==========================================================
   MO.FGuiComponent_remove = function FGuiComponent_remove(component){
      var o = this;
      // 检查类型
      if(!RClass.isClass(component, FGuiComponent)){
         throw new TError(o, 'Parameter is not componet. (component={1})', component);
      }
      // 检查存在
      var components = o._components;
      if(!components.contains(component.name())){
         throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      // 移除处理
      components.removeValue(component);
   }

   //==========================================================
   // <T>清空所有子组件。</T>
   // 
   // @method
   //==========================================================
   MO.FGuiComponent_clear = function FGuiComponent_clear(p){
      var o = this;
      var components = o._components;
      if(components){
         components.clear();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
      var o = this;
      // 清空属性
      o._name = null;
      o._label = null;
      o._tag = null;
      o._components = RObject.dispose(o._components, true);
      // 释放处理
      o.__base.FComponent.dispose.call(o);
   }
}
