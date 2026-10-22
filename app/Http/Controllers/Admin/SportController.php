<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Sports/Index', [
            'sports' => Sport::withCount('bets')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'team_a' => 'required|string|max:100',
            'team_b' => 'required|string|max:100',
            'score_a' => 'required|integer|min:0',
            'score_b' => 'required|integer|min:0',
        ]);

        Sport::create($data);

        return redirect()->route('admin.sports.index');
    }

    public function result(Request $request, Sport $sport)
    {
        $data = $request->validate(['winner' => 'required|in:a,b']);

        $saved = DB::transaction(function () use ($sport, $data) {
            $sport = Sport::lockForUpdate()->findOrFail($sport->id);

            if ($sport->winner !== null) {
                return false; // already decided
            }

            $sport->winner = $data['winner'];
            $sport->save();

            $sport->bets()->where('team', $data['winner'])->update(['status' => 'won']);
            $sport->bets()->where('team', '!=', $data['winner'])->update(['status' => 'lost']);

            return true;
        });

        if (!$saved) {
            return back()->withErrors(['winner' => 'This match already has a result.']);
        }

        return back();
    }
}
