<?php

namespace App\Console\Commands;

use App\Repositories\AuthAccessRepositoryInterface;
use App\Services\AuthAccessServiceInterface;
use Illuminate\Console\Command;

class CleanupExpiredRTokensCommand extends Command
{
    protected $signature = 'auth:cleanup-refresh';
    protected $description = 'Remove expired refresh tokens';

    public function handle(
        AuthAccessRepositoryInterface $authAccessRepository,
        AuthAccessServiceInterface $authAccessService,
    ) {
        $countRemoved = 0;

        $authAccessRepository->getByChunks(100, function ($authAccesses) use ($authAccessService, &$countRemoved) {
            foreach ($authAccesses as $authAccess) {
                try {
                    $authAccessService->validateRefreshToken($authAccess->getRefreshToken());
                } catch (\Exception $e) {
                    $this->warn('Exception with refresh token ' . $authAccess->getId() . ': ' . $e->getMessage());
                    $authAccess->delete();
                    $this->info('Removed refresh token ' . $authAccess->getId());
                    $countRemoved++;
                }
            }
        });

        $this->info('Removed ' . $countRemoved . ' refresh tokens');
    }
}
