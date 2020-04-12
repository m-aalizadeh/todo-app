
module.exports = function (app) {

  const modelName = 'todos';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    task: {
      type: String,
      required: [true, 'Task name is required.']
    },
    completed: {
      type: Boolean,
      default: false,
    }
  }
  
  );


  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  
  return mongooseClient.model(modelName, schema);
  
};