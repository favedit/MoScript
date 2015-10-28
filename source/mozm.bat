@CLS

@SET JS_HOME=%cd%
@SET PJ_HOME=%JS_HOME%\..\..
@SET PJ_EAI=%PJ_HOME%\MoCloud\mp-zmf-content\webroot

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar;%JS_HOME%\..\library\mo-lib-lzma.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -Xms256m -Xmx512m -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME% release

@REM ============================================================
@COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\ml.js  --js_output_file ajs\release\ml.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\me.js  --js_output_file ajs\release\me.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\eai.js --js_output_file ajs\release\eai.js

@REM ============================================================
@SET JAVA_COMPRESS=org.mo.util.javascript.RJsCompress
@"%JAVA_HOME%\bin\java.exe" -Xms256m -Xmx512m -cp %JAVA_PATH% %JAVA_COMPRESS% ajs\release\eai.jc ajs\release\me.js ajs\release\eai.js

@XCOPY /E /Y %JS_HOME%\ars\eai\city            %PJ_EAI%\ars\eai\city
@XCOPY /E /Y %JS_HOME%\ars\eai\currency        %PJ_EAI%\ars\eai\currency
@XCOPY /E /Y %JS_HOME%\ars\eai\loading         %PJ_EAI%\ars\eai\loading
@XCOPY /E /Y %JS_HOME%\ars\eai\map_entry       %PJ_EAI%\ars\eai\map_entry
@XCOPY /E /Y %JS_HOME%\ars\eai\live            %PJ_EAI%\ars\eai\live
@COPY     /Y %JS_HOME%\ars\eai\resource.dat    %PJ_EAI%\ars\eai\resource.dat
@COPY     /Y %JS_HOME%\ars\eai\background.jpg  %PJ_EAI%\ars\eai\background.jpg
@COPY     /Y %JS_HOME%\ars\eai\background.png  %PJ_EAI%\ars\eai\background.png
@COPY     /Y %JS_HOME%\ars\eai\pause.png       %PJ_EAI%\ars\eai\pause.png
@COPY     /Y %JS_HOME%\ars\eai\player.png      %PJ_EAI%\ars\eai\player.png
@COPY     /Y %JS_HOME%\ars\eai\background2.jpg %PJ_EAI%\ars\eai\background2.jpg
@COPY     /Y %JS_HOME%\ars\eai\south-sea.png   %PJ_EAI%\ars\eai\south-sea.png
@COPY     /Y %JS_HOME%\ars\eai\citys.png       %PJ_EAI%\ars\eai\citys.png
@COPY     /Y %JS_HOME%\ars\eai\dot.png         %PJ_EAI%\ars\eai\dot.png
@XCOPY /E /Y %JS_HOME%\ars\eai-mb              %PJ_EAI%\ars\eai-mb
@XCOPY /E /Y %JS_HOME%\ars\eai-pc              %PJ_EAI%\ars\eai-pc
@XCOPY /E /Y %JS_HOME%\ars\shader              %PJ_EAI%\ars\shader

@COPY /Y %JS_HOME%\ajs\release\lzma_worker.js %PJ_EAI%\ajs\lzma_worker.js
@COPY /Y %JS_HOME%\ajs\release\ml.js          %PJ_EAI%\ajs\ml.js
@COPY /Y %JS_HOME%\ajs\release\eai.jc         %PJ_EAI%\ajs\eai.jc
