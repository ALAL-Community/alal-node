import { CardUser } from "../../lib";

describe('showCardUser', () => {
    it('should show card user',async () => {

        const cardUser = new CardUser();

        const sendRequestSpy = jest.spyOn(cardUser, 'sendRequest');

        sendRequestSpy.mockImplementation(() => Promise.resolve({
            address: "rue ng 59 grand ngor",
            created_at: "2023-06-22T11:07:07.000000Z",
            email: "ndiayendeyengone99@gmail.com",
            first_name: "ndeye ngone",
            id_no: "20119991010000621",
            last_name: "ndiaye",
            phone: "774964996",
            reference: "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
            status: "verified"
        }));

        const reference = '12345';
        const result = await cardUser.showCardUser(reference);

        expect(cardUser.sendRequest).toHaveBeenCalledWith(`/card-users/${reference}`, 'get');

        expect(result).toEqual(
        expect.objectContaining({
            address: "rue ng 59 grand ngor",
            created_at: "2023-06-22T11:07:07.000000Z",
            first_name: "ndeye ngone",
            id_no: "20119991010000621",
            last_name: "ndiaye",
            phone: "774964996",
            reference: "792c6cf2-f5cf-46c8-bf8c-699a9028010e",
        })
        );

    });

    it('should throw an error when an error occurs', async () => {

        const cardUser = new CardUser();

        const sendRequestSpy = jest.spyOn(cardUser, 'sendRequest');
    
        sendRequestSpy.mockRejectedValue(new Error('An error occurred'));

        const reference = '12345';
    
        await expect(cardUser.showCardUser(reference)).rejects.toThrow('An error occurred');
      });
});