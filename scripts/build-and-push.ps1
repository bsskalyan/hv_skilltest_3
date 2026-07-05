$ErrorActionPreference = 'Stop'

$images = @(
  @{ Name = 'user-service'; Path = './services/user-service' },
  @{ Name = 'products-service'; Path = './services/products-service' },
  @{ Name = 'orders-service'; Path = './services/orders-service' },
  @{ Name = 'cart-service'; Path = './services/cart-service' },
  @{ Name = 'frontend-service'; Path = './services/frontend-service' }
)

$dockerHubUser = 'bsskalyan'
$tag = 'latest'

Write-Host "Building and pushing images for $dockerHubUser..."

foreach ($image in $images) {
  $fullTag = "$dockerHubUser/$($image.Name):$tag"
  docker build -t $fullTag $image.Path
  docker push $fullTag
}

Write-Host 'Done. All images pushed.'
