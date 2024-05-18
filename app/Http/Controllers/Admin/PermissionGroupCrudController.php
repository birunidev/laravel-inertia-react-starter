<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionGroupCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissionQuery = PermissionGroup::query();

        $permissionQuery->when(request('search'), function ($query, $search) {
            return $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('display_name', 'LIKE', '%' . $search . '%');
        });

        $permissionQuery->when(request('sortField'), function ($query, $sortField) {
            return $query->orderBy($sortField, request('sortDirection') ? request('sortDirection') : 'asc');
        });

        $permissionGroups = $permissionQuery->paginate(5);

        return Inertia::render('Dashboard/PermissionGroups/Index', compact('permissionGroups'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Dashboard/PermissionGroups/Manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        PermissionGroup::create($request->all());

        session()->flash('success', 'PermissionGroup created successfully');

        return redirect()->route('dashboard.permission-groups');
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
        $permissionGroup = PermissionGroup::find($id);

        return Inertia::render('Dashboard/PermissionGroups/Manage', compact('permissionGroup'));
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

        $permission = PermissionGroup::findOrFail($id);

        $permission->update($request->all());

        session()->flash('success', 'Permission Group updated successfully');

        return redirect()->route('dashboard.permission-groups');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $permission = PermissionGroup::find($id);

        if (!$permission) {
            session()->flash('error', 'Permission Group not found');
            return redirect()->route('dashboard.permission-groups');
        }



        $permission->delete();

        session()->flash('success', 'Permission Group deleted successfully');

        return redirect()->route('dashboard.permission-groups');
    }
}
