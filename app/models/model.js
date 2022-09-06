module.exports = mongoose => {
    const model = mongoose.model(
        "Test",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            {timestamp: true}
        )
    );
    return model;
}

/**SI L'API EST UTILISEE AVEC UN FRONT-END */
// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//         {
//             title: String,
//             description: String,
//             published: Boolean
//         },
//         {timestamp: true}
//     );
//     schema.method("toJSON", function(){
//         const {_v, _id, ...object} = this.toObject();
//         object.id = _id;
//         return object;
//     });
//     const model = mongoose.model("Test", schema);
//     return model;
// }