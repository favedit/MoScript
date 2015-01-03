// ============================================================
// FMemo
// ============================================================
function FTimeSpanPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   // Property
   o.editComplete    = RClass.register(o, new TPtyStr('editComplete'));
   o.editCase        = RClass.register(o, new TPtyStr('editCase'));
   o.editPattern     = RClass.register(o, new TPtyStr('editPattern'));
   o.editLength      = RClass.register(o, new TPtyInt('editLength'));
   o.validLenmin     = RClass.register(o, new TPtyStr('validLenmin'));
   o.validLenmax     = RClass.register(o, new TPtyStr('validLenmax'));
   o.editOverflow    = RClass.register(o, new TPtyStr('editOverflow'));
   //Attribute
   o.rows            = new TList();
   o.checks          = new TList();
   o.borderStyle     = EBorder.Round;
   o.amSelectAll     = null;
   o.pmSelectAll     = null;
   o.hAm             = null;
   o.hPm             = null;
   // Event
   o.onBuildEdit     = FTimeSpanPicker_onBuildEdit;
   o.onClick         = FTimeSpanPicker_onClick;
   o.onMouseOver     = FTimeSpanPicker_onMouseOver;
   o.onMouseOut      = FTimeSpanPicker_onMouseOut;
   o.onBuildControl  = FTimeSpanPicker_onBuildControl;
   // Method
   o.formatValue     = FTimeSpanPicker_formatValue;
   o.clearValue      = FTimeSpanPicker_clearValue;
   o.resetValue      = FTimeSpanPicker_resetValue;
   o.text            = FTimeSpanPicker_text;
   o.setText         = FTimeSpanPicker_setText;
   o.dispose         = FTimeSpanPicker_dispose;
   return o;
}
// ------------------------------------------------------------
function FTimeSpanPicker_onBuildEdit(b){
   var o = this;
   var h  = RBuilder.appendTable(b.hPanel);
   h.width = '100%';
   h.style.backgroundColor = 'white';
   //h.border = 1;
   //h.style.padding = 2;
   h.cellPadding = 2;
   // 上午 下午标题
   var hr1 = h.insertRow();
   var h1 = hr1.insertCell();
   h1.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   h1.height = 20;
   h1.innerHTML = '<b>上午</b>';
   h1.align = 'center';
   var h2 = hr1.insertCell();
   h2.innerHTML = '<b>下午</b>';
   h2.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   h2.align = 'center';
   // 时刻标题
   var hr2 = h.insertRow();
   for(var n = 0; n < 2; n++){
      var hc00 = hr2.insertCell();
      hc00.style.backgroundColor = '#C9F5FE';
      hc00.style.borderTop = '1 solid #62E4FE';
      hc00.style.borderBottom = '1 solid #62E4FE';
      var hr2tb = RBuilder.appendTable(hc00);
      hr2tb.width = '100%';
      hr2tb.border = "0px";
      var hr2r = hr2tb.insertRow();
      var hc0 = hr2r.insertCell();
      hc0.align = 'center';
      hc0.width = 25;
      if (0 == n) {
         o.amSelectAll = RBuilder.appendCheck(hc0);
         o.amSelectAll.style.cursor = 'hand';
         o.amSelectAll.style.border = '0px solid red';;
      }else if(1 == n) {
    	 o.pmSelectAll = RBuilder.appendCheck(hc0);
    	 o.pmSelectAll.style.cursor = 'hand';
    	 o.pmSelectAll.style.border = '0px solid red';;
      }
      var hc1 = hr2r.insertCell();
      hc1.width = 25;
      hc1.align = 'center';
      hc1.innerText = '时间';
      var hc2 = hr2r.insertCell();
      hc2.width = 25;
      hc2.innerText = '15';
      hc2.align = 'center';
      var hc3 = hr2r.insertCell();
      hc3.width = 25;
      hc3.innerText = '30';
      hc3.align = 'center';
      var hc4 = hr2r.insertCell();
      hc4.innerText = '45';
      hc4.width = 25;
      hc4.align = 'center';
      var hc5 = hr2r.insertCell();
      hc5.innerText = '60';
      hc5.width = 25;
      hc5.align = 'center';
   }
   var hr3 = h.insertRow();
   var hcc1 = hr3.insertCell();
   hcc1.vAlign = 'top';
   var hcc2 = hr3.insertCell();
   // 上午时间体
   var hTb1 = o.hAm = RBuilder.appendTable(hcc1);
   hTb1.height = '100%'
   hTb1.border = 1;
   hTb1.style.borderCollapse = 'collapse';
   hTb1.borderColorDark ="#ECE9D8";
   hTb1.width = '100%'
   //hTb1.style.tableLayout = 'fixed';
   hTb1.style.cellspacing = "10";
   //hTb1.style.cellpadding = "0";
   // 下午时间体
   var hTb2 = o.hPm =RBuilder.appendTable(hcc2);
   hTb2.width = '100%'
   hTb2.border = 1;
   hTb2.style.borderCollapse = 'collapse';
   hTb2.borderColorDark ="#ECE9D8";
   //hTb2.border = 1;
   var htt = hTb1;
   for(var n = 0; n < 12; n++){
      if(n > 5){
         htt = hTb2;
      }
      var htr1 = htt.insertRow();
      htc1 = htr1.insertCell();
      htc1.height = 20;
      htc1.width = 20;
      htc1.align = 'center';
      htc2 = htr1.insertCell();
      htc2.width = '20';
      htc2.align = 'center';
      htc2.vAlign = 'middle';
      if( n < 4 ){
         var itt = document.createElement("INPUT");
         itt.type = 'checkbox';
         itt.style.height = '16';
         itt.style.border = '0px solid red';
         itt.style.cursor = 'hand';
         htc1.appendChild(itt);
         htc2.innerText = (n+9).toString()+"点";
         o.rows.push(htr1);
      }else if( n > 5){
         var itt = document.createElement("INPUT");
         itt.type = 'checkbox';
         itt.style.height = '16';
         itt.style.border = '0px solid red';
         itt.style.cursor = 'hand';
         htc1.appendChild(itt);
         o.rows.push(htr1);
         htc2.innerText = (n+7).toString()+"点";
      }
      for(var m = 0; m < 4; m++){
         var htc3 = htr1.insertCell();
         htc3.width = 20;
         htc3.align = 'center';
         //htc2.innerText = (n+9).toString()+"点";
         if(!(n == 11 && m >1) && !(n == 4 || n == 5)){
            var ipt = document.createElement("INPUT");
            ipt.type = 'checkbox';
            ipt.style.border = '0px solid red';
            ipt.style.height = '16';
            htc3.appendChild(ipt);
            htc3.vAlign = 'middle';
            ipt.style.cursor = 'hand';
            o.checks.push(ipt);
         }
      }
   }
//   
//   o.imgSrc = '/eUIS/ats/00/rs/icon/ctl/FTimeSpanPicker_Checked.gif';
//   o.hHint = h.insertRow().insertCell();
//   o.hHint.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
//   o.hHint.colSpan = 2;
//   o.hHint.height = 20;
//   o.hEdit = o.hHint;
   o.imgSrc = o.styleIconPath('Checked', FTimeSpanPicker);
//   o.imgSrc = '/eUIS/ats/00/rs/icon/ctl/FTimeSpanPicker_Checked.gif';
   var hc = h.insertRow().insertCell();
   hc.colSpan = 2;
   hc.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   o.hHint = RBuilder.append(hc, 'textarea');
   o.hHint.style.border = '0px solid white';
   o.hHint.style.backgroundColor = 'transparent';
   o.hHint.style.height = '30';
   o.hHint.style.width = '100%';
   o.hHint.readOnly = true;
   o.hEdit = document.createElement('Img');
   o.hEdit.style.display = 'none';
}
//------------------------------------------------------------
function FTimeSpanPicker_onClick(e){
   var o = this;
   var h = e.srcElement;
   // 列全选复选框
   if(h == o.amSelectAll || h == o.pmSelectAll){
	  if (h == o.amSelectAll) {
		  var hpTb = o.hAm.childNodes[0];
	  } else if(h == o.pmSelectAll) {
		  var hpTb = o.hPm.childNodes[0];
	  }
	  for(var i = 0; i < hpTb.childNodes.length; i++){
		  var hpTr = hpTb.childNodes[i];
    	  for(var n = 0; n < hpTr.childNodes.length; n++){
		      var htd = hpTr.childNodes[n];
		      if(htd.childNodes.length > 0){
		         var hCk = htd.childNodes[0];
		         if (hCk.nodeName == 'INPUT') {
		            hCk.checked = h.checked;
		         }
		      }
		   }
      }
   }else {
   	  if(h.nodeName == 'INPUT'){
	      var hpTd = h.parentNode;
	      var hpTr = hpTd.parentNode;
	      // 行全选复选框
	      if(hpTd.cellIndex == 0){
	         for(var n = 2; n < hpTr.childNodes.length; n++){
	            var htd = hpTr.childNodes[n];
	            if(htd.childNodes.length > 0){
	               var hCk = htd.childNodes[0];
	               hCk.checked = h.checked;
	            }
	         }
	      // 单选复选框
	      }else{
	         var flag = true;
	         for(var n = 2; n < hpTr.childNodes.length; n++){
	            var hpTd = hpTr.childNodes[n];
	            if(hpTd.childNodes.length > 0){
	               var hCk = hpTr.childNodes[n].childNodes[0];
	               if(hCk.style.display != 'none'){
	                  if(!hCk.checked){
	                     flag = false;
	                     break;
	                  }
	               }
	            }
	         }
	         hpTr.childNodes[0].childNodes[0].checked = flag;
	      }
   	  }
   }
   // 计算时间
   var s = o.text();
   var count = s.length;
   var hint = "";
   var hour = 9;
   var hourStr = '';
   var start = false;
   var min = 0;
   var minStr = '';
   for(var n = 0; n < count; n++){
     min =  n%4 * 15;
     minStr = RString.lpad(min,2,'0');
      if(n%4 == 0 && n != 0){
       hour++;
      }
      hourStr = RString.lpad(hour,2,'0');
      if(!start && s.charAt(n) == 0){
         continue;
      }else if(!start && s.charAt(n) == 1){
        start = true;
        hint = hint + hourStr+":"+ minStr;
      }else if(start && s.charAt(n) == 0){
         start = false;
         hint = hint + " - "+hourStr+":"+ minStr+"      ";
      }
      if(n == count -1&&s.charAt(n) == 1){
        hint = hint + " - "+hourStr+":"+ (min+15)%60;
      }
   }
   o.hHint.value = hint;
}

