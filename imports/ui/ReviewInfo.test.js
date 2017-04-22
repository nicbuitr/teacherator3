/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import ReviewInfo from './ReviewInfo.jsx';
import ReviewStars from './ReviewStars.jsx';

if (Meteor.isClient) {
    describe('<ReviewInfo>', function () {
        //review={review} teacher={this.props.teacher} index={i}
        const wrapper = shallow(<ReviewInfo 
            review={{
                criterias: [{selection: 0, description: 'Desc1'},{selection: 0, description: 'Desc2'},{selection: 0, description: 'Desc3'},{selection: 0, description: 'Desc4'},{selection: 0, description: 'Desc5'}], totalScore: 5, comments: 'Add review Unit Test', createdAt: new Date()
            }
            } 
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
            }} index={'1'} />);

        it('should have a button to delete the review', function () {
            chai.expect(wrapper.find('span')).to.have.length(1);
        });

        it('should have props for deleteReview', function () {
            chai.expect(wrapper.props().deleteReview).to.be.defined;
        });
        it('contains a <ReviewStars/> component', function () {
            chai.expect(wrapper.find(ReviewStars)).to.have.length(1);
        });
    });
}