import {
  getCreditNote, getURL, postCreditNote, postURL, putCreditNote, putURL
} from '@/unit/dataico-api/credit-note'

const fetchMock = require('fetch-mock');

describe('postCreditNote', () => {
  it('creates credit note', async () => {
    const actions     = {send_dian: true},
          creditNote  = {
            "dataico_account_id": "aaaa-1111-bbbbb-222222",
            "issue-date": "23/03/2020 13:22:43"
          },
          apiResponse = {
            invoice_id: "aaaa-11111-bbbbb-22222",
            dian_status: "DIAN_UNSENT"
          };

    fetchMock.post(postURL(), apiResponse);

    postCreditNote(actions, creditNote).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
});

describe('putCreditNote', () => {
  it('does actions on creditNote', async () => {
    const actions     = {send_email: true},
          creditNoteId   = "1233-3h2h-oju2-43hh",
          apiResponse = {
            uuid: '1233-3h2h-oju2-43hh',
            cufe: '33eiu4y51b7c63bb82968a12abdbeaf541a23212',
            qrcode: 'NumFac=SETP990000200',
            xml: 'PHhtbD48L3htbD4=',
            xml_url: 'https://dataico-factura.herokuapp.com/credit_notes/1233-3h2h-oju2-43hh.xml',
            pdf_url: 'https://dataico-factura.herokuapp.com/credit_notes/1233-3h2h-oju2-43hh.pdf',
            dian_status: 'DIAN_ACEPTADO',
            email_status: 'EMAIL_SENT',
            number: 'NC100'
          };

    fetchMock.put(putURL(creditNoteId), apiResponse);

    putCreditNote(actions, creditNoteId).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
});

describe('getCreditNote', () => {
  it('does actions on creditNote', async () => {
    const creditNoteId = "1233-3h2h-oju2-43hh",
          apiResponse  = {
            "credit_note": {
              "dataico_account_id": "002979c5-7c23-43ab-aa98-3fa7dce6e4d0",
              "number": "NC98001",
              "issue_date": "21/02/2019",
              "numbering": {
                "resolution_number": "18760000001"
              },
              "items": []
            }
          };

    fetchMock.get(getURL(creditNoteId), apiResponse);

    getCreditNote(creditNoteId).then((responseJson) =>
      expect(responseJson).toEqual(apiResponse));

    fetchMock.reset();
  });
});
