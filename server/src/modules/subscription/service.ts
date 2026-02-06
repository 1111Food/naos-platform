import { SubscriptionStatus } from '../../types';
import { UserService } from '../user/service';

export class SubscriptionService {

    static async getStatus(userId: string): Promise<SubscriptionStatus> {
        const user = await UserService.getProfile(userId);
        return user.subscription;
    }

    static async upgradePlan(userId: string): Promise<SubscriptionStatus> {
        const user = await UserService.getProfile(userId);

        // Mock Payment/Upgrade Logic
        const newStatus: SubscriptionStatus = {
            plan: 'PREMIUM',
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 days
            features: ['basic_chat', 'daily_energy', 'tarot_spreads', 'full_chart']
        };

        await UserService.updateProfile(userId, { subscription: newStatus });
        return newStatus;
    }
}
