/**************************************************************
 * 该类是一个定义Bool类型的枚举类
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EUploadStatusFace(){
   var o = this;
   o.Local     = 'L';
   o.Uploading = 'U';
   o.Uploaded  = 'D';
   return o;
}
var EUploadStatus = new EUploadStatusFace();
