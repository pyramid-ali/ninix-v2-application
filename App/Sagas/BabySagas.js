import { Platform } from 'react-native';
import { eventChannel } from 'redux-saga';
import { put, call, select, fork, take } from 'redux-saga/effects';
import BabyAction from '../Redux/BabyRedux';
import Response from '../Services/Response';
import JsonToModel from '../Transform/JsonToModel';
import ModelToJson from '../Transform/ModelToJson';
import Api from '../Services/Api';

export function* saveInformation(api, action) {
  const { payload } = action;
  const { auth } = yield select();
  const response = yield call(
    api.updateBaby,
    ModelToJson.baby(payload),
    auth.accessToken
  );
  try {
    const data = yield call(Response.resolve, response);
    yield put(BabyAction.setInformation(JsonToModel.baby(data.baby)));
  } catch (error) {
    yield put(BabyAction.didFail(error.message));
  }
}

export function* getInformation(api) {
  const { auth } = yield select();
  const response = yield call(api.getBaby, auth.accessToken);

  try {
    const data = yield call(Response.resolve, response);
    yield put(BabyAction.setInformation(JsonToModel.baby(data.baby)));
    yield getLastBabyImage(api);
  } catch (error) {
    yield put(BabyAction.didFail(error.message));
  }
}

export function* getLastBabyImage(api) {
  const { auth, baby } = yield select();
  const response = yield call(api.getBabyImages, auth.accessToken);
  try {
    const result = yield call(Response.resolve, response);
    if (result.images.data.length) {
      const latestImage = result.images.data[0];
      if (baby.image && latestImage.image === baby.image.id) {
        return;
      }
      const res = yield call(Api.download, latestImage.path, auth.accessToken);
      yield put(
        BabyAction.retrieveImage({
          id: latestImage.id,
          uri:
            Platform.OS === 'android'
              ? 'file://' + res.path()
              : '' + res.path(),
        })
      );
    }
  } catch (e) {
    console.tron.log({ log: 'download baby image', error: e.message });
  }
}

export function* setImage(api, action) {
  console.tron.log({ api, action });
  const { auth } = yield select();
  const { channel, uploadImage } = yield call(
    imageProgressChannel,
    api,
    auth.accessToken,
    action.payload.image
  );
  yield fork(imageProgress, channel);

  try {
    const response = yield call(() => uploadImage);
    const result = yield call(Response.resolve, response);
    yield put(BabyAction.didImageSet(result.id));
  } catch (error) {
    console.tron.error({ error });
    alert('Failed to upload image, please try again');
    yield put(BabyAction.didImageFail(action.payload.previousImage));
  }
}

export function imageProgressChannel(api, token, payload) {
  const formData = new FormData();
  formData.append('image', {
    uri: payload.uri,
    type: payload.type,
    name: 'image',
  });

  let uploadImage;
  const channel = eventChannel(emitter => {
    uploadImage = api.storeBabyImage(token, formData, {
      onUploadProgress: event => emitter(event),
    });
    return () => {};
  });

  return { channel, uploadImage };
}

export function* imageProgress(channel) {
  while (true) {
    try {
      let event = yield take(channel);
      yield put(
        BabyAction.imageProgressUpdate(
          Math.round((event.loaded / event.total) * 100)
        )
      );
    } catch (error) {
      console.tron.log({ error });
    }
  }
}
