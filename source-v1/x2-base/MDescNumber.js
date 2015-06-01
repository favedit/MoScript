//==========================================================
// <T>数字描述器。</T>
//
// @manager
// @history 091106 MAOCY 创建
//==========================================================
function MDescNumber(o){
   o = RClass.inherits(this, o, MValidator);
   //..........................................................
   // @property 输入方式
   o.editPattern     = RClass.register(o, new TPtyStr('editPattern'));
   // @property 可输入长度
   o.editLength      = RClass.register(o, new TPtyInt('editLength'));
   // @property 是否要用分隔符分隔
   o.editSplitter    = RClass.register(o, new TPtyStr('editSplitter'));
   // @property 变化单位
   o.editIncreate    = RClass.register(o, new TPtyStr('editIncreate', 1));
   // @property 数字精度
   o.editPrecision   = RClass.register(o, new TPtyStr('editPrecision'));
   // @property 四舍五入
   o.editRound       = RClass.register(o, new TPtyBool('editRound', false));
   // @property 允许为最小值
   o.validEqlmin     = RClass.register(o, new TPtyStr('validEqlmin'));
   // @property 允许为最大值
   o.validEqlmax     = RClass.register(o, new TPtyStr('validEqlmax'));
   // @property 最小值
   o.validValmin     = RClass.register(o, new TPtyStr('validValmin'));
   // @property 最大值
   o.validValmax     = RClass.register(o, new TPtyStr('validValmax'));
   //..........................................................
   // @style
   o.stUnit          = RClass.register(o, new TStyle('Unit'));
   o.stAdjustForm    = RClass.register(o, new TStyle('AdjustForm'));
   o.stUpButton      = RClass.register(o, new TStyle('UpButton'));
   o.stDownButton    = RClass.register(o, new TStyle('DownButton'));
   //..........................................................
   // @styleIcon
   o.siUp            = RClass.register(o, new TStyleIcon('Up'));
   o.siUpSelect      = RClass.register(o, new TStyleIcon('UpSelect'));
   o.siDown          = RClass.register(o, new TStyleIcon('Down'));
   o.siDownSelect    = RClass.register(o, new TStyleIcon('DownSelect'));
   //..........................................................
   // @html
   o.hAdjustForm     = null;
   o.hUpIcon         = null;
   o.hDownIcon       = null;
   //..........................................................
   // @event
   o.onUpMouseDown   = RClass.register(o, new HMouseDown('onUpMouseDown'), MDescNumber_onUpMouseDown);
   o.onDownMouseDown = RClass.register(o, new HMouseDown('onDownMouseDown'), MDescNumber_onDownMouseDown);
   o.onMouseWheel    = MDescNumber_onMouseWheel;
   //..........................................................
   // @process
   o.oeValid         = MDescNumber_oeValid;
   //..........................................................
   // @method
   o.buildAdjustForm = MDescNumber_buildAdjustForm;
   o.formatValue     = MDescNumber_formatValue;
   o.formatText      = MDescNumber_formatText;
   o.adjustValue     = MDescNumber_adjustValue;
   return o;
}

//==========================================================
// <T>响应上按键鼠标按下操作。</T>
//
// @param e:event 事件内容
//==========================================================
function MDescNumber_onUpMouseDown(e){
   var o = this;
   if(o._editable){
      e.hSource.src = o.styleIconPath('Up');
      o.adjustValue(true);
   }
}

//==========================================================
// <T>响应鼠标按下操作。</T>
//
// @param e:event 事件内容
//==========================================================
function MDescNumber_onDownMouseDown(e){
   var o = this;
   if(o._editable){
      e.hSource.src = o.styleIconPath('Down');
      o.adjustValue(false);
   }
}

//==========================================================
// <T>响应鼠标滚动操作。</T>
//
// @param e:event 事件内容
//==========================================================
function MDescNumber_onMouseWheel(s, e){
   var o = this;
   return;
   if(e.wheelDelta > 0){
      o.adjustValue(true);
   }else if(e.wheelDelta < 0){
      o.adjustValue(false);
   }
   e.cancelBubble = true;
   e.returnValue = false;
}

