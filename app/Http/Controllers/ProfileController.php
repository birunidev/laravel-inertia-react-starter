<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = User::with('detail')->find(auth()->id());

        return Inertia::render('Dashboard/Profile/Edit', compact('user'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'profile_picture' => 'nullable|string|max:255',
            'province_id' => 'nullable|exists:provinces,id',
            'regency_id' => 'nullable|exists:regencies,id',
            'district_id' => 'nullable|exists:districts,id',
            'village_id' => 'nullable|exists:villages,id',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|digits_between:10,15',
        ]);

        $user = auth()->user();
        $data = $request->only('profile_picture', 'province_id', 'regency_id', 'district_id', 'village_id', 'address', 'phone');

        if (isset($data['province_id'])) {
            $province = Province::find($data['province_id']);
            $data['province_name'] = $province->name;
        }

        if (isset($data['regency_id'])) {
            $regency = Regency::find($data['regency_id']);
            $data['regency_name'] = $regency->name;
        }

        if (isset($data['district_id'])) {
            $district = District::find($data['district_id']);
            $data['district_name'] = $district->name;
        }

        if (isset($data['village_id'])) {
            $village = Village::find($data['village_id']);
            $data['village_name'] = $village->name;
        }

        $user->update(request()->only('name', 'email'));

        $user->detail()->updateOrCreate(
            ['user_id' => $user->id],
            $data
        );


        session()->flash('success', 'Profile updated successfully.');

        return Redirect::route('dashboard.profile.edit');
    }
}
