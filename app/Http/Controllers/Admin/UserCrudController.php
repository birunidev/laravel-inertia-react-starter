<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $userQuery = User::query();

        $userQuery->when(request('search'), function ($query, $search) {
            return $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%');
        });

        $userQuery->when(request('sortField'), function ($query, $sortField) {
            return $query->orderBy($sortField, request('sortDirection') ? request('sortDirection') : 'asc');
        });

        $users = $userQuery->with('roles')->paginate(15);

        return Inertia::render('Dashboard/Users/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Dashboard/Users/Manage', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'roles' => 'required|array'
        ]);

        $user = User::create($request->only('name', 'email') + [
            'password' => bcrypt($request->password)
        ]);

        $user->syncRoles($request->roles);

        session()->flash('success', 'User created successfully!');

        return redirect()->route('dashboard.users');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $user = User::with('roles')->find($id);
        $roles = Role::all();

        return Inertia::render('Dashboard/Users/Manage', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'roles' => 'required|array',
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password',
        ]);

        $user = User::find($id);

        $user->update($request->only('name', 'email'));

        if ($request->password) {
            $user->update([
                'password' => bcrypt($request->password)
            ]);
        }

        $user->syncRoles($request->roles);

        session()->flash('success', 'User updated successfully!');

        return redirect()->route('dashboard.users');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::find($id);

        $user->delete();

        session()->flash('success', 'User deleted successfully!');

        return redirect()->route('dashboard.users');
    }
}
