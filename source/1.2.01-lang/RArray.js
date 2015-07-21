//==========================================================
// <T>数组操作的工具类</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RArray = function RArray(){
   var o = this;
   //..........................................................
   // @attribute
   o.array1  = new Array(1);
   o.array2  = new Array(2);
   o.array3  = new Array(3);
   o.array4  = new Array(4);
   o.array9  = new Array(9);
   o.array12 = new Array(12);
   o.array16 = new Array(16);
   return o;
}

//==========================================================
// <T>判断数组内所有内容是否全部相同。</T>
//
// @method
// @param s:source:Array 源数组
// @param t:target:Array 目标数组
// @return Boolean
//    <L value='true'>相等</L>
//    <L value='false'>不相等</L>
//==========================================================
MO.RArray.prototype.equals = function RArray_equals(s, t){
   if(s && t){
      if(s.length == t.length){
         var c = s.length;
         for(var n = 0; n < c; n++){
            if(s[n] != t[n]){
               return false;
            }
         }
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>取得对象内的所有数据的总数。</T>
//
// @method
// @param value:Object 对象
// @return Integer 数据总数
//==========================================================
MO.RArray.prototype.count = function RArray_count(value){
   var count = 0;
   for(var name in value){
      count++;
   }
   return count;
}

//==========================================================
// <T>判断数组中是否含有指定的对象。</T>
//
// @method
// @param array:Array 数组对象
// @param value:Object 对象名
// @return Boolean
//    <L value='true'>含有</L>
//    <L value='false'>不含有</L>
//==========================================================
MO.RArray.prototype.contains = function RArray_contains(array, v){
   var c = array.length;
   for(var n = 0; n < c; n++){
      if(array[n] == v){
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>在数组中查找指定对象的索引位置，没找到返回-1。</T>
//
// @method
// @param a:array:Array 数组对象
// @param v:value:Object 对象名
// @return Integer 索引位置
//==========================================================
MO.RArray.prototype.find = function RArray_find(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return n;
      }
   }
   return -1;
}

//==========================================================
// <T>在数组中查找指定对象的名称，并把名称返回，没找到返回空。</T>
//
// @method
// @param a:array:Array 数组对象
// @param v:value:Object 对象名
// @return Object 没有找到返回-1
//==========================================================
MO.RArray.prototype.search = function RArray_search(a, v){
   for(var n in a){
      if(a[n] == v){
         return n;
      }
   }
   return null;
}

//==========================================================
// <T>对数组内的元素反向排列。</T>
//
// @method
// @param a:array:Array 数组对象
// @param s:start:Integer 开始位置
// @param e:end:Integer 结束位置
//==========================================================
MO.RArray.prototype.reverse = function RArray_reverse(a, s, e){
   var c = (e + 1 - s) >> 1;
   for(var n = 0; n < c; n++){
      var t = a[s + n];
      a[s + n] = a[e - n];
      a[e - n] = t;
   }
}

//==========================================================
// <T>复制数组的内容。</T>
//
// @method
// @param source:Array 来源数组
// @param sourceOffset:Integer 来源位置
// @param sourceCount:Integer 来源长度
// @param target:Array 目标数组
// @param targetOffset:Integer 目标位置
//==========================================================
MO.RArray.prototype.copy = function RArray_copy(source, sourceOffset, sourceCount, target, targetOffset){
   MO.Assert.debugNotNull(source);
   MO.Assert.debugTrue((sourceOffset >= 0) && (sourceOffset + sourceCount <= source.length));
   MO.Assert.debugTrue(sourceCount <= source.length);
   MO.Assert.debugNotNull(target);
   MO.Assert.debugTrue((targetOffset >= 0) && (targetOffset + sourceCount <= target.length));
   for(var i = 0; i < sourceCount; i++){
      target[i + targetOffset] = source[i + sourceOffset];
   }
   return target;
}

//==========================================================
// <T>复制数组中的一部分内容到指定位置。</T>
//
// @method
// @param array:Array 数组对象
// @param offset:Integer 开始位置
// @param count:Integer 复制总数
// @param target:Integer 目标位置
//==========================================================
MO.RArray.prototype.move = function RArray_move(array, offset, count, target){
   if(offset > target){
      for(var n = 0; n < count; n++){
         array[target - n] = array[offset + n];
      }
   }else if(offset < target){
      for(var n = 0; n < count; n++){
         array[target + count - n - 1] = array[offset + count - n - 1];
      }
   }
}

//==========================================================
// <T>删除数组中指定位置的一个对象。</T>
//
// @method
// @param a:array:Array 数组对象
// @param n:index:Integer 索引位置
// @return Array 删除后的数组对象
//==========================================================
MO.RArray.prototype.remove = function RArray_remove(a, n){
   return a.slice(0, n).concat(a.slice(n + 1));
}

//==========================================================
// <T>数组的部分排序。</T>
//
// @method
// @param a:array:Array 数组对象
// @param l:left:Integer 左边位置
// @param r:right:Integer 右边位置
// @return Integer 排序结束位置
//==========================================================
MO.RArray.prototype.sortPartition = function RArray_sortPartition(a, l, r){ 
   var s = l;
   var e = r + 1;
   var t = a[s];
   while(true){
      while(a[++s] < t){
      }
      while(a[--e] > t){
      }
      if(s > e){
         break;
      }
      var v = a[s];
      a[s] = a[e];
      a[e] = v;
   }
   a[l] = a[e];
   a[e] = t;
   return e;
} 

//==========================================================
// <T>对数组进行排序。</T>
//
// @method
// @param a:array:Array 数组对象
// @param s:start:Integer 开始位置
// @param e:end:Integer 结束位置
//==========================================================
MO.RArray.prototype.sortArray = function RArray_sortArray(a, s, e){
   if(s < e){
      var o = this;
      var p = o.sortPartition(a, s, e);
      o.sortArray(a, s, p - 1);
      o.sortArray(a, p + 1, e);
   }
}

//==========================================================
// <T>对数组进行排序。</T>
//
// @method
// @param a:array:Array 数组对象
// @param t:type:Boolean
//    <L value='true'>降序排列</L>
//    <L value='false'>升序排列</L>
//==========================================================
MO.RArray.prototype.sort = function RArray_sort(a, t){
   var o = this;
   var c = a.length - 1;
   o.sortArray(a, 0, c);
   if(t){
      o.reverse(a, 0, c);
   }
   return a;
}

//==========================================================
// <T>取得对象内的最长的属性名称的长度。</T>
//
// @method
// @param a:array:Object 对象名
// @return Integer 字符串长度
//==========================================================
MO.RArray.prototype.nameMaxLength = function RArray_nameMaxLength(a){
   var r = 0;
   for(var n in a){
      var l = n.length;
      if(l > n){
         n = l;
      }
   }
   return r;
}
//..........................................................
// 实例化内容
MO.RArray = new MO.RArray();
MO.Lang.Array = MO.RArray;
