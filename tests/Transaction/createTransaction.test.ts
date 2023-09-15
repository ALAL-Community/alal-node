import { Transaction } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { Transaction as TransactionData } from "../../lib/model";
import { AlalRequiredParamError } from "../../lib/exceptions";

describe('createTransaction', () => {
    it('should create new transaction',async () => {
        
        const sampleResponse = {
            "data": [
                {
                    "action": "recharge",
                    "amount": "2000",
                    "card_reference": "9c54515e-7890-44f9-8cc2-a85b80322b98",
                    "reference": "9c54515e-7890-44f9-8cc2-a85b80322b68",
                }
            ],                  
            "message": "Card User verification in progress",
            "statusCode": "200",
        }

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        const transaction = new Transaction();
        transaction.sendRequest = mockSendRequest;

        const inputData = {
            action: "recharge",
            amount: "2000",
            card_reference: "9c54515e-7890-44f9-8cc2-a85b80322b98",
            reference: "9c54515e-7890-44f9-8cc2-a85b80322b68",
          };

        const result = await transaction.createTransaction(inputData);
        expect(mockSendRequest).toHaveBeenCalledWith('/transactions/create', 'post', inputData);
        expect(result).toEqual(expect.any(TransactionData));
      });

    it('should handle error when creating a new card user', async () => {

    const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));


    const transaction = new Transaction();
    transaction.sendRequest = mockSendRequest;

    const inputData = {
        action: "recharge",
        amount: "2000",
        card_reference: "9c54515e-7890-44f9-8cc2-a85b80322b98",
        reference: "9c54515e-7890-44f9-8cc2-a85b80322b68",
    };

    await expect(async () => {
        await transaction.createTransaction(inputData);
    }).rejects.toThrowError('An error occurred');
    });
});