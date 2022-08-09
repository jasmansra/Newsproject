import React, { Component } from "react"; 

export class News extends Component {
 
constructor(props){
super(props);
this.props = props;
//const [title, img] = this.props;
}
  render() {
    return (
      <div className="col-md-4 mb-4">
        <div className="card-group">
          <div className="card">
            <img className="card-img-top" style={{height:'250px'}} src={this.props.pictre} alt="Card jj cap" />
            <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text">
               {this.props.desc}
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