//==========================================================
// <T>校验处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MDescNumber_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   // 判断是否需要检查
   if(o._visible && o._validable){
      var t = o.text();
      // 必须性检查
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      // 判断最小值允许
      if(o.validValmin && !RValidator.validMinNumber(o, t, o.validValmin, o.validEqlmin)){
         e.controls.push(o);
         return r;
      }
      // 判断最大值允许
      if(o.validValmax && !RValidator.validMaxNumber(o, t, o.validValmax, o.validEqlmax)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}

//==========================================================
// <T>建立调节表单。</T>
//
// @method
// @param hp:panel:<HTML> 底板
//==========================================================
function MDescNumber_buildAdjustForm(hp){
   var o = this;
   hp.width = 13;
   // 建立调节底板
   var hf = o.hAdjustForm = RBuilder.appendTable(hp, o.style('AdjustForm'));
   hf.width = '100%';
   // 建立上按键
   var hc = hf.insertRow().insertCell();
   hc.className = o.style('UpButton');
   var hi = o.hUpIcon = RBuilder.appendIcon(hc, o.styleIcon('Up'));
   o.attachEvent('onUpMouseDown', hi);
   // 建立下按键
   var hc = hf.insertRow().insertCell();
   hc.className = o.style('DownButton');
   var hi = o.hDownIcon = RBuilder.appendIcon(hc, o.styleIcon('Down'));
   o.attachEvent('onDownMouseDown', hi);
}

//==========================================================
// <T>格式化显示内容为数据内容。</T>
//
// @method
// @param t:text:String 显示内容
//==========================================================
function MDescNumber_formatValue(text){
   var o = this;
   text = RString.nvl(text);
   if(RBoolean.isTrue(o.editSplitter)){
      text = o.removeSplit(text);  
   }
   var p = RString.nvl(o.editFormat);
   if(!RString.isEmpty(p)){
      var s = RString.findChars(p, '[');
      var e = RString.findChars(p, ']');
      var es = p.substring(e + 1);
      if(s == -1 || e == -1){
         return alert('editFormat error : ' + o.editFormat);
      }
      text = text.substring(s);
      text = text.substring(0, text.length - es.length);
   }
   return text;
}

//==========================================================
// <T>格式化数据内容为显示内容。</T>
//
// @method
// @param v:value:String 数据内容
//==========================================================
function MDescNumber_formatText(v){
   var o = this;
   // 数字精度
   if(v){
      v = RString.nvl(v.toString());
   }else{
      if(v != "0"){
         v = RString.nvl(v);
      }
   }
   if(!RString.isEmpty(o.editPrecision)){
      v = o.precisionValue(v);
   }
   // 分隔符
   if(RBool.isTrue(o.editSplitter)){
      if(-1 != RString.findChars(v, '.')){
         var vs = v.split('.');
         v1 = o.splitValue(vs[0]);
         v2 = o.splitValue(vs[1]);
         v = v1 + "." + v2;
      }else{
         v = o.splitValue(v);
      }
      
   }
   // todo:  o.editPattern 格式必须正确
   var p = RString.nvl(o.editFormat);
   if(!RString.isEmpty(p)){
      var s = RString.findChars(p, '[');
      var e = RString.findChars(p, ']');
      if(s == -1 || e == -1){
         alert('editFormat error : ' + o.editFormat);
      }
      // todo
      v = p.substring(0, s).concat(v);
      v = v.concat(p.substring(e + 1))
   }
   return v;
}

//==========================================================
// <T>改变数据内容。</T>
//
// @method
//==========================================================
function MDescNumber_adjustValue(f){
   var o = this;
   // 检查可编辑性
   var d = o.descriptor();
   if(!d.canEdit()){
      return;
   }
   // 调整数据
   var b = RString.findChars(o.text(),"%");
   var v = RFloat.parse(o.get());
   var d = RFloat.parse(o.editIncreate);
   v = RFloat.parse(RString.removeChars(o.text(), "'"));
   o.isTextChange = true;
   if(RConsole.find(FFocusConsole).isFocus(o)){
      if(f){
         v += d;
      }else{
         v -= d;
      }
      if(-1 != b){
        o.setText(o.formatText(v) + "%")
      }else{
         o.setText(o.formatText(v));
      }

   }else{
      if(f){
         v += d;
      }else{
         v -= d;
      }
      o.set(v.toString());
   }
}
