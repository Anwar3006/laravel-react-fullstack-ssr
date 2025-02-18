<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Features extends Model
{
    /**
     * Get all of the comments for the Features
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get all of the Upvote for the Features
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function upvote(): HasMany
    {
        return $this->hasMany(Upvote::class);
    }

    /**
     * Get the user that owns the Features
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
