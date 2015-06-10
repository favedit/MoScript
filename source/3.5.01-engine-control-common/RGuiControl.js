with(MO){
   //==========================================================
   // <T>控件的管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 150120
   //==========================================================
   MO.RGuiControl = function RGuiControl(){
      var o = this;
      //..........................................................
      // @property
      o.PREFIX    = 'FGui';
      return o;
   }

   //==========================================================
   // <T>创建一个实例。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FComponent 控件
   //==========================================================
   MO.RGuiControl.prototype.newInstance = function RGuiControl_newInstance(p){
      var o = this;
      var r = null;
      if(p){
         var n = null
         var tn = null;
         if(p.constructor == String){
            // 字符串
            if(!RString.startsWith(p, o.PREFIX)){
               n = o.PREFIX + p;
            }
         }else if(p.constructor == TXmlNode){
            // 配置节点
            n = p.get('type');
            if(RString.isEmpty(n)){
               n = p.name();
               if(!RString.startsWith(n, o.PREFIX)){
                  n = o.PREFIX + n;
               }
            }else{
               tn = n;
            }
         }else{
            throw new TError(o, 'Unknown parameter. (name={p})', p);
         }
         // 创建实例
         r = RClass.create(n);
         if(tn){
            r.__typed = true;
         }
      }
      if(r == null){
         throw new TError(o, 'Create instance failure. (name={p})', p);
      }
      return r;
   }

   //==========================================================
   // <T>连接一个页面事件。</T>
   //
   // @method
   // @param control:FGuiControl 控件对象
   // @param name:String 事件名称
   // @param html:HtmlTag 页面元素
   // @param method:Function 处理函数
   // @param capture:Boolean 是否捕捉
   //==========================================================
   MO.RGuiControl.prototype.attachEvent = function RGuiControl_attachEvent(control, name, h, m, u){
      var o = this;
      var e = null;
      var p = control[name];
      if(!RMethod.isEmpty(p) || m){
         // 获得注册过的事件对象
         var cz = RClass.find(control.constructor);
         var a = cz.annotation(EAnnotation.Event, n);
         // 复制当前注册事件
         e = a.create();
         e.annotation = a;
         e.source = control;
         e.hSource = h;
         // 设置立即回调事件
         e.ohProcess = m;
         // 设置队列回调事件
         e.onProcess = p;
         // 存储事件
         e.process = RUiEvent.onProcess;
         RUiEvent.find(h).push(a.linker(), e);
         // 关联事件处理到HTML元素上
         RHtml.linkSet(h, '_plink', c);
         a.bind(h, u);
      }
      return e;
   }

   //===========================================================
   // <T>根据配置信息内部构件一个控件。</T>
   //
   // @method
   // @param parentControl:FGuiControl 父控件对象
   // @param control:FGuiControl 控件对象
   // @param xconfig:TXmlNode 配置节点
   // @param attributes:Object 属性集合
   //===========================================================
   MO.RGuiControl.prototype.innerbuild = function RGuiControl_innerbuild(parentControl, control, xconfig, attributes){
      var o = this;
      // 检查参数
      if((control == null) || (xconfig == null)){
         return;
      }
      // 加载属性集合
      if(RClass.isClass(control, MProperty)){
         control.propertyLoad(xconfig);
      }
      var linker = xconfig.get('linker');
      if(linker && parentControl){
         parentControl[linker] = control;
      }
      // 构建处理
      if(RClass.isClass(control, FGuiControl)){
         //if(!control.isBuild()){
         //   control.build(ph);
         //}else{
         //   control.refresh();
         //}
      }
      // 检查类型化
      if(control.__typed){
         parentControl = control;
      }
      // 建立子节点
      if(RClass.isClass(control, MGuiContainer) && xconfig.hasNode()){
         var nodes = xconfig.nodes();
         var nodeCount = nodes.count();
         for(var i = 0; i < nodeCount; i++){
            var xnode = nodes.at(i);
            var child = control.createChild(xnode);
            if(!child){
               throw new TError('Invalid create child.');
            }
            o.innerbuild(parentControl, child, xnode, attributes);
            control.push(child);
         }
      }
      // 构建完成处理
      if(RClass.isClass(control, FGuiControl)){
         //control.builded(ph);
      }
   }

   //===========================================================
   // <T>根据配置信息构件一个控件。</T>
   // <P>控件构造顺序：
   //   <OL>
   //     <L title='CreateChild'>通过父实例创建实例。</L>
   //     <L title='Construct'>实例的构造处理。</L>
   //     <L title='PropertyLoad'>加载配置信息。</L>
   //     <L title='Build'>构建页面处理。</L>
   //     <L title='appendChild'>追加到父实例中。</L>
   //     <L title='setPanel'>将当前控件放在地板上，成为可见控件</L>
   //   </OL>
   // </P>
   //
   // @method
   // @param control:FUiControl 控件对象
   // @param xconfig:TXmlNode 配置节点
   // @param attributes:Object 属性集合
   //===========================================================
   MO.RGuiControl.prototype.build = function RGuiControl_build(control, xconfig, attributes){
      var o = this;
      // 创建控件对象
      if(!control){
         control = o.newInstance(xconfig);
      }
      // 内部构造
      o.innerbuild(control, control, xconfig, attributes);
      return control;
   }
   //..........................................................
   // 实例化内容
   MO.RGuiControl = new RGuiControl();
}
