import { Dispute } from "../../lib";

describe('showDispute', () => {
    it('should show card user',async () => {

        const dispute = new Dispute();

        const sendRequestSpy = jest.spyOn(dispute, 'sendRequest');

        sendRequestSpy.mockImplementation(() => Promise.resolve({
            explanation: "No real explanation even now",
            reason: "duplicate",
            reference: "962b954d-bbd3-4b03-8a70-80fb595e9049",
            status: "submitted",
            transaction_reference: "962b954d-bbd3-4b03-8a70"
        }));

        const reference = '12345';
        const result = await dispute.showDispute(reference);

        expect(dispute.sendRequest).toHaveBeenCalledWith(`/disputes/${reference}`, 'get');

        expect(result).toEqual(
        expect.objectContaining({
            explanation: "No real explanation even now",
            reason: "duplicate",
            reference: "962b954d-bbd3-4b03-8a70-80fb595e9049",
            status: "submitted",
            transaction_reference: "962b954d-bbd3-4b03-8a70"
        })
        );

    });

    it('should throw an error when an error occurs', async () => {

        const dispute = new Dispute();

        const sendRequestSpy = jest.spyOn(dispute, 'sendRequest');
    
        sendRequestSpy.mockRejectedValue(new Error('An error occurred'));

        const reference = '12345';
    
        await expect(dispute.showDispute(reference)).rejects.toThrow('An error occurred');
      });
});