function FTimeSpanPicker_onMouseOver(e){
   var o = this;
}

function FTimeSpanPicker_onMouseOut(e){
   var o = this;
}

function FTimeSpanPicker_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
}
// ------------------------------------------------------------
function FTimeSpanPicker_formatValue(s){
   return this.text();
}
// ------------------------------------------------------------
function FTimeSpanPicker_clearValue(){
   var o = this;
   var cs = o.checks;
   for(var n=cs.count-1; n>=0; n--){
      cs.get(n).checked = false;
   }
}
// ------------------------------------------------------------
function FTimeSpanPicker_resetValue(){
   var o = this;
   var cs = o.checks;
   for(var n=cs.count-1; n>=0; n--){
      cs.get(n).checked = false;
   }
}
// ------------------------------------------------------------
function FTimeSpanPicker_text(){
   var o = this;
   var s = '';
   var cs = o.checks;
   for(var n = 0; n < cs.count; n++){
      var c = cs.get(n);
      if('none' == c.style.display){
         s = s.concat('0');
      }else if('block' == c.style.display){
         var ch = c.checked ?  '1' : '0';
         s = s.concat(ch);
      }
   }
   return s;
}
// ------------------------------------------------------------
function FTimeSpanPicker_setText(text){
   //text = "00001100100000110010000011001000001100";
   var o = this;
   o.hHint.value = '';
   if(o.checks.count != text.length){
      alert(o.checks.count +"!="+ text.length + '[' + text + ']');
   }
   var cs = o.checks;
   var ct = cs.count;
   // 设置后面四个复选框
   for(var n = 0; n < ct; n++){
      var flag = RString.equals(text.charAt(n), '1');
      var c = cs.get(n);
      if(flag){
         c.style.display = 'none';
         var hImg = c.nextSibling;
         if(!hImg){
            hImg = document.createElement('Img');
            hImg.src = o.imgSrc;
            c.parentNode.appendChild(hImg);
         }
         hImg.style.display = 'block';
      }else{
         c.style.display = 'block';
         c.checked = false;
         var hImg = c.nextSibling;
         if(!hImg){
            hImg = document.createElement('Img');
            hImg.src = o.imgSrc;
            c.parentNode.appendChild(hImg);
         }
         hImg.style.display = 'none';
      }
   }
   // 设置前置复选框
   var cs = o.rows;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var hpTr = cs.get(n);
      var flag = true;
      var len = hpTr.childNodes.length;
      for(var m = 2; m < len; m++){
         if(hpTr.childNodes.length > 0){
            var htd = hpTr.childNodes[m];
            if(htd.childNodes.length > 0){
               var hCk = htd.childNodes[0];
               if('block' == hCk.style.display){
                  flag = false;
                  break;
               }
            }
         }
      }
      var ds = flag ?'none':'block';
      var hkk = hpTr.childNodes[0].childNodes[0];
      hkk.style.display = ds;
      hkk.checked = false;
   }
}
// ------------------------------------------------------------
function FTimeSpanPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hHint);
   RMemory.freeHtml(o.hEdit);
   o.hHint = null;
   o.hEdit = null;
}
