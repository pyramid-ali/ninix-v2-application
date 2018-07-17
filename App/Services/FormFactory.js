class Form {
  constructor() {
    this.form = new FormData();
  }
  /***
   *
   * @param uri
   * @param type
   * @param name default is image
   */
  appendImageToForm(uri: string, type: string, fileName, name = 'image') {
    this.form.append(name, { uri, type, name: fileName });
    return this;
  }

  build() {
    return this.form;
  }
}

const create = () => {
  return new Form();
};

export default {
  create,
};
