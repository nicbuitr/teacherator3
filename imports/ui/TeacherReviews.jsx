import { Component } from 'react'; 
import TeacherInfo from './TeacherInfo.jsx';
import ReviewInfo from './ReviewInfo.jsx';
import AddReview from './AddReview.jsx';

// Teacher component
export default class TeacherReviews extends Component {
    renderReviews(){
        let rows = [];
        let reviews = this.props.teacher.reviews;
        for (let i = reviews.length - 1; i >= 0 ; i--) {
            let review = reviews[i];
            rows.push(
                <ReviewInfo review={review} teacher={this.props.teacher} index={i} key={'teacher_' + this.props.teacher._id + '_review_'+(i+1)} />
          );
        }
        return rows;
    }

    render(){
        return(
          <div>
             <div className="teacher-info" tabIndex="0">
                <TeacherInfo teacher={this.props.teacher} key={'teacher_info_'+this.props.teacher._id}/>
              </div>
              <div className="add-review">
                <AddReview teacher={this.props.teacher} key={'teacher_add_review_'+this.props.teacher._id}/>
              </div>
              <div id="review-add-result" className="review-add-result"></div>
              <div className="reviews text-center">
                {this.renderReviews()}                
              </div>
          </div>
        );
    } 
}