with(MO){
   //==========================================================
   // <T>所有组件的基类</T>
   // <P>非可视对象，支持以下功能：
   //    1. 由多个子组件构成，支持添加、查找、删除功能。
   //    2. 属性的管理，支持注册、加载、保存功能。
   //    3. 事件向所有子组件中纷发功能，支持初始化，释放功能。
   //    4. 自身对象的复制。
   // </P>
   //
   // @class
   // @author maocy
   // @version 141231
   //==========================================================
   MO.FUiComponent = function FUiComponent(o){
      o = RClass.inherits(this, o, FComponent, MProperty, MClone);
      //..........................................................
      // @property String 唯一编号
      o._guid         = RClass.register(o, [new APtyString('_guid'), new AGetSet('_guid')]);
      // @property String 名称
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      // @property String 标签
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      //..........................................................
      // @attribute FUiComponent 父组件
      o._parent       = null;
      // @attribute TDictionary 组件字典
      o._components   = null;
      // @attribute Object 附加数据
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      //..........................................................
      // @process
      o.oeInitialize  = FUiComponent_oeInitialize;
      o.oeRelease     = FUiComponent_oeRelease;
      //..........................................................
      // @method
      o.topComponent  = FUiComponent_topComponent;
      o.hasComponent  = FUiComponent_hasComponent;
      o.findComponent = FUiComponent_findComponent;
      o.components    = FUiComponent_components;
      o.push          = FUiComponent_push;
      o.remove        = FUiComponent_remove;
      o.clear         = FUiComponent_clear;
      // @method
      o.process       = FUiComponent_process;
      o.psInitialize  = FUiComponent_psInitialize;
      o.psRelease     = FUiComponent_psRelease;
      // @method
      o.toString      = FUiComponent_toString;
      // @method
      o.dispose       = FUiComponent_dispose;
      // @method
      o.innerDumpInfo = FUiComponent_innerDumpInfo;
      o.innerDump     = FUiComponent_innerDump;
      return o;
   }

   //==========================================================
   // <T>处理初始化事件。</T>
   //
   // @method
   // @param e:event:TEventProcess 事件处理
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FUiComponent_oeInitialize = function FUiComponent_oeInitialize(e){
      return EEventStatus.Continue;
   }

   //==========================================================
   // <T>处理释放事件。</T>
   //
   // @method
   // @param e:event:TEventProcess 事件处理
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FUiComponent_oeRelease = function FUiComponent_oeRelease(e){
      return EEventStatus.Continue;
   }

   //==========================================================
   // <T>得到符合指定类的父组件。</T>
   // <P>如果没有指定类，则获得最顶层组件。</P>
   //
   // @method
   // @param class:Class 类
   // @return FUiComponent 组件
   //==========================================================
   MO.FUiComponent_topComponent = function FUiComponent_topComponent(c){
      var p = this;
      if(c){
         while(RClass.isClass(p._parent, c)){
            p = p._parent;
         }
      }else{
         while(p._parent){
            p = p._parent;
         }
      }
      return p;
   }

   //==========================================================
   // <T>判断是否含有子组件。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   MO.FUiComponent_hasComponent = function FUiComponent_hasComponent(){
      var s = this._components;
      return s ? !s.isEmpty() : false;
   }

   //==========================================================
   // <T>根据名称查找子组件。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return String 子组件
   //==========================================================
   MO.FUiComponent_findComponent = function FUiComponent_findComponent(p){
      var s = this._components;
      return s ? s.get(p) : null;
   }

   //==========================================================
   // <T>获得组件集合。</T>
   //
   // @method
   // @return TDictionary 组件集合
   //==========================================================
   MO.FUiComponent_components = function FUiComponent_components(){
      var o = this;
      var r = o._components;
      if(r == null){
         r = new TDictionary();
         o._components = r;
      }
      return r;
   }

   //==========================================================
   // <T>将子组件放入自己的哈希表中。</T>
   // <P>如果子组件的名称为空，则给当前子组件创建一个数字的索引名。</P>
   // <P>保证子组件不会被其他未命名的子组件所覆盖。</P>
   // 
   // @method
   // @param p:component:FUiComponent 组件
   //==========================================================
   MO.FUiComponent_push = function FUiComponent_push(p){
      var o = this;
      // 增加组件
      if(RClass.isClass(p, FUiComponent)){
         var s = o.components();
         // 设置子组件名称
         p._parent = o;
         if(p._name == null){
            p._name = s.count();
         }
         // 存储子组件
         s.set(p._name, p);
      }
   }

   //==========================================================
   // <T>移除指定子组件。</T>
   // 
   // @method
   // @param component:FUiComponent 组件
   //==========================================================
   MO.FUiComponent_remove = function FUiComponent_remove(component){
      var o = this;
      // 检查类型
      if(!RClass.isClass(component, FUiComponent)){
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
   MO.FUiComponent_clear = function FUiComponent_clear(p){
      var o = this;
      var s = o._components;
      if(s){
         s.clear();
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
   // @param event:TEventProcess 事件处理对象
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FUiComponent_process = function FUiComponent_process(event){
      var o = this;
      // 获得对象是否有效
      var valid = o.__base[event.clazz];
      //..........................................................
      // 事件前处理
      if(valid){
         event.invokeCd = EEventInvoke.Before;
         var callback = o[event.invoke];
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      //..........................................................
      // 处理所有子对象
      if(RClass.isClass(o, MUiContainer)){
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
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      return EEventStatus.Continue;
   }

   //==========================================================
   // <T>初始化当所有组件。</T>
   //
   // @method
   //==========================================================
   MO.FUiComponent_psInitialize = function FUiComponent_psInitialize(){
      var o = this;
      var e = new TEventProcess(o, 'oeInitialize', FUiComponent);
      o.process(e);
      e.dispose();
   }

   //==========================================================
   // <T>释放所有组件。</T>
   //
   // @method
   //==========================================================
   MO.FUiComponent_psRelease = function FUiComponent_psRelease(){
      var o = this;
      var e = new TEventProcess(o, 'oeRelease', FUiComponent);
      o.process(e);
      e.dispose();
   }

   //==========================================================
   // <T>获取当前实例的信息。</T>
   //
   // @method
   // @return String 含有内部信息的字符串
   //==========================================================
   MO.FUiComponent_toString = function FUiComponent_toString(){
      var o = this;
      return RClass.dump(o) + ':label=' + o._label;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiComponent_dispose = function FUiComponent_dispose(){
      var o = this;
      // 清空属性
      o._parent = null;
      o._name = null;
      o._label = null;
      o._tag = null;
      o._components = RObject.dispose(o._components, true);
      // 释放处理
      o.__base.FComponent.dispose.call(o);
   }

   //==========================================================
   // <T>获取运行信息。</T>
   //
   // @method
   // @param s:dump:TString 字符串
   //==========================================================
   MO.FUiComponent_innerDumpInfo = function FUiComponent_innerDumpInfo(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append(',name=', o._name);
      s.append(',label=', o._label);
   }

   //==========================================================
   // <T>获取运行信息。</T>
   //
   // @method
   // @param s:dump:TString 字符串
   // @param l:level:Integer 递归层次
   //==========================================================
   MO.FUiComponent_innerDump = function FUiComponent_innerDump(s, l){
      var o = this;
      o.innerdumpInfo(s);
      // 获取所有子组件的内部信息
      var ps = o.components;
      if(ps){
         s.appendLine();
         var c = ps.count;
         for(var n = 0; n < c; n++){
            var p = ps.value(n);
            if(p){
               p.innerDump(s, l + 1);
            }
         }
      }
      return s;
   }
}
