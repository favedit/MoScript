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
function FComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   //..........................................................
   // @attribute FComponent 父组件
   o._parent       = null;
   // @attribute TDictionary 组件字典
   o._components   = null;
   //..........................................................
   // @property String 名称
   o._name         = RClass.register(o, new APtyString(null, '_name'));
   // @property String 标签
   o._label        = RClass.register(o, new APtyString(null, '_label'));
   //..........................................................
   /// @process
   o.oeInitialize  = FComponent_oeInitialize;
   o.oeRelease     = FComponent_oeRelease;
   //..........................................................
   /// @method
   o.isParent      = FComponent_isParent;
   o.topComponent  = FComponent_topComponent;
   o.hasComponent  = FComponent_hasComponent;
   o.components    = FComponent_components;
   o.push          = FComponent_push;
   o.process       = FComponent_process;
   o.psInitialize  = FComponent_psInitialize;
   o.psRelease     = FComponent_psRelease;
   o.toString      = FComponent_toString;
   o.dispose       = FComponent_dispose;
   o.innerDumpInfo = FComponent_innerDumpInfo;
   o.innerDump     = FComponent_innerDump;
   return o;
}

//==========================================================
// <T>处理初始化事件。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FComponent_oeInitialize(e){
   return EEventStatus.Continue;
}

//==========================================================
// <T>处理释放事件。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FComponent_oeRelease(e){
   return EEventStatus.Continue;
}

//==========================================================
// <T>判断自己是否指定组件的父。</T>
//
// @method
// @param p:component:FComponent 组件
// @return Boolean 是否指定组件的父
//==========================================================
function FComponent_isParent(p){
   while(p){
      if(p == this){
         return true;
      }
      p = p._parent;
   }
}

//==========================================================
// <T>得到符合指定类的父组件。</T>
// <P>如果没有指定类，则获得最顶层组件。</P>
//
// @method
// @param c:class:Class 类
// @return FComponent 组件
//==========================================================
function FComponent_topComponent(c){
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
function FComponent_hasComponent(){
   var ps = this._components;
   return ps ? !ps.isEmpty() : false;
}

//==========================================================
// <T>获得组件集合。</T>
//
// @method
// @return TDictionary 组件集合
//==========================================================
function FComponent_components(){
   var o = this;
   var r = o._components;
   if(r == null){
      r = new TDictionary();
      o._components = r;
   }
   return r;
}

//==========================================================
// <T>将子组件放入自己的哈希表中</T>
// <P>如果子组件的名称为空，则给当前子组件创建一个数字的索引名。</P>
// <P>保证子组件不会被其他未命名的子组件所覆盖。</P>
// 
// @method
// @param p:component:FComponent 组件对象
//==========================================================
function FComponent_push(p){
   var o = this;
   if(RClass.isClass(p, FComponent)){
      // 获得子组件集合
      var ps = o.components();
      // 设置子组件名称
      p.parent = o;
      if(p._name == null){
         p._name = ps.count();
      }
      // 存储子组件
      ps.set(p._name, p);
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
// @param e:event:TEventProcess 事件处理对象
// @return EEventStatus 处理状态
//==========================================================
function FComponent_process(e){
   var o = this;
   // 获得对象是否有效
   var v = o.__base[e.clazz];
   //..........................................................
   // 事件前处理
   if(v){
      e.invokeCd = EEventInvoke.Before;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   //..........................................................
   // 处理所有子对象
   if(RClass.isClass(o, MContainer)){
      var ps = o._components;
      if(ps){
         var pc = ps.count();
         if(pc){
            for(var i = 0; i < pc; i++){
               var p = ps.value(i);
               if(p){
                  var r = p.process(e);
                  if(r == EEventStatus.Cancel){
                     return r;
                  }
               }
            }
         }
      }
   }
   //..........................................................
   // 事件后处理
   if(v){
      e.invokeCd = EEventInvoke.After;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>初始化当所有组件。</T>
//
// @method
//==========================================================
function FComponent_psInitialize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeInitialize', FComponent);
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>释放所有组件。</T>
//
// @method
//==========================================================
function FComponent_psRelease(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRelease', FComponent);
   o.process(e);
   e.dispose();
}

//==========================================================
// <T>获取当前实例的信息。</T>
//
// @method
// @return String 含有内部信息的字符串
//==========================================================
function FComponent_toString(){
   var o = this;
   return RClass.dump(o) + ':label=' + o._label;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function FComponent_dispose(){
   var o = this;
   o._parent = null;
   o._components = null;
   o.__base.FObject.dispose.call(o);
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param s:dump:TString 字符串
//==========================================================
function FComponent_innerDumpInfo(s){
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
function FComponent_innerDump(s, l){
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
