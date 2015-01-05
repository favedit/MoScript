@CLS

@SET JS_HOME=%cd%

@SET JAVA_PATH=%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_PMGR=org.mo.util.javascript.FJsPathMerger

@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1-runtime        %JS_HOME%\ajs\runtime.js        N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2-lang           %JS_HOME%\ajs\lang.js           N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3-base           %JS_HOME%\ajs\base.js           N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\4-core           %JS_HOME%\ajs\core.js           N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\5-graphic        %JS_HOME%\ajs\graphic.js        N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\5-graphic-2d     %JS_HOME%\ajs\graphic-2d.js     N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\5-graphic-3d     %JS_HOME%\ajs\graphic-3d.js     N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\5-graphic-3d-wgl %JS_HOME%\ajs\graphic-3d-wgl.js N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\6-engine         %JS_HOME%\ajs\engine.js         N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\6-engine-2d      %JS_HOME%\ajs\engine-2d.js      N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\6-engine-3d      %JS_HOME%\ajs\engine-3d.js      N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\6-engine-3d-resource %JS_HOME%\ajs\engine-3d-res.js N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\7-control        %JS_HOME%\ajs\control.js        N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\7-control-form   %JS_HOME%\ajs\control-form.js   N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\7-control-table  %JS_HOME%\ajs\control-table.js  N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\8-stage          %JS_HOME%\ajs\stage.js          N

COPY /Y %JS_HOME%\9-context\*.js %JS_HOME%\ajs\

@REM ============================================================
@SET JAVA_FMGR=org.mo.util.javascript.FJsFileMerger

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\runtime.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\lang.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\base.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\core.js
echo %JS_FILES%
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-core.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-2d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d-wgl.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-graphic.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-2d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-3d.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-engine.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control-form.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control-table.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-control.js
