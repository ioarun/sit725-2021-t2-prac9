let client = require("../dbConnect");
let projectsCollection;


setTimeout(() => {
    projectsCollection = client.mongoClient.db("saifedb").collection("projects");

}, 2000)

const getAllProjects = (res) => {
    projectsCollection.find().toArray(function (err, result) {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else{
            res.json({statusCode: 200, message: "Success", data: result})
        }
    })
}

module.exports = {
    getAllProjects
}