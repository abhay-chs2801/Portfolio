# PowerShell helper script for setup
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Portfolio Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (Test-Path "venv") {
    Write-Host "✓ Virtual environment found" -ForegroundColor Green
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    & .\venv\Scripts\Activate.ps1
} else {
    Write-Host "✗ Virtual environment not found" -ForegroundColor Red
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    & .\venv\Scripts\Activate.ps1
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Supabase Connection" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

python test_connection.py

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If the table doesn't exist:" -ForegroundColor Yellow
Write-Host "1. Open database_setup_simple.sql" -ForegroundColor White
Write-Host "2. Copy all contents" -ForegroundColor White
Write-Host "3. Go to Supabase Dashboard → SQL Editor" -ForegroundColor White
Write-Host "4. Paste and Run the SQL" -ForegroundColor White
Write-Host "5. Wait 15-30 seconds" -ForegroundColor White
Write-Host "6. Run this script again" -ForegroundColor White
Write-Host ""
Write-Host "See SETUP_STEPS.md for detailed instructions" -ForegroundColor Cyan

