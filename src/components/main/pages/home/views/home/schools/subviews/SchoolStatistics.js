import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class SchoolStatistics extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getSchoolStatistic();
  }

  getSchoolStatistic(){

  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        Statistics
      </div>
    )
  }

}

export default SchoolStatistics;
