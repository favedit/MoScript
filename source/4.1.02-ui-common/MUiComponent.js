//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.MUiComponent = function MUiComponent(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._valid           = MO.Class.register(o, [new MO.APtyBoolean('_valid'), new MO.AGetSet('_valid')]);
   o._guid            = MO.Class.register(o, [new MO.APtyString('_guid'), new MO.AGetSet('_guid')]);
   o._code            = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._name            = MO.Class.register(o, [new MO.APtyString('_name'), new MO.AGetSet('_name')]);
   o._label           = MO.Class.register(o, [new MO.APtyString('_label'), new MO.AGetSet('_label')]);
   o._attributes      = MO.Class.register(o, [new MO.APtyAttributes('_attributes'), new MO.AGetter('_attributes')]);
   //..........................................................
   // @attribute TDictionary 组件字典
   o._components      = null;
   // @attribute Object 附加数据
   o._tag             = MO.Class.register(o, new MO.AGetSet('_tag'));
   //..........................................................
   // @process
   o.oeInitialize     = MO.MUiComponent_oeInitialize;
   o.oeRelease        = MO.MUiComponent_oeRelease;
   //..........................................................
   // @method
   o.attributeGet     = MO.MUiComponent_attributeGet;
   o.attributeSet     = MO.MUiComponent_attributeSet;
   // @method
   o.topComponent     = MO.MUiComponent_topComponent;
   o.hasComponent     = MO.MUiComponent_hasComponent;
   o.findComponent    = MO.MUiComponent_findComponent;
   o.searchComponent  = MO.MUiComponent_searchComponent;
   o.searchComponents = MO.MUiComponent_searchComponents;
   o.components       = MO.MUiComponent_components;
   o.push             = MO.MUiComponent_push;
   o.remove           = MO.MUiComponent_remove;
   o.clear            = MO.MUiComponent_clear;
   // @method
   o.process          = MO.MUiComponent_process;
   o.psInitialize     = MO.MUiComponent_psInitialize;
   o.psRelease        = MO.MUiComponent_psRelease;
   // @method
   o.toString         = MO.MUiComponent_toString;
   // @method
   o.dispose          = MO.MUiComponent_dispose;
   // @method
   o.innerDumpInfo    = MO.MUiComponent_innerDumpInfo;
   o.innerDump        = MO.MUiComponent_innerDump;
   return o;
}

//==========================================================
// <T>处理初始化事件。</T>
//
// @method
// @param e:event:SGuiDispatchEvent 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.MUiComponent_oeInitialize = function MUiComponent_oeInitialize(e){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>处理释放事件。</T>
//
// @method
// @param e:event:SGuiDispatchEvent 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.MUiComponent_oeRelease = function MUiComponent_oeRelease(e){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>获取节点属性。</T>
//
// @method
// @param name:String 属性名称
// @return String 属性内容
//==========================================================
MO.MUiComponent_attributeGet = function MUiComponent_attributeGet(name){
   var value = null;
   var attributes = this._attributes;
   if(attributes){
      value = attributes.get(name);
   }
   return value;
}

//==========================================================
// <T>设置节点属性。</T>
//
// @method
// @param name:String 属性名称
// @param value:String 属性内容
//==========================================================
MO.MUiComponent_attributeSet = function MUiComponent_attributeSet(name, value){
   var o = this;
   var attributes = o._attributes;
   if(!attributes){
      attributes = o._attributes = new MO.TAttributes();
   }
   attributes.set(name, value);
}

//==========================================================
// <T>得到符合指定类的父组件。</T>
// <P>如果没有指定类，则获得最顶层组件。</P>
//
// @method
// @param clazz:Function 类函数
// @return MUiComponent 组件
//==========================================================
MO.MUiComponent_topComponent = function MUiComponent_topComponent(clazz){
   var component = this;
   if(clazz){
      while(MO.Class.isClass(component._parent, clazz)){
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
MO.MUiComponent_hasComponent = function MUiComponent_hasComponent(){
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
MO.MUiComponent_findComponent = function MUiComponent_findComponent(name){
   var components = this._components;
   return components ? components.get(name) : null;
}

//==========================================================
// <T>根据名称搜索子组件。</T>
//
// @method
// @param name:String 名称
// @return String 子组件
//==========================================================
MO.MUiComponent_searchComponent = function MUiComponent_searchComponent(name){
   var findComponent = null;
   // 当前层查找
   var components = this._components;
   if(components){
      findComponent = components.get(name);
   }
   // 子组件集合查找
   if(!findComponent){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         findComponent = component.findComponent(name);
         if(findComponent){
            return findComponent;
         }
      }
   }
   return findComponent;
}

//==========================================================
// <T>根据类型搜索所有子组件。</T>
//
// @method
// @param findComponents:TObjects 找到集合
// @param clazz:Function 类型
//==========================================================
MO.MUiComponent_searchComponents = function MUiComponent_searchComponents(findComponents, clazz){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, clazz)){
            findComponents.pushUnique(component);
         }
         component.searchComponents(findComponents, clazz);
      }
   }
}

