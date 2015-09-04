//==========================================================
// <T>所有容器控件的基类。</T>
//
// @author maocy
// @version 141231
//==========================================================
MO.FDuiContainer = function FDuiContainer(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiContainer);
   //..........................................................
   // @attributes
   o._controls           = null;
   //..........................................................
   // @process
   o.oeDesign            = MO.Method.empty;
   //..........................................................
   // @method
   o.construct           = MO.FDuiContainer_construct;
   // @method
   o.hasControl          = MO.FDuiContainer_hasControl;
   o.findControl         = MO.FDuiContainer_findControl;
   o.searchControl       = MO.FDuiContainer_searchControl;
   o.controls            = MO.FDuiContainer_controls;
   o.panel               = MO.FDuiContainer_panel;
   o.focusFirstControl   = MO.FDuiContainer_focusFirstControl;
   o.setControlsProperty = MO.FDuiContainer_setControlsProperty;
   o.storeConfig         = MO.FDuiContainer_storeConfig;
   // @method
   o.createChild         = MO.FDuiContainer_createChild;
   o.push                = MO.FDuiContainer_push;
   o.remove              = MO.FDuiContainer_remove;
   o.clear               = MO.FDuiContainer_clear;
   // @method
   o.dispose             = MO.FDuiContainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiContainer_construct = function FDuiContainer_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}

//==========================================================
// <T>判断是否含有子控件。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.FDuiContainer_hasControl = function FDuiContainer_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}

//==========================================================
// <T>根据名称查找一个控件。</T>
//
// @method
// @param p:name:String 名称
// @return FDuiControl 控件
//==========================================================
MO.FDuiContainer_findControl = function FDuiContainer_findControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
      }
   }
   return null;
}

//==========================================================
// <T>根据名称搜索一个控件。</T>
//
// @method
// @param p:name:String 名称
// @return FDuiControl 控件
//==========================================================
MO.FDuiContainer_searchControl = function FDuiContainer_searchControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
         if(MO.Class.isClass(c, MO.FDuiContainer)){
            var f = c.searchControl(p);
            if(f){
               return f;
            }
         }
      }
   }
   return null;
}


//==========================================================
// <T>获得控件集合。</T>
//
// @method
// @return TDictionary 控件集合
//==========================================================
MO.FDuiContainer_controls = function FDuiContainer_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new MO.TDictionary();
      o._controls = r;
   }
   return r;
}

//==========================================================
// <T>根据底板类型得到相应的页面元素。</T>
//
// @method
// @param t:type:EPanel 底板类型
// @return HTML 页面元素
//==========================================================
MO.FDuiContainer_panel = function FDuiContainer_panel(t){
   var o = this;
   if(t == MO.EPanel.Container){
      return o._hPanel;
   }
   return o.__base.FDuiControl.panel.call(o, t);
}

//==========================================================
// <T>设置第一个可以获得焦点的子控件获得焦点。</T>
// <P>若有能获得焦点的控件，则返回第一个获得焦点的控件，若没有，则或什么都不返回。。</P>
//
// @method
// @return MDuiFocus 获得焦点的控件
//==========================================================
MO.FDuiContainer_focusFirstControl = function FDuiContainer_focusFirstControl(){
   var o = this;
   var cs = o._components;
   if(cs){
      // 选择自己第一个可以获得焦点的控件
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var p = cs.valueAt(i);
         if(MO.Class.isClass(c, MO.MDuiFocus) && c.testFocus()){
            // 不允许下拉控件获得第一个焦点
            if(!MO.Class.isClass(c, MO.FCalendar) && !MO.Class.isClass(c, MO.FSelect)  && !MO.Class.isClass(c, MO.FNumber)){
                return c.focus();
            }
         }
      }
      // 自己获得焦点
      MO.Console.find(MO.FFocusConsole).focus(o);
   }
}

//==========================================================
//<T>给当前控件的所有子控件设置属性。</T>
//
// @method
// @param p:property:Stirng 属性名称
// @param vs:values:Object 属性集合
//==========================================================
MO.FDuiContainer_setControlsProperty = function FDuiContainer_setControlsProperty(p, vs){
   var o = this;
   var cs = o._controls;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var c = cs.value(i);
         c[p] = vs[n];
      }
   }
}

//==========================================================
// <T>递归存储所有子对象到XML设置信息中。</T>
//
// @method
// @param x:config:TNode XML节点
//==========================================================
MO.FDuiContainer_storeConfig = function FDuiContainer_storeConfig(x){
   var o = this;
   // 存储当前组件信息
   x.name = MO.Class.name(o);
   o.saveConfig(x);
   // 存储所有子组件信息
   var ps = o._components;
   if(ps){
      var c = ps.count();
      for(var i = 0; i < c; i++){
         var p = ps.value(i);
         var xp = x.create(MO.Class.name(p));
         if(MO.Class.isClass(p, MO.FDuiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
// @return FDuiControl 控件
//==========================================================
MO.FDuiContainer_createChild = function FDuiContainer_createChild(xconfig){
   // 创建实例
   var control = MO.Dui.Control.newInstance(xconfig);
   control._parent = this;
   return control;
}

//==========================================================
// <T>将子控件放入自己的哈希表中</T>
//
// @method
// @param p:component:FComponent 组件对象
//==========================================================
MO.FDuiContainer_push = function FDuiContainer_push(p){
   var o = this;
   // 加载组件
   o.__base.FDuiControl.push.call(o, p);
   // 增加控件控件
   if(MO.Class.isClass(p, MO.FDuiControl)){
      // 存储控件
      o.controls().set(p._name, p);
      // 追加控件
      o.appendChild(p);
   }
}

//==========================================================
// <T>移除指定子控件。</T>
//
// @method
// @param component:FComponent 组件对象
//==========================================================
MO.FDuiContainer_remove = function FDuiContainer_remove(component){
   var o = this;
   // 检查类型
   if(MO.Class.isClass(component, MO.FDuiControl)){
      // 检查存在
      var controls = o._controls;
      if(!controls.contains(component.name())){
         throw new MO.TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      // 移除处理
      controls.removeValue(component);
      // 移除控件
      o.removeChild(component);
   }
   // 父处理
   o.__base.FDuiControl.remove.call(o, component);
}

//==========================================================
// <T>清空所有子控件。</T>
//
// @method
//==========================================================
MO.FDuiContainer_clear = function FDuiContainer_clear(){
   var o = this;
   // 清空控件
   var s = o._controls;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         o.removeChild(s.at(i));
      }
      s.clear();
   }
   // 父处理
   o.__base.FDuiControl.clear.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiContainer_dispose = function FDuiContainer_dispose(){
   var o = this;
   // 释放控件集合
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   // 释放处理
   o.__base.FDuiControl.dispose.call(o);
}
