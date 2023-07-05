<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends BaseModel
{
    use HasFactory;

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
}
