//==========================================================
// <T>界面工具栏数据按键。</T>
//
// @class
// @author maocy
// @history 150121
//==========================================================
function FUiDataToolButton(o){
   o = RClass.inherits(this, o, FUiToolButton);
   //..........................................................
   // @property
   o._serviceName     = RClass.register(o, new APtyString('_serviceName'));
   //o._type            = RClass.register(o, new APtyString('_type'));
   //o._dataAction      = RClass.register(o, new APtyString('_dataAction'));
   //o._target          = RClass.register(o, new APtyString('_target'));
   //o._page            = RClass.register(o, new APtyString('_page'));
   //o._method          = RClass.register(o, new APtyString('_method'));
   //o._attributes      = RClass.register(o, new APtyString('_attributes'));
   //..........................................................
   // @event
   //o.onButtonClick   = RClass.register(o, new AEventClick('onButtonClick'), FUiDataToolButton_onButtonClick);
   //..........................................................
   // @style
   //o._styleIconDisable   = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   //o._styleButton        = RClass.register(o, new AStyleIcon('_styleButton', 'Button'));
   //o._styleButtonDisable = RClass.register(o, new AStyleIcon('_styleButtonDisable', 'ButtonDisable'));
   //o._styleButtonHover   = RClass.register(o, new AStyleIcon('_styleButtonHover', 'ButtonHover'));
   //..........................................................
   // @html
   //o._hButton         = null;
   //o._hButtonLine     = null;
   //o._hButtonPanel    = null;
   //..........................................................
   // @event
   //o.onShowHint      = FUiDataToolButton_onShowHint;
   return o;
}

//==========================================================
// <T>点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiDataToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
   //if(o.isVisible() && !o._disabled && (EAction.Design != o.inAction)){
      // 存储当前焦点对象，强制失去焦点
      //alert('o._disabled='+o._disabled);
      //var fc = RConsole.find(FFocusConsole);
      //fc.storeFocus();
      //fc.blur();
      // 执行监听信息
      o.processClickListener(o);
      // 执行按键操作
      //if(o._action){
      //   eval(o._action);
      //}
      //if(o._service){
      //   // 分解service
      //   var servs = RString.splitTwo(o._service, '@');
      //   // 找到表单对象
      //   var f = RConsole.find(FFocusConsole).findClass(MDataset);
      //   // 构建处理事件对象
      //   var arg = new TDatasetServiceArg(f.name, o._dataAction);
      //   arg.callback = new TInvoke(f, f.onDsProcess);
      //   arg.rows = f.getCurrentRows();
      //   RConsole.find(FFormConsole).process(arg);
      //}
      //if(o._page || o._method){
         //var form = RHtml.form(o._hButton);
         //var p = RPage.parse(o._page);
         //if(o._method){
         //   p._action = o._method;
         //}
         //p.split(o._attributes);
         //
         //var f = RConsole.find(FFocusConsole).findClass(MDataset);
         //if(f){
            //var as = new TAttributes();
            //f.saveValue(as);
            //p.attrs().set('form_pack', as.pack());
            //if(form && form.form_pack){
            //   form.form_pack.value = as.pack();
            //}
         //}
         //p.post(form, o._target);
         /*for(var n = 0;n < p._attributes.count; n++){
            if(RStr.contains(p._attributes.value(n),'$')){
               var v = RStr.removeChars(p._attributes.value(n),'$');
               v = RStr.removeChars(v,'{');
               v = RStr.removeChars(v,'}');
               var f = RConsole.find(FFocusConsole).findClass(MDataset);
               debugger
               var ctl = f.controls.get(v);
               if(RClass.checkClass(ctl,MEditValue)){
                  p.attribues.setValue(n,ctl.get());
               }
            }
         }*/
      //}
      //o.processClick();
   //}
}

/**************************************************************
 * 相应点击事件
 *
 * @method
 * @see FUiDataToolButton_onClick
 **************************************************************/
function FUiDataToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
