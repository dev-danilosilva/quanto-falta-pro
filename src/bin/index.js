const app = App.getInstance();

app.start()
    .then(() => console.log(app.state))
    .catch(reason => {
        console.log(reason)
    });
