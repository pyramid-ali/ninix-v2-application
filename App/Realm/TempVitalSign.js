import Storage from "./Storage";


export class TempVitalSign {

  store(data) {
    Storage.write(
      realm => {
        realm.create('TempVitalSign', data);
      },
      error => {
        console.tron.log({ log: 'error saving vitalSign', error });
      }
    );
  }

  storeArray(dataArray) {
    Storage.write(
      realm => {
        dataArray.forEach(data => {
          realm.create('TempVitalSign', data);
        });
      },
      error => {
        console.tron.log({ log: 'error saving vitalSign', error });
      }
    );
  }

  read() {
    return new Promise((resolve, reject) => {
      Storage.read(
        realm => {
          resolve(
            realm
              .objects('TempVitalSign')
          );
        },
        error => {
          reject(error);
        }
      );
    });
  }

}

TempVitalSign.schema = {
  name: 'TempVitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity: 'int',
    respMagnitude: 'int?',
    registerAt: 'int',
  },
};

export default (vitalSign = new TempVitalSign());
