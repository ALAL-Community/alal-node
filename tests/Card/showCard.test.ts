import { Card } from "../../lib";

describe('showCard', () => {
    it('should show card',async () => {

        const card = new Card();

        const sendRequestSpy = jest.spyOn(card, 'sendRequest');

        sendRequestSpy.mockImplementation(() => Promise.resolve({
            "balance": "1000",
            "card_brand": "physical",
            "card_type": "Visa",
            "last_four": "1987",
            "reference": "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
            "status": "issued",
            "last4": "test"
        }));

        const reference = '12345';
        const result = await card.showCard(reference);

        expect(card.sendRequest).toHaveBeenCalledWith(`/cards/${reference}`, 'get');

        expect(result).toEqual(
        expect.objectContaining({
            balance: "1000",
            card_brand: "physical",
            card_type: "Visa",
            reference: "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
            status: "issued",
            last4: "test",
        })
        );

    });

    it('should throw an error when an error occurs', async () => {

        const card = new Card();

        const sendRequestSpy = jest.spyOn(card, 'sendRequest');
    
        sendRequestSpy.mockRejectedValue(new Error('An error occurred'));

        const reference = '12345';
    
        await expect(card.showCard(reference)).rejects.toThrow('An error occurred');
      });
});