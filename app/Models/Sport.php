<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    protected $fillable = ['team_a', 'team_b', 'score_a', 'score_b'];

    public function bets()
    {
        return $this->hasMany(Bet::class);
    }
}
