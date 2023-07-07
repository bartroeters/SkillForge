<?php

namespace Database\Factories\Helpers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

$thumbnailPath = null;

$response = (new Client())->get('https://picsum.photos/640/480');
$thumbnailPath = 'public/images/' . Str::random(10) . '.jpg';
Storage::put($thumbnailPath, $response->getBody()->getContents());

return $thumbnailPath;
