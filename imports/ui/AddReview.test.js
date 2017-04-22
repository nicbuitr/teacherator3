/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import AddReview from './AddReview.jsx';
import ReviewStars from './ReviewStars.jsx';

if (Meteor.isClient) {
    describe('<AddReview>', function () {
        it('should have a form to add review', function () {
            const wrapper = shallow(<AddReview/>);
            chai.assert(wrapper.find('form').length == 1);
        });

        it('should have a button to add the review', function () {
            const wrapper = shallow(<AddReview/>);
            chai.expect(wrapper.find('button')).to.have.length(1);
        });

        it('should have props for addReview and handleInputChange', function () {
            const wrapper = shallow(<AddReview/>);
            chai.expect(wrapper.props().addReview).to.be.defined;
            chai.expect(wrapper.props().handleInputChange).to.be.defined;
        });
        it('contains a <ReviewStars/> component', function () {
            const wrapper = shallow(<AddReview/>);
            chai.expect(wrapper.find(ReviewStars)).to.have.length(1);
        });
    });
}