/**
 * Created by beenotung on 1/19/16.
 */

/* create a client */
var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({apiKey: apiKey});

/* retrieve application */
var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref, function (err, application) {
    console.log('Application:', application);
});

/* create a user account */
var account = {
    givenName: 'Joe',
    surname: 'Stormtrooper',
    username: 'tk421',
    email: 'tk421@stormpath.com',
    password: 'Changeme1',
    customData: {
        favoriteColor: 'white'
    }
};

application.createAccount(account, function (err, createdAccount) {
    console.log('Account:', createdAccount);
});

/* retrieve the account */
application.getAccounts({username: 'tk421'}, function (err, accounts) {
    accounts.each(function (account, callback) {
        console.log('Account:', account);
        callback();
    }, function (err) {
        console.log('Finished iterating over accounts.');
    });
});

/* authenticate the account */
var authRequest = {
    username: 'tk421',
    password: 'Changeme1'
};

application.authenticateAccount(authRequest, function (err, result) {
    // If successful, the authentication result will have a method,
    // getAccount(), for getting the authenticated account.
    result.getAccount(function (err, account) {
        console.log('Account:', account);
    });
});

/* send a password reset email */
var email = 'tk421@stormpath.com';

application.sendPasswordResetEmail({email: email}, function (err, passwordResetToken) {
    // The token is the last part of the HREF.
    console.log(passwordResetToken.href.split('/').pop());

    // The account can be retrieved by using the getAccount() method.
    client.getAccount(passwordResetToken.account.href, function (err, account) {
        console.log('Account:', account);
    });
});

/* reset user password */
var token = req.body.token;
var password = req.body.password;

application.resetPassword(token, password, function (err, result) {
    if (err) {
        // The token has been used or is expired - have the user request a new token.
        return console.error(err);
    }

    // The response contains a link to the account which is
    // associated with this password reset workflow.
    console.log('Account HREF:', result.account.href)
});

