//============================================================
// RRectFace
//============================================================
var RRect = new function(){
   var o = this;
   // Method
   o.nvl    = RRect_nvl;
   o.pack   = RRect_pack;
   o.unpack = RRect_unpack;
   // Construct
   RMemory.register('RRect', o);
   return o;
}

//===========================================================
//
//===========================================================
function RRect_nvl(rect){
   return rect ? rect : new TRect();
}

//===========================================================
//
//===========================================================
function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}

//===========================================================
//
//===========================================================
function RRect_unpack(pack, rect){
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
