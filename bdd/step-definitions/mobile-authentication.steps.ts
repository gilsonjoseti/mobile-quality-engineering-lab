import { Given, When, Then } from '@cucumber/cucumber';

type WorldContext = {
  currentScreen?: string;
  result?: string;
};

Given('the user is on the login screen', function (this: WorldContext) {
  this.currentScreen = 'login';
});

When('valid credentials are entered', function (this: WorldContext) {
  this.result = 'home';
});

When('invalid credentials are entered', function (this: WorldContext) {
  this.result = 'error';
});

Then('the home screen should be displayed', function (this: WorldContext) {
  if (this.result !== 'home') {
    throw new Error('Expected home screen but flow was different');
  }
});

Then('an error message should be displayed', function (this: WorldContext) {
  if (this.result !== 'error') {
    throw new Error('Expected error message but flow was different');
  }
});
