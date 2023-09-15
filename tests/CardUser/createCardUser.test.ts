import { CardUser } from "../../lib";
import { dynamicParam } from "../../lib/base";
import { CardUser as CardUserData } from "../../lib/model";
import { AlalRequiredParamError } from "../../lib/exceptions";

describe('createCardUser', () => {
    it('should create new card user',async () => {
        
        const sampleResponse = {
            "data": [
                {
                    "address": "rue ng 59 grand ngor",
                    "email": "ndiayendeyengone99@gmail.com",
                    "first_name": "ndeye ngone",
                    "id_no": "20119991010000621",
                    "last_name": "ndiaye",
                    "phone": "774964996",
                    "reference": "88c2f29c-2fba-40f1-a303-b33008e42fe9",
                    "status": "verified",
                    "created_at": "2023-06-22T11:07:07.000000Z"
                }
            ],                  
            "message": "Card User verification in progress",
            "statusCode": "200",
        }

        const mockSendRequest = jest.fn().mockResolvedValue(sampleResponse);
        const cardUser = new CardUser();
        cardUser.sendRequest = mockSendRequest;

        const inputData = {
            email: "ndiayendeyengone99@gmail.com",
            first_name: "ndeye ngone",
            last_name: "ndiaye",
            id_no: "20119991010000621",
            address: "rue ng 59 grand ngor",
            back_id_image: "back_id_image_data",
            id_image: "id_image.jped", 
            selfie_image: "selfie_image_data",
            phone: "774964996",
          };

        const result = await cardUser.createCardUser(inputData);
        expect(mockSendRequest).toHaveBeenCalledWith('/card-users/create', 'post', inputData);
        expect(result).toEqual(expect.any(CardUserData));
      });

    it('should handle error when creating a new card user', async () => {

    const mockSendRequest = jest.fn().mockRejectedValue(new Error('An error occurred'));


    const cardUser = new CardUser();
    cardUser.sendRequest = mockSendRequest;

    const inputData = {
        email: "ndiayendeyengone99@gmail.com",
        first_name: "ndeye ngone",
        last_name: "ndiaye",
        id_no: "20119991010000621",
        address: "rue ng 59 grand ngor",
        back_id_image: "back_id_image_data",
        id_image: "id_image.jped", 
        selfie_image: "selfie_image_data",
        phone: "774964996",
    };

    await expect(async () => {
        await cardUser.createCardUser(inputData);
    }).rejects.toThrowError('An error occurred');
    });
});