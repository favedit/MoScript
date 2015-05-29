with(MO){
   //==========================================================
   // <T>文件工具类。</T>
   //
   // @reference
   // @author maocy
   // @version 150407
   //==========================================================
   MO.RFile = function RFile(){
      var o = this;
      //..........................................................
      // @define
      o.pictures  = ['jpg', 'png', 'gif', 'bmp'];
      o.knowns    = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
      //..........................................................
      // @method
      o.inPicture = RFile_inPicture;
      o.isPicture = RFile_isPicture;
      o.isKnown   = RFile_isKnown;
      // @method
      o.name      = RFile_name;
      o.extension = RFile_extension;
      return o;
   }

   //==========================================================
   //
   //==========================================================
   MO.RFile_inPicture = function RFile_inPicture(v){
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

   //==========================================================
   //
   //==========================================================
   MO.RFile_isPicture = function RFile_isPicture(v){
      return this.inPicture(this.extension(v));
   }

   //==========================================================
   //
   //==========================================================
   MO.RFile_isKnown = function RFile_isKnown(v){
      var o = this;
      v = o.extension(v).toLowerCase();
      for(var n in o.knowns){
         if(o.knowns[n] == v){
            return true;
         }
      }
      return false;
   }

   //=========================================================
   // <T>获得名称。</T>
   //
   // @param v:value:String 内容
   // @return String 名称
   //=========================================================
   MO.RFile_name = function RFile_name(value){
      if(value){
         value = value.replace(/\\/g, '/');
         // 获得路径中文件名称部分
         var p1 = value.lastIndexOf('/');
         if(p1 != -1){
            value = value.substring(p1 + 1);
         }
         // 获得文件名称中扩展名部分
         var p2 = value.lastIndexOf('.');
         if(p2 != -1){
            return value.substring(0, p2);
         }
         return value;
      }
      return '';
   }


   //=========================================================
   // <T>获得后缀名。</T>
   //
   // @param v:value:String 内容
   // @return String 后缀名
   //=========================================================
   MO.RFile_extension = function RFile_extension(v){
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
   //..........................................................
   // 实例化内容
   MO.RFile = new RFile();
}
