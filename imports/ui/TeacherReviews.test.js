/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import TeacherReviews from './TeacherReviews.jsx';
import TeacherInfo from './TeacherInfo.jsx';
import AddReview from './AddReview.jsx';
import ReviewInfo from './ReviewInfo.jsx';

if (Meteor.isClient) {
    describe('<TeacherReviews>', function () {
                const wrapper = shallow(<TeacherReviews 
                teacher={
                {
                    _id: new Meteor.Collection.ObjectID(),            
                    profile_pic_url: 'xavier.png',
                    name: 'Charles Francis Xavier (Professor X)',
                    copyright: 'http://marvel.com/universe/Professor_X',
                    avg_review: 3,
                    occupation: 'Mutant rights activist, geneticist, teacher, formerly adventurer, soldier',
                    studies: [
                        {
                            title: 'Ph.D in Genetics'
                        }
                    ],
                    classes_given: [
                        {
                            name: 'Genetics 101'
                        }
                    ],
                    reviews: []
                }} section="teacher_list" stars={3} size='sm' />);
        it('should have a div with class \'teacher-info\'', function () {
            chai.expect(wrapper.find('.teacher-info')).have.length(1);
        });
        it('should have a div with class \'add-review\'', function () {
            chai.expect(wrapper.find('.add-review')).have.length(1);
        });
        it('should have a div with class \'review-add-result\'', function () {
            chai.expect(wrapper.find('.review-add-result')).have.length(1);
        });
        it('should have a div with class \'reviews text-center\'', function () {
            chai.expect(wrapper.find('.reviews .text-center')).have.length(1);
        });

        it('should have props for renderReviews', function () {
            chai.expect(wrapper.props().renderReviews).to.be.defined;
        });
        it('contains a <TeacherInfo/> component', function () {
            chai.expect(wrapper.find(TeacherInfo)).to.have.length(1);
        });
        it('contains a <AddReview/> component', function () {
            chai.expect(wrapper.find(AddReview)).to.have.length(1);
        });
    });
}