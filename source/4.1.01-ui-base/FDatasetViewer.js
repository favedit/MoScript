//==========================================================
// <T>数据视图。</T>
//
// @tool
// @author maocy
// @version 150901
//==========================================================
MO.FDatasetViewer = function FDatasetViewer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._dataset  = MO.Class.register(o, new MO.AGetSet('_dataset'));
   // @attribute
   o._position = MO.Class.register(o, new MO.AGetter('_position'), 0);
   o._offset   = MO.Class.register(o, new MO.AGetSet('_offset'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   //..........................................................
   // @method
   o.construct = MO.FDatasetViewer_construct;
   // @method
   o.isEmpty   = MO.FDatasetViewer_isEmpty;
   // @method
   o.current   = MO.FDatasetViewer_current;
   o.first     = MO.FDatasetViewer_first;
   o.prior     = MO.FDatasetViewer_prior;
   o.next      = MO.FDatasetViewer_next;
   o.last      = MO.FDatasetViewer_last;
   // @method
   o.move      = MO.FDatasetViewer_move;
   o.moveToRow = MO.FDatasetViewer_moveToRow;
   // @method
   o.reset     = MO.FDatasetViewer_reset;
   // @method
   o.dispose   = MO.FDatasetViewer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDatasetViewer_construct = function FDatasetViewer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//===========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//===========================================================
MO.FDatasetViewer_isEmpty = function FDatasetViewer_isEmpty(){
   return (this._count == 0);
}

//===========================================================
// <T>获得当前的数据行对象。</T>
//
// @method
// @return FDataRow 数据行对象
//===========================================================
MO.FDatasetViewer_current = function FDatasetViewer_current(){
   var o = this;
   var position = o._position;
   if(position != -1){
      var index = position + o._offset;
      var rows = o._dataset.rows();
      var row = rows.get(index);
      return row;
   }
   return null;
}

//===========================================================
// <T>移动记录游标到指定的索引位置。</T>
//
// @method
// @param position:Integer 索引位置
//===========================================================
MO.FDatasetViewer_move = function FDatasetViewer_move(position){
   var o = this;
   var count = o._count;
   if(count > 0){
      if((position >= 0) && (position < count)){
         o._position = position;
         return true;
      }
   }
   return false;
}

//===========================================================
// <T>移动记录游标到指定的数据行。</T>
//
// @method
// @param row:FDataRow 数据行
//===========================================================
MO.FDatasetViewer_moveToRow = function FDatasetViewer_moveToRow(row){
   var o = this;
   var index = o._rows.indexOf(row);
   if(index != -1){
      o._position = index - o._offset;
   }
}

//===========================================================
// <T>把记录游标移动到第一条记录的位置。</T>
//
// @method
// @param reset:Boolean 是否成功
//===========================================================
MO.FDatasetViewer_first = function FDatasetViewer_first(){
   var o = this;
   var count = o._count;
   if(count > 0){
      o._position = 0;
      return true;
   }else{
      o._position = -1;
      return false;
   }
}

//===========================================================
// <T>移动记录游标到上一个数据行。</T>
//
// @method
// @return Boolean 是否成功
//===========================================================
MO.FDatasetViewer_prior = function FDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}

//===========================================================
// <T>移动记录游标到下一个数据行。</T>
//
// @method
// @return Boolean 是否成功
//===========================================================
MO.FDatasetViewer_next = function FDatasetViewer_next(){
   var o = this;
   if(o._position < o._count - 1){
      o._position++;
      return true;
   }
   return false;
}

//===========================================================
// <T>移动记录游标到最后一个数据行。</T>
//
// @method
//===========================================================
MO.FDatasetViewer_last = function FDatasetViewer_last(){
   var o = this;
   var count = o._count;
   if(count > 0){
      o._position = count - 1;
      return true;
   }else{
      o._position = -1;
      return false;
   }
}

//===========================================================
// <T>重新设置开始位置。</T>
//
// @method
//===========================================================
MO.FDatasetViewer_reset = function FDatasetViewer_reset(){
   this._position = -1;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDatasetViewer_dispose = function FDatasetViewer_dispose(){
   var o = this;
   o._dataset = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
