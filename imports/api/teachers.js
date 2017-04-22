import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
 
export const Teachers = new Mongo.Collection('teachers');
 

if (Meteor.isServer) {
    // Get list of all method names on Lists
    const LISTS_METHODS = ['rateLimitTest', 'teachers.addReview'];
    
    // Only allow 2 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; }
    }, 1, 0.5*60*1000);

    // This code only runs on the server
    Meteor.publish('teachers', function teachersPublication() {
        return Teachers.find();
    });

    Meteor.methods({
        // Method to check rate limit
        'rateLimitTest'(index) {
            check(index, Number);
            //console.log('Rate limit test # ' + index);
        },
        'teachers.addReview'(teacher, review) {
            check(teacher, Object);

            // Redundant argument validation to ensure data integrity
            check(teacher, {
                _id: Meteor.Collection.ObjectID,
                profile_pic_url: String,
                name: String,
                copyright: String,
                avg_review: Number,
                occupation: String,
                studies: [{title: String}],
                classes_given: [{name: String}],
                reviews: [{
                    criterias: [{selection: Number, description: String}],
                    totalScore: Number,
                    comments: String,
                    createdAt: Date
                }],

            });

            // Check the arguments of the review to be of the expected data types
            check(review, Object);
            check(review, {
                criterias: [{selection: Number, description: String}],
                totalScore: Number,
                comments: String,
                createdAt: Date
            });

            let teacherToUpdate = Teachers.findOne({_id: teacher._id});

            if(JSON.stringify(teacher) == JSON.stringify(teacherToUpdate)){
                
                let numberOfReviews = teacherToUpdate.reviews.length;
                let newAverageScore = (review.totalScore + (teacherToUpdate.avg_review*numberOfReviews))/(numberOfReviews+1);

                Teachers.update(teacher._id, { $set: { avg_review: newAverageScore }, $push: { reviews: review } });
            }
            else{
                alert('Parameter teacher different from database one!');
                return;
            }
        },

        'teachers.deleteReview'(teacher, review) {
            check(teacher, Object);

            // Redundant argument validation to ensure data integrity
            check(teacher, {
                _id: Meteor.Collection.ObjectID,
                profile_pic_url: String,
                name: String,
                copyright: String,
                avg_review: Number,
                occupation: String,
                studies: [{title: String}],
                classes_given: [{name: String}],
                reviews: [{
                    criterias: [{selection: Number, description: String}],
                    totalScore: Number,
                    comments: String,
                    createdAt: Date
                }],

            });

            // Check the arguments of the review to be of the expected data types
            check(review, Object);
            check(review, {
                criterias: [{selection: Number, description: String}],
                totalScore: Number,
                comments: String,
                createdAt: Date
            });

            let teacherToUpdate = Teachers.findOne({_id: teacher._id});

            if(JSON.stringify(teacher) == JSON.stringify(teacherToUpdate)){

                let numberOfReviews = teacher.reviews.length;
                let newAverageScore = ((teacher.avg_review*numberOfReviews)-review.totalScore)/(numberOfReviews-1);

                Teachers.update(teacher._id, { $set: { avg_review: newAverageScore }, $pop: { reviews: review } });
            }
            else{
                alert('Parameter teacher different from database one!');
                return;
            }
        },
    });
}

// Deny all client-side updates on the Teachers collection, 
// just in case removing insecure and autopublish is not enough
Teachers.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

// For if User Management is added:
// Deny all client-side updates to user documents
//Meteor.users.deny({
//    update() { return true; }
//});