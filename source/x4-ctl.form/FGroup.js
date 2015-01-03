//==========================================================
// <T>文本编辑框。</T>
//
// @class FGroupControl, MDescEdit, MEditBorder
// @history 091105 MAOCY 创建
//==========================================================
function FGroup(o){
   o = RClass.inherits(this, o, FEditControl, MDescEdit, MEditBorder);
   //..........................................................
   // @style
   o.stUnit        = RClass.register(o, new TStyle('Unit'));
   //..........................................................
   // @attribute
   o.borderStyle        = EBorder.Round;
   o.itemType           = RClass.register(o, new TPtyStr('itemType'));
   o.itemLabelWidth     = RClass.register(o, new TPtyStr('itemLabelWidth'));
   o.itemControlWidth   = RClass.register(o, new TPtyStr('itemControlWidth'));
   o.rowItemCount       = RClass.register(o, new TPtyStr('rowItemCount'));
   o.controls           = new TList();
   //..........................................................
   //..........................................................
   // @event
   o.onBuildEdit          = FGroup_onBuildEdit;
   o.onControlClick       = RClass.register(o, new HClick('onControlClick'), FGroup_onControlClick);
   //..........................................................
   // @method
   o.set                  = FGroup_set;
   o.get                  = FGroup_get;
   o.reget                = FGroup_reget;
   o.resetValue           = FGroup_resetValue;
   o.resetHeight          = FGroup_resetHeight;
   o.setText              = FGroup_setText;
   o.oeValid              = FGroup_oeValid;
   o.setGroupPack         = FGroup_setGroupPack;
   o.refreshStyle         = FGroup_refreshStyle;
   o.buildGroupControl    = FGroup_buildGroupControl;
   return o;
}

//==========================================================
// <T>建立编辑区。</T>
//
// @method
// @param b:border:TBorder 边框对象
//==========================================================
function FGroup_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   var hec = hr.insertCell();
   var hep = RBuilder.appendTable(hec);
   var rc = o.rowItemCount;
   for(n = 0; n<20; n++){
	  if(n%rc == 0){
	     her = hep.insertRow();
	  }
	  var hc = her.insertCell();
	  hc.style.height=20;
	  hcp = RBuilder.appendTable(hc);
	  hcpr = hcp.insertRow();
	  hcc = hcpr.insertCell();
	  hcc.style.width = o.itemControlWidth;
	  hcl = hcpr.insertCell();
	  hcl.style.width = o.itemLabelWidth;
	  // 创建控件
	  if(o.itemType == 'Check'){
	     var hce = RBuilder.appendCheck(hcc);
	  }else if(o.itemType == 'Radio'){
	     var hce = RBuilder.append(hcc, '<input type="radio" name=' + o.dataName + '/>');
	  }
	  hce.style.border = 0;
	  hce.style.display = 'none';
	  hce.disabled = !o._editable;
	  o.attachEvent('onControlClick', hce, o.onControlClick);
	  var h = new Object();
	  h.control = hce;
	  h.labelPanel = hcl;
	  o.controls.push(h);
   }
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_resetHeight(c, n){
   var o = this;
   var rc = 0;
   if(c%n != 0){
      rc = Math.floor(c/n) + 1;
   }else{
      rc = c/n;
   }
   o.hEdit.style.height = rc * 20;
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   var t = o.reget();
   if(o.validRequire && !RValidator.validRequire(o, t)){
      e.controls.push(o);
      return r;
   }
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_reget(){
	var o = this;
	o.resetValue();
    return o.dataValue;
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_get(){
	var o = this;
	o.resetValue();
    return o.dataValue;
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_resetValue(b){
   var o = this;
   var cs = o.controls;
   var cc = cs.count;
   o.dataValue = '';
   for(var n = 0; n < cc; n++){
      var c = cs.get(n).control;
      if(c.checked){
    	 if(RString.isEmpty(o.dataValue)){
            o.dataValue = o.dataValue + c.value;
    	 }else{
    		o.dataValue =o.dataValue + ';' + c.value;
    	 }
      }
   }
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_onControlClick(e){
   var o = this;
   var he = e.hSender;
   if(he.type == 'checkbox'){
	  o.resetValue();
   }else if(he.type == 'radio'){
	  o.dataValue = he.value;
   }
}

//==========================================================
//<T>建立编辑区。</T>
//
//@method
//@param b:border:TBorder 边框对象
//==========================================================
function FGroup_buildGroupControl(f){
	var o = this;
	var its = f.items;
	var ic = its.count;
	var oc = o.controls;
	var occ = oc.count;
	for(n = 0; n<occ; n++){
	   var c = oc.get(n).control;
	   var l = oc.get(n).labelPanel;
       if(n < ic){
	      var it = its.get(n);
	      c.value = it.value;
	      c.name = o.dataName;
	      c.checked = RBoolean.isTrue(it.select);
	      l.innerText = it.label;
	      c.style.display = 'block';
          l.style.display = 'block';
       }
	}
	o.resetHeight(ic, o.rowItemCount);
}

//==========================================================
//<T>设置数据。</T>
//
//@method
//@param v:value:String 数据
//==========================================================
function FGroup_setGroupPack(v){
   var o = this;
   var ig = new TGroupControl();
   ig.unpack(v);
   o.buildGroupControl(ig);
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param v:value:String 数据
//==========================================================
function FGroup_set(v){
	var o = this;
   var cs = o.controls;
   var cc = cs.count;
   for(var n = 0; n < cc; n++){
      c = cs.get(n).control;
      if(v == c.value){
         c.checked = true;
      }
   }
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
function FGroup_setText(t){
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
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
//==========================================================
//<T>根据设置信息，刷新样式。</T>
//
//@method
//==========================================================
function FGroup_refreshStyle(){
	var o = this;
	o.base.FEditControl.refreshStyle.call(o);
	var cs = o.controls;
	for(var n = 0; n< cs.count; n++){
		var h = cs.get(n).control;
		h.disabled = !o._editable;
		if(!o._editable){
		   o.hEdit.style.cursor = 'normal';
		}
	}
}

