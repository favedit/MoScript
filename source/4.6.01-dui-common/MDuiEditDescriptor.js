//==========================================================
// <T>可编辑空间的管理类</T>
//
// @manger
// @history 090921 MAOCY 创建
//==========================================================
MO.MDuiEditDescriptor = function MDuiEditDescriptor(o){
   o = MO.Class.inherits(this, o, MO.MEditable);
   //..........................................................
   // @property
   o._dataName          = MO.Class.register(o, new MO.APtyString(null, '_dataName'));
   o._dataCode          = MO.Class.register(o, new MO.APtyString(null, '_dataCode'));
   o._dataDefault       = MO.Class.register(o, new MO.APtyString(null, '_dataDefault'));
   o._labelIcon         = MO.Class.register(o, new MO.APtyString(null, '_labelIcon'));
   o._labelIconDisable  = MO.Class.register(o, new MO.APtyString(null, '_labelIconDisable'));
   o._labelColor        = MO.Class.register(o, new MO.APtyString(null, '_labelColor'));
   o._labelAlign        = MO.Class.register(o, new MO.APtyString(null, '_labelAlign', null, MO.EAlign.Left));
   o._labelValign       = MO.Class.register(o, new MO.APtyString(null, '_labelValign', null, MO.EAlign.Middle));
   // @property 编辑设置
   o._editSearch        = MO.Class.register(o, new MO.APtySet(null, '_editSearch', 'editAccess', MO.EEditConfig.Search, false));
   o._editCopy          = MO.Class.register(o, new MO.APtySet(null, '_editCopy', 'editAccess', MO.EEditConfig.Copy, false));
   // @property
   o._editAlign         = MO.Class.register(o, new MO.APtyString(null, '_editAlign', null, MO.EAlign.Left));
   o._editValign        = MO.Class.register(o, new MO.APtyString(null, '_editValign', null, MO.EAlign.Middle));
   o._editFormat        = MO.Class.register(o, new MO.APtyString(null, '_editFormat'));
   o._editUnit          = MO.Class.register(o, new MO.APtyString(null, '_editUnit'));
   o._editTip           = MO.Class.register(o, new MO.APtyString(null, '_editTip'));
   // @property 校验模式设置
   o._validInsert       = MO.Class.register(o, new MO.APtySet(null, '_validInsert', 'validAccess', MO.EDisplayMode.Insert, false));
   o._validUpdate       = MO.Class.register(o, new MO.APtySet(null, '_validUpdate', 'validAccess', MO.EDisplayMode.Update, false));
   o._validDelete       = MO.Class.register(o, new MO.APtySet(null, '_validDelete', 'validAccess', MO.EDisplayMode.Delete, false));
   o._validRequire      = MO.Class.register(o, new MO.APtyBoolean(null, '_validRequire', null, false));
   //..........................................................
   // @attribute
   //o.__tip             = null;
   //o._validable        = false;
   //..........................................................
   // @event
   //o.onDataEnter       = MO.Class.register(o, new HMouseEnter('onDataEnter'), MDuiEditDescriptor_onDataEnter);
   //o.onDataLeave       = MO.Class.register(o, new HMouseLeave('onDataLeave'), MDuiEditDescriptor_onDataLeave);
   //o.onDataMouseOver   = MO.Class.register(o, new HMouseOver('onDataMouseOver'));
   //o.onDataMouseOut    = MO.Class.register(o, new HMouseOut('onDataMouseOut'));
   //o.onDataMouseDown   = MO.Class.register(o, new HMouseDown('onDataMouseDown'));
   //o.onDataMouseUp     = MO.Class.register(o, new HMouseUp('onDataMouseUp'));
   //o.onDataFocus       = MO.Class.register(o, new HFocus('onDataFocus'));
   //o.onDataBlur        = MO.Class.register(o, new HBlur('onDataBlur'));
   //o.onDataClick       = MO.Class.register(o, new HClick('onDataClick'));
   //o.onDataDoubleClick = MO.Class.register(o, new HDoubleClick('onDataDoubleClick'));
   //o.onDataKeyDown     = MO.Class.register(o, new HKeyDown('onDataKeyDown'), MDuiEditDescriptor_onDataKeyDown);
   //o.onDataKeyPress    = MO.Class.register(o, new HKeyPress('onDataKeyPress'));
   //o.onDataKeyUp       = MO.Class.register(o, new HKeyUp('onDataKeyUp'));
   //o.onDataChange      = MO.Class.register(o, new HChange('onDataChange'), MDuiEditDescriptor_onDataChange);
   //o.onDataChanged     = RMethod.empty;
   //o.onDataEditBegin   = RMethod.empty;
   //o.onDataEditEnd     = MDuiEditDescriptor_onDataEditEnd;
   //..........................................................
   // @process
   //o.oeSaveCode        = MDuiEditDescriptor_oeSaveCode;
   //..........................................................
   // @method
   //o.canValid          = MDuiEditDescriptor_canValid;
   //o.__changedEvent    = new TEvent();
   //o.formatValue       = MDuiEditDescriptor_formatValue;
   //o.formatText        = MDuiEditDescriptor_formatText;
   //o.setInfo           = RMethod.empty;
   //o.validText         = MDuiEditDescriptor_validText;
   return o;
}

