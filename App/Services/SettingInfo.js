
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
      placeholder: 'Enter your mobile (11 digits)',
      value: values.mobile
    },
    {
      key: 'phone',
      icon: 'phone',
      title: 'Phone',
      type: 'string',
      placeholder: 'Enter your phone',
      value: values.phone
    },
    {
      key: 'email',
      icon: 'envelope',
      title: 'Email',
      type: 'string',
      placeholder: 'Enter your email',
      value: values.email
    },
    {
      key: 'smoke',
      title: 'Are you smoke?',
      type: 'boolean',
      value: false
    },
    {
      key: 'bloodGroup',
      title: 'Blood Group',
      type: 'list'
    }
  ]
}

export const motherSettings = (values) => {

}

export const babySettings = (values) => {

}
