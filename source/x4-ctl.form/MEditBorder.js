//==========================================================
// 建立控件编辑框边框的接口
//
// @manager
// @author maochunyang
// @version 1.0.1
//==========================================================
function MEditBorder(o){
   o = RClass.inherits(this, o);
   /// @attribute TBorder
   o.editBorder         = null;
   o.borderStyle        = EBorder.None;
   /// @event
   o.onBuildEditBorder  = MEditBorder_onBuildEditBorder;
   // method
   o.setEditBorderStyle = MEditBorder_setEditBorderStyle;
   o.dispose            = MEditBorder_dispose;
   return o;
}

//==========================================================
// 建立边框对象
//
// @method
// @see RClass.isClass
//==========================================================
function MEditBorder_onBuildEditBorder(hp){
   var o = this;
   var b = o.editBorder = new TBorder(o.borderStyle);
   b.hParent = hp;
   RBorder.build(b);
   // 设置下拉菜单样式
   if(b.hDrop){
      b.hDrop.className = o.style('DropPanel');
   }
   o.hEditPanel  = b.hPanel;
   // 设置关联信息
   var h = o.hEditForm = b.hForm;
   h.className = o.style('EditForm');
   o.linkEvent(o, 'onDataEnter', h);
   o.linkEvent(o, 'onDataLeave', h);
   if(o.editWidth){
      h.width = o.editWidth;
   }
   if(o.editHeight){
      h.height = o.editHeight;
   }
}

//==========================================================
// <T>建立边框对象的样式。</T>
//
// @method
// @param s:style:EBorderStyle 样式
// @param c:color:String 边框颜色
// @see RClass.isClass
//==========================================================
function MEditBorder_setEditBorderStyle(s, c){
   var o = this;
   var b = o.editBorder;
   switch(b.style){
      case EBorder.Round:
      case EBorder.RoundDrop:
         if(EBorderStyle.Readonly == s){
            b.hTopLine.className = 'RBorder_TopReadony';
            b.hBeforeLine.className = 'RBorder_BeforeReadony';
            b.hFormLine.className = 'RBorder_PanelReadony';
            b.hAfterLine.className = 'RBorder_AfterReadony';
            b.hBottomLine.className = 'RBorder_BottomReadony';
            b.hPanel.style.backgroundColor = EColor.Readonly;
         }else{
            b.hTopLine.className = 'RBorder_Top';
            b.hBeforeLine.className = 'RBorder_Before';
            b.hFormLine.className = 'RBorder_Panel';
            b.hAfterLine.className = 'RBorder_After';
            b.hBottomLine.className = 'RBorder_Bottom';
            b.hPanel.style.backgroundColor = EColor.Edit;
         }
         break;
      case EBorder.RoundIcon:
         b.hIcon.style.backgroundColor = c;
         b.hPanel.style.backgroundColor = c;
         break;
   }
}
//==========================================================
// 建立边框对象的样式
//
// @method
// @param h:hover:Boolean 是否获得热点
// @param c:color:String 边框颜色
// @see RClass.isClass
//==========================================================
function MEditBorder_dispose(){
   var o = this;
   RMemory.freeHtml(o.hEditForm);
   o.hEditForm = null;
}
