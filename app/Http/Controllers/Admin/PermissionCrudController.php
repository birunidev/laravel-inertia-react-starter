<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissionQuery = Permission::query();

        $permissionQuery->when(request('search'), function ($query, $search) {
            return $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('display_name', 'LIKE', '%' . $search . '%');
        });

        $permissionQuery->when(request('sortField'), function ($query, $sortField) {
            return $query->orderBy($sortField, request('sortDirection') ? request('sortDirection') : 'asc');
        });

        $permissions = $permissionQuery->paginate(5);

        return Inertia::render('Dashboard/Permissions/Index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $permissionGroup = PermissionGroup::all();
        return Inertia::render('Dashboard/Permissions/Manage', compact('permissionGroup'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
            'display_name' => 'required|string',
            'group_name' => 'required|string'
        ]);

        Permission::create($request->all());

        session()->flash('success', 'Permission created successfully');

        return redirect()->route('dashboard.permissions');
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
        $permission = Permission::findOrFail($id);
        $permissionGroup = PermissionGroup::all();

        return Inertia::render('Dashboard/Permissions/Manage', compact('permission', 'permissionGroup'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $id,
            'display_name' => 'required|string',
        ]);

        $permission = Permission::findOrFail($id);

        $permission->update($request->all());

        session()->flash('success', 'Permission updated successfully');

        return redirect()->route('dashboard.permissions');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $permission = Permission::find($id);

        if (!$permission) {
            session()->flash('error', 'Permission not found');
            return redirect()->route('dashboard.permissions');
        }



        $permission->delete();

        session()->flash('success', 'Permission deleted successfully');

        return redirect()->route('dashboard.permissions');
    }
}
