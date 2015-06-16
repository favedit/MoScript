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
      // @property String 唯一编号
      o._guid         = RClass.register(o, [new APtyString('_guid'), new AGetSet('_guid')]);
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
      o.process       = FGuiComponent_process;
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
      if(clazz){
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
   MO.FGuiComponent_clear = function FGuiComponent_clear(){
      var o = this;
      var components = o._components;
      if(components){
         components.clear();
      }
   }

   //==========================================================
   // <T>遍历子组件进行事件处理。<T>
   // <P>
   //    <OL>
   //       <L>当前组件的事件前处理。
   //          如果返回值为停止状态，则跳过当前组件的所有子组件的处理，直接返回上一层，继续上一层中同一层的其他组件的处理。</L>
   //       <L>如果当前组件支持容器接口，则可以进行子组件的事件处理，否则直接返回上一层处理。
   //          注意：不支持容器接口的对象并不表示没有子组件</L>
   //       <L>子组件按照存储顺序进行事件处理。</L>
   //       <L>当前组件的事件后处理。</L>
   //    </OL>
   //    注意：任何事件调用返回取消状态的话，则跳过后面所有的组件处理，直接返回到最开始的调用函数。</L>
   // </P>
   //
   // @param event:SDispatchEvent 纷发事件
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FGuiComponent_process = function FGuiComponent_process(event){
      var o = this;
      // 获得对象是否有效
      var valid = o.__base[event.clazz];
      //..........................................................
      // 事件前处理
      if(valid){
         event.invokeCd = EEventInvoke.Before;
         var callback = o[event.invoke];
         if(callback){
            var result = callback.call(o, event);
            if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
               return result;
            }
         }
      }
      //..........................................................
      // 处理所有子对象
      if(RClass.isClass(o, MGuiContainer)){
         var components = o._components;
         if(components){
            var count = components.count();
            if(count){
               for(var i = 0; i < count; i++){
                  var component = components.at(i);
                  var result = component.process(event);
                  if(result == EEventStatus.Cancel){
                     return result;
                  }
               }
            }
         }
      }
      //..........................................................
      // 事件后处理
      if(valid){
         event.invokeCd = EEventInvoke.After;
         var callback = o[event.invoke];
         if(callback){
            var result = callback.call(o, event);
            if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
               return result;
            }
         }
      }
      return EEventStatus.Continue;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
      var o = this;
      // 清空属性
      o._components = RObject.dispose(o._components, true);
      o._tag = null;
      // 释放处理
      o.__base.FComponent.dispose.call(o);
   }
}
