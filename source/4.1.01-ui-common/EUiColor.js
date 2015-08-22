//==========================================================
// <T>颜色样式。</T>
//
// @reference
// @author maocy
// @version 150123
//==========================================================
MO.EUiColor = new function EUiColor(){
   var o = this;
   //..........................................................
   // @attribute
   o.ReadonlyBackgroundColor = '#FEFECB';
   // Attribute
   o.Normal        = '#FFFFFF';
   o.Select        = '#F8C59A';
   o.Valid         = '#FFCCCC';
   o.Invalid       = '#FFCCCC';
   //o.Edit          = '#ebffff';
   //o.Edit          = '#eef8df';
   //o.Edit          = '#EBFFFF';
   o.Edit          = '#FFFFFF';
   o.EditHover     = '#EBFFFF';
   o.Require       = '#FF0000';
   //
   o.Text          = '#000000';
   o.TextEdit      = '#0066FF';
   o.TextReadonly  = '#333333';
   o.TextInvalid   = 'red';
   //
   o.Delete        = '#DDDDDD';
   //
   o.ColumnReadonly = '#FFFFFF';
   //
   //o.Rows          = new Array('#FFFFFF', '#F0F0F0');
   o.Rows          = new Array('#FFFFFF', '#FAFAFA');
   o.RowSelect     = '#cde5ff';
   o.RowHover      = '#E8E8FF';
   o.RowEdit       = '#FFFFFF';
   o.RowEditSelect = '#FDEBDB';
   o.RowEditHover  = '#F8F8E0';
   return o;
}
