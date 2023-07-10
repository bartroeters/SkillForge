<?php

use App\Models\Course;
use App\Models\User;
use Carbon\Carbon;

$user = User::inRandomOrder()
    ->where('created_at', '<=', Carbon::now())
    ->first();

$course = Course::inRandomOrder()
    ->where('created_at', '<=', Carbon::now())
    ->first();

$timestamp = fake()->dateTimeBetween(
    max($user->created_at, $course->created_at),
    'now'
);

return [
    'userId' => $user,
    'courseId' => $course,
    'timestamp' => $timestamp
];