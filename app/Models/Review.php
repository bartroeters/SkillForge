<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'rating',
        'userId',
        'courseId'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
