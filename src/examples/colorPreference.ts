import {
  Sheet,
  Workbook,
  TextField,
  BooleanField,
  NumberField,
  OptionField,
  Message,
} from '@flatfile/configure'

// Assigns a default value to the country field if it is empty
const combinedColorsSheet = new Sheet(
  'Combined Colors Sheet',
  {
    firstColorPreference: TextField({
      label: 'First Color Preference',
    }),
    secondColorPreferencet: TextField({
      label: 'Second Color Preference',
    }),
    thirdColorPreference: TextField({
      label: 'Third Color Preference',
    }),
    allColors: TextField({
      label: 'All Colors',
    }),
  },
  {
    allowCustomFields: true,
    readOnly: true,
    recordCompute: (record) => {
      const combinedColors =
        "{record.get('firstColorPreference')} {record.get('secondColorPreference')} {record.get('thirdColorPreference')}"
      record.set('allColors', combinedColors)
    },
  }
)

export default new Workbook({
  name: 'Elisa Test',
  namespace: 'Elisa combined Colors',
  sheets: {
    combinedColorsSheet,
  },
})
