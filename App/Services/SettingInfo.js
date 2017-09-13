const bloodGropus = [
  {
    value: 'A-'
  },
  {
    value: 'A+'
  },
  {
    value: 'B-'
  },
  {
    value: 'B+'
  },
  {
    value: 'AB-'
  },
  {
    value: 'AB+'
  },
  {
    value: 'O-'
  },
  {
    value: 'O+'
  },
  {
    value: 'A+'
  },
  {
    value: 'A+'
  }
]


export const parentSettings = (values: object) => {
  return [
    {
      key: 'name',
      icon: 'user-circle-o',
      title: 'Name',
      type: 'string',
      value: values.name
    },
    {
      key: 'job',
      icon: 'vcard',
      title: 'Job',
      type: 'string',
      value: values.job
    },
    {
      key: 'mobile',
      icon: 'signal',
      title: 'Mobile',
      type: 'string',
      keyboardType: 'phone-pad',
      value: values.mobile
    },
    {
      key: 'phone',
      icon: 'phone',
      title: 'Phone',
      type: 'string',
      keyboardType: 'phone-pad',
      value: values.phone
    },
    {
      key: 'email',
      icon: 'envelope',
      title: 'Email',
      type: 'string',
      keyboardType: 'email-address',
      value: values.email
    },
    {
      key: 'bloodGroup',
      title: 'Blood Group',
      type: 'list',
      value: values.bloodGroup,
      items: bloodGropus
    },
    {
      key: 'birthDate',
      title: 'Birth Date',
      type: 'date',
      value: values.birthDate
    },

  ]
}

export const babySettings = (values) => {
  return [
    {
      key: 'name',
      icon: 'user-circle-o',
      title: 'Name',
      type: 'string',
      value: values.name
    },
    {
      key: 'bloodGroup',
      title: 'Blood Group',
      type: 'list',
      value: values.bloodGroup,
      items: bloodGropus
    },
    {
      key: 'gender',
      title: 'Gender',
      type: 'list',
      value: values.gender,
      items: [
        {
          label: 'boy',
          value: 'm'
        },
        {
          label: 'girl',
          value: 'f'
        }
      ]
    },
    {
      key: 'birthDate',
      title: 'Birth Date',
      type: 'date',
      value: values.birthDate
    },
  ]
}
