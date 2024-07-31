
class Card  {

    constructor(public balance:string, public card_brand:string, public card_type:string, public reference:string, public status:string, public last4:string) {
        this.balance = balance
        this.card_brand = card_brand
        this.card_type = card_type
        this.reference = reference
        this.status = status
        this.last4 = last4
    }
}

class CardUser {
    constructor(public address:string, public first_name:string, public last_name:string, public id_no:string, public phone:string, public reference:string, public status:string, public created_at:string, public card_user_reference:string) {
        this.address = address
        this.first_name = first_name
        this.last_name = last_name
        this.id_no = id_no
        this.phone = phone
        this.reference = reference
        this.status = status
        this.created_at = created_at
        this.card_user_reference = card_user_reference
    }
}

class Dispute {

    constructor(public explanation:string, public reason:string, public reference:string, public status:string, public transaction_reference:string) {
        this.explanation = explanation
        this.reason = reason
        this.reference = reference
        this.status = status
        this.transaction_reference = transaction_reference
    }
}


class Transaction {

    constructor(public amount:string, public card_reference:string, public reference:string, public status:string, public created_at:string, public kind:string, public merchant:string, public bank_name:string, public account_name:string, public bank_id:string, public description:string, public phone:string, public wallet_network:string) {
        this.amount = amount
        this.card_reference = card_reference
        this.reference = reference
        this.status = status
        this.created_at = created_at
        this.kind = kind
        this.merchant = merchant
        this.bank_name = bank_name
        this.account_name = account_name
        this.bank_id = bank_id
        this.description = description
        this.phone = phone
        this.wallet_network = wallet_network
    }

}

class Miscellaneous {
    constructor(public phone:string, public country_code:string) {

        this.phone = phone 
        this.country_code = country_code
    }
}

export {CardUser, Card, Dispute, Transaction, Miscellaneous}