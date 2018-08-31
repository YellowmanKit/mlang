import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';


class StudentProfile extends SubView {

    render() {
      this.init(this.props);
      const profile = this.props.profile;

      return(
        <div style={this.subViewStyle()}>
            {this.gap(this.bs.height * 0.04)}

            {this.subTitle(['Avatar','照片','照片'])}
            {this.sep()}
            {this.gap(this.bs.height * 0.02)}
            <Image app={this.app} filename={profile.icon} type={'profileIcon'} size={this.bs.height * 0.35}/>
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Name','名稱','名称'])}
            {this.sep()}
            {this.textDisplay(profile.name, ['100%',''], '125%', 'center')}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Self introduction','自我介紹','自我介绍'])}
            {this.sep()}
            {this.textDisplay(profile.description, ['100%',''], '125%', 'center')}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Total submitted cards','卡片總數','卡片总数'])}
            {this.sep()}
            {this.textDisplay(profile.cardCount, ['50%', ''], '150%', 'center')}
            {this.gap(this.bs.height * 0.02)}

            {this.subTitle(['Total featured cards','精選卡片總數','精选卡片总数'])}
            {this.sep()}
            {this.textDisplay(profile.featuredCount, ['50%', ''], '150%', 'center')}
            {this.gap(this.bs.height * 0.06)}
        </div>
      )
    }


}

export default StudentProfile;