//==========================================================
// <T>数据更新完成。</T>
//
// @method
// @param s:source:MEditValue 编辑对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_onDataEnter = function MDuiEditDescriptor_onDataEnter(s, e){
   var o = this;
   // 检查加载中
   if(s.__progress){
      return;
   }
   // 设置热点样式
   if(s._editable){
      s._hover = true;
      s.refreshStyle();
   }
   // 显示提示信息
   if(o.editTip){
      o.__tip = window.status;
   }
}

//==========================================================
// <T>数据更新完成。</T>
//
// @method
// @param s:source:MEditValue 编辑对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_onDataLeave = function MDuiEditDescriptor_onDataLeave(s, e){
   var o = this;
   // 检查加载中
   if(s.__progress){
      return;
   }
   // 取消热点样式
   if(s._editable){
      o._hover = false;
      o.refreshStyle();
   }
   // 恢复提示信息
   if(o.editTip){
      window.status = o.__tip;
   }
}

//==========================================================
// <T>数据键盘按下事件。</T>
//
// @method
// @param s:source:MEditValue 编辑对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_onDataKeyDown = function MDuiEditDescriptor_onDataKeyDown(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      // 校验数据
      s._invalidText = o.validText(s.text());
      s.refreshStyle();
   }
}

//==========================================================
// <T>数据修改事件。</T>
//
// @method
// @param s:source:MEditValue 编辑对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_onDataChange = function MDuiEditDescriptor_onDataChange(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      if(s.isTextChanged()){
         // 校验数据
         var t = s.text();
         var vt = s._invalidText = o.validText(t);
         if(vt){
            s.refreshStyle();
            //MO.Logger.debug(o, 'Edit changed event (text=[{0}]->[{1}])', s.dataText, t);
            //s.storeText();
            //o.onDataChanged(s, e);
            // o.onEditEnd(s, e);
         }else{
            //s.setEditStyle(EStyle.Invalid);
            //MO.Logger.debug(o, 'Edit data invalid (text=[{0}]->[{1}])', s.dataText, t);
            //s.storeText(s, e);
         }
         o.callEvent('onDataChange', o, o.__changedEvent);
      }
   }
}

//==========================================================
// <T>数据更新完成。</T>
//
// @method
// @param s:source:MEditValue 编辑对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_onDataEditEnd = function MDuiEditDescriptor_onDataEditEnd(s, e){
   var o = this;
   // 校验数据内容
   var vt = s._invalidText = o.validText(s.text());
   if(vt){
      // 校验失败
      MO.Logger.debug(this, 'Edit valid failed ({0})', vt);
   }else{
      // 校验成功
      s.commitValue();
   }
   if(s.isTextChanged()){
	   o.callEvent('onDataChange', o, o.__changedEvent);
   }
   s.refreshStyle();
}

//==========================================================
// <T>存储代码处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDescriptor_oeSaveCode = function MDuiEditDescriptor_oeSaveCode(e){
   var o = this;
   if(!MO.Lang.String.isEmpty(o.dataName) && !MO.Lang.String.isEmpty(o.dataCode)){
      e.values.set(o.dataName, o.dataCode);
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>测试当前模式下是否可以校验。</T>
//
// @method
// @param m:mode:EMode 模式
// @return Boolean 可否校验
//==========================================================
MO.MDuiEditDescriptor_canValid = function MDuiEditDescriptor_canValid(m){
   var o = this;
   switch(MO.Lang.String.nvl(m, o._emode)){
      case MO.EMode.Insert:
         return o.validInsert;
      case MO.EMode.Update:
         return o.validUpdate;
      case MO.EMode.Delete:
         return o.validDelete;
   }
}

//==========================================================
// <T>格式化文本值到内容。</T>
//
// @method
// @param v:value:String 数据内容
//==========================================================
MO.MDuiEditDescriptor_formatValue = function MDuiEditDescriptor_formatValue(v){
   return MO.Lang.String.nvl(v);
}

//==========================================================
// <T>格式化文本内容到值。</T>
//
// @method
// @param t:text:String 显示内容
//==========================================================
MO.MDuiEditDescriptor_formatText = function MDuiEditDescriptor_formatText(t){
   return MO.Lang.String.nvl(t);
}

//==========================================================
// <T>检测显示内容正确性。</T>
// <P>如果正确返回空，如果不正确，返回问题描述。</P>
//
// @method
// @param t:text:String 显示内容
//==========================================================
MO.MDuiEditDescriptor_validText = function MDuiEditDescriptor_validText(t){
   var o = this;
   // 必须性检查
   //if(o.validRequire){
      //if(MO.Lang.String.isEmpty(t)){
         //return RContext.get('MDuiEditDescriptor:Empty');
      //}
   //}
}
