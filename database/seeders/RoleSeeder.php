<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // make Super Admin, Admin, Customer, Subscriber
        $roles = [
            ['name' => 'super-admin', 'display_name' => 'Super Admin', 'guard_name' => 'web'],
            ['name' => 'admin', 'display_name' => 'Admin', 'guard_name' => 'web'],
            ['name' => 'customer', 'display_name' => 'Customer', 'guard_name' => 'web'],
            ['name' => 'subscriber', 'display_name' => 'Subscriber', 'guard_name' => 'web'],
        ];

        Role::insert($roles);
    }
}
