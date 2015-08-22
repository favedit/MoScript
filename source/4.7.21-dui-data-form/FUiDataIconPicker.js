with(MO){
   //==========================================================
   // <T>文本编辑框。</T>
   //
   // @class
   // @author maocy
   // @version 150102
   //==========================================================
   MO.FUiDataIconPicker = function FUiDataIconPicker(o){
      o = MO.Class.inherits(this, o, FDuiEdit, MUiDataField);
      //..........................................................
      //o.onKeyDown    = MO.Class.register(o, new AEventKeyDown('onKeyDown'));
      //o.onKeyPress   = MO.Class.register(o, new AEventKeyPress('onKeyPress'));
      //o.onKeyUp      = MO.Class.register(o, new AEventKeyUp('onKeyUp'));
      //..........................................................
      // @html
      //o.hUnit         = null;
      //..........................................................
      // @event
      //o.onDataKeyDown = FUiDataIconPicker_onDataKeyDown;
      //..........................................................
      // @method
      //o.formatValue   = FUiDataIconPicker_formatValue;
      //o.setText       = FUiDataIconPicker_setText;
      //o.validText     = FUiDataIconPicker_validText;
      //o.findEditor    = FUiDataIconPicker_findEditor;
      //o.drop          = FUiDataIconPicker_drop;
      return o;
   }

















   //==========================================================
   // <T>数据区按键按下事件。</T>
   //
   // @method
   // @param s:sender:FControl 控件对象
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiDataIconPicker_onDataKeyDown = function FUiDataIconPicker_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEdit.onDataKeyDown.call(o, s, e);
      // 大小写限制
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
      // 自动提示
      //if(o._editable){
         //if(o.editComplete){
         //   if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
         //      var ed = o.findEditor();
         //      if(ed){
         //         ed.onEditKeyDown(s, e);
         //      }
         //   }
         //}
      //}
   }


   //==========================================================
   // <T>格式化数据。</T>
   //
   // @method
   // @param v:value:String 显示内容
   //==========================================================
   MO.FUiDataIconPicker_formatValue = function FUiDataIconPicker_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param t:text:String 内容
   //==========================================================
   MO.FUiDataIconPicker_setText = function FUiDataIconPicker_setText(t){
      var o = this;
      if(!o.hEdit){
         return;
      }
      if('U'== o.editCase){
         o.hEdit.value = RString.toUpper(t);
      }else if('L'== o.editCase){
            o.hEdit.value = RString.toLower(t);
      }else{
         o.hEdit.value = t;
      }
      if('right' == o.editAlign){
         o.hEdit.style.textAlign = 'right';
      }else if('left' == o.editAlign ){
         o.hEdit.style.textAlign = 'left';
      }else{
         o.hEdit.style.textAlign = 'center';
      }
   }

   //==========================================================
   // <T>校验内容。</T>
   //
   // @method
   // @param t:text:String 内容
   // @return 校验结果
   //==========================================================
   MO.FUiDataIconPicker_validText = function FUiDataIconPicker_validText(t){
      var o = this;
      var r = o.__base.FDuiEdit.validText.call(o, t);
      if(!r){
         // 最小长度的校验
         if(o.validLenmin){
            if(o.validLenmin > t.length){
               return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
            }
         }
         // 最大长度的校验
         if(o.validLenmax){
            if(o.validLenmax < t.length){
               return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
            }
         }
      }
      return r;
   }

   //==========================================================
   // <T>查找编辑器。</T>
   //
   // @method
   // @return 编辑器
   //==========================================================
   MO.FUiDataIconPicker_findEditor = function FUiDataIconPicker_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataIconPickerConsole).focus(o, FUiDataIconPickerEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }

   //==========================================================
   // <T>下拉处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiDataIconPicker_drop = function FUiDataIconPicker_drop(){
      var o = this;
      var de = o.findEditor();
      if(de){
         var t = o.reget();
         if(t.length > 0){
            if(o.finded != t){
               if(de.source != o){
                  de.linkControl(o);
               }
               de.search(t);
            }
            o.finded = t;
         }
      }
   }
}
