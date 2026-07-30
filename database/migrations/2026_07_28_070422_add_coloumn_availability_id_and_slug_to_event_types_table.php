<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('event_types', function (Blueprint $table) {
            if (!Schema::hasColumn('event_types', 'availability_id')) {
                $table->string('availability_id')->nullable()->after('id');
            }
            if (!Schema::hasColumn('event_types', 'slug')) {
                $table->string('slug')->nullable()->after('name');
            }
            if (!Schema::hasColumn('event_types', 'location_type')) {
                $table->string('location_type')->default('offline')->after('description');
            }
            if (!Schema::hasColumn('event_types', 'location_details')) {
                $table->text('location_details')->nullable()->after('location_type');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_types', function (Blueprint $table) {
            $cols = [];
            if (Schema::hasColumn('event_types', 'availability_id')) $cols[] = 'availability_id';
            if (Schema::hasColumn('event_types', 'slug')) $cols[] = 'slug';
            if (!empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};
