//==========================================================
// <T>可编辑管理接口。</T>
//
// @manager
// @param o:object:Object 拥有对象
// @history 091201 MAOCY 创建
//==========================================================
function MUiEditable(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   //o._editInsert = RClass.register(o, new APtySet(null, '_editInsert', 'edit_mode', EDisplayMode.Insert, false));
   //o._editUpdate = RClass.register(o, new APtySet(null, '_editUpdate', 'edit_mode', EDisplayMode.Update, false));
   //o._editDelete = RClass.register(o, new APtySet(null, '_editDelete', 'edit_mode', EDisplayMode.Delete, false));
   //o._editZoom   = RClass.register(o, new APtySet(null, '_editZoom', 'edit_mode', EDisplayMode.Zoom, false));
   //..........................................................
   // @attribute
   //o._absEdit   = true;
   //o._editable  = false;
   //..........................................................
   // @method
   //o.testEdit    = MUiEditable_testEdit;
   return o;
}

//==========================================================
// <T>测试指定模式下是否可以编辑。</T>
//
// @method
// @param m:mode:EMode 模式
// @return Boolean 可否编辑
//==========================================================
function MUiEditable_testEdit(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.editInsert;
      case EMode.Update:
         return o.editUpdate;
      case EMode.Delete:
         return o.editDelete;
      case EMode.Zoom:
         return o.editZoom;
   }
}
