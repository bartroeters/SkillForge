<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'content',
        'lessonId',
        'userId'
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