//==========================================================
// <T>获得组件集合。</T>
//
// @method
// @return TDictionary 组件集合
//==========================================================
MO.MUiComponent_components = function MUiComponent_components(){
   var o = this;
   var components = o._components;
   if(components == null){
      components = new MO.TDictionary();
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
// @param component:MUiComponent 组件
//==========================================================
MO.MUiComponent_push = function MUiComponent_push(component){
   var o = this;
   // 增加组件
   if(MO.Class.isClass(component, MO.MUiComponent)){
      var components = o.components();
      // 设置子组件名称
      var name = component.name();
      component.setParent(o);
      if(name == null){
         name = components.count();
         component.setName(name);
      }
      // 存储子组件
      components.set(name, component);
   }
}

//==========================================================
// <T>移除指定子组件。</T>
// 
// @method
// @param component:MUiComponent 组件
//==========================================================
MO.MUiComponent_remove = function MUiComponent_remove(component){
   var o = this;
   // 检查类型
   if(!MO.Class.isClass(component, MO.MUiComponent)){
      throw new MO.TError(o, 'Parameter is not componet. (component={1})', component);
   }
   // 检查存在
   var components = o._components;
   if(!components.contains(component.name())){
      throw new MO.TError(o, 'Parameter component is not in this component. (name={1})', component.name());
   }
   // 移除处理
   components.removeValue(component);
}

//==========================================================
// <T>清空所有子组件。</T>
// 
// @method
//==========================================================
MO.MUiComponent_clear = function MUiComponent_clear(){
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
MO.MUiComponent_process = function MUiComponent_process(event){
   var o = this;
   // 获得对象是否有效
   var valid = o.__base[event.clazz];
   //..........................................................
   // 事件前处理
   if(valid){
      event.invokeCd = MO.EEventInvoke.Before;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   //..........................................................
   // 处理所有子对象
   var components = o._components;
   if(components){
      var count = components.count();
      if(count){
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            var result = component.process(event);
            if(result == MO.EEventStatus.Cancel){
               return result;
            }
         }
      }
   }
   //..........................................................
   // 事件后处理
   if(valid){
      event.invokeCd = MO.EEventInvoke.After;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>初始化当所有组件。</T>
//
// @method
//==========================================================
MO.MUiComponent_psInitialize = function MUiComponent_psInitialize(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeInitialize', MO.MUiComponent);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>释放所有组件。</T>
//
// @method
//==========================================================
MO.MUiComponent_psRelease = function MUiComponent_psRelease(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeRelease', MO.MUiComponent);
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>获取当前实例的信息。</T>
//
// @method
// @return String 含有内部信息的字符串
//==========================================================
MO.MUiComponent_toString = function MUiComponent_toString(){
   var o = this;
   return MO.Class.dump(o) + ':label=' + o._label;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiComponent_dispose = function MUiComponent_dispose(){
   var o = this;
   // 清空属性
   o._attributes = MO.Lang.Object.dispose(o._attributes);
   o._components = MO.Lang.Object.dispose(o._components, true);
   o._tag = null;
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param info:TString 字符串
//==========================================================
MO.MUiComponent_innerDumpInfo = function MUiComponent_innerDumpInfo(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append(',name=', o._name);
   info.append(',label=', o._label);
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param info:TString 字符串
// @param level:Integer 递归层次
//==========================================================
MO.MUiComponent_innerDump = function MUiComponent_innerDump(info, level){
   var o = this;
   o.innerdumpInfo(info);
   // 获取所有子组件的内部信息
   var components = o.components;
   if(components){
      info.appendLine();
      var count = components.count();
      for(var n = 0; n < count; n++){
         var component = components.at(n);
         if(component){
            component.innerDump(info, level + 1);
         }
      }
   }
   return info;
}
