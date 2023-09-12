import { Dispute } from "../../lib";
import { Dispute as DisputeData } from "../../lib/model";

describe('updateDispute', () => {
    it('should update dispute',async () => {
        
        const sampleResponse = {
            "data": [
                {
                    "explanation": "update explanation even now",
                    "reason": "duplicate",
                    "reference": "962b954d-bbd3-4b03-8a70-80fb595e9046",
                    "status": "submitted",
                    "transaction_reference": "962b954d-bbd3-4b03-8a70"
                }
            ],                  
            "message": "dispute successfully updated!",
            "statusCode": "200"
        }

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        const dispute = new Dispute();
        dispute.sendRequest = mockSendRequest;

        const inputData = {
            explanation: "update explanation even now",
            reason: "duplicate",
            status: "submitted",
            reference: "962b954d-bbd3-4b03-8a70-80fb595e9046",
            transaction_reference: "962b954d-bbd3-4b03-8a70"
          };

        const result = await dispute.updateDispute(inputData);
        expect(mockSendRequest).toHaveBeenCalledWith(`/disputes/update/${inputData.reference}`, 'post', inputData);
        expect(result).toEqual(expect.any(DisputeData));
      });

    it('should handle error when creating a new card user', async () => {

    const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));


    const dispute = new Dispute();
    dispute.sendRequest = mockSendRequest;

    const inputData = {
        explanation: "update explanation even now",
        reason: "duplicate",
        status: "submitted",
        reference: "962b954d-bbd3-4b03-8a70-80fb595e9046",
        transaction_reference: "962b954d-bbd3-4b03-8a70"
    };

    await expect(async () => {
        await dispute.updateDispute(inputData);
    }).rejects.toThrowError('An error occurred');
    });
});