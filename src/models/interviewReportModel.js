import mongoose from "mongoose";



const technicalQuestionsSchema = new mongoose.Schema({
  question : {
    type : String,
    required : [true , "Technical Question is required"]
  },
  intention : {
    type : String,
    required : [true , "Intention is required"]
  },
  answer : {
    type : String,
    required : [true , "Answer is required"]
  }

},{
    _id : false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
    type : String,
    required : [true , "Technical Question is required"]
  },
  intention : {
    type : String,
    required : [true , "Intention is required"]
  },
  answer : {
    type : String,
    required : [true , "Answer is required"]
  }
},{
    _id : false
})

const skillGapsSchema = new mongoose.Schema({
    skill : {
        type : String,
        required :[true , " Skill is required"]
    },
    severity : {
        type :String,
        enum : ["Low" , "Medium" , "High"],
        required : [true , "Severity is required"]
    }
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    days : {
        type : Number,
        required : [true , "Day is required"]
    },
    focus : {
        type : String,
        required : [true , "Focus is required"]
    },
    tasks : {
        type :String,
        required : [true , "Task is required"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job Description is Requires"]
    },
    resume : {
        type : String
    },
    selfDescription :{
        type : String,

    },
    matchScore : {
        type : Number,
        min : 0,
        max :100
    },
    technicalQuestions : [technicalQuestionsSchema],
    behavioralQuestion : [behavioralQuestionSchema],
    skillGap : [skillGapsSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
    }
} , {
    timestamps : true
})


const interviewReportModel = mongoose.model("InterviewReport" , interviewReportSchema)

export default interviewReportModel