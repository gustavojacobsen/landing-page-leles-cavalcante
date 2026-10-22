@echo off
rem Porta da landing page. A 3000 fica livre para outros projetos (ex.: dashboard da Elev).
set PORTA=3100

title Leles Cavalcanti - servidor local (porta %PORTA%)
cd /d "%~dp0"

echo.
echo  Preparando o servidor...

rem 1) Se sobrou um servidor antigo DESTE projeto travado, encerra ele (o PID fica no arquivo de trava do Next)
if exist ".next\dev\lock" (
  for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "try { (Get-Content '.next\dev\lock' -Raw | ConvertFrom-Json).pid } catch { '' }"`) do (
    if not "%%P"=="" taskkill /PID %%P /F >nul 2>&1
  )
  del /f /q ".next\dev\lock" >nul 2>&1
)

echo.
echo  Iniciando o site em http://localhost:%PORTA% ...
echo  Deixe esta janela aberta. Fechar esta janela desliga o site.
echo.

rem 2) Abre o navegador quando o servidor ja estiver respondendo
start "" powershell -NoProfile -WindowStyle Hidden -Command "for($i=0;$i -lt 90;$i++){ try { Invoke-WebRequest http://localhost:%PORTA% -UseBasicParsing -TimeoutSec 5 | Out-Null; Start-Process 'http://localhost:%PORTA%'; break } catch { Start-Sleep 1 } }"

call npx next dev -p %PORTA%

echo.
echo  O servidor parou. Se apareceu algum erro acima, tire um print e mande para o Claude.
pause
