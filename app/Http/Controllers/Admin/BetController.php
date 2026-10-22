<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bet;
use Inertia\Inertia;

class BetController extends Controller
{
    public function index()
    {
        $bets = Bet::with(['user:id,name,email', 'sport'])
            ->latest()
            ->get()
            ->map(fn($b) => [
                'id' => $b->id,
                'user' => $b->user->name,
                'email' => $b->user->email,
                'match' => "{$b->sport->team_a} vs {$b->sport->team_b}",
                'pick' => $b->team === 'a' ? $b->sport->team_a : $b->sport->team_b,
                'amount' => $b->amount,
                'status' => $b->status,
                'placed_at' => $b->created_at->format('d M Y, H:i'),
            ]);

        return Inertia::render('Admin/Bets/Index', ['bets' => $bets]);
    }
}
