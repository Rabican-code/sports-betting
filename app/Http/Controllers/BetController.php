<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use App\Models\Sport;
use Illuminate\Http\Request;

class BetController extends Controller
{
    public function store(Request $request, Sport $sport)
    {
        $data = $request->validate([
            'team' => 'required|in:a,b',
            'amount' => 'required|numeric|min:1|max:100000',
        ]);

        if ($sport->winner !== null) {
            return back()->withErrors(['team' => 'Betting is closed for this match.']);
        }

        $already = Bet::where('user_id', $request->user()->id)
            ->where('sport_id', $sport->id)
            ->exists();

        if ($already) {
            return back()->withErrors(['team' => 'You already placed a bet on this match.']);
        }

        Bet::create([
            'user_id' => $request->user()->id,
            'sport_id' => $sport->id,
            'team' => $data['team'],
            'amount' => round($data['amount'], 2),
        ]);

        return redirect()->route('sports.show', $sport);
    }
}
