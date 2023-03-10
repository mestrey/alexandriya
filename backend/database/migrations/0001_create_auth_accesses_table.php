<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('auth_accesses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('token')->unique();
            $table->string('refresh_token')->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('auth_tokens');
    }
};
