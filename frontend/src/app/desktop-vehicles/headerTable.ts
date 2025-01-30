export class Headers {
  headerTable = [
    { nameHebraw: 'מזהה יחודי', nameEnglish: 'id' },
    { nameHebraw: 'מספר רישוי', nameEnglish: 'licensePlate' },
    { nameHebraw: 'יצרן הרכב', nameEnglish: 'manufacturer' },
    { nameHebraw: 'דגם הרכב', nameEnglish: 'model' },
    { nameHebraw: 'סטטוס הרכב', nameEnglish: 'status' },
    { nameHebraw: 'תאריך יצירה', nameEnglish: 'createdAt' },
    { nameHebraw: 'תאריך עדכון אחרון', nameEnglish: 'updatedAt' },
    { nameHebraw: 'פעולות', nameEnglish: 'actions' },
  ];
  headerInputs = [
    { nameHebraw: 'מזהה יחודי', nameEnglish: 'id', type: 'text' },
    { nameHebraw: 'מספר רישוי', nameEnglish: 'licensePlate', type: 'text' },
    {
      nameHebraw: 'יצרן הרכב',
      nameEnglish: 'manufacturer',
      type: 'select',
      valuesSelect: ['Seat', 'Ford', 'Ferrari', 'Honda', 'Toyota'],
    },
    {
      nameHebraw: 'דגם הרכב',
      nameEnglish: 'model',
      type: 'select',
      valuesSelect: {
        Seat: ['ibiza', 'arona'],
        Honda: ['Civic'],
        Toyoya: ['Corolla'],
        Ford: ['mostang', 'GT'],
        Ferrari: ['ferari'],
      },
    },
    {
      nameHebraw: 'סטטוס הרכב',
      nameEnglish: 'status',
      type: 'select',
      valuesSelect: ['active', 'inactive'],
    },
    { nameHebraw: 'תאריך יצירה', nameEnglish: 'createdAt', type: 'date' },
  ];
}
