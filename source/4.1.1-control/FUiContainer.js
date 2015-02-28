//==========================================================
// <T>所有容器控件的基类。</T>
//
// @author maocy
// @version 141231
//==========================================================
function FUiContainer(o){
   o = RClass.inherits(this, o, FUiControl, MUiContainer);
   //..........................................................
   // @property Boolean 是否禁止
   o._scrollCd           = RClass.register(o, new APtyEnum('_scrollCd', null, EUiScroll, EUiScroll.None));
   //..........................................................
   // @attributes
   o._controls           = null;
   //..........................................................
   // @process
   o.oeDesign            = RMethod.empty;
   //..........................................................
   // @method
   o.construct           = FUiContainer_construct;
   // @method
   o.hasControl          = FUiContainer_hasControl;
   o.findControl         = FUiContainer_findControl;
   o.searchControl       = FUiContainer_searchControl;
   o.controls            = FUiContainer_controls;
   o.panel               = FUiContainer_panel;
   o.focusFirstControl   = FUiContainer_focusFirstControl;
   o.setControlsProperty = FUiContainer_setControlsProperty;
   o.storeConfig         = FUiContainer_storeConfig;
   // @method
   o.push                = FUiContainer_push;
   o.remove              = FUiContainer_remove;
   o.clear               = FUiContainer_clear;
   // @method
   o.dispose             = FUiContainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiContainer_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}

//==========================================================
// <T>判断是否含有子控件。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FUiContainer_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}

//==========================================================
// <T>根据名称查找一个控件。</T>
//
// @method
// @param p:name:String 名称
// @return FUiControl 控件
//==========================================================
function FUiContainer_findControl(p){
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
// @return FUiControl 控件
//==========================================================
function FUiContainer_searchControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
         if(RClass.isClass(c, FUiContainer)){
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
function FUiContainer_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
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
function FUiContainer_panel(t){
   var o = this;
   if(t == EPanel.Container){
      return o._hPanel;
   }
   return o.__base.FUiControl.panel.call(o, t);
}

//==========================================================
// <T>设置第一个可以获得焦点的子控件获得焦点。</T>
// <P>若有能获得焦点的控件，则返回第一个获得焦点的控件，若没有，则或什么都不返回。。</P>
//
// @method
// @return MFocus 获得焦点的控件
//==========================================================
function FUiContainer_focusFirstControl(){
   return null;
   var o = this;
   var cs = o._components;
   if(cs){
      // 选择自己第一个可以获得焦点的控件
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var p = cs.value(i);
         if(RClass.isClass(c, MFocus) && c.testFocus()){
            // 不允许下拉控件获得第一个焦点
            if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                return c.focus();
            }
         }
      }
      // 自己获得焦点
      RConsole.find(FFocusConsole).focus(o);
   }
}

//==========================================================
//<T>给当前控件的所有子控件设置属性。</T>
//
// @method
// @param p:property:Stirng 属性名称
// @param vs:values:Object 属性集合
//==========================================================
function FUiContainer_setControlsProperty(p, vs){
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
function FUiContainer_storeConfig(x){
   var o = this;
   // 存储当前组件信息
   x.name = RClass.name(o);
   o.saveConfig(x);
   // 存储所有子组件信息
   var ps = o._components;
   if(ps){
      var c = ps.count();
      for(var i = 0; i < c; i++){
         var p = ps.value(i);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FUiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}

//==========================================================
// <T>将子控件放入自己的哈希表中</T>
//
// @method
// @param p:component:FComponent 组件对象
//==========================================================
function FUiContainer_push(p){
   var o = this;
   // 加载组件
   o.__base.FUiControl.push.call(o, p);
   // 增加控件控件
   if(RClass.isClass(p, FUiControl)){
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
// @param p:component:FComponent 组件对象
//==========================================================
function FUiContainer_remove(p){
   var o = this;
   // 检查类型
   if(RClass.isClass(p, FUiControl)){
      // 检查存在
      var s = o._controls;
      if(!s || (s && !s.constanis(p.name()))){
         throw new TError(o, 'Parameter component is not in this component. (name={1})', p.name());
      }
      // 移除处理
      s.remove(p);
   }
   // 父处理
   o.__base.FUiControl.remove.call(o, p);
}

//==========================================================
// <T>清空所有子控件。</T>
//
// @method
//==========================================================
function FUiContainer_clear(){
   var o = this;
   // 清空控件
   var s = o._controls;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         o.removeChild(s.valueAt(i));
      }
      s.clear();
   }
   // 父处理
   o.__base.FUiControl.clear.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiContainer_dispose(){
   var o = this;
   // 释放控件集合
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   // 释放处理
   o.__base.FUiControl.dispose.call(o);
}
