# Dokumentasi Laravel React Inertia Boilerplate

## Pendahuluan

Selamat datang di dokumentasi Laravel React Inertia Boilerplate. Boilerplate ini dirancang untuk membantu Anda memulai proyek Laravel tanpa harus memulai dari awal. Dengan menggunakan boilerplate ini, Anda akan mendapatkan fitur-fitur berikut:

Laravel Breeze: Sistem autentikasi yang mudah digunakan.
Autentikasi: Proses login dan registrasi pengguna.
API: Pembuatan dan pengelolaan API.
Roles and Permissions: Manajemen hak akses pengguna.
Media Library: Pengelolaan file media.
Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:

-   PHP >= 7.4
-   Composer
-   Node.js & npm
-   MySQL atau database lainnya

### Instalasi

1. Clone Repository
   Clone repository ini ke dalam direktori lokal Anda:

```
git clone https://github.com/username/laravel-react-inertia-boilerplate.git

cd laravel-react-inertia-boilerplate
```

2. Install Dependencies
   Jalankan perintah berikut untuk menginstal dependencies PHP dan JavaScript:

```
composer install
npm install
```

3.  Konfigurasi Environment
    Salin file .env.example menjadi .env dan sesuaikan konfigurasi database serta pengaturan lainnya:

```
cp .env.example .env
php artisan key:generate

```

4. Migrasi dan Seeder
   Jalankan migrasi database dan seeder untuk membuat tabel-tabel yang diperlukan:

```
php artisan migrate --seed
```

5. Link Storage
   Jalankan symlink untuk menghubungkan folder storage public:

```
php artisan storage:link
```

6. Build Frontend
   Build aset-aset frontend menggunakan perintah berikut:

```
npm run dev
```

7. Jalankan Server
   Jalankan server pengembangan Laravel:

```
php artisan serve
```

Dan jalankan Vite untuk hot module replacement:

```
npm run dev
```

### Fitur-Fitur

Laravel Breeze
Laravel Breeze menyediakan implementasi autentikasi dasar yang mudah digunakan, termasuk registrasi, login, dan reset password.

Autentikasi
Autentikasi telah dikonfigurasi menggunakan Laravel Breeze dengan beberapa penyesuaian agar sesuai dengan kebutuhan proyek Anda.

API
Boilerplate ini menyediakan struktur dasar untuk pembuatan API menggunakan Laravel. Anda dapat menambahkan rute API di routes/api.php dan membuat controller serta resource sesuai kebutuhan.

Roles and Permissions
Manajemen roles dan permissions menggunakan package spatie/laravel-permission. Anda dapat mendefinisikan roles dan permissions di seeder atau melalui tinker.

Contoh Penambahan Role dan Permission

```
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// Membuat Role
$role = Role::create(['name' => 'admin']);

// Membuat Permission
$permission = Permission::create(['name' => 'edit articles']);

// Memberikan Permission ke Role
$role->givePermissionTo($permission);
```

## Penutup

Dokumentasi ini memberikan gambaran umum tentang bagaimana memulai dengan Laravel React Inertia Boilerplate. Silakan eksplorasi lebih lanjut dan sesuaikan dengan kebutuhan proyek Anda. Jika ada pertanyaan atau masalah, jangan ragu untuk membuka isu di repository GitHub. Selamat berkoding!
