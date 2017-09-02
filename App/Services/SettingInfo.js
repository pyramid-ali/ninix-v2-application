
export const parentSettings = (values: object) => {
  return [
    {
      key: 'name',
      icon: 'user',
      title: 'Name',
      type: 'string',
      placeholder: 'Enter your name',
      value: values.name
    },
    {
      key: 'job',
      icon: 'money',
      title: 'Job',
      type: 'string',
      placeholder: 'Enter your job',
      value: values.job
    },
    {
      key: 'mobile',
      icon: 'mobile',
      title: 'Mobile',
      type: 'string',
      keyboardType: 'phone-pad',
      placeholder: 'Enter your mobile (11 digits)',
      value: values.mobile
    },
    {
      key: 'phone',
      icon: 'phone',
      title: 'Phone',
      type: 'string',
      keyboardType: 'phone-pad',
      placeholder: 'Enter your phone',
      value: values.phone
    },
    {
      key: 'email',
      icon: 'envelope',
      title: 'Email',
      type: 'string',
      keyboardType: 'email-address',
      placeholder: 'Enter your email',
      value: values.email
    },
    {
      key: 'bloodGroup',
      title: 'Blood Group',
      type: 'list'
    },
    {
      key: 'birthDate',
      title: 'Birth Date',
      type: 'date'
    },

  ]
}

export const motherSettings = (values) => {

}

export const babySettings = (values) => {

}
