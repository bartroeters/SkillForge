<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    @vite(['resources/css/app.css', 'resources/js/app.ts'])
</head>

<body>
    <div id="app"></div>

    <!-- Axios -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</body>
</html>