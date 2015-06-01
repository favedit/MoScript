//============================================================
// TNameList
//============================================================
function TNameList(){
   var o = this;
   // Property
   o.count      = 0;
   o.items      = new Array();
   // Method
   o.isEmpty    = TNameList_isEmpty;
   o.contains   = TNameList_contains;
   o.indexOf    = TNameList_indexOf;
   o.find       = TNameList_find;
   o.get        = TNameList_get;
   o.set        = TNameList_set;
   o.push       = TNameList_push;
   o.sync       = TNameList_sync;
   o.swap       = TNameList_swap;
   o.remove     = TNameList_remove;
   o.removeItem = TNameList_removeItem;
   o.clear      = TNameList_clear;
   o.dump       = TNameList_dump;
   return o;
}

//============================================================
//TNameList
//============================================================
function TNameList_isEmpty(){
   return (this.count == 0);
}

//============================================================
//TNameList
//============================================================
function TNameList_contains(obj){
   return (this.indexOf(obj) != -1);
}

//============================================================
//TNameList
//============================================================
function TNameList_indexOf(obj){
   if(obj != null){
      for(var n=0; n<this.count; n++){
         if(this.items[n] == obj){
            return n;
         }
      }
   }
   return -1;
}

//============================================================
//TNameList
//============================================================
function TNameList_find(name){
   if(name != null){
      for(var n=0; n<this.count; n++){
         var item = this.items[n];
         if(item && item.name == name){
            return item;
         }
      }
   }
   return null;
}

//============================================================
//TNameList
//============================================================
function TNameList_get(idx){
   return (idx >=0 && idx<this.count) ? this.items[idx] : null;
}

//============================================================
//TNameList
//============================================================
function TNameList_set(idx, obj){
   if(idx >=0 && idx<this.count){
      this.items[idx] = obj;
   }
}

//============================================================
//TNameList
//============================================================
function TNameList_push(obj){
   var idx = this.count++;
   this.items[idx] = obj;
   return idx;
}

//============================================================
//TNameList
//============================================================
function TNameList_sync(obj){
   var idx = this.indexOf(obj);
   return (idx == -1) ? this.push(obj) : idx;
}

//============================================================
//TNameList
//============================================================
function TNameList_swap(from, to){
   if(from >= 0 && from < this.count && to >= 0 && to < this.count){
      var obj = this.items[from];
      this.items[from] = this.items[to];
      this.items[to] = obj;
   }
}

//============================================================
//TNameList
//============================================================
function TNameList_remove(idx){
   var obj = null;
   if(idx >= 0 && idx < this.count){
      obj = this.items[idx];
      var loop = --this.count;
      for(var n=idx; n<loop; n++){
         this.items[n] = this.items[n+1];
      }
   }
   return obj;
}

//============================================================
//TNameList
//============================================================
function TNameList_removeItem(obj){
   var idx = this.indexOf(obj);
   if(idx != -1){
      this.remove(idx);
   }
}

//============================================================
//TNameList
//============================================================
function TNameList_clear(){
   this.count = 0;
}

//============================================================
//TNameList
//============================================================
function TNameList_dump(){
   var dump = new FString();
   dump.append(IClass.name(this), ': ', this.count);
   for(var n=0; n<this.count; n++){
      dump.append(' [', this.items[n], ']');
   }
   return dump;
}
