import { Card } from "../../lib";

describe('getCardAcessToken', () => {
    it('should get card acess token',async () => {

        const card = new Card();

        const sampleResponse = {
            "data": [
              {
                "access_token": "N72VeyZQ8dmn3a0Wk0blu2a1pjFjdcNOx2Ec5bm39pFGa33gGu",
                "embedded_ui": "https://sandbox.saalal.com/embedded-card-reveal/test_Q347N1z2kHuUTlrUPoYR1rSsmkl1FbiY5GhN8TAwBtqdvqo1QB"
              }
            ],
            "message": "Access Token generated successfully",
            "statusCode": "200"
          } 

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        card.sendRequest = mockSendRequest; 

        const reference = '12345';
        const result = await card.getCardAccessToken(reference);

        expect(mockSendRequest).toHaveBeenCalledWith('/cards/auth/access_token12345', 'post', { reference: '12345' });
        expect(result).toEqual(sampleResponse);

    });

    it('should handle error when getting card access token', async () => {

        const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));

        const cardUser = new Card();
        cardUser.sendRequest = mockSendRequest; 

        const reference = '12345';

        await expect(async () => {
          await cardUser.getCardAccessToken(reference);
        }).rejects.toThrowError('An error occurred'); 
      });

});