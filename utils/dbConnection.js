const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://bidhan:Ramhari123@cluster0.waheg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to database`)
}).catch((err) => {
    console.log('Error---->',err)
});

