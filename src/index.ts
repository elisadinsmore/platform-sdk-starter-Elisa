import {
  Sheet,
  Workbook,
  TextField,
  BooleanField,
  NumberField,
  OptionField,
  Portal,
  LinkedField,
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
    startDate: DateField(),
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
    batchRecordsCompute: async (payload: FlatfileRecords<any>) => {
      const response = await fetch('https://api.us.flatfile.io/health', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const result = await response.json()
      payload.records.map(async (record: FlatfileRecord) => {
        //   record.set('fromHttp', result.info.postgres.status)
      })
    },
  }
)

const EmployeesPortal = new Portal({
  name: 'EmployeesPortal',
  sheet: 'Employees',
})

export default new Workbook({
  name: 'Elisa Test',
  namespace: 'Elisa combined Colors',
  sheets: {
    combinedColorsSheet,
  },
  portals: [EmployeesPortal],
})
