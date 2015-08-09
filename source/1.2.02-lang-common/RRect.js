//============================================================
// RRectFace
//============================================================
MO.RRect = function RRect(){
   return this;
}

//===========================================================
//
//===========================================================
MO.RRect.prototype.nvl = function RRect_nvl(rect){
   return rect ? rect : new TRect();
}

//===========================================================
//
//===========================================================
MO.RRect.prototype.pack = function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}

//===========================================================
//
//===========================================================
MO.RRect.prototype.unpack = function RRect_unpack(pack, rect){
   rect = this.nvl(rect);
   if(pack){
      var items = pack.split(',');
      if(items.length == 4){
         rect.left = RInt.parse(items[0]);
         rect.top = RInt.parse(items[1]);
         rect.right = RInt.parse(items[2])
         rect.bottom = RInt.parse(items[3]);
      }
   }
   return rect;
}
//..........................................................
// 实例化内容
MO.RRect = new MO.RRect();
