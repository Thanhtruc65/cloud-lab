$body = @{
    studentId = "SV001"
    name = "Nguyen Van Huong"
    email = "newtest@gmail.com"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/students" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Body: $($response.Content)"
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host "Error: $($reader.ReadToEnd())"
}
