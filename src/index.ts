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
    firstColor: OptionField({
      options: {
        blue: 'Blue',
        green: 'Green',
        orange: 'Orange',
      },
    }),
    secondColor: TextField(),
    thirdColor: TextField(),
    allColors: TextField({
      label: 'All Colors',
    }),
  },
  {
    allowCustomFields: true,
    readOnly: true,
    recordCompute: (record) => {
      const combinedColors = `${record.get('firstColor.options')}  ${record.get(
        'secondColor'
      )} ${record.get('thirdColor')}`
      record.set('allColors', combinedColors)
      return record
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
