with(MO){
   //==========================================================
   // <T>编辑器控件的基类。</T>
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.FUiEditor = function FUiEditor(o){
      o = RClass.inherits(this, o, FDuiControl, MUiFocus);
      //..........................................................
      // @property
      o._visible       = false;
      o._statusVisible = false;
      //..........................................................
      // @style
      o._styleEdit     = RClass.register(o, new AStyle('_styleEdit'));
      //..........................................................
      // @attribute
      o._statusEditing = false;
      o._source        = null;
      // @html
      o._hEdit         = null;
      // @listener
      o.lsnEditBegin   = null;
      o.lsnEditCancel  = null;
      o.lsnEditEnd     = null;
      //..........................................................
      // @event
      o.onEditKeyDown  = RClass.register(o, new AEventKeyDown('onEditKeyDown'));
      o.onEditKeyPress = RClass.register(o, new AEventKeyPress('onEditKeyPress'));
      o.onEditKeyUp    = RClass.register(o, new AEventKeyUp('onEditKeyUp'));
      o.onEditChange   = RClass.register(o, new AEventChange('onEditChange'));
      o.onEditBegin    = FUiEditor_onEditBegin;
      o.onEditChanged  = FUiEditor_onEditChanged;
      o.onEditEnd      = FUiEditor_onEditEnd;
      o.onBuildPanel   = FUiEditor_onBuildPanel;
      //..........................................................
      // @process
      o.onBuild        = FUiEditor_onBuild;
      //..........................................................
      // @method
      o.get            = RMethod.virtual(o, 'get');
      o.set            = RMethod.virtual(o, 'set');
      o.doBlur         = FUiEditor_doBlur;
      o.panel          = FUiEditor_panel;
      o.linkControl    = FUiEditor_linkControl;
      o.editBegin      = FUiEditor_editBegin;
      o.editCancel     = FUiEditor_editCancel;
      o.editEnd        = FUiEditor_editEnd;
      o.reset          = FUiEditor_reset;
      o.setVisible     = FUiEditor_setVisible;
      o.dispose        = FUiEditor_dispose;
      return o;
   }

   //==========================================================
   // <T>处理开始编辑事件。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_onEditBegin = function FUiEditor_onEditBegin(){
      this.editBegin();
   }

   //==========================================================
   // <T>处理数据变更事件。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_onEditChanged = function FUiEditor_onEditChanged(){
      var o = this;
      MO.Logger.debug(o, 'Edit changed');
      var g = o.storage = RObject.nvlObj(o.storage);
      if(g.value == o.value()){
         if(o.changed){
            //o._source.onEditChanged(o, false);
            o.changed = false;
         }
      }else{
         if(!o.changed){
            //o._source.onEditChanged(o, true);
            o.changed = true;
         }
      }
   }

   //==========================================================
   // <T>处理结束编辑事件。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_onEditEnd = function FUiEditor_onEditEnd(){
      var o = this;
      var s = o._source;
      // 编辑完成
      MO.Logger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
      o.hide();
      // 处理完成事件
      if(o.lsnEditEnd){
         o.lsnEditEnd.process(o);
      }
      // 清空数据
      s._editor = null;
      o._source = null;
      o._statusEditing = false;
   }

   //==========================================================
   // <T>建立底板。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   MO.FUiEditor_onBuildPanel = function FUiEditor_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createSpan(p);
      h.__linker = o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiEditor_onBuild = function FUiEditor_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o._hPanel.style.zIndex = EUiLayer.Editor;
   }

   //==========================================================
   // <T>设置属性。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_get = function FUiEditor_get(name){
   }

   //==========================================================
   // <T>获取属性。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_set = function FUiEditor_set(name, value){
   }

   //==========================================================
   // <T>失去焦点。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_doBlur = function FUiEditor_doBlur(){
      var o = this;
      var s = o._source;
      if(s){
         o.editCancel();
         if(RClass.isClass(s, MUiFocus)){
            s.doBlur();
         }
      }
   }

   //==========================================================
   // <T>获得底板。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_panel = function FUiEditor_panel(p){
      var o = this;
      if(p == EPanel.Edit){
         return o._hEdit;
      }else if(p == EPanel.Focus){
         return o._hEdit;
      }
      return o.__base.FDuiControl.panel.call(o, p);
   }

   //==========================================================
   // <T>关联控件。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_linkControl = function FUiEditor_linkControl(c){
      var o = this;
      o._source = c;
   }

   //==========================================================
   // <T>开始编辑。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_editBegin = function FUiEditor_editBegin(){
      var o = this;
      var s = o._source;
      // 编辑开始
      MO.Logger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
      // 处理开始事件
      if(o.lsnEditCancel){
         o.lsnEditCancel.process(o);
      }
      // 设置数据
      s._editor = o;
      o._statusEditing = true;
   }

   //==========================================================
   // <T>取消编辑。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_editCancel = function FUiEditor_editCancel(){
      var o = this;
      var s = o._source;
      // 编辑完成
      MO.Logger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
      o.hide();
      // 处理取消事件
      if(o.lsnEditCancel){
         o.lsnEditCancel.process(o);
      }
      // 清空数据
      s._editor = null;
      o._source = null;
      o._statusEditing = false;
   }

   //==========================================================
   // <T>结束编辑。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_editEnd = function FUiEditor_editEnd(){
      this.onEditEnd();
   }

   //==========================================================
   // <T>重置操作。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_reset = function FUiEditor_reset(){
      var o = this;
      o.lsnEditBegin = null;
      o.lsnEditCancel = null;
      o.lsnEditEnd = null;
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @method
   // @param p:visible:Boolean 是否显示
   //==========================================================
   MO.FUiEditor_setVisible = function FUiEditor_setVisible(p){
      var o = this;
      o.__base.FDuiControl.setVisible.call(o, p);
      if(p){
         o.editBegin();
         o.focus();
      }
   }

   //==========================================================
   // <T>释放对象。</T>
   //
   // @method
   //==========================================================
   MO.FUiEditor_dispose = function FUiEditor_dispose(){
      var o = this;
      o.__base.FDuiControl.dispose.call(o);
      o._hEdit = null;
   }
}
