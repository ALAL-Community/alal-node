import { Card } from "../../lib";
import { Card as CardData } from "../../lib/model";

describe('createCard', () => {
    it('should create new card',async () => {
        
        const sampleResponse = {
            "data": [
                {
                    "balance": "integer",
                    "card_brand": "Visa",
                    "card_type": "virtual",
                    "reference": "d282e4a6-1fb6-4827-a6ae-a780263287d7",
                    "status": "issuing"
                }
            ],                  
            "message": "Card currently being generated",
            "statusCode": "200"
        }

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        const card = new Card();
        card.sendRequest = mockSendRequest;

        const inputData = {
            card_brand: "Visa",
            card_type: "virtual",
            card_user_reference: "d282e4a6-1fb6-4827-a6ae-a780263287d7",
          };

        const result = await card.createCard(inputData);
        expect(mockSendRequest).toHaveBeenCalledWith('/cards/create', 'post', inputData);
        expect(result).toEqual(expect.any(CardData));
      });

    it('should handle error when creating a new card user', async () => {

    const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));


    const card = new Card();
    card.sendRequest = mockSendRequest;

    const inputData = {
        balance: "integer",
        card_brand: "Visa",
        card_type: "virtual",
        card_user_reference: "d282e4a6-1fb6-4827-a6ae-a780263287d7",
        status: "issuing"
    };

    await expect(async () => {
        await card.createCard(inputData);
    }).rejects.toThrowError('An error occurred');
    });
});