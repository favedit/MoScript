//==========================================================
// <T>边框。</T>
//
// @class FContainer
// @history 091117 MAOCY 创建
//==========================================================
function TBorder(s, h){
   var o = this;
   //..........................................................
   // @attribute
   o.style          = s;
   //..........................................................
   // @html
   o.hParent        = h;
   o.hForm          = null;
   o.hRow           = null;
   o.hPanel         = null;
   //..........................................................
   // @method
   o.build              = TBorder_build;
   o.setStyle           = TBorder_setStyle;
   o.setBorderColor     = TBorder_setBorderColor;
   o.setBackgroundColor = TBorder_setBackgroundColor;
   o.setVisible         = TBorder_setVisible;
   return o;
}

//==========================================================
// <T>建立边框。</T>
//
// @method
// @param hp:hPanel:<HTML> 父底板
//==========================================================
function TBorder_build(hp){
   var o = this;
   if(o.hParent){
      hp = o.hParent;
   }else{
      o.hParent = hp;
   }
   // 创建底板
   var ht = o.hForm = RBuilder.newTable();
   if(EBorder.None == o.style){
      var hr = o.hRow = ht.insertRow();
      o.hPanel = hr.insertCell();
      return;
   }   
   // 建立上边框
   var s = new TString();
   s.append("<TABLE class='RBorder_Form' border=0 cellspacing=0 cellpadding=0><TR><TD height=1><SPAN class='RBorder_Top'></SPAN></TD></TR><TR><TD height=1><SPAN class='RBorder_Before'></SPAN></TD></TR><TR><TD class='RBorder_Panel'>");
   s.append("<TABLE class='RBorder_InnerForm' width='100%' height='100%' border=0 cellspacing=0 cellpadding=0><TR>");
   // 将建立中间区域
   switch(o.style){
      case EBorder.Round:
         s.append("<TD color='#CFF6F6' width='1'></TD>");
         s.append("<TD color='#F1FFFF'></TD>");
         s.append("<TD color='#FFFFFF' width='1'></TD>");
         break;
      case EBorder.RoundTitle:
         // 建立标题栏
         s.append("<TD color='#FAFDFE' width='1'></TD>");
         s.append("<TD></TD>");
         s.append("<TD color='#FAFDFE' width='1'></TD></TR>");
         // 建立分割线
         s.append("<TR heigh='1'><TD color='#FAFDFE' width='1'></TD>");
         s.append("<TD color='#FAFDFE'></TD>");
         s.append("<TD color='#FAFDFE' width='1'></TD></TR>");
         // 建立内容栏
         s.append("<TR><TD color='#FAFDFE' width='1'></TD>");
         s.append("<TD></TD>");
         s.append("<TD color='#FAFDFE' width='1'></TD>");
         break;
      case EBorder.RoundIcon:
      case EBorder.RoundDrop:
         s.append("<TD color='#CFF6F6' width='1'></TD>");
         s.append("<TD color='#F1FFFF'></TD>");
         s.append("<TD color='#F1FFFF' width='1'></TD>");
         s.append("<TD color='#F1FFFF'></TD>");
         s.append("<TD color='#FFFFFF' width='1'></TD>");
         break;
      default:
         return RMessage.fatal('Unknown border style. (style={0})', o.style);
      
   }
   // 建立下边框
   s.append("</TR></TABLE>");
   s.append("</TD></TR><TR><TD height=1><SPAN class='RBorder_After'></SPAN></TD></TR><TR><TD height=1><SPAN class='RBorder_Bottom'></SPAN></TD></TR></TABLE>");
   // 建立对象
   hp.innerHTML = s.toString();
   // 关联对象
   var hf = o.hForm = hp.children[0];
   o.hFormLine = hf.rows[2].cells[0];
   var hpf = hf.rows[2].cells[0].children[0];
   var hpr = hpf.rows[0];
   o.hTopRow = hf.rows[0];
   o.hTop = hf.rows[0].cells[0];
   o.hTopLine = o.hTop.children[0];
   o.hBeforeRow = hf.rows[1];
   o.hBefore = hf.rows[1].cells[0];
   o.hBeforeLine = o.hBefore.children[0];
   o.hBodyRow = hf.rows[2];
   o.hBody = hf.rows[2].cells[0];
   o.hBodyLine = o.hBody.children[0];
   o.hAfterRow = hf.rows[3];
   o.hAfter = hf.rows[3].cells[0];
   o.hAfterLine = o.hAfter.children[0];
   o.hBottomRow = hf.rows[4];
   o.hBottom = hf.rows[4].cells[0];
   o.hBottomLine = o.hBottom.children[0];
   switch(o.style){
      case EBorder.Round:
         o.hLeft = hpr.cells[0];
         o.hPanel = hpr.cells[1];
         o.hRight = hpr.cells[2];
         break;
      case EBorder.RoundTitle:
         // 建立标题栏(第3行)
         var hpr = hpf.rows[0];
         o.hTitleL = hpr.cells[0];
         o.hTitle = hpr.cells[1];
         o.hTitleR = hpr.cells[2];
         // 建立分割线
         var hpr = hpf.rows[1];
         o.hLineL = hpr.cells[0];
         o.hLine = hpr.cells[1];
         o.hLineR = hpr.cells[2];
         // 建立内容栏(第5行)
         var hpr = hpf.rows[2];
         o.hPanelL = hpr.cells[0];
         o.hPanel = hpr.cells[1];
         o.hPanelR = hpr.cells[2];
         break;
      case EBorder.RoundIcon:
         o.hLeft = hpr.cells[0];
         o.hIcon = hpr.cells[1];
         o.hSplit = hpr.cells[2];
         o.hPanel = hpr.cells[3];
         o.hRight = hpr.cells[4];
         break;
      case EBorder.RoundDrop:
         o.hLeft = hpr.cells[0];
         o.hPanel = hpr.cells[1];
         o.hSplit = hpr.cells[2];
         o.hDrop = hpr.cells[3];
         o.hRight = hpr.cells[4];
         break;
   }
}

