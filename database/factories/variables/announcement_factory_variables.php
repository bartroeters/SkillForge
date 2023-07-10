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
    'user' => $user,
    'course' => $course,
    'timestamp' => $timestamp
];

// use Carbon\Carbon;

// return function ($modelClass, $conditions = []) {
//     $model = $modelClass::inRandomOrder()
//         ->where('created_at', '<=', Carbon::now())
//         ->where($conditions)
//         ->first();

//     $timestamp = fake()->dateTimeBetween($model->created_at, 'now');

//     return [
//         'model' => $model,
//         'timestamp' => $timestamp,
//     ];
// };
