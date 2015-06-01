//==========================================================
// <T>单选组列控件。</T>
//
// @class FColumnEditControl
// @history 091112 MAOCY 创建
//==========================================================
function FCellRadioGroup(o){
   o = RClass.inherits(this, o, FCellEditControl);
   //..........................................................
   // @attribute
   o.radios       = null;
   o.metaPack     = null;
   o.meta         = null;
   //..........................................................
   // @event
   o.onRadioClick = RClass.register(o, new HClick('onRadioClick'), FCellRadioGroup_onRadioClick);
   //..........................................................
   // @method
   o.construct    = FCellRadioGroup_construct;
   o.buildForm    = FCellRadioGroup_buildForm;
   o.syncRadio    = FCellRadioGroup_syncRadio;
   o.text         = FCellRadioGroup_text;
   o.setText      = FCellRadioGroup_setText;
   o.validText    = RMethod.empty;
   return o;
}

//==========================================================
// <T>鼠标单击单选框。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCellRadioGroup_onRadioClick(e){
   var o = this;
   for(var i=o.radios.count-1; i>=0; i--){
      var r = o.radios.get(i);
      if(r.hEdit == e.hSource){
         o.dataValue = r.value;
         break;
      }
   }
}

//==========================================================
// <T>构建函数。</T>
//
// @method
//==========================================================
function FCellRadioGroup_construct(){
   var o = this;
   o.radios = new TList();
   o.metaPack = new TAttributes();
   o.meta = new TAttributes();
}

//==========================================================
// <T>在单元格内创建表单底板。</T>
//
// @method
//==========================================================
function FCellRadioGroup_buildForm(){
   var o = this;
   o.hEditForm = RBuilder.appendTable(o.hPanel);
   o.hEditLine = o.hEditForm.insertRow();
}

//==========================================================
// <T>获得索引位置的单选框。</T>
//
// @method
// @param n:index:Integer 索引位置
//==========================================================
function FCellRadioGroup_syncRadio(n){
   var o = this;
   var c = o.column;
   var r = o.radios.get(n);
   if(!r){
      var hel = o.hEditLine;
      for(var i=o.radios.count; i<=n; i++){
         r = new TCellRadio();
         // 建立输入框
         var hep = r.hEditPanel = hel.insertCell();
         var he = r.hEdit = RBuilder.append(hep, '<INPUT type=radio name=' + c.dataName.toLowerCase() + '_' + RHtml.uid(hel) + " style='border:0;cursor:hand'>");
         o.attachEvent('onRadioClick', he);
         // 建立标签
         r.hLabel = o.hEditLine.insertCell();
         r.hLabel.style.paddingRight = 4;
         // 记入列表
         o.radios.push(r);
      }
   }
   r.hEditPanel.style.display = 'block';
   r.hLabel.style.display = 'block';
   return r;
}

//==========================================================
// <T>获得显示内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
function FCellRadioGroup_text(){
   var o = this;
   return o.dataValue;
}

//==========================================================
// <T>设置显示内容。</T>
//
// @method
// @param t:text:String 显示内容
//==========================================================
function FCellRadioGroup_setText(v){
   var o = this;
   // 获取打包
   var mp = o.metaPack;
   mp.clear();
   mp.unpack(v);
   // 获取描述
   var mt = o.meta;
   mt.clear();
   mt.unpack(mp.get('meta'));
   var dv = o.dataValue = mp.get('value');
   // 显示单选框
   for(var i=0; i<mt.count; i++){
      var r = o.syncRadio(i);
      var rv = r.value = mt.name(i);
      var rl = r.label = mt.value(i);
      r.hEdit.checked = (rv == dv);
      r.hLabel.innerText = rl;
   }
}
