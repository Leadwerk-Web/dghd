# Sync dghd Nextcloud Hub -> ./hub
# Share: https://hub.dghd.online/s/ArwNKt2SnFobDWE

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$confPath = Join-Path $PSScriptRoot "rclone-dghd-hub.conf"
$hubDir = Join-Path $root "hub"

$rclone = $null
$candidates = @(
  (Get-Command rclone -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source),
  "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Rclone.Rclone_Microsoft.Winget.Source_8wekyb3d8bbwe\rclone-v1.75.1-windows-amd64\rclone.exe"
)
foreach ($c in $candidates) {
  if ($c -and (Test-Path $c)) { $rclone = $c; break }
}
if (-not $rclone) {
  $found = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter rclone.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
  if ($found) { $rclone = $found }
}
if (-not $rclone) {
  throw "rclone nicht gefunden. Bitte mit: winget install Rclone.Rclone"
}

if (-not (Test-Path $confPath)) {
  throw "Config fehlt: $confPath"
}

New-Item -ItemType Directory -Force -Path $hubDir | Out-Null

Write-Host "Sync: dghd-hub -> $hubDir"
& $rclone --config $confPath sync "dghd-hub:" $hubDir --progress --create-empty-src-dirs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Fertig. Inhalt:"
& $rclone --config $confPath lsd "dghd-hub:"
Write-Host ""
Get-ChildItem $hubDir | Format-Table Name, Mode, LastWriteTime
