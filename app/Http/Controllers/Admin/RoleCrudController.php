<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roleQuery = Role::query();

        $roleQuery->when(request('search'), function ($query, $search) {
            return $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('display_name', 'LIKE', '%' . $search . '%');
        });

        $roleQuery->when(request('sortField'), function ($query, $sortField) {
            return $query->orderBy($sortField, request('sortDirection') ? request('sortDirection') : 'asc');
        });

        $roles = $roleQuery->paginate(5);

        return Inertia::render('Dashboard/Roles/Index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Dashboard/Roles/Manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'display_name' => 'required|string',
        ]);

        Role::create($request->all());

        session()->flash('success', 'Role created successfully');

        return redirect()->route('dashboard.roles');
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
        $role = Role::findOrFail($id);

        return Inertia::render('Dashboard/Roles/Manage', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
            'display_name' => 'required|string',
        ]);

        $role = Role::findOrFail($id);

        $role->update($request->all());

        session()->flash('success', 'Role updated successfully');

        return redirect()->route('dashboard.roles');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $role = Role::find($id);

        if (!$role) {
            session()->flash('error', 'Role not found');
            return redirect()->route('dashboard.roles');
        }



        $role->delete();

        session()->flash('success', 'Role deleted successfully');

        return redirect()->route('dashboard.roles');
    }
}
