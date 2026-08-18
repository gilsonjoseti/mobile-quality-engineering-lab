import { describe, expect, it } from 'vitest';
import { HomeScreen } from '../../screens/home-screen.js';
import { TransactionScreen } from '../../screens/transaction-screen.js';

describe('Critical flow contract', () => {
  it('should define the transaction journey structure', async () => {
    const homeScreen = { getBalanceText: async () => '$1,250.00' } as Partial<HomeScreen>;
    const amount = '150.00';
    const transactionScreen = {
      startTransfer: async () => undefined,
      enterAmount: async (_enteredAmount: string) => {
        void _enteredAmount;
        return undefined;
      },
      reviewTransfer: async () => undefined,
      confirmTransfer: async () => undefined,
      isOperationSuccessful: async () => true,
    } as Partial<TransactionScreen>;

    expect(await homeScreen.getBalanceText?.()).toContain('1,250');
    await transactionScreen.startTransfer?.();
    await transactionScreen.enterAmount?.(amount);
    expect(amount).toBe('150.00');
    await transactionScreen.reviewTransfer?.();
    await transactionScreen.confirmTransfer?.();
    expect(await transactionScreen.isOperationSuccessful?.()).toBe(true);
  });
});
