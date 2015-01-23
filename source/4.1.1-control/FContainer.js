//==========================================================
// <T>所有容器控件的基类。</T>
//
// @author maocy
// @version 141231
//==========================================================
function FContainer(o){
   o = RClass.inherits(this, o, FControl, MContainer);
   //..........................................................
   // @process
   o.oeBuild     = FContainer_oeBuild
   //..........................................................
   // @method
   o.createChild = FContainer_createChild;



   //..........................................................
   // @process
   o.oeDesign            = RMethod.empty;
   //..........................................................
   // @method
   o.panel               = FContainer_panel;
   o.focusControl        = FContainer_focusControl;
   o.storeConfig         = FContainer_storeConfig;
   o.psBuildChildren     = FContainer_psBuildChildren;
   o.setChildrenProperty = FContainer_setChildrenProperty;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FContainer_oeBuild(p){
   var o = this;
   o.__base.FControl.oeBuild.call(o, p)
   // 事件前处理
   if(p.isAfter()){
      // 追加
      var cs = o._components;
      if(cs){
         var c = cs.count();
         for(var i = 0; i < c; i++){
            o.appendChild(cs.value(i));
         }
      }
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
// @return FControl 控件
//==========================================================
function FContainer_createChild(p){
   var c = RControl.newInstance(p.name());
   c._parent = this;
   return c;
}











//==========================================================
// <T>根据底板类型得到相应的页面元素。</T>
//
// @method
// @param t:type:EPanel 底板类型
// @return HTML 页面元素
// @see FControl.panel
//==========================================================
function FContainer_panel(t){
   var o = this;
   if(EPanel.Container == t){
      return o.hPanel;
   }
   return o.__base.FControl.panel.call(o, t);
}

//==========================================================
// <T>设置第一个可以获得焦点的子控件获得焦点。</T>
//
// @method
// @return MFocus 若有能获得焦点的控件，则返回第一个获得焦点的控件，若没有，则或什么都不返回。
//==========================================================
function FContainer_focusControl(){
   return null;
   var o = this;
   var cs = o.controls;
   if(cs){
      // 选择自己第一个可以获得焦点的控件
      var cc = cs.count;
      for(var n=0; n<cc; n++){
         var c = cs.value(n);
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
// <T>递归存储所有子对象到XML设置信息中。</T>
//
// @method
// @param x:config:TNode XML节点
//==========================================================
function FContainer_storeConfig(x){
   var o = this;
   // 存储当前组件信息
   x.name = RClass.name(o);
   o.saveConfig(x);
   // 存储所有子组件信息
   var ps = o.components;
   if(ps){
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}

//==========================================================
// <T>构建当前控件的所有子控件。</T>
//
// @method
//==========================================================
function FContainer_psBuildChildren(){
   var o = this;
   var e = REvent.alloc(o, EEvent.Build);
   o.ps(e, null, true);
   REvent.free(e);
}

//==========================================================
//<T>给当前控件的所有子控件设置属性。</T>
//
// @method
// @param p:property:Stirng 属性名称
// @param vs:values:键值集合   属性集合
//==========================================================
function FContainer_setChildrenProperty(p, vs){
   var o = this;
   for(var n in vs){
      o.component(n)[p] = vs[n];
   }
}
