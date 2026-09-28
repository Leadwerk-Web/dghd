$ErrorActionPreference = 'Continue'
$root = Split-Path $PSScriptRoot -Parent
$logDir = Join-Path $PSScriptRoot 'logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$stamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$log = Join-Path $logDir ("sync-hub_$stamp.log")
Start-Transcript -Path $log -Force | Out-Null
try {
  & (Join-Path $PSScriptRoot 'sync-hub.ps1')
  $code = $LASTEXITCODE
  if ($null -eq $code) { $code = 0 }
} catch {
  Write-Host $_
  $code = 1
}
Stop-Transcript | Out-Null
# keep last 14 logs
Get-ChildItem $logDir -Filter 'sync-hub_*.log' |
  Sort-Object LastWriteTime -Descending |
  Select-Object -Skip 14 |
  Remove-Item -Force -ErrorAction SilentlyContinue
exit $code