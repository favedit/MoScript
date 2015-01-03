/**************************************************************
 * 控件的管理创建类
 *
 * @refencene
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
var RBorder = new function(o){
   if(!o){o=this;}
   // Method
   o.colorTop    = '#23c2d8';
   o.colorLeft   = '#29bad7';
   o.colorSplit  = '#29bad7';
   // Method
   o.buildCell   = RBorder_buildCell;
   o.build       = RBorder_build;
   o.create      = RBorder_create;
   o.createFloat = RBorder_createFloat;
   // Construct
   RMemory.register('RBorder', o);
   return o;
}
// ------------------------------------------------------------
// style, hPanel
function RBorder_create(st, hp){
   var b = new TBorder(st);
   b.hParent = hp;
   this.build(b);
   return b;
}
// ------------------------------------------------------------
function RBorder_buildCell(hr, c, w, h, f){
   var hc = hr.insertCell();
   if(c){
      hc.style.backgroundColor = c;
   }
   if(w){
      hc.width = w;
   }
   if(h){
      hc.height = h;
   }
   if(f){
      RBuilder.appendEmpty(hc);
   }
   return hc;
}
// ------------------------------------------------------------
function RBorder_build(t){
   var o = this;
   var ts = t.style;
   var hp = t.hParent
   var ht = t.hForm = RBuilder.newTable();
   if(EBorder.None == ts){
      var hr = o.hRow = ht.insertRow();
      t.hPanel = hr.insertCell();
      return;
   }   
   // 建立上边框
   var s = new TString();
   s.append("<TABLE class='RBorder_Form' border=0 cellspacing=0 cellpadding=0><TR><TD height=1><SPAN class='RBorder_Top'></SPAN></TD></TR><TR><TD height=1><SPAN class='RBorder_Before'></SPAN></TD></TR><TR><TD class='RBorder_Panel'>");
   s.append("<TABLE class='RBorder_InnerForm' width='100%' height='100%' border=0 cellspacing=0 cellpadding=0><TR>");
   // 将建立中间区域
   if(EBorder.Round == ts){
      s.append("<TD color='#CFF6F6' width='1'></TD>");
      s.append("<TD color='#F1FFFF'></TD>");
      s.append("<TD color='#FFFFFF' width='1'></TD>");
   }else if(EBorder.RoundTitle == ts){
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
   }else if((EBorder.RoundIcon == ts) || (EBorder.RoundDrop == ts)){
      s.append("<TD color='#CFF6F6' width='1'></TD>");
      s.append("<TD color='#F1FFFF'></TD>");
      s.append("<TD color='#F1FFFF' width='1'></TD>");
      s.append("<TD color='#F1FFFF'></TD>");
      s.append("<TD color='#FFFFFF' width='1'></TD>");
   }
   // 建立下边框
   s.append("</TR></TABLE>");
   s.append("</TD></TR><TR><TD height=1><SPAN class='RBorder_After'></SPAN></TD></TR><TR><TD height=1><SPAN class='RBorder_Bottom'></SPAN></TD></TR></TABLE>");
   // 建立对象
   hp.innerHTML = s.toString();
   // 关联对象
   var hf = t.hForm = hp.children[0];
   t.hFormLine = hf.rows[2].cells[0];
   var hpf = hf.rows[2].cells[0].children[0];
   var hpr = hpf.rows[0];
   t.hTop = hf.rows[0].cells[0];
   t.hTopLine = t.hTop.children[0];
   t.hBefore = hf.rows[1].cells[0];
   t.hBeforeLine = t.hBefore.children[0];
   t.hAfter = hf.rows[3].cells[0];
   t.hAfterLine = t.hAfter.children[0];
   t.hBottom = hf.rows[4].cells[0];
   t.hBottomLine = t.hBottom.children[0];
   if(EBorder.Round == ts){
      t.hLeft = hpr.cells[0];
      t.hPanel = hpr.cells[1];
      t.hRight = hpr.cells[2];
   }else if(EBorder.RoundTitle == ts){
      // 建立标题栏(第3行)
      var hpr = hpf.rows[0];
      t.hTitleL = hpr.cells[0];
      t.hTitle = hpr.cells[1];
      t.hTitleR = hpr.cells[2];
      // 建立分割线
      var hpr = hpf.rows[1];
      t.hLineL = hpr.cells[0];
      t.hLine = hpr.cells[1];
      t.hLineR = hpr.cells[2];
      // 建立内容栏(第5行)
      var hpr = hpf.rows[2];
      t.hPanelL = hpr.cells[0];
      t.hPanel = hpr.cells[1];
      t.hPanelR = hpr.cells[2];
   }else if(EBorder.RoundIcon == ts){
      t.hLeft = hpr.cells[0];
      t.hIcon = hpr.cells[1];
      t.hSplit = hpr.cells[2];
      t.hPanel = hpr.cells[3];
      t.hRight = hpr.cells[4];
   }else if(EBorder.RoundDrop == ts){
      t.hLeft = hpr.cells[0];
      t.hPanel = hpr.cells[1];
      t.hSplit = hpr.cells[2];
      t.hDrop = hpr.cells[3];
      t.hRight = hpr.cells[4];
   }
}
// ------------------------------------------------------------
function RBorder_createFloat(hp){
   // 建立上边框
   var s = new TString();
   s.append("<DIV class='RBorder_FloatTo'><DIV class='RBorder_FloatTi'></DIV></DIV>");
   s.append("<DIV class='RBorder_FloatLeft'>");
   s.append("<DIV class='RBorder_FloatBody'>");
   s.append("<DIV class='RBorder_FloatRight'></DIV></DIV></DIV>");
   s.append("<DIV class='RBorder_FloatBo'><DIV class='RBorder_FloatBi'></DIV></DIV>");
   hp.innerHTML = s.toString();
   //
   var fb = new TFloatBorder();
   fb.hParent = hp;
   fb.hPanel = hp.children[1].children[0].children[0];
   return fb;
}