//==========================================================
// <T>边框。</T>
//
// @method
// @param d:down:Boolean 按下
// @param c:color:String 颜色
//==========================================================
function TBorder_setStyle(d, c){
   var o = this;
   var s = o.style;
   if(EBorder.Round == s){
      o.hPanelL.style.backgroundColor = c;
      o.hPanelT.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.hPanelB.style.backgroundColor = c;
      o.hPanelR.style.backgroundColor = c;
   }else if(EBorder.RoundIcon == s){
      o.hIconT.style.backgroundColor = c;
      o.hIcon.style.backgroundColor = c;
      o.hIconB.style.backgroundColor = c;
      o.hPanelL.style.backgroundColor = c;
      o.hPanelT.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.hPanelB.style.backgroundColor = c;
      o.hPanelR.style.backgroundColor = c;
   }else if(EBorder.RoundDrop == s){
      o.hPanelL.style.backgroundColor = c;
      o.hPanelT.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.hPanelB.style.backgroundColor = c;
      o.hDrop.style.backgroundColor = c;
      if(d){
         o.hSplitT.style.backgroundColor = '#3C7FB1';
         o.hSplitM.style.backgroundColor = '#3C7FB1';
         o.hSplitB.style.backgroundColor = '#3C7FB1';
         o.hDropLt.style.backgroundColor = '#FFFFFF';
         o.hDropL.style.backgroundColor = '#FFFFFF';
         o.hDropLb.style.backgroundColor = '#FFFFFF';
         o.hDropT.style.backgroundColor = '#FFFFFF';
         o.hDropB.style.backgroundColor = '#FFFFFF';
         o.hDropR.style.backgroundColor = '#FFFFFF';
         o.hDropBR.style.backgroundColor = '#3C7FB1';
         o.hDropBLb.style.backgroundColor = '#3C7FB1';
         o.hDropBB.style.backgroundColor = '#3C7FB1';
         o.hDropBRb.style.backgroundColor = '#3C7FB1';
      }else{
         o.hSplitT.style.backgroundColor = c;
         o.hSplitM.style.backgroundColor = c;
         o.hSplitB.style.backgroundColor = c;
         o.hDropLt.style.backgroundColor = c;
         o.hDropL.style.backgroundColor = c;
         o.hDropLb.style.backgroundColor = c;
         o.hDropT.style.backgroundColor = c;
         o.hDropB.style.backgroundColor = c;
         o.hDropR.style.backgroundColor = c;
         o.hDropBR.style.backgroundColor = '#c0dff1';
         o.hDropBLb.style.backgroundColor = '#c0dff1';
         o.hDropBB.style.backgroundColor = '#c0dff1';
         o.hDropBRb.style.backgroundColor = '#e9f1f8';
      }
   }
}

//==========================================================
// <T>设置背景颜色。</T>
//
// @method
// @param h:hPanel:父对象
//==========================================================
function TBorder_setBorderColor(c){
   var o = this;
   switch(o.style){
      case EBorder.Round:
         o.hTopLine.style.backgroundColor = c;
         o.hBeforeLine.style.borderLeftColor = c;
         o.hBeforeLine.style.borderRightColor = c;
         o.hBody.style.borderRightColor = c;
         o.hPanel.style.backgroundColor = '#FAFAFA';
         o.hBody.style.borderLeftColor = c;
         o.hAfterLine.style.borderLeftColor = c;
         o.hAfterLine.style.borderRightColor = c;
         o.hBottomLine.style.backgroundColor = c;
         break;
   }
}

//==========================================================
// <T>设置边框颜色。</T>
//
// @method
// @param h:hPanel:父对象
//==========================================================
function TBorder_setBackgroundColor(c){
   var o = this;
   switch(o.style){
      case EBorder.Round:
         o.hBeforeLine.style.backgroundColor = c;
         o.hLeft.style.backgroundColor = c;
         o.hPanel.style.backgroundColor = c;
         o.hRight.style.backgroundColor = c;
         o.hAfterLine.style.backgroundColor = c;
         break;
   }
}

//==========================================================
// <T>设置边框可见性。</T>
//
// @method
// @param v:visible:Boolean 可见性
//==========================================================
function TBorder_setVisible(v){
   var o = this;
   switch(o.style){
      case EBorder.Round:
         o.hTopRow.style.display = v ? 'block' : 'none';
         o.hBeforeRow.style.display = v ? 'block' : 'none';
         o.hBody.style.borderLeft = '';
         o.hBody.style.borderRight = '';
         o.hAfterRow.style.display = v ? 'block' : 'none';
         o.hBottomRow.style.display = v ? 'block' : 'none';
         break;
   }
}
