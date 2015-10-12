//==========================================================
// <T>显示面板处理器。</T>
//
// @class
// @author maocy
// @history 151012
//==========================================================
MO.FEaiShowBoardProcessor = function FEaiShowBoardProcessor(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   //..........................................................
   // @attribute
   o._boards   = MO.Class.register(o, new MO.AGetSet('_boards'));
   //..........................................................
   // @method
   o.construct = MO.FEaiShowBoardProcessor_construct;
   // @method
   o.setup     = MO.FEaiShowBoardProcessor_setup;
   o.process   = MO.FEaiShowBoardProcessor_process;
   // @method
   o.dispose   = MO.FEaiShowBoardProcessor_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_construct = function FEaiShowBoardProcessor_construct() {
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 配置属性
   o._boards = new MO.TObjects();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_setup = function FEaiShowBoardProcessor_setup() {
   var o = this;
   var boards = o._boards;
   for(var i = 1; i <= 8; i++){
      var board = MO.Class.create(MO.FEaiShowBoard);
      board.linkGraphicContext(o);
      board.setUrl('{eai.resource}/show1019/video/' + i + '.mp4');
      board.setup();
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_process = function FEaiShowBoardProcessor_process() {
   var o = this;
   var boards = o._boards;
   var count = boards.count();
   for(var i = i; i <= count; i++){
      var board = boards.at(i);
      board.process();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_dispose = function FEaiShowBoardProcessor_dispose() {
   var o = this;
   o._boards = MO.Lang.Object.dispose(o._boards);
   // 配置属性
   o.__base.FE3dDisplay.construct.call(o);
}
