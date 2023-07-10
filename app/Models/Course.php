<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends BaseModel
{
    use HasFactory;

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class);
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
