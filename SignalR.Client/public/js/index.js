const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7044/message")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        connection.invoke("GetConnectionId").then(function(id) {
            window.sessionStorage.setItem('connectionId', id);
        });
        console.log("SignalR Connected.");

    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async() => {
    await start();
});

connection.on("ReceiveMessage", (message) => {
    document.querySelector("#message").innerHTML = `${message}`;
    document.querySelector("#btnSend").classList.remove("btn-primary");
    document.querySelector("#btnSend").classList.add("btn-success");
    document.querySelector("#status").classList.remove("fa-clock");
    document.querySelector("#status").classList.add("fa-check-double");
    window.setTimeout(() => {
        document.querySelector("#btnSend").classList.remove("btn-success");
        document.querySelector("#btnSend").classList.add("btn-primary");
        document.querySelector("#status").classList.remove("fa-check-double");
        document.querySelector("#status").classList.add("fa-paper-plane");
    }, 3000);
});

// Start the connection.
start();

//events
document.querySelector("#btnSend").addEventListener("click", (event) => userAction());

const userAction = async() => {
    document.querySelector("#status").classList.remove("fa-paper-plane");
    document.querySelector("#status").classList.add("fa-clock");
    const connectionId = window.sessionStorage.getItem("connectionId");
    const name = document.querySelector("#txtName").value;
    if (connectionId !== null) {
        const url = 'https://localhost:7044/SendMessage?name=' + name + '&connectionId=' + connectionId;
        const response = await fetch(url, {
            method: 'POST',
        });
        return await response.text();
    }
};