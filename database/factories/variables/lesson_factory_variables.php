<?php

use App\Models\User;
use Carbon\Carbon;

$tutor = User::inRandomOrder()
  ->where('is_admin', true)
  ->where('created_at', '<=', Carbon::now())
  ->first();

$timestamp = fake()->dateTimeBetween(
  $tutor->created_at,
  'now'
);

return [
  'tutor' => $tutor
];