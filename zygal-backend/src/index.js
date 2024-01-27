const express = require('express');
const route = require('./routes/route.js');
const cors = require('cors')
const  mongoose = require('mongoose');
const app = express();
app.use(cors()) 
app.use(express.json());
mongoose.connect("mongodb+srv://debojitmahapatra19985:Debojit1998@cluster5.wbhwj69.mongodb.net/zygal", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});