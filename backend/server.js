const app = require("./app")

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port ' + (process.env.PORT || 3000));
});