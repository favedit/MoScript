//==========================================================
// <T>显示进度的单元格控件。</T>
//
// @class FCellEditControl
// @history 091016 MAOCY 创建
//==========================================================
function FCellProcessStatus(o){
   o = RClass.inherits(this, o, FCellEditControl);
   /// @style
   o.styleForm     = RClass.register(o, new TStyle('Form'));
   o.styleProcess  = RClass.register(o, new TStyle('Process'));
   // Method
   o.isDataChanged = RMethod.emptyFalse;
   o.buildForm     = FCellProcessStatus_buildForm;
   o.text          = FCellProcessStatus_text;
   o.setText       = FCellProcessStatus_setText;
   return o;
}

//==========================================================
// <T>创建单元格的表单底板。</T>
//
// @method
// @return HTML td标签
//==========================================================
function FCellProcessStatus_buildForm(){
   var o = this;
   var c = o.column;
   var hf = o.hForm = RBuilder.appendTable(o.hPanel);
   hf.width = '100%';
   hf.height = '100%';
   hf.style.tableLayout = 'fixed';
   c.linkEvent(o, 'onCellDoubleClick', hf);
}

//==========================================================
// <T>获得显示内容。</T>
//
// @method
// @return String input内的值
//==========================================================
function FCellProcessStatus_text(){
   return this.dataValue;
}

//==========================================================
// <T>设置显示内容。</T>
//
// @method
// @param v:value:String 要设置的值
//==========================================================
function FCellProcessStatus_setText(v){
   var o = this;
   if(!v){
      return;
   }
   // 清除表信息
   RHtml.clear(o.hForm);
   o.hPanel.vAlign = 'middle';
   // 建立显示行
   var hUp = o.hForm.insertRow();
   var hr = o.hForm.insertRow();
   var hDown = o.hForm.insertRow();
   // 得到字符串长度
   var s = RString.nvl(v);
   var sl = s.length;
   // 开始上色的位置
   var i = RInt.parse(o.column.stepStart);
   // 需要上色的单元格个数
   var l = RInt.nvl(RInt.parse(o.column.stepCount),sl);
   // 单元格的颜色和背景
   var bcs = RString.split(o.column.levelColors,',');
   var bis = RString.split(o.column.levelImages,',');
   // 建立单元格
   for(var m = 0;m < sl; m++){
      var h1 = hUp.insertCell();
      h1.height = 4;
      var hd = hr.insertCell();
      hd.height = 8;
      hd.className = o.style('Process');
      var h2 = hDown.insertCell();
      h2.height = 4;
      if(m+1 == 13 || m+1 == 26){
         var a = hUp.insertCell();
         var b = hr.insertCell();
         var c = hDown.insertCell();
         a.width = 1;
         a.style.backgroundColor = '#BACBF4';
         b.style.backgroundColor = '#BACBF4';
         c.style.backgroundColor = '#BACBF4';
      }
      var idx = RInt.parse(s.charAt(m));
      if(bcs && bcs[idx]){
         hd.style.backgroundColor = bcs[idx];
      }
      if(bis && bis[idx]){
         hd.style.backgroundImage = RRes.imagePath(bis[idx]);
      }
   }
}
