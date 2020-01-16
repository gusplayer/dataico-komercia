import {
  buildGetRequest, buildPostRequest, buildPutRequest, validActions, validActionsMessage
} from '@/unit/dataico-api/invoice';

export const BASE_URL = "https://www.dataico.com/direct/dataico_api/v2/credit_notes"

export function postURL() { return BASE_URL; }

export function putURL(creditNoteId) { return BASE_URL + '/' + creditNoteId; }

export function getURL(creditNoteId) { return BASE_URL + '/' + creditNoteId; }

/**
 Call this function to POST (create) credit note in dataico.

 Depending on your actions, which could be:
 {} or {send_dian: true} or {send_dian:true send_email: true}
 the credit note will be created and then either sent to dian and/or
 email sent depending on actions settings.

 const response = await postCreditNote({}, creditNote);

 response will contain a hash like:

 {
     uuid: '1233-3h2h-oju2-43hh',
     cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
     qrcode: 'NumFac=SETP990000200',
     xml: 'PHhtbD48L3htbD4=',
     xml_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.xml',
     pdf_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.pdf',
     dian_status: 'DIAN_UNSENT',
     email_status: 'EMAIL_UNSENT',
     number: 'NC100'
   }

 @param actions
 @param creditNote
 @returns {Promise<any>}
 */
export async function postCreditNote(actions, invoice) {
  if (!validActions(actions)) { throw  validActionsMessage(actions); }

  const response = await fetch(postURL(), buildPostRequest(actions, invoice));
  return response.json();
}

/**
 Call this function to PUT (update) existing credit note in dataico.

 Depending on your actions, which could be:
 {} or {send_dian: true} or {send_dian:true send_email: true}
 the credit note will be either sent to dian and/or email sent depending
 on actions settings.

 const response = await putInvoice({send_dian:true}, creditNoteId);

 response will contain a hash like:

 {
     uuid: '1233-3h2h-oju2-43hh',
     cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
     qrcode: 'NumFac=SETP990000200',
     xml: 'PHhtbD48L3htbD4=',
     xml_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.xml',
     pdf_url: 'https://dataico-factura.herokuapp.com/invoices/1233-3h2h-oju2-43hh.pdf',
     dian_status: 'DIAN_ACEPTADO',
     email_status: 'EMAIL_SENT',
     number: 'NC100'
   }

 @param actions
 @param creditNoteId
 @returns {Promise<any>}
 */
export async function putCreditNote(actions, creditNoteId) {
  if (!validActions(actions)) { throw  validActionsMessage(actions); }

  const response = await fetch(putURL(creditNoteId), buildPutRequest(actions));
  return response.json();
}

/**
 Call this function to GET existing invoice in dataico.

 const response = await getCreditNote(creditNoteId);

 response will contain the invoice information like:

 {
   "credit_note": {
     "env": "PRUEBAS",
     "dataico_account_id": "002979c5-7c23-43ab-aa98-3fa7dce6e4d0",
     "number": "98001",
     "issue_date": "21/02/2019",
     "numbering": {
       "resolution_number": "18760000001"
     },
     "items": [
       {
         "sku": "SKU_112322",
         "quantity": 10,
         "description": "Descripcion producto",
         "price": 2300,
         "discount_rate": 10,
         "taxes": [
           {
             "tax_category": "IVA",
             "tax_rate": 5
           }
         ],
         "retentions": [
           {
             "tax_category": "RET_FUENTE",
             "tax_rate": 1
           }
         ]
       }
     ],
     "retentions": [
       {
         "tax_category": "RET_IVA",
         "tax_rate": 15
       }
     ]
   }
 }
 @param actions
 @param creditNoteId
 @returns {Promise<any>}
 */
export async function getCreditNote(creditNoteId) {
  const response = await fetch(getURL(creditNoteId), buildGetRequest());
  return response.json();
}
