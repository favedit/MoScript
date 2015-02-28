//============================================================
// RFile
//============================================================
var RFile = new function(){
   var o = this;
   // Define
   o.pictures  = ['jpg', 'png', 'gif', 'bmp'];
   o.knowns    = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
   // Method
   o.inPicture = RFile_inPicture;
   o.isPicture = RFile_isPicture;
   o.isKnown   = RFile_isKnown;
   o.extend    = RFile_extend;
   // Construct
   RMemory.register('RFile', o);
   return o;
}

//=========================================================
//
//=========================================================
function RFile_inPicture(v){
   var o = this;
   if(v){
      v = v.toLowerCase();
      for(var n in o.pictures){
         if(o.pictures[n] == v){
            return true;
         }
      }
   }
}

//=========================================================
//
//=========================================================
function RFile_isPicture(v){
   return this.inPicture(this.extend(v));
}

//=========================================================
//
//=========================================================
function RFile_isKnown(v){
   var o = this;
   v = o.extend(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}

//=========================================================
//
//=========================================================
function RFile_extend(v){
   if(v){
      v = v.replace(/\\/g, '/');
      // 获得路径中文件名称部分
      var p1 = v.lastIndexOf('/');
      if(-1 != p1){
         v = v.substring(p1 + 1);
      }
      // 获得文件名称中扩展名部分
      var p2 = v.lastIndexOf('.');
      if(-1 != p2){
         return v.substring(p2 + 1);
      }
      return v;
   }
   return '';
}
