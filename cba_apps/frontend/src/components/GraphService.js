var graph = require("@microsoft/microsoft-graph-client");

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: done => {
            done(null, accessToken.accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api("/me").get();
    return user;
}

// Need to change "/me/messages" if accessing a shared mailbox

export async function getUserMails(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const mails = await client
        .api(
            "/me/mailFolders('Inbox')/messages?$filter=isRead ne true&$count=true"
        )
        .select("sender,subject")
        .get();
    return mails;
}
