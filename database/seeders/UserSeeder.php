<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // make 10 random user, all roles is super-admin
        \App\Models\User::factory(10)->create()->each(function ($user) {
            $user->assignRole('super-admin');
        });
    }
}
