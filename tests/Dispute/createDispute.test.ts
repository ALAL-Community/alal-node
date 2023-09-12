import { Dispute } from "../../lib";
import { Dispute as DisputeData } from "../../lib/model";

describe('createDispute', () => {
    it('should create new dispute',async () => {
        
        const sampleResponse = {
            "data": [
                {
                    "amount": "1000",
                    "action": "topup",
                    "reference": "962b954d-bbd3-4b03-8a70-80fb595e9049",
                    "card_reference": "962b954d-bbd3-4b03-8a70-80fb595e9045",
                }
            ],                  
            "message": "dispute successfully created!",
            "statusCode": "200"
        }

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        const dispute = new Dispute();
        dispute.sendRequest = mockSendRequest;

        const inputData = {
            amount: "1000",
            action: "topup",
            reference: "962b954d-bbd3-4b03-8a70-80fb595e9049",
            card_reference: "962b954d-bbd3-4b03-8a70-80fb595e9045",
          };

        const result = await dispute.createDispute(inputData);
        expect(mockSendRequest).toHaveBeenCalledWith('/disputes/create', 'post', inputData);
        expect(result).toEqual(expect.any(DisputeData));
      });

    it('should handle error when creating a new card user', async () => {

    const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));


    const dispute = new Dispute();
    dispute.sendRequest = mockSendRequest;

    const inputData = {
        amount: "1000",
        action: "topup",
        reference: "962b954d-bbd3-4b03-8a70-80fb595e9049",
        card_reference: "962b954d-bbd3-4b03-8a70-80fb595e9045",
    };

    await expect(async () => {
        await dispute.createDispute(inputData);
    }).rejects.toThrowError('An error occurred');
    });
});