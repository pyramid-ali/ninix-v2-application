// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

// Dependencies
import EntryTemplate from '../Components/EntryTemplate';
import MobileEntrance from '../Components/MobileEntrance';
import TokenEntrance from '../Components/TokenEntrance';
import SignupAction from '../Redux/SignupRedux';
import PasswordEntrance from '../Components/PasswordEntrance';

// Styles
import styles from './Styles/SignupStyle';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'mobile',
      mobile: '',
      token: '',
      password: '',
    };

    this.images = {
      mobile: require('../Images/Signup/mobile.png'),
      token: require('../Images/Signup/token.png'),
      password: require('../Images/Signup/password.png'),
    };
  }

  componentWillUnmount() {
    this.props.cancel();
  }

  render() {
    const { stage } = this.state;
    const { error } = this.props.signup;

    return (
      <EntryTemplate
        title="SIGNUP"
        imageSource={this.images[stage]}
        onPressCancel={() => {
          this.resetState();
          this.props.navigation.goBack();
        }}
      >
        <View style={styles.formContainer}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {stage === 'mobile' ? this.renderMobileEntrance() : null}
          {stage === 'token' ? this.renderTokenEntrance() : null}
          {stage === 'password' ? this.renderPasswordEntrance() : null}
        </View>
      </EntryTemplate>
    );
  }

  renderMobileEntrance() {
    const { mobile } = this.state;
    const { requestToken, signup } = this.props;

    return (
      <MobileEntrance
        onPress={() => {
          requestToken(mobile, this.didMobileApproved.bind(this));
        }}
        onChangeValue={mobile => this.setState({ mobile })}
        value={mobile}
        fetching={signup.fetching}
        valid={RegExp(/^09\d{9}$/).test(mobile)}
      />
    );
  }

  renderTokenEntrance() {
    const { verifyToken, signup } = this.props;

    return (
      <TokenEntrance
        mobile={this.state.mobile}
        wrongNumber={() => {
          this.setState({ stage: 'mobile' });
        }}
        fetching={signup.fetching}
        onFinish={token => {
          verifyToken(
            this.state.mobile,
            token,
            this.didTokenValidate.bind(this)
          );
        }}
      />
    );
  }

  renderPasswordEntrance() {
    const { mobile, token, password } = this.state;

    return (
      <PasswordEntrance
        valid={password.length >= 6}
        value={password}
        onChangeValue={password => this.setState({ password })}
        onPress={() => this.props.register(mobile, token, password)}
        fetching={this.props.signup.fetching}
      />
    );
  }

  didMobileApproved(mobile) {
    this.setState({
      mobile,
      stage: 'token',
    });
  }

  didTokenValidate(mobile, token) {
    this.setState({
      mobile,
      token,
      stage: 'password',
    });
  }

  resetState() {
    this.setState({
      stage: 'mobile',
      mobile: '09',
      token: '',
      password: '',
    });
  }
}

const mapStateToProps = state => {
  const { signup } = state;
  return {
    signup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestToken: (mobile, callback) =>
      dispatch(SignupAction.requestToken(mobile, callback)),
    verifyToken: (mobile, token, callback) =>
      dispatch(SignupAction.checkToken(mobile, token, callback)),
    register: (mobile, token, password) =>
      dispatch(SignupAction.register(mobile, token, password)),
    cancel: () => dispatch(SignupAction.cancel()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
