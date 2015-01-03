/**************************************************************
 * 建立控件边框的接口
 *
 * @manager
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MBorder(o){
   o = RClass.inherits(this, o);
   /// @attribute
   o.border         = null;
   o.borderStyle    = EBorder.None;
   /// @event
   o.onBuildBorder  = MBorder_onBuildBorder;
   o.setBorderStyle = MBorder_setBorderStyle;
   o.setBorderEnable = MBorder_setBorderStyle;
   return o;
}

/**************************************************************
 * 建立边框对象
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MBorder_onBuildBorder(){
   var o = this;
   var b = o.border = new TBorder(o.borderStyle);
   RBorder.build(b);
}

/**************************************************************
 * 建立边框对象的样式
 *
 * @method
 * @param s:select:
 * @see RClass.isClass
 **************************************************************/
function MBorder_setBorderStyle(s, c, r){
   var o = this;
   var t = o.border;
   var bs = o.borderStyle;
   if(EBorder.Round == bs){
      t.hPanelL.style.backgroundColor = c;
      t.hPanelT.style.backgroundColor = c;
      t.hPanel.style.backgroundColor = c;
      t.hPanelB.style.backgroundColor = c;
      t.hPanelR.style.backgroundColor = c;
   }else if(EBorder.RoundIcon == bs){
      t.hIconT.style.backgroundColor = c;
      t.hIcon.style.backgroundColor = c;
      t.hIconB.style.backgroundColor = c;
      t.hPanelL.style.backgroundColor = c;
      t.hPanelT.style.backgroundColor = c;
      t.hPanel.style.backgroundColor = c;
      t.hPanelB.style.backgroundColor = c;
      t.hPanelR.style.backgroundColor = c;
   }else if(EBorder.RoundDrop == bs){
      t.hPanelL.style.backgroundColor = c;
      t.hPanelT.style.backgroundColor = c;
      t.hPanel.style.backgroundColor = c;
      t.hPanelB.style.backgroundColor = c;
      t.hDrop.style.backgroundColor = c;
      if(s){
         t.hSplitT.style.backgroundColor = '#3C7FB1';
         t.hSplitM.style.backgroundColor = '#3C7FB1';
         t.hSplitB.style.backgroundColor = '#3C7FB1';
         t.hDropLt.style.backgroundColor = '#FFFFFF';
         t.hDropL.style.backgroundColor = '#FFFFFF';
         t.hDropLb.style.backgroundColor = '#FFFFFF';
         t.hDropT.style.backgroundColor = '#FFFFFF';
         t.hDropB.style.backgroundColor = '#FFFFFF';
         t.hDropR.style.backgroundColor = '#FFFFFF';
         t.hDropBR.style.backgroundColor = '#3C7FB1';
         t.hDropBLb.style.backgroundColor = '#3C7FB1';
         t.hDropBB.style.backgroundColor = '#3C7FB1';
         t.hDropBRb.style.backgroundColor = '#3C7FB1';
      }else{
         t.hSplitT.style.backgroundColor = c;
         t.hSplitM.style.backgroundColor = c;
         t.hSplitB.style.backgroundColor = c;
         t.hDropLt.style.backgroundColor = c;
         t.hDropL.style.backgroundColor = c;
         t.hDropLb.style.backgroundColor = c;
         t.hDropT.style.backgroundColor = c;
         t.hDropB.style.backgroundColor = c;
         t.hDropR.style.backgroundColor = c;
         t.hDropBR.style.backgroundColor = '#c0dff1';
         t.hDropBLb.style.backgroundColor = '#c0dff1';
         t.hDropBB.style.backgroundColor = '#c0dff1';
         t.hDropBRb.style.backgroundColor = '#e9f1f8';
      }
   }
}

