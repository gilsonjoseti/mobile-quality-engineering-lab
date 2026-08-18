$ErrorActionPreference = 'Stop'

$emulatorPath = "$env:ANDROID_HOME\emulator\emulator.exe"
$deviceName = $env:DEVICE_NAME

if (-not $deviceName) {
    $deviceName = 'Pixel_5_Emulator'
}

if (-not $env:ANDROID_HOME -or -not (Test-Path $emulatorPath)) {
    Write-Host 'Android SDK emulator not found. Set ANDROID_HOME and ensure Android Studio emulator is installed.'
    exit 1
}

$existing = & $emulatorPath -list-avds 2>$null
if (-not $existing) {
    Write-Host 'No Android Virtual Devices were found. Create one in Android Studio before running this script.'
    exit 1
}

if ($existing -match $deviceName) {
    Write-Host "Starting emulator: $deviceName"
    & $emulatorPath -avd $deviceName
} else {
    $firstAvd = ($existing | Select-Object -First 1)
    Write-Host "Device '$deviceName' not found. Starting first available emulator: $firstAvd"
    & $emulatorPath -avd $firstAvd
}
