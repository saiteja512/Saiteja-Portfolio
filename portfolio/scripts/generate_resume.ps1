#!/usr/bin/env pwsh
<#
  generate_resume.ps1
  Usage: run from repository root or via the included VS Code task.
  This script converts html/resume_template.html into html/Santhosh-Resume.pdf using Edge/Chrome headless if available.
#>

Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$template = Join-Path $repoRoot "html\resume_template.html"
$output = Join-Path $repoRoot "html\Santhosh-Resume.pdf"

Write-Host "Template:" $template
Write-Host "Output:" $output

if (-not (Test-Path $template)) {
  Write-Error "Template not found at $template"
  exit 2
}

# Prefer msedge (Edge). Fallback to chrome.exe or chromium.
$edge = Get-Command msedge -ErrorAction SilentlyContinue
$chrome = Get-Command chrome -ErrorAction SilentlyContinue

$fileUrl = "file:///" + ($template -replace '\\','/')

if ($edge) {
  Write-Host "Using msedge to print to PDF..."
  & $edge --headless --disable-gpu --print-to-pdf="$output" $fileUrl
  if (Test-Path $output) { Write-Host "PDF generated: $output"; exit 0 } else { Write-Error "Failed to create PDF with msedge"; exit 3 }
} elseif ($chrome) {
  Write-Host "Using chrome to print to PDF..."
  & $chrome --headless --disable-gpu --print-to-pdf="$output" $fileUrl
  if (Test-Path $output) { Write-Host "PDF generated: $output"; exit 0 } else { Write-Error "Failed to create PDF with chrome"; exit 3 }
} else {
  Write-Warning "Neither msedge nor chrome were found on PATH."
  Write-Host "Opening template in default browser. Use Print -> Save as PDF to produce $output."
  Start-Process $template
  exit 4
}
